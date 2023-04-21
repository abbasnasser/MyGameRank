let x = document.getElementById("body");
let gallery = document.createElement("div");
gallery.id = "gallery";
gallery.className = "gallery";
x.appendChild(gallery);
let ggg = document.getElementById("gallery");
ggg.innerHTML += '<div class="loader"></div>';

let imgss = [];
var new_data=[];
var new_data_sorted=[];

main=[]
list=[]
ss=[]
spare_ss=[]

function addgame(imgsrc, gamenametxt, gameranktxt) {
  let container = document.createElement("div");
  container.id = "container";
  container.className = "container";


  let container2r = document.createElement("div");
  container2r.id = "container2";
  container2r.className = "container_rank_name";



  let gamemedal = new Image();
  gamemedal.src = "medal.png";
  gamemedal.classList = "medal";

  let gamename = document.createElement("div");
  gamename.textContent = gamenametxt;
  gamename.className = "gamename";

  let gamerank = document.createElement("div");
  gamerank.textContent = gameranktxt;
  gamerank.className = "gamerank";

  // let gamrankleftvalue = "0px";

  // if (gameranktxt > 9) {
  //   gamrankleftvalue = "25px";
  // } else {
  //   gamrankleftvalue = "31px";
  // }

  // gamerank.style.left = "" + gamrankleftvalue + "";
  container.appendChild(imgsrc);

  container2r.appendChild(gamemedal)
  container2r.appendChild(gamerank);
  container2r.appendChild(gamename);
 
  container.appendChild(container2r)


 

  imgss.push([gamenametxt,container]);
  spare_ss.push([gamenametxt,container]);
}

function addGamesToPage() {
  for (var i = 0; i < ss.length; i++) {
    addgame(ss[i][2], ss[i][1], ss[i][0]);

   
  }

  
}

function search() {
  var search = document.getElementById("search");
 
  search.addEventListener("input", (event) => {

    filterList = spare_ss.filter((element) =>
      element[0].toLowerCase().includes(search.value.toLowerCase())
    );
    imgss = filterList;  
  gg = document.getElementById("gallery");
  gg.innerHTML = "";
    for (let i = 0; i < imgss.length; i++) {
      
      gg.appendChild(imgss[i][1]);
    }
   loop();
  });
}

function start() {
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://script.google.com/macros/s/AKfycbzBe6xVYo-CJVN8AAtg-bbmBbP6jDxbAliMoZCFknvJW7KvOQMZguB5LW6qim-YmWIX/exec",
    true
  );
  request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      body.innerHTML +=
        ' <div class="searchBox" ><input id="search" class="search" placeholder="Search" type="search" /></div>';
       
      main = data.slice(0);
      main.shift();
      list = main.slice(0);
      update_new_data(list)    
      addGamesToPage();
      gg = document.getElementById("gallery");
      gg.innerHTML = "";
      for (let i = 0; i < imgss.length; i++) {
        
        gg.appendChild(imgss[i][1]);
      }

      search();
      loop();
      window.addEventListener("scroll", function () {
        loop();
      });
    } else {
      console.log("error");
    }
  };

  request.send();
}

start();

function loop() {
  var elementsToShow = document.querySelectorAll(".container");

  elementsToShow.forEach(function (element) {
    if (isElementInViewport(element)) {
      element.classList.add("aas");
    } else {
      element.classList.remove("aas");
    }
  });

  scroll(loop);
}

function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0 && rect.bottom >= 0) ||
    (rect.bottom >=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight))
  );
}




function update_new_data(list) {


  for (var i = 0; i < list.length; i++) {
    let gameimg = new Image();
    gameimg.src = list[i][2];
    gameimg.classList = "gameimg";
    gameimg.onload = add(gameimg,list)  
  }
 

function add(img,ll) {


  ss.push([ll[i][0],ll[i][1],img])
  
 


}


 

}
