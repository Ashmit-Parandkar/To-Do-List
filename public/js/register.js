const registerButton = document.querySelector('#registerButton');

registerButton.addEventListener('click',()=>{

    const name = document.querySelector('#nameInput').value;
    const email = document.querySelector('#emailInput').value;
    const password = document.querySelector('#passwordInput').value;

    fetch('http://localhost:8000/api/v1/users/register',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    })
    .then( (res) => {console.log(res.json())} )
    .then( (data) => {console.log(data)} )
    .catch( (err) => {console.log(err)} )
})