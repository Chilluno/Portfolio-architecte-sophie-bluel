const worksResponse = await fetch("http://localhost:5678/api/works");
const works = await worksResponse.json();