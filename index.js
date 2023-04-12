var list = [];
var main = [];

let body = document.getElementById("b");
body.innerHTML += '<div class="loader"></div>';



function addGame(game_name, game_rank, game_img_link) {
  let cont = document.getElementById("holder");

  if(game_name>9){
    console.log('ss');
    const box =
    `
    <div class='view'>
  <div  style=' margin-bottom: 100px;'><img id="aaaa"  class="image"  loading="lazy"  , src="` +
    game_img_link +
    `" />';
  <img  style="position: relative;    transform: rotate(5deg);  top:200px; right:10px;  height:100px"src="https://drive.google.com/uc?export=view&id=1sbjGXpJSBWjosQn0ia1ILV2JGAjL2_Xv" alt="" srcset="">
     <p class='disbale_select' style="font-size: 20px; position: relative; transform: rotate(5deg);left: 24px;top: 113px;">` +
    game_name +
    `</p>
     <p  class='disbale_select'style="font-size: 20px; position: relative;top: 90px; text-align: center;">` +
    game_rank +
    `</p> </div>
    
    </div>`;
   
  cont.innerHTML += box;
    
  }
  else{

    const box =
    `
    <div class='view'>
  <div  style=' margin-bottom: 100px;'><img id="aaaa"  class="image"  loading="lazy"  , src="` +
    game_img_link +
    `" />';
  <img  style="position: relative;    transform: rotate(5deg);  top:200px; right:10px;  height:100px"src="https://drive.google.com/uc?export=view&id=1sbjGXpJSBWjosQn0ia1ILV2JGAjL2_Xv" alt="" srcset="">
     <p class='disbale_select' style="font-size: 20px; position: relative; transform: rotate(5deg);left: 28px;top: 113px;">` +
    game_name +
    `</p>
     <p  class='disbale_select'style="font-size: 20px; position: relative;top: 90px; text-align: center;">` +
    game_rank +
    `</p> </div>
    
    </div>`;
   
  cont.innerHTML += box;
  }


  
}

function addGamesToPage() {
  for (var i = 0; i < list.length; i++) {
    addGame(list[i][0], list[i][1], list[i][2]);
  }
}

function search() {
  var search = document.getElementById("search");
  search.addEventListener("input", (event) => {
    filterList = main.filter((element) => element[1].includes(search.value));
    list = filterList.slice(0);
    let cont = document.getElementById("holder");
    cont.innerHTML = "";
    addGamesToPage();
    loop()
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
      body.innerHTML = "";
      body.innerHTML +=
        ' <div class="searchBox" ><input id="search" class="search" placeholder="Search" type="search" /></div>';
      body.innerHTML += '<div id="holder"></div>';
      var holder = document.getElementById("holder");
      holder.className = "container";
      main = data.slice(0);
      main.shift();
      list = main.slice(0);
      addGamesToPage();

      search();
      loop();
      window.addEventListener('scroll', function() {
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
  var elementsToShow = document.querySelectorAll('.view');

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

