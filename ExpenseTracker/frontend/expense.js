document.addEventListener("DOMContentLoaded", reload)
const form = document.getElementById('form')

form.addEventListener('submit', addExpense)

async function addExpense(e) {
    e.preventDefault()
    try {
        const expense = {
            price: document.getElementById("price").value,
            description: document.getElementById("description").value,
            category: document.getElementById("category").value
        };

        let result = await fetch('http://localhost:3000/expense', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(expense)
        })
        if (result.ok) {
            let data = await result.json()
            await addRow(data)
        }
        form.reset()
    }
    catch (err) {
        console.log(err.message)
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
        let result = await fetch(`http://localhost:3000/expense/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (result.ok) {
            document.getElementById(`row-${id}`).remove();  // remove row from table
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function reload() {
    try {
        let result = await fetch("http://localhost:3000/expense", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (result.ok) {
            let expenses = await result.json();
            expenses.forEach(exp => addRow(exp));
        }
    } catch (err) {
        console.log(err.message);
    }
}
