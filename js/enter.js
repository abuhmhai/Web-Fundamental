document.querySelector("#product-price").addEventListener("keypress", function(evt) {
    if (evt.which !== 46) {
        if (evt.which < 48 || evt.which > 57) {
            evt.preventDefault();
        }
    }
});

document.querySelector("#product-num").addEventListener("keypress", function(evt) {
    if (evt.which < 48 || evt.which > 57) {
        evt.preventDefault();
    }
});

document.querySelector("#product-name").onkeypress = function(e) {
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (/\d/.test(charStr)) {
        return false;
    }
};

function clear_inputs() {
    document.getElementById("product-name").value = '';
    document.getElementById("product-num").value = '';
    document.getElementById("product-price").value = '';
}

var prod_list = [];
function submit_form() {
    var prod_name = document.getElementById("product-name").value;
    var prod_num = document.getElementById("product-num").value;
    var prod_price = document.getElementById("product-price").value;

    if (prod_name.length == 0 || prod_num == 0 || prod_price == 0) {
        alert("Không hợp lệ");
    } else {
        var existingList = JSON.parse(localStorage.getItem("prod_list")) || [];

        var newProd = {name: prod_name, num: prod_num, price: prod_price };
        
        // Check if the product price is greater than 2 million
        if (parseFloat(prod_price) > 2000000) {
            var confirmation = confirm("Hàng này có giá trên 2 triệu, đúng không?");
            if (!confirmation) {
                return; // Do not proceed if the user selects 'Cancel'
            }
        }

        existingList.push(newProd);

        alert("Đã lưu danh sách sản phẩm vào trang Xem!");
        clear_inputs();

        localStorage.setItem("prod_list", JSON.stringify(existingList));
        prod_list = [];
    }
}
