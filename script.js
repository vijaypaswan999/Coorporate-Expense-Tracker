let expenses = [];
let users = []; // Simple in-memory storage
let currentUser = null;

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
}

// Register function
function register() {
  let email = document.getElementById('regEmail').value;
  let pass = document.getElementById('regPass').value;
  if(email && pass){
    users.push({email, pass});
    alert("Registration successful! Please login.");
    showLogin();
  } else {
    alert("Please fill all fields.");
  }
}

// Login function
function login() {
  let email = document.getElementById('loginEmail').value;
  let pass = document.getElementById('loginPass').value;
  let user = users.find(u => u.email === email && u.pass === pass);
  if(user){
    currentUser = user;
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('appBox').style.display = 'block';
    document.getElementById('listBox').style.display = 'block';
    renderExpenses();
  } else {
    alert("Invalid credentials!");
  }
}

// Add Expense
function addExpense() {
  let name = document.getElementById('name').value;
  let category = document.getElementById('category').value;
  let amount = document.getElementById('amount').value;
  let date = document.getElementById('date').value;
  let desc = document.getElementById('desc').value;

  if(name && category && amount && date){
    expenses.push({name, category, amount: parseFloat(amount), date, desc});
    renderExpenses();
    document.getElementById('name').value = '';
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('date').value = '';
    document.getElementById('desc').value = '';
  } else {
    alert("Please fill all required fields!");
  }
}

// Render Expenses
function renderExpenses() {
  let list = document.getElementById('list');
  list.innerHTML = '';
  expenses.forEach((e, i) => {
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

  let total = 0;
  expenses.forEach(e => total += e.amount);
  let li = document.createElement('li');
  li.textContent = `Total Expenses: $${total.toFixed(2)}`;
  reportList.appendChild(li);

  // Optionally, show by category
  let categories = {};
  expenses.forEach(e => categories[e.category] = (categories[e.category] || 0) + e.amount);
  for(let cat in categories){
    let liCat = document.createElement('li');
    liCat.textContent = `${cat}: $${categories[cat].toFixed(2)}`;
    reportList.appendChild(liCat);
  }
}
