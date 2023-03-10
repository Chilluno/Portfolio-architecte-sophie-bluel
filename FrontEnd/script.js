const getWorks = async() => {
  let works;

  const response = await fetch("http://localhost:5678/api/works");

  works = await response.json();

  works.forEach((data) => {  
    const dataURL = data.imageUrl.replace(/[0-9]/g, '');  
    const markup = `<figure>
    <img src="assets/${dataURL.slice(18)}" alt="${data.title}">
    <figcaption>${data.title}</figcaption>
    </figure>`;
    console.log(markup);
    document.querySelector(".gallery").insertAdjacentHTML('beforeend',markup);
    })

    return works;
} 



const createFilterbuttons = async() => {
  let filters;
  let worksResults = await getWorks();
  const projectFilter = document.querySelector(".filters");

  const response = await fetch("http://localhost:5678/api/categories");

  filters = await response.json();

  filters.forEach((filter) => {
    const filterButton = document.createElement("button");
    filterButton.innerHTML = filter.name;
    projectFilter.appendChild(filterButton);
  });

  applyCategory(filters,worksResults);

  console.log(filters);
  console.log(worksResults);

  
}

const applyCategory = (filter, projects) => {

buttonHighlight();



}

const buttonHighlight = () => {
  buttons = Array.from(document.querySelectorAll(".filters button"));

  buttons.forEach(button => {
    button.addEventListener("click", function() {
    buttons.forEach((button) => {
      button.classList.remove("active");
    })
      button.classList.add("active");
    })
});
}


createFilterbuttons();