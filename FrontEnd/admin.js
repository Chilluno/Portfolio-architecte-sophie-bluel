const allWorks = await fetch("http://localhost:5678/api/works")
    .then((response) => response.json()
);

const allCategories = await fetch("http://localhost:5678/api/categories").then(
  (response) => response.json()
);



console.log(localStorage.getItem("token"));
console.log(allCategories);

const getWorks = (works) => {
  works.forEach((data) => {
    const markup = `<figure id="${data.categoryId}" class="modal-image">
  <img id="${data.id}" src=${data.imageUrl} alt="${data.title}">
  <figcaption>éditer</figcaption>
  <div id="${
    data.id
  }" class="deletebtn"><i class="fa-solid fa-trash-can"></i></div>
  </figure>`;

    document
      .querySelector(".modal-content")
      .insertAdjacentHTML("beforeend", markup);

    document.querySelectorAll(".modal-image").forEach((image) => {
      image.addEventListener("mouseover", () => {
        const moveButton = document.createElement("div");
        moveButton.classList.add("movebtn");
        moveButton.innerHTML = `<i class="fa-solid fa-up-down-left-right"></i>`;
        image.appendChild(moveButton);
      });
    });

    document.querySelectorAll(".modal-image").forEach((image) => {
      image.addEventListener("mouseout", () => {
        document.querySelector(".movebtn").remove();
      });
    });
  });
};


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
  

  editGallery.addEventListener("click", async () => {

    galleryModal.classList.remove("hidden");

    updateWorks();    

    modalBtn.addEventListener("click", () => {
      document.querySelector(".modal-works").classList.add("hidden");
      document.querySelector(".modal-create").classList.remove("hidden");
    });

    backBtn.addEventListener("click", () => {
      document.querySelector(".modal-create").classList.add("hidden");
      document.querySelector(".modal-works").classList.remove("hidden");
    });
  });

  closeModalBtn.forEach((closebtn) => {
    closebtn.addEventListener("click", () => {
      galleryModal.classList.add("hidden");
      modalContent.innerHTML = "";
    });
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

  const formData = new FormData();

  formData.append("title", document.getElementById("title").value);
  formData.append("category", +document.getElementById("category").value);
  formData.append("image", document.getElementById("image").files[0]);

  console.log(document.getElementById("image").files[0]);


  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
    
    newWork();
}

const optionList = document.querySelector("select");

allCategories.forEach((category) => {
  const categoryOption = document.createElement("option");
  categoryOption.setAttribute("value", `${category.id}`);
  categoryOption.innerHTML = category.name;
  optionList.appendChild(categoryOption);
  console.log(categoryOption);
});

const submitButton = document.getElementById("creatework");
const fileInput = document.getElementById("image");
const titleInput = document.getElementById("title");

form.addEventListener("change", () => {
  if(fileInput.value == "" || titleInput.value == ""){

  if(!document.querySelector("error")){
    const formError = document.getElementById("error");
    formError.innerText = "";
    formError.classList.add("error");
    formError.innerText = "Un ou plusieurs champs sont manquant";
  }
    submitButton.disabled = true;
  }
  else{
    const formError = document.getElementById("error");
    formError.innerText = "";
    submitButton.removeEventListener("click", formError);
    form.addEventListener("submit", createWork);
    submitButton.disabled = false;
  }
  
});

const imgAddPhoto = document.getElementById("submit-img");

const displayImage = (e) => {
  imgAddPhoto.classList.remove("hidden");
  if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
          imgAddPhoto.setAttribute('src', reader.result);
      });        reader.readAsDataURL(e.target.files[0]);

      document.querySelector(".submit-img-wrapper label").classList.add("opaque");
      document.querySelector(".submit-img-wrapper i").classList.add("opaque");
      document.querySelector(".submit-img-wrapper span").classList.add("opaque");
  }
};

fileInput.addEventListener("change", displayImage);

const updateWorks = () => {
  fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => data.forEach((data) => {
    const markup = `<figure id="${data.categoryId}" class="modal-image">
  <img id="${data.id}" src=${data.imageUrl} alt="${data.title}">
  <figcaption>éditer</figcaption>
  <div id="${
    data.id
  }" class="deletebtn"><i class="fa-solid fa-trash-can"></i></div>
  </figure>`;

    document
      .querySelector(".modal-content")
      .insertAdjacentHTML("beforeend", markup);

    document.querySelectorAll(".modal-image").forEach((image) => {
      image.addEventListener("mouseover", () => {
        const moveButton = document.createElement("div");
        moveButton.classList.add("movebtn");
        moveButton.innerHTML = `<i class="fa-solid fa-up-down-left-right"></i>`;
        image.appendChild(moveButton);
      });
    });

    document.querySelectorAll(".modal-image").forEach((image) => {
      image.addEventListener("mouseout", () => {
        document.querySelector(".movebtn").remove();
      });
    });
  }))
  .then(res => document.querySelectorAll(".deletebtn").forEach((deletebtn) => {
    deletebtn.addEventListener("click", (e) => {
      console.log(res);
      e.preventDefault();
      const Id = deletebtn.getAttribute("id");

      const token = localStorage.getItem("token");
      deletebtn.parentElement.classList.add("hidden");
      
      const galleryWork = document.querySelectorAll(`[alt=${CSS.escape(deletebtn.parentElement.children[0].alt)}`);

        galleryWork.forEach((work) => {
          console.log(work.parentNode);
          work.parentNode.remove();
        });
      
      fetch(`http://localhost:5678/api/works/${Id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    });
  }))
}

const newWork = () => {
    const work = document.createElement("figure");
    const workImg = document.createElement("img");
    workImg.setAttribute("alt", document.getElementById("title").value);
    const workCaption = document.createElement("figcaption");
    work.setAttribute("id", document.getElementById("category").value);
    workCaption.innerText = document.getElementById("title").value;

    if (document.getElementById("image").files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
          workImg.setAttribute('src', reader.result);
      });        reader.readAsDataURL(document.getElementById("image").files[0]);

    }
    
    work.appendChild(workImg);
    work.appendChild(workCaption);

    document.querySelector(".gallery").appendChild(work);
}







