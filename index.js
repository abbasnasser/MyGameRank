var listOfdata = [];
function main() {
  var body = document.getElementById("b");
  body.classList.add("temp_body");
  var loading = document.createElement("img");
  loading.id = "loading";
  loading.classList.add("loading");
  loading.src = "loading.gif";
  body.appendChild(loading);
  getData();
}
main();

function getData() {
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://script.google.com/macros/s/AKfycbzBe6xVYo-CJVN8AAtg-bbmBbP6jDxbAliMoZCFknvJW7KvOQMZguB5LW6qim-YmWIX/exec",
    true
  );
  try {
    request.onload = async function () {
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        listOfdata = data;

        var body = document.getElementById("b");
        var loading = document.getElementById("loading");
        body.classList.remove("temp_body");
        body.removeChild(loading);
        addSekeleton(data);
        var search_d = document.getElementById("search");
        search_d.style.visibility = "visible";
      } else if (request.status == 403) {
        console.log("error");
      }
    };
    request.send();
  } catch {
    console.log("nointernet");
  }
}
function addSekeleton(data) {
  for (i = 0; i < data.length; i++) {
    generateSuggestion_for_Search(data[i][1]);
    newCard(data[i][2], data[i][0], data[i][1], i);
  }
}

function newCard(imglink, rank, gamename, index) {
  var gallery = document.getElementById("gallery");
  //1
  var card_container = document.createElement("div");
  card_container.classList.add("card_container");
  card_container.id = index + 1 + "roll";

  var image_holder = document.createElement("div");
  image_holder.id = index + "img";
  //2
  var main_image = document.createElement("img");
  main_image.classList.add("image");
  main_image.src = imglink;

  //3
  var rank_div = document.createElement("div");
  rank_div.classList.add("rank_div");
  rank_div.id = index + "rank_div";
  //4
  var empty = document.createElement("div");
  //5
  var medal = document.createElement("img");
  medal.classList.add("medal");
  medal.src = "./medal.png";
  //6
  var skel = document.createElement("img");
  skel.src = "skeleton.gif";
  var number = document.createElement("div");
  number.classList.add("number");
  number.textContent = rank;
  //7
  var game_name = document.createElement("div");
  game_name.classList.add("game_name");
  game_name.textContent = gamename;

  //8 sekeleton

  var skeleton_form = document.createElement("img");
  skeleton_form.classList.add("image");
  skeleton_form.src = "skeleton.gif";
  skeleton_form.id = index;
  image_holder.appendChild(skeleton_form);
  //
  card_container.appendChild(image_holder);
  card_container.appendChild(rank_div);

  gallery.appendChild(card_container);

  //adding
  try {
    main_image.onload = function () {
      var gal = document.getElementById(index + "img");
      var removeImage = document.getElementById(index);
      var rank_div_get = document.getElementById(index + "rank_div");
      gal.removeChild(removeImage);
      gal.appendChild(main_image);
      empty.appendChild(medal);
      empty.appendChild(number);
      rank_div_get.appendChild(empty);
      rank_div_get.appendChild(game_name);
    };
  } catch {
    console.log("error abbas");
  }
}

function changeFunc() {
  var search = document.getElementById("search");
  var vla = search.value.toLowerCase();

  for (i = 0; i < listOfdata.length; i++) {
    if (vla == listOfdata[i][1].toLowerCase()) {
      console.log(vla);
      var tt = listOfdata[i][0];
      var location = "#" + tt + "roll";

      document.location.href = location;
      break;
    }
  }
}

function generateSuggestion_for_Search(word) {
  var suggestions = document.getElementById("suggestions");
  var option = document.createElement("option");
  option.id = word;
  var atrib = document.createElement("a");
  option.value = word;
  suggestions.appendChild(option);
}
