const users = JSON.parse(localStorage.getItem("users")) || [];
const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

const navbar = document.getElementById("navbar");
const navUser = document.getElementById("navUser");

const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");
const employeeBox = document.getElementById("employeeBox");
const adminBox = document.getElementById("adminBox");

/* NAVIGATION */
function showRegister() {
  loginBox.style.display = "none";
  registerBox.style.display = "block";
}

function showLogin() {
  registerBox.style.display = "none";
  loginBox.style.display = "block";
}

/* REGISTER */
function register() {
  const email = regEmail.value;
  const pass = regPass.value;
  const role = regRole.value;

  users.push({ email, pass, role });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
  showLogin();
}

/* LOGIN */
function login() {
  const email = loginEmail.value;
  const pass = loginPass.value;
  const role = loginRole.value;

  const user = users.find(u => u.email === email && u.pass === pass && u.role === role);

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  currentUser = user;
  localStorage.setItem("currentUser", JSON.stringify(user));

  navbar.style.display = "flex";
  navUser.textContent = role === "admin" ? "Admin Panel" : "Employee: " + email;

  loginBox.style.display = "none";

  role === "admin" ? showAdmin() : showEmployee();
}

/* DASHBOARDS */
function showEmployee() {
  employeeBox.style.display = "block";
  adminBox.style.display = "none";
}

function showAdmin() {
  adminBox.style.display = "block";
  employeeBox.style.display = "none";
  loadExpenses();
}

/* EXPENSE */
function addExpense() {
  expenses.push({
    title: expTitle.value,
    amount: expAmount.value,
    status: "Pending"
  });

  localStorage.setItem("expenses", JSON.stringify(expenses));
  alert("Expense submitted");
}

function loadExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  expenses.forEach((e, i) => {
    list.innerHTML += `
      <li>
        ${e.title} - ₹${e.amount} - ${e.status}
        <br>
        <button onclick="updateStatus(${i}, 'Approved')">Accept</button>
        <button onclick="updateStatus(${i}, 'Rejected')">Reject</button>
      </li>`;
  });
}

function updateStatus(i, status) {
  expenses[i].status = status;
  localStorage.setItem("expenses", JSON.stringify(expenses));
  loadExpenses();
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

/* AUTO LOGIN */
window.onload = () => {
  if (currentUser) {
    navbar.style.display = "flex";
    navUser.textContent = currentUser.role === "admin"
      ? "Admin Panel"
      : "Employee: " + currentUser.email;

    currentUser.role === "admin" ? showAdmin() : showEmployee();
    loginBox.style.display = "none";
  }
};
