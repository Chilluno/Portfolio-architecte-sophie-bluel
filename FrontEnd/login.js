const formLogin = document.querySelector("#login form");

formLogin.addEventListener("submit", (event) => {

    event.preventDefault();

   const formData = new FormData(formLogin);
   const data = Object.fromEntries(formData);


   fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    console.log('Success:', result);
    const formError = document.createElement('p');
    formError.innerText = "";
    if(result.message){
        console.log("user is not found");
        formError.classList.add("error");
        formError.innerText = "Erreur dans l’identifiant ou le mot de passe.";
        formLogin.appendChild(formError);
    }
    else{
        console.log("user is auth");
        localStorage.setItem('token', result.token);
        window.location.href = "index.html";
    }
})
.catch(error => {
    console.error('Error:', error);
});



})


// loginBtn.addEventListener('click', (event) => {
    // on met en place un évènement pour empêcher le comportement par défaut du bouton
//    event.preventDefault();