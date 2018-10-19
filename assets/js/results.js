window.onload = function() {
  let params = parseURL();
  populatePage(params);
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
  let tagStart = "<img src='";
  let tagEnd = "'/>";
  let img = tagStart + url + tagEnd;
  return img;
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
        $("main").append(img);
      }
  });
}

// API #2 -- Flickr
function getFlickr(input) {
  let flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  let resultCount = 10;
  $.getJSON(flickerAPI, {
      tags: $("#search2").val(),
      tagmode: "any",
      format: "json"
  }).done(function (result, status, xhr) {
      $.each(result.items, function (i, item) {
          $("<img>").attr("src", item.media.m).appendTo("#main-content");
          if (i === resultCount) {
              return false;
          }
      });
  }).fail(function (xhr, status, error) {
      alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
  });
}

// API #3 -- Unsplash
function getUnsplash(input){
  let search = "https://source.unsplash.com/category/" + input
  let xhr = $.get(search);

  xhr.done(function (response) {
      var imgs = response.data;
      img = createIMG(imgs.imgURL);
      $("main").append(img);
  });
}

function populatePage(input) {
  // TODO: Make this multithreaded.
  getGiphy(input);
  getFlickr(input);
  getUnsplash(input);
}
