console.log(localStorage.getItem("token"));

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
  const galleryImages = document
    .getElementById("portfolio")
    .getElementsByTagName("img");
  const deleteButtons = document.getElementsByClassName("deletebtn");

  editGallery.addEventListener("click", () => {
    galleryModal.classList.remove("hidden");

    const imageArray = [...galleryImages];
    let imageId = 0;

    imageArray.forEach((image) => {
      imageId++;

      const imageDiv = document.createElement("div");
      imageDiv.classList.add("modal-image");
      imageDiv.innerHTML = image.outerHTML;

      const deleteButton = document.createElement("div");
      deleteButton.setAttribute("id", imageId.toString());
      deleteButton.classList.add("deletebtn");
      deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

      imageDiv.insertAdjacentText("beforeend", "éditer");

      imageDiv.appendChild(deleteButton);

      imageDiv.addEventListener("mouseover", () => {
        const moveButton = document.createElement("div");
        moveButton.classList.add("movebtn");
        moveButton.innerHTML = `<i class="fa-solid fa-up-down-left-right"></i>`;
        imageDiv.appendChild(moveButton);
      });

      imageDiv.addEventListener("mouseout", () => {
        document.querySelector(".movebtn").remove();
      });

      modalContent.appendChild(imageDiv);
    });

    Array.from(deleteButtons).forEach((button) => {
      button.addEventListener("click", () => {
        console.log(button.getAttribute("id"));

        const token = localStorage.getItem("token");
        console.log(token);

        fetch("http://localhost:5678/api/works/" + button.getAttribute("id"), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
        });
      });
    });
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
