self.addEventListener('message', function(event) {
  console.log(event);
  let imgs = responseToIMG(event.data);
  self.postMessage({ response: imgs })
});

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

function responseToIMG(response) {
  let array = [];
  for (let i = 0; i < response.length; i++){
    let imgURL = response[i].images.original.url;
    img = createIMG(imgURL);
    array.push(img);
  }
  return array;
}

// API #1 -- Giphy
function getGiphy(input){
  let quantity = "10";
  let search = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=blYVByaqQPzRnJ2n8uYs3zfe5kSqcMzO&limit=" + quantity;
  let xhr = $.get(search);

  xhr.done(function (response) {
      var jiffs = response.data;
      for (i in jiffs){
        let imgURL = jiffs[i].images.original.url;
        img = createIMG(imgURL);
        $("#img-stack").append(img);
      }
  });
}

