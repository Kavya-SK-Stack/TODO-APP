let entries = JSON.parse(localStorage.getItem("entries")) || [];

document.addEventListener("DOMContentLoaded", function () {
    renderEntries();
    calculateTotals();
});

function addEntry() {
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!description || isNaN(amount)) {
    alert("Please provide a valid description and amount.");
    return;
  }

  const type = amount >= 0 ? "income" : "expense";

  const newEntry = {
    id: Date.now(),
    description,
    amount,
    type,
  };

  entries.push(newEntry);
  localStorage.setItem("entries", JSON.stringify(entries));
  resetForm();
  renderEntries();
  calculateTotals();
}

function renderEntries() {
  const entriesList = document.getElementById("entries");
  const filter = document.querySelector('input[name="filter"]:checked').value;

  entriesList.innerHTML = "";

  const filteredEntries = entries.filter(
    (entry) => filter === "all" || entry.type === filter
  );

  filteredEntries.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${entry.description}: ${entry.amount}</span>
      <button onclick="deleteEntry(${entry.id})">Delete</button>
      <button onclick="editEntry(${entry.id})">Edit</button>
    `;
    entriesList.appendChild(li);
  });
}

function deleteEntry(id) {
  entries = entries.filter((entry) => entry.id !== id);
  localStorage.setItem("entries", JSON.stringify(entries));
  renderEntries();
  calculateTotals();
}

function editEntry(id) {
  const entry = entries.find((entry) => entry.id === id);
  if (entry) {
    document.getElementById("description").value = entry.description;
    document.getElementById("amount").value = entry.amount;
    deleteEntry(id);
  }
}

function resetForm() {
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
}

function filterEntries() {
  renderEntries();
}

function calculateTotals() {
  let totalIncome = 0;
  let totalExpense = 0;

  entries.forEach((entry) => {
    if (entry.type === "income") {
      totalIncome += entry.amount;
    } else {
      totalExpense += entry.amount;
    }
  });

  const netBalance = totalIncome + totalExpense;

  document.getElementById("totalIncome").textContent = totalIncome.toFixed(2);
  document.getElementById("totalExpense").textContent = totalExpense.toFixed(2);
  document.getElementById("netBalance").textContent = netBalance.toFixed(2);
}
