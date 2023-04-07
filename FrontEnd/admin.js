const allWorks = await fetch("http://localhost:5678/api/works").then(
  (response) => response.json()
);

const allCategories = await fetch("http://localhost:5678/api/categories").then(
  (response) => response.json()
);


console.log(localStorage.getItem("token"));
console.log(allCategories);

const getWorks = (works) => {


 works.forEach((data) => {
  const dataURL = data.imageUrl.replace(/[0-9]/g, "");
  const markup = `<figure id="${data.categoryId}" class="modal-image">
  <img id="${data.id}" src="assets/${dataURL.slice(18)}" alt="${data.title}">
  <figcaption>éditer</figcaption>
  <div id="${data.id}" class="deletebtn"><i class="fa-solid fa-trash-can"></i></div>
  </figure>`;
  
  document.querySelector(".modal-content").insertAdjacentHTML("beforeend", markup);
      
  document.querySelectorAll(".modal-image").forEach((image) =>{
    image.addEventListener("mouseover", () => {
      const moveButton = document.createElement("div");
      moveButton.classList.add("movebtn");
      moveButton.innerHTML = `<i class="fa-solid fa-up-down-left-right"></i>`;
      image.appendChild(moveButton)
    });
  });

  document.querySelectorAll(".modal-image").forEach((image) =>{
    image.addEventListener("mouseout", () => {
      document.querySelector(".movebtn").remove();
    });
  });

 }) 
}

const deleteWorks = () => {

  document.querySelectorAll(".deletebtn").forEach((deletebtn) => {
    deletebtn.addEventListener("click", (e) => {
      e.preventDefault();
      const Id = deletebtn.getAttribute("id");
      console.log(deletebtn.getAttribute("id"));

      const token = localStorage.getItem("token");
      console.log(token);

      
      fetch(`http://localhost:5678/api/works/${Id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  })
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
  const closeModalBtn = document.querySelectorAll(".close");
  const modalContent = document.querySelector(".modal-content");
  const modalBtn = document.querySelector(".modalbtn");
  const backBtn = document.querySelector(".backbtn");

  editGallery.addEventListener("click", () => {
    galleryModal.classList.remove("hidden");

      getWorks(allWorks);
      deleteWorks();

    modalBtn.addEventListener("click", () =>{
      
      document.querySelector(".modal-works").classList.add("hidden");
      document.querySelector(".modal-create").classList.remove("hidden");

    });

    backBtn.addEventListener("click", () => {

      document.querySelector(".modal-create").classList.add("hidden");
      document.querySelector(".modal-works").classList.remove("hidden");

    })

  });

  closeModalBtn.forEach(closebtn => {
      closebtn.addEventListener("click", () => {
      galleryModal.classList.add("hidden");
      modalContent.innerHTML = "";
  })
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

const form = document.querySelector(".create-work-form");

const createWork = (event) => {
event.preventDefault();
const token = localStorage.getItem("token");

const formData = new formData();

formData.append("title",document.getElementById("title").value);
formData.append("category",+document.getElementById("category").value);
formData.append("image",document.getElementById("image").files[0]);


fetch("http://localhost:5678/api/works", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`
  },
  body: formData
})
.then(data => console.log(data))
.catch(error => console.error(error))
}

form.addEventListener("submit", createWork);

const optionList = document.querySelector("select");

allCategories.forEach(category => {
  const categoryOption = document.createElement("option");
  categoryOption.setAttribute("value", `${category.id}`);
  categoryOption.innerHTML= category.name;
  optionList.appendChild(categoryOption);
  console.log(categoryOption);
})