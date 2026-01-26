// ===== ELEMENT REFERENCES (CRITICAL FIX) =====
const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");
const employeeBox = document.getElementById("employeeBox");
const adminBox = document.getElementById("adminBox");
const navbar = document.getElementById("navbar");
const navUser = document.getElementById("navUser");

const loginEmail = document.getElementById("loginEmail");
const loginPass = document.getElementById("loginPass");
const loginType = document.getElementById("loginType");

const regEmail = document.getElementById("regEmail");
const regPass = document.getElementById("regPass");
const regRole = document.getElementById("regRole");
const regMsg = document.getElementById("regMsg");

const empName = document.getElementById("empName");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const date = document.getElementById("date");

const adminList = document.getElementById("adminList");

// ===== STORAGE =====
let users = JSON.parse(localStorage.getItem("users")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// ===== NAV FUNCTIONS =====
function showRegister() {
  loginBox.style.display = "none";
  registerBox.style.display = "block";
}

function showLogin() {
  registerBox.style.display = "none";
  loginBox.style.display = "block";
}

// ===== REGISTER =====
function register() {
  if (users.find(u => u.email === regEmail.value)) {
    regMsg.textContent = "User already exists!";
    regMsg.style.color = "red";
    return;
  }

  users.push({
    email: regEmail.value,
    pass: regPass.value,
    role: regRole.value
  });

  localStorage.setItem("users", JSON.stringify(users));
  regMsg.textContent = "Registration successful!";
  regMsg.style.color = "green";
}

// ===== LOGIN =====
function login() {
  const user = users.find(
    u =>
      u.email === loginEmail.value &&
      u.pass === loginPass.value &&
      u.role === loginType.value
  );

  if (!user) {
    alert("Invalid login credentials");
    return;
  }

  currentUser = user;
  localStorage.setItem("currentUser", JSON.stringify(user));

  loginType.value === "admin" ? showAdmin() : showEmployee();
}

// ===== EMPLOYEE =====
function showEmployee() {
  loginBox.style.display = "none";
  employeeBox.style.display = "block";
  adminBox.style.display = "none";
  navbar.style.display = "flex";
  navUser.textContent = "Employee: " + currentUser.email;
}

function addExpense() {
  expenses.push({
    user: currentUser.email,
    name: empName.value,
    category: category.value,
    amount: amount.value,
    date: date.value,
    status: "Pending"
  });

  localStorage.setItem("expenses", JSON.stringify(expenses));
  alert("Expense submitted");
}

// ===== ADMIN =====
function showAdmin() {
  loginBox.style.display = "none";
  adminBox.style.display = "block";
  employeeBox.style.display = "none";
  navbar.style.display = "flex";
  navUser.textContent = "Admin Panel";
  renderAdminExpenses();
}

function renderAdminExpenses() {
  adminList.innerHTML = "";

  expenses.forEach((e, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${e.user}</b><br>
      ₹${e.amount} | ${e.category}<br>
      Status: <b>${e.status}</b><br>
      <button onclick="updateStatus(${i}, 'Accepted')">Accept</button>
      <button onclick="updateStatus(${i}, 'Rejected')">Reject</button>
    `;
    adminList.appendChild(li);
  });
}

function updateStatus(index, status) {
  expenses[index].status = status;
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderAdminExpenses();
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

// ===== AUTO LOGIN =====
window.onload = () => {
  if (currentUser) {
    currentUser.role === "admin" ? showAdmin() : showEmployee();
  }
};
