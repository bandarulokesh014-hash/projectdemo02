// staffdashboard.js

document.addEventListener("DOMContentLoaded", () => {
    // Get staff data from localStorage
    const staffData = JSON.parse(localStorage.getItem("staffData"));

    // If no staff data, redirect to login
    if (!staffData || staffData.role !== "staff") {
        window.location.href = "staff.html";
        return;
    }

    // Update UI with staff info
    const userNameEls = document.querySelectorAll(".user-profile span, .welcome-banner h2");
    if (userNameEls.length > 0) {
        userNameEls[0].innerText = `Welcome, ${staffData.name}`;
        if (userNameEls[1]) {
            userNameEls[1].innerText = `Welcome to the Staff Dashboard, ${staffData.name}`;
        }
    }

    // Update Profile Image if it exists
    const profileImg = document.querySelector(".user-profile img");
    if (profileImg) {
        profileImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(staffData.name)}&background=0b62a4&color=fff`;
    }

    // Add click events for sidebar links (for UI feedback)
    const navLinks = document.querySelectorAll(".nav-links li");
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
            // Here you could add logic to switch views/content
            console.log("Navigated to:", this.innerText.trim());
        });
    });
});

function logout() {
    localStorage.removeItem("staffData");
    window.location.href = "login.html";
}
