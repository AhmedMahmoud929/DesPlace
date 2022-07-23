// catch elements
let homeSection = document.getElementById("home");
let addSection = document.getElementById("add");
let favSection = document.getElementById("fav");
let mySection = document.querySelector(".my");
let homeIcon = document.querySelector("nav .right .home");
let addIcon = document.querySelector("nav .right .add");
let favIcon = document.querySelector("nav .right .fav");
let heartIcons = document.querySelectorAll(".fa-heart");
let nameInp = document.getElementById("nameInp");
let urlInp = document.getElementById("linkInp");
let addBtn = document.getElementById("addBtn");
let favWebsites = document.getElementById("favWebsites");

// get saved data in local storage
let favHearts = [];
let myWebsites = [];
let favArr = [];
if (localStorage.getItem("favHearts"))
     favHearts = JSON.parse(localStorage.getItem("favHearts"));
if (localStorage.getItem("myWebsites"))
     myWebsites = JSON.parse(localStorage.getItem("myWebsites"));
if (localStorage.getItem("favArr"))
     favArr = JSON.parse(localStorage.getItem("favArr"));

// add active classes from local storage
for (let index of favHearts)
     heartIcons[index].classList.add("active");

// add favourit websites from local storage
for (let ele of favArr)
     favWebsites.innerHTML+=`<li>${ele}</li>`;

// add myWebsites arr to html form local storage
if (myWebsites.length)
     mySection.style.display="block";

// get fav websites from local storage 
if (!favArr.length)
     document.querySelector("#fav h2").style.display="block";

for (let website of myWebsites){
     document.querySelector(".my ul").innerHTML+=`
     <li>
          <img src="./imgs/my.png" alt="dribbble" />
          <a href="${website.url}" target="_blank">${website.name}</a>
          <i class="fa-solid fa-xmark" ></i>
     </li>
     `
}
// get close icons after add websites
let closeIcons = document.querySelectorAll(".my ul .fa-xmark");
let favElementsIcon = document.querySelectorAll(".favElementsIcon");

// switch pages function
function switchTo(sec){
     // hide all
     homeSection.style.display="none";
     addSection.style.display="none";
     favSection.style.display="none";
     // show the selected section
     sec.style.display="block";
}
// switch between pages
homeIcon.addEventListener("click",()=>{ switchTo(homeSection);})
addIcon.addEventListener("click",()=> { switchTo(addSection); })
favIcon.addEventListener("click",()=> { switchTo(favSection); })

// add to favourit function
heartIcons.forEach((el)=>{
     el.addEventListener("click",()=>{
          let liInner = el.parentElement.innerHTML
          .replace
          (`<i class="fa-solid fa-heart"></i>`,
          ``);
          let iHeart = Array.from(heartIcons).indexOf(el);
          if (el.classList.contains("active")){
               // remove active class
               el.classList.remove("active");
               // find the deleted fav
               let indexOfDeleted = favHearts.indexOf(iHeart);
               // remove it from array
               favHearts.splice(indexOfDeleted,1);
               favArr.splice(indexOfDeleted,1);
               // update the local storage
               localStorage.setItem("favHearts",JSON.stringify(favHearts));
               localStorage.setItem("favArr",JSON.stringify(favArr));
               // reload
               location.reload();
          }
          else {
               // add active class
               el.classList.add("active");
               // store heart index to favHearts array
               favHearts.push(iHeart);
               // add fav hearts array in local storage
               localStorage.setItem("favHearts",JSON.stringify(favHearts));
               // add to favArr
               favArr.push(liInner);
               // add favArr to local storage
               localStorage.setItem("favArr",JSON.stringify(favArr));
               // reloald
               location.reload();


          }
     })
})

// add new websites function
addBtn.addEventListener("click",(e)=>{
     // disable reload
     e.preventDefault();
     if (nameInp.value!="" && urlInp.value!="" ){
          // create new website as an object
          let newWebsite = {
               name : nameInp.value,
               url : urlInp.value
          }
          // add the new website to array
          myWebsites.push(newWebsite);
          // add myWebsites array to local storage 
          localStorage.setItem("myWebsites",JSON.stringify(myWebsites));
          nameInp.value  = "";
          urlInp.value  = "";
          // reload 
          // switchTo(homeSection);
          location.reload();
          // scroll to down
          window.scrollTo(500);
     
     }
});

// delete new websites function
closeIcons.forEach((el)=>{
     let iClose = Array.from(closeIcons).indexOf(el);
     el.addEventListener("click",()=>{
          // remove it from HTML
          el.parentElement.remove();
          // remove it from array
          myWebsites.splice(iClose,1);
          // update a local storage 
          localStorage.setItem("myWebsites",JSON.stringify(myWebsites));
          // array is empty ?
          location.reload();
          window.scrollTo(500);
     })
})

// my pop up function
let desPlaceLogo = document.querySelector("nav .left");
let popUpMe = document.getElementById("popUpMe");
let closePopUp = document.querySelector("#popUpMe .xClose");
let opened = false;
desPlaceLogo.addEventListener("click",()=>{
     if (!opened){
          popUpMe.style.opacity = "1";
          popUpMe.style.pointerEvents = "auto";
          opened = true;
     }
})
closePopUp.addEventListener("click",()=>{
     popUpMe.style.opacity = "0";
     popUpMe.style.pointerEvents = "none";
     opened = false;
})