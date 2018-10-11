window.onload = function() {
  let params = parseURL();
  getFlickr(params);
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

}
