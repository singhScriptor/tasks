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
        if(result.ok){
            alert('Login done!')
            window.location.href=""
        }
        else{
            let error = await result.json()
            alert('login failed',error.message)
        }
    }
    catch(err){
        console.error(err.message)
    }
}