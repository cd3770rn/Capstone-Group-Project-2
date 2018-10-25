window.onload = function() {
  let params = parseURL(); 
  populatePage(params);
  initDatabase();
  login();
   
  setTimeout(function() {
    sizeImgOverlay();
    hideAnimation();
  }, 5000);
}

window.onbeforeunload = function() {
  showAnimation();
}
  
function parseURL(){
  // This will remove all of the unwanted characters from the URL and just give you the query string at the end.
  let url = window.location.search; // get url
  url = url.replace("?query=", ""); //remove fluff
  url = url.split("+").join(" "); // convert all + to " " so: cats+and+dogs --> cats and dogs
  return url;
}
  
function createIMG(url) {
  // Cleaner way of creating an <img> tag than doing it all in one line
  let divStart = "<div class='img-container'>"
  let overlay = "<div class='img-overlay'><button class='add-icon' onclick='saveImage($(this))'><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 31.444 31.444' xml:space='preserve'><path d='M1.119,16.841c-0.619,0-1.111-0.508-1.111-1.127c0-0.619,0.492-1.111,1.111-1.111h13.475V1.127 C14.595,0.508,15.103,0,15.722,0c0.619,0,1.111,0.508,1.111,1.127v13.476h13.475c0.619,0,1.127,0.492,1.127,1.111 c0,0.619-0.508,1.127-1.127,1.127H16.833v13.476c0,0.619-0.492,1.127-1.111,1.127c-0.619,0-1.127-0.508-1.127-1.127V16.841H1.119z'/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button></div>"
  let tagStart = "<img src='";
  let tagEnd = "'/>";
  let divEnd = "</div>";
  let img = divStart + overlay + tagStart + url + tagEnd + divEnd;
  return img;
}

// API #1 -- Giphy
function getGiphy(input){
  console.time("timer");
  let quantity = "10";
  let search = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=blYVByaqQPzRnJ2n8uYs3zfe5kSqcMzO&limit=" + quantity;
  let xhr = $.get(search);
  let array = [];
  xhr.done(function (response) {
    for (i in response.data) {
      array.push(response.data[i].url);
    }
  });
  console.timeEnd("timer");
  return array
}

// API #2 -- Flickr
function getFlickr(input) {
  let flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  let resultCount = 10;
  $.getJSON(flickerAPI, {
      tags: input,
      tagmode: "any",
      format: "json"
  }).done(function (result, status, xhr) {
      for (i in result.items){
        let imgURL = result.items[i].media.m;
        img = createIMG(imgURL);
        $("#img-stack").append(img);
      }
  }).fail(function (xhr, status, error) {
      alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
  });
}

// API #3 -- Unsplash
function getUnsplash(input){
  let resultCount = 10;
  let xhr;
  let comboQuery = "," + input;
  for (let i = 0; i < resultCount; i++){
    xhr = "https://source.unsplash.com/featured/?" + input + comboQuery.repeat(i);
    img = createIMG(xhr);
    $("#img-stack").append(img);
  }
}

function populatePage(input) {
  // TODO: Make this multithreaded.
  console.time("giphy");
  let giphyQuery = getGiphy(input);
//   getFlickr(input);
//   getUnsplash(input);
  giphyWorker(giphyQuery);
}


function giphyWorker(input) {
  console.log(input);
  setTimeout(function() {
    console.log(input[0]);
  }, 50);
  console.timeEnd("giphy");
  if (window.Worker) {
    console.log('Giphy worker is ready!');
    worker = new Worker('/Capstone-Group-Project-2/assets/js/worker-giphy.js');
    worker.postMessage(input[0]);
    worker.addEventListener('message', function(event) {
      console.log(event);
      console.log(event.data);
    });
  }
}

