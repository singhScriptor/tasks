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

        const token = localStorage.getItem("token"); // ✅ get JWT

        let result = await fetch('http://localhost:3000/expense', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token   // ✅ attach JWT
            },
            body: JSON.stringify(expense)
        });

        const data = await result.json();
        if (result.ok) {
            await addRow(data);
            form.reset();
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function addRow(expense) {
    try {
        const tableBody = document.querySelector("#expenseTable tbody");
        const row = document.createElement("tr");
        row.id = `row-${expense.id}`;

        row.innerHTML = `
            <td>${expense.price}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>
                <button onclick="deleteExpense(${expense.id}, this)">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    } catch (err) {
        console.log(err.message);
    }
}

async function deleteExpense(id, btn) {
    try {
        const token = localStorage.getItem("token");

        let result = await fetch(`http://localhost:3000/expense/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token   // ✅ attach JWT
            }
        });

        if (result.ok) {
            document.getElementById(`row-${id}`).remove();
        } else {
            const data = await result.json();
            alert(data.message);
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function reload() {
    try {
        const token = localStorage.getItem("token");

        let result = await fetch("http://localhost:3000/expense", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token   // ✅ attach JWT
            }
        });

        if (result.ok) {
            let expenses = await result.json();
            expenses.forEach(exp => addRow(exp));
        } else {
            const data = await result.json();
            alert(data.message);
        }
    } catch (err) {
        console.log(err.message);
    }
}
