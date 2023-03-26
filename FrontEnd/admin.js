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
 
   const editGallery = document.querySelector("#portfolio .editbtn");
   const galleryModal = document.getElementById("modal");
   const closeModalBtn = document.querySelector(".close");
   const modalContent = document.querySelector(".modal-content");
   const galleryImages = document.getElementById("portfolio").getElementsByTagName("img");
  
   
   editGallery.addEventListener("click", () =>{

     galleryModal.classList.remove("hidden");

     const imageArray = [...galleryImages];
        
     imageArray.forEach(image => {
      const imageDiv = document.createElement("div");
      const deleteButton = document.createElement("div");
      deleteButton.classList.add("deletebtn");
      deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

      imageDiv.classList.add("modal-image");
      imageDiv.innerHTML = image.outerHTML;
      imageDiv.insertAdjacentText("beforeend","éditer");
      deleteButton.addEventListener("click", () => {
        console.log("boop");
      });
      imageDiv.appendChild(deleteButton);
      modalContent.insertAdjacentHTML("beforeend",imageDiv.outerHTML); 
      
      

     })
   })

   
  
   closeModalBtn.addEventListener("click", () => {
     galleryModal.classList.add("hidden");
     modalContent.innerHTML = "";

   })
 
   /*
   window.onclick = (event) => {
     if(event.target == galleryModal){
       galleryModal.classList.add("hidden");
       modalContent.innerHTML = "";
     }
   }*/
 
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

