// studentdetails.js

function login() {
  const usernameInput = document.getElementById("username");
  const uidInput = document.getElementById("uid");
  const msg = document.getElementById("msg");

  if (!usernameInput || !uidInput || !msg) return;

  const username = usernameInput.value.trim().toLowerCase();
  const uid = uidInput.value.trim();

  msg.innerText = "";

  // Student database (10 students demo)
  const students = [
    { name: "lokesh", uid: "501", fee: 40000, paid: 25000, attendance: "85%" },
    { name: "rahul", uid: "502", fee: 40000, paid: 40000, attendance: "90%" },
    { name: "priya", uid: "503", fee: 45000, paid: 20000, attendance: "88%" },
    { name: "amit", uid: "504", fee: 35000, paid: 35000, attendance: "92%" },
    { name: "kiran", uid: "505", fee: 38000, paid: 10000, attendance: "80%" },
    { name: "arjun", uid: "506", fee: 50000, paid: 45000, attendance: "87%" },
    { name: "neha", uid: "507", fee: 42000, paid: 0, attendance: "75%" },
    { name: "rohit", uid: "508", fee: 36000, paid: 18000, attendance: "95%" },
    { name: "pooja", uid: "509", fee: 44000, paid: 40000, attendance: "89%" },
    { name: "kavya", uid: "510", fee: 48000, paid: 15000, attendance: "83%" }
  ];

  // Validation
  if (username === "" && uid === "") {
    msg.style.color = "#ef4444";
    msg.innerText = "Please enter Username and UID";
    return;
  }

  if (username === "") {
    msg.style.color = "#ef4444";
    msg.innerText = "Username is required";
    return;
  }

  if (uid === "") {
    msg.style.color = "#ef4444";
    msg.innerText = "UID is required";
    return;
  }

  // Check student
  const student = students.find(
    s => s.name === username && s.uid === uid
  );

  if (student) {
    msg.style.color = "#22c55e";
    msg.innerText = "✔ Login Successful";

    localStorage.setItem("studentData", JSON.stringify(student));

    setTimeout(() => {
      window.location.href = "studentdashboard.html";
    }, 1000);

  } else {
    msg.style.color = "#ef4444";
    msg.innerText = "✖ Invalid Username or UID";
  }
}
