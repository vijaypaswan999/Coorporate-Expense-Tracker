const API = "http://localhost:3000";

// View Switch
function showRegister(){
  document.getElementById("loginBox").style.display="none";
  document.getElementById("registerBox").style.display="block";
}
function showLogin(){
  document.getElementById("registerBox").style.display="none";
  document.getElementById("loginBox").style.display="block";
}
function showReport(){
  document.getElementById("appBox").style.display="none";
  document.getElementById("listBox").style.display="none";
  document.getElementById("reportBox").style.display="block";
  loadReport();
}
function backToApp(){
  document.getElementById("reportBox").style.display="none";
  document.getElementById("appBox").style.display="block";
  document.getElementById("listBox").style.display="block";
}

// Register
async function register(){
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPass").value.trim();

  if(!email || !password){
    alert("Fill all fields!");
    return;
  }

  try{
    const res = await fetch(API+"/register",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password})
    });

    if(res.ok){
      alert("Registration Successful!");
      showLogin();
    } else {
      alert("Registration Failed!");
    }
  } catch(e){
    alert("Server not running!");
  }
}

// Login
async function login(){
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPass").value.trim();

  const res = await fetch(API+"/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,password})
  });
  const result = await res.json();

  if(result.success){
    document.getElementById("loginBox").style.display="none";
    document.getElementById("appBox").style.display="block";
    document.getElementById("listBox").style.display="block";
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
      employee_name: document.getElementById("name").value,
      category: document.getElementById("category").value,
      amount: document.getElementById("amount").value,
      expense_date: document.getElementById("date").value,
      description: document.getElementById("desc").value
    })
  });
  loadExpenses();
}

// Load Expenses
async function loadExpenses(){
  const res = await fetch(API+"/expenses");
  const data = await res.json();
  const list = document.getElementById("list");
  list.innerHTML="";

  data.forEach(e=>{
    list.innerHTML += `<li>${e.employee_name} - ₹${e.amount} (${e.category})</li>`;
  });
}

// Report
async function loadReport(){
  const res = await fetch(API+"/expenses");
  const data = await res.json();
  const reportList = document.getElementById("reportList");
  reportList.innerHTML="";

  data.forEach(e=>{
    reportList.innerHTML += `<li>${e.employee_name} - ₹${e.amount} (${e.category})</li>`;
  });
}

