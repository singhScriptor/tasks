document.addEventListener("DOMContentLoaded", reload);
const form = document.getElementById('form');

form.addEventListener('submit', addExpense);

async function addExpense(e) {
    e.preventDefault();
    try {
        const expense = {
            price: document.getElementById("price").value,
            description: document.getElementById("description").value,
            category: document.getElementById("category").value
        };

        const token = localStorage.getItem("token");

        let result = await fetch('http://localhost:3000/api/expense', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(expense)
        });

        const data = await result.json();
        if (result.ok) {
            // data should return the newly created expense object containing its generated ID
            addRow(data);
            form.reset();
        } else {
            alert(data.message || "Failed to add expense");
        }
    } catch (err) {
        console.error("Error adding expense:", err.message);
    }
}

// removed "async" here as addRow only performs local synchronous DOM manipulation
function addRow(expense) {
    try {
        const tableBody = document.querySelector("#expenseTable tbody");
        const row = document.createElement("tr");
        row.id = `row-${expense.id}`;

        row.innerHTML = `
            <td>${expense.price}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    } catch (err) {
        console.error("Error adding row to table:", err.message);
    }
}

async function deleteExpense(id) {
    try {
        const token = localStorage.getItem("token");

        let result = await fetch(`http://localhost:3000/api/expense/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (result.ok) {
            // Instantly remove the row from the UI. No need to reload() from DB!
            const rowToRemove = document.getElementById(`row-${id}`);
            if (rowToRemove) {
                rowToRemove.remove();
            }
        } else {
            const data = await result.json();
            alert(data.message || "Failed to delete expense");
        }
    } catch (err) {
        console.error("Error deleting expense:", err.message);
    }
}

async function reload() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/signin";
            return;
        }

        let result = await fetch("http://localhost:3000/api/expense", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (result.ok) {
            let expenses = await result.json();

            const tableBody = document.querySelector("#expenseTable tbody");
            tableBody.innerHTML = ""; // Clear old rows cleanly

            expenses.forEach(exp => addRow(exp));
        } else {
            // If authorization failed or token expired, redirect to signin
            if (result.status === 401 || result.status === 403) {
                localStorage.removeItem("token");
                window.location.href = "/signin";
                return;
            }
            const data = await result.json();
            alert(data.message || "Failed to fetch expenses");
        }
    } catch (err) {
        console.error("Error reloading expenses:", err.message);
    }
}

