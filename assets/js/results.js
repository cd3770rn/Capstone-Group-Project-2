window.onload = function() {
  let params = parseURL();
  console.log(params)
}


function parseURL(){
  let url = window.location.search;
  return decodeURIComponent(url);
  //return url;
}

function getGiphy(){
  let input = $("#search").val();
  console.log(input);
  let xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=blYVByaqQPzRnJ2n8uYs3zfe5kSqcMzO&limit=10");
  xhr.done(function (response) {
      console.log("success got data", response);
      var jiffs = response.data
      for (i in jiffs){
          $("main").append("<img src='" + jiffs[i].images.original.url + "' style='height=250px; width:250px'/>")
      }
  });
}
