const allWorks = await fetch("http://localhost:5678/api/works").then(
  (response) => response.json()
);

const allCategories = await fetch("http://localhost:5678/api/categories").then(
  (response) => response.json()
);


console.log(localStorage.getItem("token"));
console.log(allWorks);

const getWorks = (works) => {

 works.forEach((data) => {
  const dataURL = data.imageUrl.replace(/[0-9]/g, "");
  const markup = `<figure id="${data.categoryId}">
  <img id="${data.id}"src="assets/${dataURL.slice(18)}" alt="${data.title}">
  <figcaption>éditer</figcaption>
  <div class="deletebtn"><i class="fa-solid fa-trash-can"></i></div>
  </figure>`;
  
  document.querySelector(".modal-content").insertAdjacentHTML("beforeend", markup);

 

      
 }) 
}

if (localStorage.getItem("token")) {
  const headerLogin = document.querySelector("header ul").children[2];
  headerLogin.innerText = "logout";
  const editBanner = document.createElement("div");
  const header = document.querySelector("header");
  editBanner.innerHTML = `<i class="fa-solid fa-pen-to-square"></i><p>Mode édition</p><button class="bannerbtn">publier les changements</button>`;

  editBanner.classList.add("banner");
  header.before(editBanner);

  const editButton = `<div class="editbtn"><i class="fa-solid fa-pen-to-square fa-xl"></i><p>modifier</p></div>`;
  document
    .querySelector("#portfolio h2")
    .insertAdjacentHTML("afterend", editButton);
  document
    .querySelector("#introduction img")
    .insertAdjacentHTML("afterend", editButton);
  document.querySelector(".filters").classList.add("hidden");

  const editGallery = document.querySelector("#portfolio .editbtn");
  const galleryModal = document.getElementById("modal");
  const closeModalBtn = document.querySelector(".close");
  const modalContent = document.querySelector(".modal-content");
  const deleteButtons = document.getElementsByClassName("deletebtn");

  editGallery.addEventListener("click", () => {
    galleryModal.classList.remove("hidden");

      getWorks(allWorks);
    

    /*Array.from(deleteButtons).forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(button.getAttribute("id"));

        const token = localStorage.getItem("token");
        console.log(token);

        fetch("http://localhost:5678/api/works/" + button.getAttribute("id"), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      });
    });*/
  });

  closeModalBtn.addEventListener("click", () => {
    galleryModal.classList.add("hidden");
    modalContent.innerHTML = "";
  });

  window.onclick = (event) => {
    if (event.target == galleryModal) {
      galleryModal.classList.add("hidden");
      modalContent.innerHTML = "";
    }
  };

  headerLogin.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
  });
} else {
  const headerLogin = document.querySelector("header ul").children[2];
  headerLogin.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}
