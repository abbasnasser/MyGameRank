var list = [];
var main = [];

let body = document.getElementById("b");
body.innerHTML += '<div class="loader"></div>';

function addGame(game_name, game_rank, game_img_link) {
  let cont = document.getElementById("holder");
  cont.innerHTML += '<img loading="lazy" class="image", src="' + game_img_link + '" />';
  cont.innerHTML += "<span  class='game_name'>" + game_name + "</span>";
  cont.innerHTML += "<span class='game_name'>" + game_rank + "</span>";
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


addEventListener("scroll", (event) => {});

onscroll = (event) => {console.log('scrolled');
};
