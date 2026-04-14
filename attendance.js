// attendance.js

document.addEventListener("DOMContentLoaded", () => {
    // Get student data from localStorage
    const student = JSON.parse(localStorage.getItem("studentData"));

    // Redirect to login if no session
    if (!student) {
        window.location.href = "studentdetails.html";
        return;
    }

    // Process attendance data
    // Assuming student.attendance is a number (e.g., 85)
    let attendancePercent = student.attendance || 0;
    
    // If it's a string like "85%", convert to number
    if (typeof attendancePercent === 'string') {
        attendancePercent = parseInt(attendancePercent.replace('%', ''));
    }

    // Mock calculations based on percentage
    const totalClasses = 200; // Mock total
    const attendedClasses = Math.round((attendancePercent / 100) * totalClasses);

    // Update UI
    const totalClassesEl = document.getElementById("totalClasses");
    const attendedClassesEl = document.getElementById("attendedClasses");
    const percentageTextEl = document.getElementById("percentageText");
    const circle = document.getElementById("progressCircle");
    const statusTextEl = document.getElementById("statusText");

    if (totalClassesEl) totalClassesEl.innerText = totalClasses;
    if (attendedClassesEl) attendedClassesEl.innerText = attendedClasses;
    if (percentageTextEl) {
        percentageTextEl.innerText = attendancePercent + "%";
        
        let color;
        let status;

        if (attendancePercent >= 75) {
            color = "#22c55e"; // Green
            status = "Good Attendance 👍 - Excellent consistency!";
        } else if (attendancePercent >= 60) {
            color = "#f59e0b"; // Orange
            status = "Average Attendance ⚠ - Try to be more regular.";
        } else {
            color = "#ef4444"; // Red
            status = "Low Attendance ❌ - Mandatory classes required.";
        }

        if (circle) {
            circle.style.background = `conic-gradient(${color} ${attendancePercent}%, #e5e7eb ${attendancePercent}% 100%)`;
        }
        
        percentageTextEl.style.color = color;
        if (statusTextEl) {
            statusTextEl.innerText = status;
            statusTextEl.style.color = color;
        }
    }
});
