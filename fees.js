// fees.js

document.addEventListener("DOMContentLoaded", () => {
    // Get student data from localStorage
    const student = JSON.parse(localStorage.getItem("studentData"));

    // Redirect to login if no session
    if (!student) {
        window.location.href = "studentdetails.html";
        return;
    }

    // Display student summary in header if needed or just use for fee calculation
    const totalTuition = student.fee || 25000;
    const paidAmount = student.paid || 0;
    const dueAmount = totalTuition - paidAmount;

    // Update the table dynamically (demo)
    // In a real app, you'd have a list of fee records. 
    // Here we'll map the student's tuition fee and a static exam fee.

    const feeTable = document.querySelector("table");
    
    // Clear existing rows except header
    const rows = feeTable.querySelectorAll("tr");
    for(let i = 1; i < rows.length; i++) {
        rows[i].remove();
    }

    // Add Tuition Fee Row
    const tuitionRow = document.createElement("tr");
    tuitionRow.innerHTML = `
        <td>Tuition Fee</td>
        <td>₹${totalTuition.toLocaleString()}</td>
        <td class="${dueAmount <= 0 ? 'paid' : 'pending'}">${dueAmount <= 0 ? 'Paid' : 'Pending'}</td>
        <td>${dueAmount <= 0 ? '—' : `<button class="pay-btn" onclick="payNow('Tuition Fee', ${dueAmount})">Pay Now</button>`}</td>
    `;
    feeTable.appendChild(tuitionRow);

    // Add Exam Fee Row (Static for demo)
    const examFee = 2000;
    const examRow = document.createElement("tr");
    examRow.innerHTML = `
        <td>Exam Fee</td>
        <td>₹${examFee.toLocaleString()}</td>
        <td class="pending">Pending</td>
        <td><button class="pay-btn" onclick="payNow('Exam Fee', ${examFee})">Pay Now</button></td>
    `;
    feeTable.appendChild(examRow);
});

function payNow(type, amount) {
    // Navigate to payment page with details if needed
    // For now, just alert or navigate
    console.log(`Paying ${amount} for ${type}`);
    window.location.href = `payment.html?type=${encodeURIComponent(type)}&amount=${amount}`;
}
