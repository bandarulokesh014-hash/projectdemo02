// studentdashboard.js

document.addEventListener("DOMContentLoaded", () => {
  // Navigation / Setup
  let student = JSON.parse(localStorage.getItem("studentData"));
  
  // Safety check - if none exists, setup demo data
  if(!student){
    student = { name:"Lokesh", uid:"22CS101", fee:40000, paid:20000, attendance:82 };
    localStorage.setItem("studentData", JSON.stringify(student));
  } else {
    // Fix attendance if it's a string from login (e.g., "85%")
    if (typeof student.attendance === 'string') {
      student.attendance = parseInt(student.attendance.replace('%', ''));
    }
    // Ensure paid exists
    if (student.paid === undefined) student.paid = 0;
  }

  // Bind UI Elements
  const greetNameEl = document.getElementById("greetName");
  if (greetNameEl) {
    greetNameEl.innerText = "Hello, " + (student.name.charAt(0).toUpperCase() + student.name.slice(1)) + "!";
  }
  
  // Calculate Fees
  const totalFee = student.fee || 0;
  const paidFee = student.paid || 0;
  const dueFee = (totalFee - paidFee) > 0 ? (totalFee - paidFee) : 0;
  const attNum = student.attendance || 0;

  // Quick Stats
  const quickAttEl = document.getElementById("quickAtt");
  if (quickAttEl) quickAttEl.innerText = attNum + "%";

  const quickDueEl = document.getElementById("quickDue");
  if (quickDueEl) {
    quickDueEl.innerText = "₹" + dueFee.toLocaleString();
    if(dueFee === 0) {
      quickDueEl.className = "val text-success";
      quickDueEl.innerText = "Paid";
    }
  }

  // Modal Interaction Logic
  window.openSheet = function(id) {
    document.getElementById('overlay').classList.add('active');
    document.getElementById(id).classList.add('active');
    
    // Load lazy data when opened
    if(id === 'fee-sheet') loadFeeData(totalFee, paidFee, dueFee);
    if(id === 'att-sheet') renderAttChart(attNum);
  };

  window.closeSheets = function() {
    document.getElementById('overlay').classList.remove('active');
    const sheets = document.querySelectorAll('.bottom-sheet');
    sheets.forEach(s => s.classList.remove('active'));
  };

  window.logout = function() {
    localStorage.removeItem("studentData");
    window.location.href = "index.html";
  };

  // Sheet Specific Data Loading
  function loadFeeData(totalFee, paidFee, dueFee) {
    document.getElementById("feeTot").innerText = "₹" + totalFee.toLocaleString();
    document.getElementById("feePaid").innerText = "₹" + paidFee.toLocaleString();
    document.getElementById("feeDue").innerText = "₹" + dueFee.toLocaleString();

    if(dueFee === 0) {
      document.getElementById("payBtn").style.display = "none";
      document.getElementById("feeDue").className = "text-success";
    }
  }

  let chartInstance = null;
  function renderAttChart(attNum) {
    if(chartInstance) return; // already rendered
    const ctx = document.getElementById("attChart").getContext("2d");
    
    chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Attended', 'Missed'],
        datasets: [{
          data: [attNum, 100 - attNum],
          backgroundColor: ['#10b981', '#f1f5f9'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend: { position: 'bottom', labels: { usePointStyle: true, font: { family: 'Outfit' } } }
        }
      }
    });

    // Update message
    const msg = document.getElementById("attStatusMsg");
    if(attNum >= 75) { msg.innerText = "Great job! You have enough attendance for exams."; msg.style.color = "#10b981"; }
    else if(attNum >= 60) { msg.innerText = "Warning: Try to attend more classes to be safe."; msg.style.color = "#f59e0b"; }
    else { msg.innerText = "Critical: Your attendance is too low."; msg.style.color = "#ef4444"; }
  }
});
