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
