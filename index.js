var list = [];
var main = [];

let body = document.getElementById("b");
body.innerHTML += '<div class="loader"></div>';

const newNode = document.createElement("img");
newNode.id = "sssd";

var image = new Image();
image.src =
  "https://drive.google.com/uc?export=view&id=1sbjGXpJSBWjosQn0ia1ILV2JGAjL2_Xv";
image.style = "height:100px position: absolute;";
var textt = new Text();
textt.style = "font-size: 90px; position: relative;left: 140px;top: 98px;";

function addGame(game_name, game_rank, game_img_link) {
  let cont = document.getElementById("holder");

  const box =
    `
  <div  style=' margin-bottom: 100px;'><img id="aaaa"  class="image"  loading="lazy"  , src="` +
    game_img_link +
    `" />';
  <img  style="position: relative;    transform: rotate(5deg);  top:200px; right:10px;  height:100px"src="https://drive.google.com/uc?export=view&id=1sbjGXpJSBWjosQn0ia1ILV2JGAjL2_Xv" alt="" srcset="">
     <p style="font-size: 20px; position: relative; transform: rotate(5deg);left: 28px;top: 113px;">` +
    game_name +
    `</p>
     <p style="font-size: 20px; position: relative;top: 90px; text-align: center;">` +
    game_rank +
    `</p> </div>`;

  cont.innerHTML += box;
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
    } else {
      console.log("error");
    }
  };

  request.send();
}

start();




window.addEventListener('resize', function() {
	
	var viewport_width = window.innerWidth;
  var x=this.document.getElementById('holder')

  if (viewport_width >501){
   
   
    // x.style.height='1000px'
  //  x.style.float='left';
  //  x.style.width='400px';
  //  x.style.width='800px'
   

  }

  else if(viewport_width <501){
    // x.style.height='225px'
    // x.style.width='400px'



  }
});