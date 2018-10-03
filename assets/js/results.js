window.onload = function() {
  let params = parseURL();
  getGiphy(params);
}


function parseURL(){
  let url = window.location.search; // get url
  url = url.replace("?query=", ""); //remove fluff
  url = url.split("+").join(" "); // convert all + to " " so: cats+and+dogs --> cats and dogs
  return url;
}

function createIMG(url) {
  let tagStart = "<img src='";
  let tagEnd = "'/>";
  let img = tagStart + url + tagEnd;
  return img;
}

function getGiphy(input){
  let quantity = "10";
  let search = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=blYVByaqQPzRnJ2n8uYs3zfe5kSqcMzO&limit=" + quantity;
  let xhr = $.get(search);
  
  xhr.done(function (response) {
      var jiffs = response.data;
      for (i in jiffs){
        let imgURL = jiffs[i].images.original.url;
        img = createIMG(imgURL);
        $("main").append(img);
      }
  });
}
