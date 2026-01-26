let users = JSON.parse(localStorage.getItem("users")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Default Admin
if (!localStorage.getItem("admin")) {
  localStorage.setItem("admin", JSON.stringify({email:"admin@corp.com", pass:"admin123"}));
}

function showRegister() {
  loginBox.style.display = "none";
  registerBox.style.display = "block";
}

function showLogin() {
  registerBox.style.display = "none";
  loginBox.style.display = "block";
}

function login() {
  const type = loginType.value;
  const email = loginEmail.value;
  const pass = loginPass.value;

  if (type === "admin") {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (email !== admin.email || pass !== admin.pass) return alert("Invalid admin login");
    currentUser = { email, role: "admin" };
    showAdmin();
  } else {
    const user = users.find(u => u.email === email && u.pass === pass);
    if (!user) return alert("Invalid employee login");
    currentUser = { email, role: "employee" };
    showEmployee();
  }

  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function register() {
  if (users.find(u => u.email === regEmail.value)) return alert("User exists");
  users.push({ email: regEmail.value, pass: regPass.value });
  localStorage.setItem("users", JSON.stringify(users));
  regMsg.textContent = "Registration successful!";
}

function showEmployee() {
  loginBox.style.display = "none";
  employeeBox.style.display = "block";
  navbar.style.display = "flex";
  navUser.textContent = "Employee: " + currentUser.email;
}

function showAdmin() {
  loginBox.style.display = "none";
  adminBox.style.display = "block";
  navbar.style.display = "flex";
  navUser.textContent = "Admin Panel";
  renderAdminExpenses();
}

function addExpense() {
  expenses.push({
    user: currentUser.email,
    name,
    category,
    amount: amount.value,
    date: date.value,
    status: "Pending"
  });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  alert("Expense submitted");
}

function renderAdminExpenses() {
  adminList.innerHTML = "";
  expenses.forEach((e, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${e.user} - ₹${e.amount} - <b>${e.status}</b>
      <br>
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

function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}
