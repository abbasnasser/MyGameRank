let x = document.getElementById("body");
let gallery = document.createElement("div");
gallery.id = "gallery";
gallery.className = "gallery";
x.classList.add("tempCenter");
x.appendChild(gallery);
let gallerydoc = document.getElementById("gallery");
let loadimg = new Image();
loadimg.src = "loadinglogo.jpg";
loadimg.classList = "loading";
gallerydoc.appendChild(loadimg);

let imgss = [];
let bool_last_image = false;

//dont delete -----------------
main = [];
list = [];
ss = [];
spare_ss = [];
//--------------------

function addgame(imgsrc, gamenametxt, gameranktxt, state) {
  let container = document.createElement("div");
  container.id = state;
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
  container.appendChild(imgsrc);
  container2r.appendChild(gamename);
  container2r.appendChild(gamemedal);
  container2r.appendChild(gamerank);
  container.appendChild(container2r);
  imgss.push([gamenametxt, container]);
  spare_ss.push([gamenametxt, container]);
}

function addGamesToPage() {
  expanded_elements = 0;
  length_of_list = ss.length / 4;
  //just adding the number of rank as id to the card for further uses
  while (length_of_list % 1 != 0) {
    length_of_list -= 0.25;
    expanded_elements += 1;
  }

  if (expanded_elements == 1) {
    ll = ss.length;
    for (var i = 0; i < ss.length - 1; i++) {
      addgame(ss[i][2], ss[i][1], ss[i][0], i + 1);
    }

    addgame(ss[ll - 1][2], ss[ll - 1][1], ss[ll - 1][0], ll);
  } else {
    ll = ss.length;
    for (var i = 0; i < ss.length; i++) {
      addgame(ss[i][2], ss[i][1], ss[i][0], i);
    }
  }

  //----------------------------//
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
      let x = document.getElementById("body");
      let search_container = document.createElement("div");
      search_container.id = "search_container";
      search_container.className = "search_container";

      x.appendChild(search_container);
      search_container.innerHTML +=
        ' <div class="searchBox" ><input id="search" class="search" placeholder="Search" type="search" /></div>';

      main = data.slice(0);
      main.shift();
      list = main.slice(0);
      update_new_data(list);
      addGamesToPage();
      gg = document.getElementById("gallery");
      gg.innerHTML = "";
      x.classList.remove("tempCenter");
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
      element.classList.add("showContainer");
    } else {
      element.classList.remove("showContainer");
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
    gameimg.loading = "lazy";
    gameimg.onload = add(gameimg, list);
  }

  function add(img, ll) {
    ss.push([ll[i][0], ll[i][1], img]);
  }
}

window.addEventListener("resize", function () {
  var viewport_width = window.innerWidth;

  if (viewport_width < 300) {
    loop();
  } else if (viewport_width > 300 ) {
    loop();
  }
});
