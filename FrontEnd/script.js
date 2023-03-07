let gallery = document.querySelector(".gallery");
gallery.replaceChildren('');

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
  
})
.catch(error => console.log(error));


