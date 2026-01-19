const API = "http://localhost:3000";

// View Switch
function showRegister(){
  loginBox.style.display="none";
  registerBox.style.display="block";
}
function showLogin(){
  registerBox.style.display="none";
  loginBox.style.display="block";
}
function showReport(){
  appBox.style.display="none";
  listBox.style.display="none";
  reportBox.style.display="block";
  loadReport();
}
function backToApp(){
  reportBox.style.display="none";
  appBox.style.display="block";
  listBox.style.display="block";
}

// Register
async function register(){
  const email = regEmail.value.trim();
  const password = regPass.value.trim();
  if(!email || !password){ alert("Fill all fields"); return; }

  await fetch(API+"/register",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,password})
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

// Expense
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

// Report
async function loadReport(){
  const res = await fetch(API+"/expenses");
  const data = await res.json();
  reportList.innerHTML="";
  data.forEach(e=>{
    reportList.innerHTML += `<li>${e.employee_name} - ₹${e.amount} (${e.category})</li>`;
  });
}

