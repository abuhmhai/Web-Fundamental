// getting the url parameters
var url = new URL(window.location.href);
const super_role = url.searchParams.get("role");

//check enter 
function check_enter()
{
    // var role = localStorage.getItem("role");

    if (super_role == "user")
    {
        location.href = "view.html?role=user";
    }
    else if (super_role == "admin")
    {
        location.href = "enter.html?role=admin";
    }
    else
    {
        alert("Không có quyền truy cập!!");
    }
}