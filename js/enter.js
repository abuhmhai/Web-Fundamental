// Ngăn chặn nhập ký tự không hợp lệ vào trường Số điện thoại
document.querySelector("#phone").addEventListener("keypress", function (evt) {
    if (evt.which < 48 || evt.which > 57) {
        evt.preventDefault(); // Chỉ cho phép nhập số
    }
});

// Ngăn chặn nhập số hoặc ký tự không hợp lệ vào trường Họ tên
document.querySelector("#name").addEventListener("keypress", function (evt) {
    var charCode = evt.which || evt.keyCode;
    var charStr = String.fromCharCode(charCode);

    if (/\d/.test(charStr)) {
        evt.preventDefault(); // Ngăn không cho nhập số
    }
});

// Làm trống các trường nhập liệu
function clearInputs() {
    document.getElementById("name").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("specialty").value = '';
    document.getElementById("doctor").innerHTML = '<option value="">-- Chọn bác sĩ --</option>';
}

// Gửi dữ liệu form
function submitForm() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const specialty = document.getElementById("specialty").value;
    const doctor = document.getElementById("doctor").value;

    // Kiểm tra các trường nhập liệu
    if (!name || !phone || !specialty || !doctor) {
        showNotification("Vui lòng điền đầy đủ thông tin!", false);
        return;
    }

    // Kiểm tra số điện thoại có 10 chữ số
    if (phone.length !== 10) {
        showNotification("Số điện thoại phải có 10 chữ số!", false);
        return;
    }

    // Lấy danh sách hiện tại từ localStorage
    const appointmentList = JSON.parse(localStorage.getItem("appointments")) || [];

    // Thêm lịch hẹn mới
    const newAppointment = { name, phone, specialty, doctor };
    appointmentList.push(newAppointment);

    // Lưu danh sách vào localStorage
    localStorage.setItem("appointments", JSON.stringify(appointmentList));

    // Hiển thị thông báo thành công
    showNotification("Đặt lịch khám thành công!", true);

    // Xóa các trường nhập liệu
    clearInputs();
}

// Hiển thị thông báo
function showNotification(message, isSuccess) {
    const notification = document.getElementById("notification");
    const messageBox = document.getElementById("notification-message");

    // Cập nhật nội dung và kiểu thông báo
    messageBox.textContent = message;
    notification.className = `notification ${isSuccess ? "success" : "error"} visible`;

    // Tự động ẩn thông báo sau 4 giây
    setTimeout(() => {
        notification.classList.remove("visible");
        notification.classList.add("hidden");
    }, 4000);
}

// Cập nhật danh sách bác sĩ dựa trên chuyên khoa
function updateDoctorOptions() {
    const specialty = document.getElementById("specialty").value;
    const doctorSelect = document.getElementById("doctor");

    // Xóa các lựa chọn trước đó
    doctorSelect.innerHTML = '<option value="">-- Chọn bác sĩ --</option>';

    // Thêm lựa chọn dựa vào chuyên khoa
    if (specialty === "Nội") {
        doctorSelect.innerHTML += '<option value="BS Nguyễn Văn Dũng">BS Nguyễn Văn Dũng</option>';
        doctorSelect.innerHTML += '<option value="BS Trần Minh Quân">BS Trần Minh Quân</option>';
    } else if (specialty === "Ngoại") {
        doctorSelect.innerHTML += '<option value="BS Lê Thị Hồng">BS Lê Thị Hồng</option>';
        doctorSelect.innerHTML += '<option value="BS Phạm Đức Thịnh">BS Phạm Đức Thịnh</option>';
    }
}