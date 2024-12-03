// Lấy role từ URL
const url = new URL(window.location.href);
const superRole = url.searchParams.get("role");

// Hàm kiểm tra quyền truy cập
function check_enter() {
    if (superRole === "admin") {
        // Admin được phép vào form "Nhập"
        location.href = "view.html?role=admin";
    } else if (superRole === "patient") {
        // Patient chỉ được phép vào form "Đặt lịch"
        location.href = "enter.html?role=patient";
    } else if (!superRole) {
        // Không có role
        showNotification("Bạn cần đăng nhập để truy cập chức năng này!");
    } else {
        // Không có quyền
        showNotification("Bạn không có quyền truy cập chức năng này!");
    }
}

// Hàm hiển thị thông báo
function showNotification(message) {
    const notification = document.getElementById("notification");
    const messageBox = document.getElementById("notification-message");

    // Cập nhật nội dung thông báo
    messageBox.textContent = message;
    notification.classList.remove("hidden");
    notification.style.display = "block";

    // Tự động đóng thông báo sau 4 giây
    setTimeout(() => {
        notification.classList.add("hidden");
        notification.style.display = "none";
    }, 4000);
}

// Hàm đóng thông báo bằng nút "Đóng"
function closeNotification() {
    const notification = document.getElementById("notification");
    notification.classList.add("hidden");
    notification.style.display = "none";
}