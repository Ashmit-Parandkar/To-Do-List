const loginButton = document.querySelector('#loginButton');

loginButton.addEventListener('click',()=>{

    const email = document.querySelector('#emailInput').value;
    const password = document.querySelector('#passwordInput').value;

    fetch('http://localhost:8000/api/v1/users/login',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then( (res) => {console.log(res.json())} )
    .then( (data) => {console.log(data)} )
    .catch( (err) => {console.log(err)} )
})