const allWorks = await fetch("http://localhost:5678/api/works").then(
  (response) => response.json()
);
const allCategories = await fetch("http://localhost:5678/api/categories").then(
  (response) => response.json()
);

const displayWorks = (works) => {
  const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
  works.forEach((data) => {
    const dataURL = data.imageUrl.replace(/[0-9]/g, "");
    const markup = `<figure id="${data.categoryId}">
    <img src="assets/${dataURL.slice(18)}" alt="${data.title}">
    <figcaption>${data.title}</figcaption>
    </figure>`;
    document.querySelector(".gallery").insertAdjacentHTML("beforeend", markup);
  });
};

const filtersContainer = document.querySelector(".filters");
const filterAllBtn = document.createElement("button");
filterAllBtn.classList.add("filterbtn", "All");
filterAllBtn.innerText = "Tous";
filtersContainer.appendChild(filterAllBtn);
filterAllBtn.classList.add("active");


filterAllBtn.addEventListener("click", () => {
  document.querySelectorAll(".filters button").forEach((button) => {
    button.classList.remove("active");
  });
  filterAllBtn.classList.add("active");

  displayWorks(allWorks);
});

const createFilterbuttons = () => {

  allCategories.forEach((category) => {
    const filterButton = document.createElement("button");
    filterButton.className = "filterbtn";
    filterButton.innerHTML = category.name;
    filterButton.setAttribute("id", category.id);
    filtersContainer.appendChild(filterButton);
    filterButton.addEventListener("click", () => {
      document.querySelectorAll(".filters button").forEach((button) => {
        button.classList.remove("active");
      });
      filterButton.classList.add("active");
      displayWorks(allWorks.filter((work) => work.category.id === category.id));
    });
  });
};

displayWorks(allWorks);
createFilterbuttons();

console.log(localStorage.getItem('token'));

if(localStorage.getItem('token')){
  const headerLogin = document.querySelector('header ul').children[2];
  headerLogin.innerText = "logout";
  const editBanner = document.createElement('div');
  const header = document.querySelector("header");
  editBanner.innerHTML = `<i class="fa-solid fa-pen-to-square"></i><p>Mode édition</p><button class="bannerbtn">publier les changements</button>`;


  editBanner.classList.add("banner");
  header.before(editBanner);
  

  const editButton = `<div class="editbtn"><i class="fa-solid fa-pen-to-square fa-xl"></i><p>modifier</p></div>`;
  document.querySelector("#portfolio h2").insertAdjacentHTML("afterend",editButton);
  document.querySelector("#introduction img").insertAdjacentHTML("afterend",editButton);
  document.querySelector(".filters").classList.add("hidden");

  headerLogin.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
  })
}
else{
  const headerLogin = document.querySelector('header ul').children[2];
  headerLogin.addEventListener("click", () => {
  window.location.href = "login.html";
  })  
}