const form = document.getElementById('form')

form.addEventListener('submit',loginUser)

async function loginUser(e) {
    e.preventDefault()
    try{
        const details ={
            email:document.getElementById('email').value,
            password:document.getElementById('password').value
        }
        if(details){
            await postUser(details)
        }
        form.reset()
    }
    catch(err){
        console.error(err.message)
    }
}

async function postUser(details) {
    try{
        let result = await fetch(`http://localhost:3000/signin`,{
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(details)
        })

        const data = await result.json();

        if(result.ok){

            //  store JWT + userId
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            alert('Login done!')
            window.location.href="/expense"
        }
        else{
            alert('login failed',error.message)
        }
    }
    catch(err){
        console.error(err.message)
    }
}