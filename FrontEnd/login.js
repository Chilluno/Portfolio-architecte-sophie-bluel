const formLogin = document.querySelector("#login form");

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(formLogin);
  const data = Object.fromEntries(formData);

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token != null) {
        console.log("Success:", data);
        console.log("user is auth");
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      } else {
        const formError = document.createElement("p");
        formError.innerText = "";
        console.log("user is not found");
        formError.classList.add("error");
        formError.innerText = "Erreur dans l’identifiant ou le mot de passe.";
        formLogin.parentNode.insertBefore(formError,formLogin.nextSibling);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// loginBtn.addEventListener('click', (event) => {
// on met en place un évènement pour empêcher le comportement par défaut du bouton
//    event.preventDefault();
