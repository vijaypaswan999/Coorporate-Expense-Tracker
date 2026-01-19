function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "123") {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("msg").innerText = "Invalid Username or Password!";
    }
}

let total = 0;

function addExpense() {
    let title = document.getElementById("title").value;
    let amount = document.getElementById("amount").value;

    if (title === "" || amount === "") {
        alert("Please enter expense details");
        return;
    }

    let list = document.getElementById("list");
    let li = document.createElement("li");
    li.innerText = title + " - ₹" + amount;

    list.appendChild(li);

    total += parseInt(amount);
    document.getElementById("total").innerText = total;

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
}
