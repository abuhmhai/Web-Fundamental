// $(document).ready(function () {
//     load_info();
// });

// Phần này được chú thích để thực hiện hàm load_info khi tài liệu đã sẵn sàng.
// Tuy nhiên, hiện đang bị chú thích, nên sẽ không được thực hiện. Hãy bỏ chú thích nếu cần.

function load_info() {
    // Lấy 'prod_list' từ bộ nhớ cục bộ và phân tích nó dưới dạng JSON
    var products = JSON.parse(localStorage.getItem("prod_list"));

    // Kiểm tra nếu không tìm thấy sản phẩm hoặc mảng rỗng
    if (products === null || products.length === 0) {
        alert("Không tìm được thông tin hàng hóa");
        // Chuyển hướng đến trang nhập nếu không tìm thấy dữ liệu (hiện đã bị chú thích)
        // location.href = "enter.html";
    } else {
        // Hiển thị danh sách sản phẩm
        showProdList(products);
    }
}


function showProdList(products) {
    // Xóa nội dung của #prod-list
    $('#prod-list').empty();

    // Duyệt qua mảng sản phẩm và hiển thị thông tin trên trang
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var row = `<tr>
                        <td>${product.name}</td>
                        <td>${product.num}</td>
                        <td>${product.price}</td>
                        <td>
                        <button class="edit-btn" onclick="editProduct(${i})"><i class="fa-solid fa-pencil"></i> Sửa</button>
                        <button class="delete-btn" onclick="deleteProduct(${i})"><i class="fa-solid fa-xmark"></i> Xóa</button>
                        </td>
                    </tr>`;
        // Thêm hàng vào #prod-list
        $('#prod-list').append(row);
    }
}
// Hàm xóa sản phẩm
function deleteProduct(index) {
    var role = localStorage.getItem("role");
    
    // Kiểm tra vai trò là admin mới được xoá
    if (role === "admin") {
        var products = JSON.parse(localStorage.getItem("prod_list"));
        // Xóa sản phẩm tại vị trí index
        products.splice(index, 1);
        // Lưu danh sách sản phẩm đã cập nhật vào bộ nhớ cục bộ
        localStorage.setItem("prod_list", JSON.stringify(products));
        // Cập nhật danh sách sản phẩm trên trang
        showProdList(products);
    } else {
        alert("Bạn không có quyền xóa sản phẩm.");
    }
}

// Hàm chỉnh sửa sản phẩm
function editProduct(index) {
    var role = localStorage.getItem("role");

    // Kiểm tra vai trò là admin mới được sửa
    if (role === "admin") {
        var products = JSON.parse(localStorage.getItem("prod_list"));
        var product = products[index];

        // Nhận thông tin sản phẩm mới từ người dùng
        var newName = prompt("Nhập tên mới", product.name);
        var newNum = prompt("Nhập số lượng mới", product.num);
        var newPrice = prompt("Nhập giá mới", product.price);

        // Kiểm tra xem người dùng có hủy bỏ thông báo không
        if ( newName !== null && newNum !== null && newPrice !== null) {
            // Xác nhận newNum và newPrice là số
            if (isNaN(Number(newNum)) || isNaN(Number(newPrice))) {
                alert("Vui lòng nhập số lượng và giá là số.");
                return;
            }

            // Xác nhận newNum và newPrice lớn hơn hoặc bằng 0
            if (Number(newNum) < 0 || Number(newPrice) < 0) {
                alert("Số lượng và giá phải lớn hơn hoặc bằng 0.");
                return;
            }

            // Xác nhận newName không chứa số
            if (/\d/.test(newName)) {
                alert("Vui lòng nhập tên không chứa số.");
                return;
            }

            // Cập nhật thông tin sản phẩm
            product.name = newName;
            product.num = newNum;
            product.price = newPrice;

            // Lưu danh sách sản phẩm đã cập nhật vào bộ nhớ cục bộ
            localStorage.setItem("prod_list", JSON.stringify(products));

            // Cập nhật danh sách sản phẩm trên trang
            showProdList(products);
        }
    } else {
        alert("Bạn không có quyền chỉnh sửa sản phẩm.");
    }
}
