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
  
// API #1 -- Giphy
function getGiphy(input){
  let quantity = "10";
  let search = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=blYVByaqQPzRnJ2n8uYs3zfe5kSqcMzO&limit=" + quantity;
  let xhr = $.get(search);
  let array = [];
  xhr.done(function (response) {
    for (i in response.data) {
      array.push(response.data[i].url);
    }
  });
  return array
}

// API #2 -- Flickr
function getFlickr(input) {
  let flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  let resultCount = 20;
  let array = [];
  $.getJSON(flickerAPI, {
      tags: input,
      tagmode: "any",
      format: "json"
  }).done(function (result, status, xhr) {
      for (i in result.items){
        array.push(result.items[i].media.m)
      }
  }).fail(function (xhr, status, error) {
      alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
  });
  return array;
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

function parseResponse(response) {
  for (let i = 0; i < response.length; i++) {
    for (let j = 0; j < response[i].length; j++) {
      console.log(response[i][j]);
      //$("#img-stack").append(response[i][j]);
    }
  }
}

function populatePage(input) {
  // TODO: Make this multithreaded.
  let giphyQuery = getGiphy(input);
  let flickrQuery = getFlickr(input);
//   let unsplashQuery = getUnsplash(input);

  let response = startWorker(giphyQuery, flickrQuery);
  parseResponse(response);
}


function startWorker(giphyInput, flickrInput) {
  let output = [];
  setTimeout(function() {
    // New thread
    if (window.Worker) {
      worker = new Worker('/Capstone-Group-Project-2/assets/js/worker.js'); // start worker
      worker.postMessage(giphyInput); // send API response to worker
      worker.postMessage(flickrInput); // send API response to worker
      worker.addEventListener('message', function(event) {
        console.log(event.data);
        output.push(event.data); // store worker response
        setTimeout(function() {
          worker.terminate(); 
        }, 3000); // thread terminates after 3000ms
      });
    }
  }, 500); // 500ms is long enough for elements in arguments to not appear as undefined
  return output;
}

