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

getWorks();

const getCategories = async() => {
  let filters;
  let worksResults = await getWorks(); 

  const response = await fetch("http://localhost:5678/api/categories");

  filters = await response.json();

  console.log(filters);
  console.log(worksResults);
}

getCategories();