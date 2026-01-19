const API = "http://localhost:3000";

// Switch Screens
function showRegister(){
  loginBox.style.display="none";
  registerBox.style.display="block";
}
function showLogin(){
  registerBox.style.display="none";
  loginBox.style.display="block";
}

// Register
async function register(){
  await fetch(API+"/register",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email: regEmail.value,
      password: regPass.value
    })
  });
  alert("Registered Successfully!");
  showLogin();
}

// Login
async function login(){
  const res = await fetch(API+"/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email: loginEmail.value,
      password: loginPass.value
    })
  });
  const result = await res.json();

  if(result.success){
    loginBox.style.display="none";
    appBox.style.display="block";
    listBox.style.display="block";
    loadExpenses();
  } else {
    alert("Invalid Login!");
  }
}

// Add Expense
async function addExpense(){
  await fetch(API+"/add-expense",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      employee_name:name.value,
      category:category.value,
      amount:amount.value,
      expense_date:date.value,
      description:desc.value
    })
  });
  loadExpenses();
}

// Load Expenses
async function loadExpenses(){
  const res = await fetch(API+"/expenses");
  const data = await res.json();
  list.innerHTML="";
  data.forEach(e=>{
    list.innerHTML += `<li>${e.employee_name} - ₹${e.amount} (${e.category})</li>`;
  });
}

