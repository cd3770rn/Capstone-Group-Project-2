window.onload = function() {
  initDatabase();
  login();
  getSaved();
  
  setTimeout(function() {
    sizeImgOverlay();
    hideAnimation();
  }, 5000);
}

function deleteSaved(element) {
  if (confirm("Would you like to delete this image from your saved images?")) {
    remove(firebase.auth().currentUser.uid, getSrc(element));  
    $(element.closest(".img-container")).remove();
  }
}

function getSrc(element) {
  let src = $(element).closest(".img-container").find("img")[0].src;
  if (src.includes("giphy")) {
    return src.match("([^\/])([a-zA-Z0-9]){10,}")[0];
  }
  else if (src.includes("flickr")) {
    return src.match("([^\/\.])([a-zA-Z0-9_]){12,}")[0];
  }  
  else if (src.inlcudes("unsplash")) {
     return src.match("([^\/\.])([a-zA-Z0-9_]){27,}")[0];
  }
}

function getSaved() {
  setTimeout(function() {
    let saved = getAll(firebase.auth().currentUser.uid);
    let img;
    setTimeout(function() {
      for (let i = 0; i < saved.length; i++){
        img = createSavedIMG(saved[i].src);
        $("#img-stack").append(img);
      }
    }, 500);
  }, 500);
}

function createSavedIMG(url) {
  // Cleaner way of creating an <img> tag than doing it all in one line
  let divStart = "<div class='img-container'>"
  let overlay = "<div class='img-overlay'><button class='delete-icon' onclick='deleteSaved($(this))'><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 31.112 31.112' style='enable-background:new 0 0 31.112 31.112;' xml:space='preserve'> <polygon points='31.112,1.414 29.698,0 15.556,14.142 1.414,0 0,1.414 14.142,15.556 0,29.698 1.414,31.112 15.556,16.97 29.698,31.112 31.112,29.698 16.97,15.556'/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button></div>"
  let tagStart = "<img src='";
  let tagEnd = "'/>";
  let divEnd = "</div>";
  let img = divStart + overlay + tagStart + url + tagEnd + divEnd;
  return img;
}
