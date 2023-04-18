let x = document.getElementById("body");


let gallery = document.createElement("div");
gallery.id = "gallery";
gallery.className='gallery'
x.appendChild(gallery)

let ggg = document.getElementById("gallery");
ggg.innerHTML += '<div class="loader"></div>';


function addgame(imgsrc, gamenametxt, gameranktxt) {
  gg=document.getElementById('gallery')
    // console.log(gamenametxt.length)
    console.log(gameranktxt)
   
  let container = document.createElement("div");
  container.id = "container";
  container.className = "container";

  let gameimg = new Image();

  gameimg.src = imgsrc;
  gameimg.classList = "gameimg";

  let gamemedal = new Image();
  gamemedal.src = "./medal.png";
  gamemedal.classList = "medal";

  let gamename = document.createElement("div");
  gamename.textContent = gamenametxt;
  gamename.className = "gamename";

  let gamerank = document.createElement("div");
  gamerank.textContent = gameranktxt;
  gamerank.className = "gamerank";
  let gamrankleftvalue='0px'

  if(gameranktxt>9){
    gamrankleftvalue='25px'

  }
  else{
    gamrankleftvalue='31px'
 
  }

  

  gamerank.style.left=''+gamrankleftvalue+''

  container.appendChild(gameimg);
  container.appendChild(gamemedal);
  container.appendChild(gamename);
  container.appendChild(gamerank);
  gg.appendChild(container);
}

function addGamesToPage() {
  for (var i = 0; i < list.length; i++) {
    addgame(list[i][2], list[i][1], list[i][0]);
  }
 
}

function search() {
  var search = document.getElementById("search");
  search.addEventListener("input", (event) => {
    filterList = main.filter((element) =>
      element[1].toLowerCase().includes(search.value.toLowerCase())
    );
    list = filterList.slice(0);
    gg=document.getElementById('gallery')
    gg.innerHTML = ''

   
    addGamesToPage();
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
      let ggg = document.getElementById("gallery");
      ggg.innerHTML=''


      addGamesToPage();

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
    var elementsToShow = document.querySelectorAll('.container');
  
    elementsToShow.forEach(function (element) {
      if (isElementInViewport(element)) {
        element.classList.add('aas');
      } else {
        element.classList.remove('aas');
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
      (rect.top <= 0
        && rect.bottom >= 0)
      ||
      (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight))
      ||
      (rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
  }
  