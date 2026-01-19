// Initialize users and expenses from localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Show/Hide boxes
function showRegister() {
  document.getElementById('loginBox').style.display = 'none';
  document.getElementById('registerBox').style.display = 'block';
}

function showLogin() {
  document.getElementById('loginBox').style.display = 'block';
  document.getElementById('registerBox').style.display = 'none';
}

function backToApp() {
  document.getElementById('reportBox').style.display = 'none';
  document.getElementById('appBox').style.display = 'block';
  document.getElementById('listBox').style.display = 'block';
  renderExpenses();
}

// Register function
function register() {
  let email = document.getElementById('regEmail').value.trim();
  let pass = document.getElementById('regPass').value.trim();

  if (!email || !pass) {
    alert("Please fill all fields.");
    return;
  }

  if (users.find(u => u.email === email)) {
    alert("Email already registered!");
    return;
  }

  users.push({ email, pass });
  localStorage.setItem('users', JSON.stringify(users));

  alert("Registration successful! Please login.");
  showLogin();
}

// Login function
function login() {
  let email = document.getElementById('loginEmail').value.trim();
  let pass = document.getElementById('loginPass').value.trim();

  let user = users.find(u => u.email === email && u.pass === pass);
  if (!user) {
    alert("Invalid credentials!");
    return;
  }

  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  document.getElementById('loginBox').style.display = 'none';
  document.getElementById('appBox').style.display = 'block';
  document.getElementById('listBox').style.display = 'block';
  renderExpenses();
}

// Add Expense
function addExpense() {
  let name = document.getElementById('name').value.trim();
  let category = document.getElementById('category').value.trim();
  let amount = parseFloat(document.getElementById('amount').value);
  let date = document.getElementById('date').value;
  let desc = document.getElementById('desc').value.trim();

  if (!name || !category || !amount || !date) {
    alert("Please fill all required fields!");
    return;
  }

  let expense = { user: currentUser.email, name, category, amount, date, desc };
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Clear inputs
  document.getElementById('name').value = '';
  document.getElementById('category').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('date').value = '';
  document.getElementById('desc').value = '';

  renderExpenses();
}

// Render Expenses for current user
function renderExpenses() {
  let list = document.getElementById('list');
  list.innerHTML = '';
  let userExpenses = expenses.filter(e => e.user === currentUser.email);

  if (userExpenses.length === 0) {
    list.innerHTML = "<li>No expenses added yet.</li>";
    return;
  }

  userExpenses.forEach((e) => {
    let li = document.createElement('li');
    li.textContent = `${e.date} - ${e.name} - ${e.category} - $${e.amount}`;
    list.appendChild(li);
  });
}

// Show Report
function showReport() {
  document.getElementById('appBox').style.display = 'none';
  document.getElementById('listBox').style.display = 'none';
  document.getElementById('reportBox').style.display = 'block';

  let reportList = document.getElementById('reportList');
  reportList.innerHTML = '';

  let userExpenses = expenses.filter(e => e.user === currentUser.email);
  if (userExpenses.length === 0) {
    reportList.innerHTML = "<li>No expenses to report.</li>";
    return;
  }

  let total = userExpenses.reduce((sum, e) => sum + e.amount, 0);
  let liTotal = document.createElement('li');
  liTotal.textContent = `Total Expenses: $${total.toFixed(2)}`;
  reportList.appendChild(liTotal);

  let categories = {};
  userExpenses.forEach(e => categories[e.category] = (categories[e.category] || 0) + e.amount);
  for (let cat in categories) {
    let liCat = document.createElement('li');
    liCat.textContent = `${cat}: $${categories[cat].toFixed(2)}`;
    reportList.appendChild(liCat);
  }
}

// Auto-login if currentUser exists
window.onload = function() {
  if (currentUser) {
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('appBox').style.display = 'block';
    document.getElementById('listBox').style.display = 'block';
    renderExpenses();
  }
}
