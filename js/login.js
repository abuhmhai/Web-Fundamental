function login(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === '') {
        showNotification("Bạn vui lòng nhập email!", false);
        return;
    } else if (password === '') {
        showNotification("Bạn vui lòng nhập mật khẩu!", false);
        return;
    }

    // Kiểm tra quyền đăng nhập
    let userRole;

    if (email === "admin@gmail.com" && password === "admin") {
        showNotification("Đăng nhập thành công. Xin chào Admin!", true);
        userRole = "admin";
    } else if (email === "patient@gmail.com" && password === "1234") {
        showNotification("Đăng nhập thành công. Xin chào Patient!", true);
        userRole = "patient";
    } else {
        showNotification("Tên đăng nhập hoặc mật khẩu không hợp lệ!", false);
        return; // Thoát nếu thông tin đăng nhập không đúng
    }

    // Lưu quyền vào localStorage
    localStorage.setItem("role", userRole);

    // Chuyển hướng trang dựa trên quyền
    setTimeout(() => {
        switch (userRole) {
            case "admin":
                window.location.href = "view.html?role=admin";
                break;
            case "patient":
                window.location.href = "enter.html?role=patient";
                break;
            default:
                showNotification("Không có quyền truy cập", false);
                break;
        }
    }, 2000); // Chuyển trang sau 2 giây
}

function showNotification(message, isSuccess) {
    const notification = document.getElementById("notification");
    const messageBox = document.getElementById("notification-message");

    messageBox.textContent = message;
    notification.className = `notification ${isSuccess ? "success" : ""}`; // Thêm lớp success nếu thông báo thành công
    notification.classList.remove("hidden");

    setTimeout(() => {
        notification.classList.add("hidden");
    }, 4000); // Ẩn sau 4 giây
}

function closeNotification() {
    const notification = document.getElementById("notification");
    notification.classList.add("hidden");
}