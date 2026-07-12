const form = document.getElementById('form')

form.addEventListener('submit', addUser)

async function addUser(event) {
    event.preventDefault()
    try {
        let details = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirm').value

        }
        if (details.password !== details.confirmPassword) {
            alert("password do not match")
            return;
        }
        if (details.name && details.email && details.phone && details.password) {
            await postUser(details)
        }
        form.reset()
    }
    catch (err) {
        console.log(err.message)
    }

}

async function postUser(details) {
    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(details)
        })
        const data = await response.json()
        if (response.ok) {
            alert(`${data.name} signup done successfully! Please login.`);
            //redirect to signin page
            window.location.href = "/signin";
        }
        else {
            alert('Signup failed: ' + data.message);
        }
    }
    catch (err) {
        console.log(err.message)
    }
}
async function getUser(id) {
    try {
        const res = await fetch(`http://localhost:3000/user/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        console.log(data)
        alert(`Fetched user: ${data.name}`);

    }
    catch (err) {
        console.log(err.message)
    }
}

