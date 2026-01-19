let users = JSON.parse(localStorage.getItem("users")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

function showRegister() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("registerBox").style.display = "block";
}

function showLogin() {
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("registerBox").style.display = "none";
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPass").value;
  const user = users.find(u => u.email === email && u.pass === pass);
  if (!user) return alert("Invalid credentials!");
  currentUser = user;
  localStorage.setItem("currentUser", JSON.stringify(user));

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("appBox").style.display = "block";
  document.getElementById("listBox").style.display = "block";
  renderExpenses();
}

function register() {
  const email = document.getElementById("regEmail").value;
  const pass = document.getElementById("regPass").value;
  if (users.find(u => u.email === email)) return alert("User already exists!");
  users.push({email, pass});
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered! Please log in.");
  showLogin();
}

function addExpense() {
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;
  const desc = document.getElementById("desc").value;

  if (!currentUser) return alert("Please login first!");
  expenses.push({ user: currentUser.email, name, category, amount, date, desc });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

function renderExpenses() {
  const list = document.getElementById("list");
  list.innerHTML = "";
  const userExp = expenses.filter(e => e.user === currentUser.email);
  if (!userExp.length) return (list.innerHTML = "<li>No expenses yet.</li>");
  userExp.forEach(e => {
    const li = document.createElement("li");
    li.textContent = `${e.date} - ${e.name} - ${e.category} - $${e.amount}`;
    list.appendChild(li);
  });
}

function showReport() {
  document.getElementById("appBox").style.display = "none";
  document.getElementById("listBox").style.display = "none";
  document.getElementById("reportBox").style.display = "block";

  const reportList = document.getElementById("reportList");
  reportList.innerHTML = "";
  const userExp = expenses.filter(e => e.user === currentUser.email);
  if (!userExp.length) return (reportList.innerHTML = "<li>No report</li>");
  const total = userExp.reduce((s,e) => s + e.amount, 0);
  const li = document.createElement("li");
  li.textContent = `Total: $${total.toFixed(2)}`;
  reportList.appendChild(li);
}

window.onload = () => {
  if (currentUser) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("appBox").style.display = "block";
    document.getElementById("listBox").style.display = "block";
    renderExpenses();
  }
};
