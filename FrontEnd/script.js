
const getWorks = async () => {await fetch("http://localhost:5678/api/works")
.then(result => {
  return result.json();
}).catch(error => console.log(error));}
const works = await getWorks()

/* 
fetch("http://localhost:5678/api/works")
.then(result => {
  return result.json();
})
.then(data => {
  data.forEach(data => {  
  const dataURL = data.imageUrl.replace(/[0-9]/g, '');  
  const markup = `<figure>
  <img src="assets/${dataURL.slice(18)}" alt="${data.title}">
  <figcaption>${data.title}</figcaption>
  </figure>`;
  console.log(markup);
  gallery.insertAdjacentHTML('beforeend',markup);
  });

fetch("http://localhost:5678/api/categories")
.then(result => {
  return result.json();
})
.then(category => {
category.forEach()
})
*/

