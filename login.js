// login.js

function selectRole(role) {
  // Add an animation class or effect if desired here, then redirect
  if (role === 'staff') {
    window.location.href = "staff.html";
  } else if (role === 'student') {
    window.location.href = "studentdetails.html";
  }
}
