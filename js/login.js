function login(event) {
    event.preventDefault(); // Prevent the default form submission

    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (username == '') {
        alert("Bạn vui lòng nhập tài khoản!");
    } else if (password == '') {
        alert("Bạn vui lòng nhập mật khẩu!");
    } else {
        var userRole;

        if (username == "u@gmail.com" && password == "1234") {
            alert("Login successful. Hello user!");
            userRole = "user";
        } else if (username == "a@gmail.com" && password == "5678") {
            alert("Login successful. Hello admin!");
            userRole = "admin";
        } else {
            alert("Tên đăng nhập hoặc mật khẩu không hợp lệ");
            return; // Exit if login credentials are invalid
        }
//Khi nhập số lượng lớn hơn 2 triệu, sử dụng kỹ thuật truyền tham số giữa 2 form qua URL, chương trình  hiện ra form xác nhận hàng này có giá trên 2 triệu đúng không, gồm 2 điều kiển ĐÚng, sai. Nếu đúng thì lưu hàng, nếu sai thì đóng form quay lại form Nhập
        localStorage.setItem("role", userRole);
        // Redirect based on the user's role
        switch (userRole) {
            case "admin":
                window.location.href = "home.html?role=admin";
                break;
            case "user":
                window.location.href = "home.html?role=user";
                break;
            default:
                alert("Không có quyền truy cập");
                break;
        }
    }
}
