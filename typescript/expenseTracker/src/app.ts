const expType = document.getElementById("expense-type")! as HTMLSelectElement;
const expDesc = document.getElementById("desc")! as HTMLInputElement;
const expAmount = document.getElementById("amount")! as HTMLInputElement;
const expCategory = document.getElementById(
  "expense-category"
)! as HTMLSelectElement;
const expDate = document.getElementById("date")! as HTMLInputElement;
const addExpBtn = document.querySelector(
  ".add-expense-btn"
)! as HTMLButtonElement;
const expenseList = document.querySelector(".expense-list")! as HTMLDivElement;
const totalExpenseAmount = document.querySelector(
  ".total-expense-amount"
)! as HTMLDivElement;
const startDate = document.getElementById("startDate")! as HTMLInputElement;
const endDate = document.getElementById("endDate")! as HTMLInputElement;
const filterCategory = document.querySelector(
  ".filter #expense-category"
)! as HTMLSelectElement;

type ExpenseType = "credit" | "debit";
type ExpenseCategory = "Food" | "Travel" | "Light Bill" | "Recharge";

class Expense {
  id: number;
  type: ExpenseType;
  description: string;
  category: ExpenseCategory;
  amount: number;
  date: string;

  constructor(
    type: ExpenseType,
    description: string,
    category: ExpenseCategory,
    amount: number,
    date: string
  ) {
    this.id = Date.now();
    this.type = type;
    this.description = description;
    this.category = category;
    this.amount = amount;
    this.date = date;
  }
}

function getExpenses(): Expense[] {
  const storedExpenses = localStorage.getItem("expenses");
  return storedExpenses ? JSON.parse(storedExpenses) : [];
}

function saveExpenses(expenses: Expense[]) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateTotalExpense() {
  const expenses = getExpenses();
  const totalDebit = expenses
    .filter((exp) => exp.type === "debit")
    .reduce((sum, exp) => sum + exp.amount, 0);
  const totalCredit = expenses
    .filter((exp) => exp.type === "credit")
    .reduce((sum, exp) => sum + exp.amount, 0);
  const netBalance = totalCredit - totalDebit;

  totalExpenseAmount.textContent = `$${netBalance.toFixed(2)}`;
}

function deleteExpense(id: number) {
  let expenses = getExpenses();
  expenses = expenses.filter((exp) => exp.id !== id);
  saveExpenses(expenses);
  displayExpenses();
}

function displayExpenses() {
  expenseList.innerHTML = "";
  let expenses = getExpenses().sort((a, b) => b.id - a.id);

  if (startDate.value) {
    expenses = expenses.filter(
      (exp) => new Date(exp.date) >= new Date(startDate.value)
    );
  }
  if (endDate.value) {
    expenses = expenses.filter(
      (exp) => new Date(exp.date) <= new Date(endDate.value)
    );
  }
  if (filterCategory.value && filterCategory.value !== "Select Category") {
    expenses = expenses.filter((exp) => exp.category === filterCategory.value);
  }

  if (expenses.length === 0) {
    expenseList.innerHTML = `<p>No matching expenses found.</p>`;
    totalExpenseAmount.textContent = "$0.00";
    return;
  }

  expenses.forEach((exp) => {
    const expRow = document.createElement("div");
    expRow.classList.add("expense-item", exp.type);
    expRow.innerHTML = `
      <div class="expense-content">
        <p><strong>Type:</strong> ${exp.type.toUpperCase()}</p>
        <p><strong>Description:</strong> ${exp.description}</p>
        <p><strong>Category:</strong> ${exp.category}</p>
        <p><strong>Amount:</strong> $${exp.amount.toFixed(2)}</p>
        <p><strong>Date:</strong> ${exp.date}</p>
        <button class="delete-expense" data-id="${exp.id}">Delete</button>
      </div>
    `;
    expenseList.appendChild(expRow);
  });

  updateTotalExpense();
}

// Event Delegation for Delete Buttons
expenseList.addEventListener("click", function (event) {
  const target = event.target as HTMLElement;
  if (target.classList.contains("delete-expense")) {
    const id = Number(target.getAttribute("data-id"));
    deleteExpense(id);
  }
});

addExpBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (
    !expType.value ||
    !expDesc.value ||
    !expAmount.value ||
    !expCategory.value ||
    !expDate.value
  ) {
    alert("Please fill out all fields!");
    return;
  }

  const newExpense = new Expense(
    expType.value as ExpenseType,
    expDesc.value,
    expCategory.value as ExpenseCategory,
    parseFloat(expAmount.value),
    expDate.value
  );

  const expenses = getExpenses();
  expenses.push(newExpense);
  saveExpenses(expenses);
  displayExpenses();

  // Clear input fields after adding
  expDesc.value = "";
  expAmount.value = "";
  expDate.value = "";
});

startDate.addEventListener("change", displayExpenses);
endDate.addEventListener("change", displayExpenses);
filterCategory.addEventListener("change", displayExpenses);

document.addEventListener("DOMContentLoaded", () => {
  displayExpenses();
  updateTotalExpense();
});
