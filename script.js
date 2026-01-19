const API = "http://localhost:3000";

async function addExpense() {
  const data = {
    employee_name: name.value,
    category: category.value,
    amount: amount.value,
    expense_date: date.value,
    description: desc.value
  };

  await fetch(API + "/add-expense", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  loadExpenses();
}

async function loadExpenses() {
  const res = await fetch(API + "/expenses");
  const expenses = await res.json();

  list.innerHTML = "";
  expenses.forEach(e => {
    list.innerHTML += `<li>${e.employee_name} – ₹${e.amount} (${e.category})</li>`;
  });
}

loadExpenses();
