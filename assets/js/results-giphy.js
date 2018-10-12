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
