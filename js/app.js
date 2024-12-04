// Get email from URL
const url = new URL(window.location.href);
const superEmail = url.searchParams.get("email");

// Roles definition
const roles = {
    "a@gmail.com": "admin", // Admin with full permissions
    "u@gmail.com": "user",  // User with restricted permissions
    // Default roles for others or empty emails
};

// Check user access
function checkEnter(action) {
    const role = roles[superEmail] || "visitor";

    if (role === "admin") {
        // Admin can access both "Nhập" and "Xem"
        if (action === "enter") {
            location.href = `nhap.html?email=${encodeURIComponent(superEmail)}&role=admin`;
        } else if (action === "view") {
            location.href = `view.html?email=${encodeURIComponent(superEmail)}&role=admin`;
        }
    } else if (role === "user") {
        // User can only access "Xem"
        if (action === "view") {
            location.href = `view.html?email=${encodeURIComponent(superEmail)}&role=user`;
        } else if (action === "enter") {
            showNotification("Bạn không có quyền truy cập chức năng này!");
        }
    } else if (!superEmail) {
        // No email: login required
        showNotification("Bạn cần đăng nhập để truy cập chức năng này!");
    } else {
        // Default for unauthorized access
        showNotification("Bạn không có quyền truy cập chức năng này!");
    }
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById("notification");
    const messageBox = document.getElementById("notification-message");

    // Set notification message
    messageBox.textContent = message;
    notification.classList.remove("hidden");
    notification.style.display = "block";

    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.add("hidden");
        notification.style.display = "none";
    }, 4000);
}

// Close notification on button click
function closeNotification() {
    const notification = document.getElementById("notification");
    notification.classList.add("hidden");
    notification.style.display = "none";
}
