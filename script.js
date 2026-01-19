let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Login
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  if(!email.includes("@")){
    errorMessage.textContent = "Enter valid email!";
    return;
  }
  if(password.length < 6){
    errorMessage.textContent = "Password must be 6+ characters!";
    return;
  }

  errorMessage.textContent = "";
  loginSection.classList.add("hidden");
  dashboardSection.classList.remove("hidden");
  renderExpenses();
});

// Logout
logoutBtn.addEventListener("click", ()=>{
  dashboardSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
  loginForm.reset();
});

// Add Expense
expenseForm.addEventListener("submit", function(e){
  e.preventDefault();
  const exp = {
    id: Date.now(),
    date: date.value,
    category: category.value,
    amount: parseFloat(amount.value),
    description: description.value
  };
  expenses.push(exp);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
  expenseForm.reset();
});

// Render Table
function renderExpenses(){
  expensesBody.innerHTML="";
  expenses.forEach(e=>{
    expensesBody.innerHTML += `
      <tr>
        <td>${e.date}</td>
        <td>${e.category}</td>
        <td>$${e.amount.toFixed(2)}</td>
        <td>${e.description}</td>
        <td><button class="delete-btn" onclick="deleteExpense(${e.id})">Delete</button></td>
      </tr>
    `;
  });
}

// Delete
function deleteExpense(id){
  expenses = expenses.filter(e=>e.id!==id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

// Element Shortcuts
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");
const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const logoutBtn = document.getElementById("logoutBtn");
const expenseForm = document.getElementById("expenseForm");
const expensesBody = document.getElementById("expensesBody");

