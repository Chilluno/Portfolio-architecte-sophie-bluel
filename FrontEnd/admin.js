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
     let imageId = 0;

      imageArray.forEach(image => {
      
      imageId++;  

      const imageDiv = document.createElement("div");
      imageDiv.setAttribute("id", imageId.toString());
      imageDiv.classList.add("modal-image");
      imageDiv.innerHTML = image.outerHTML;

      const deleteButton = document.createElement("div");
      deleteButton.classList.add("deletebtn");
      deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

      
      imageDiv.insertAdjacentText("beforeend","éditer");
      deleteButton.addEventListener("click", (imageId) => {
        //const activeImage = document.querySelectorAll(".modal-image");
        //console.log(activeImage[imageId]);
      });
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

