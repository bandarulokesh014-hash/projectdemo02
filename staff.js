// staff.js

function loginStaff() {
  const staffIdInput = document.getElementById("staffId");
  const passwordInput = document.getElementById("password");
  const msg = document.getElementById("msg");

  if (!staffIdInput || !passwordInput || !msg) return;

  const staffId = staffIdInput.value.trim();
  const password = passwordInput.value.trim();

  msg.innerText = "";

  // Simple validation
  if (staffId === "" || password === "") {
    msg.style.color = "#ff6b6b";
    msg.innerText = "Please enter both Staff ID and Password.";
    return;
  }

  // Pre-defined Staff Credentials
  const validStaff = [
    { id: "staff01", password: "password123", name: "Staff Member 1" },
    { id: "admin", password: "admin123", name: "Administrator" },
    { id: "lokesh", password: "lokesh123", name: "Lokesh M" }
  ];

  const staff = validStaff.find(s => s.id === staffId && s.password === password);

  if (staff) {
    msg.style.color = "#51cf66";
    msg.innerText = "✔ Authentication Successful";
    
    // Store staff details
    localStorage.setItem("staffData", JSON.stringify({ id: staff.id, name: staff.name, role: "staff" }));

    setTimeout(() => {
      window.location.href = "staffdashboard.html";
    }, 1200);

  } else {
    msg.style.color = "#ff6b6b";
    msg.innerText = "✖ Invalid Staff ID or Password";
  }
}
