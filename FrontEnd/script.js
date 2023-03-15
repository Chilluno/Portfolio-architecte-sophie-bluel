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