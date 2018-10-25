window.onload = function() {
  initDatabase();
  login();
  
  setTimeout(function() {
    getSaved();
  }, 500);
  
  setTimeout(function() {
    sizeImgOverlay();
    hideAnimation();
  }, 5000);
}


function getSaved() {
  console.log(firebase.auth().currentUser.uid);
  let saved = getAll(firebase.auth().currentUser.uid);
  console.log(saved);
  let img;
  for (let i = 0; i < saved.length; i++){
    console.log(saved[i]);
    console.log(saved[i].src);
    img = createSavedIMG(saved[i].src);
    $("main").append(img);
  }
}

function createSavedIMG(url) {
  // Cleaner way of creating an <img> tag than doing it all in one line
  let divStart = "<div class='img-container'>"
  let overlay = "<div class='img-overlay'><button class='add-icon'><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 31.444 31.444' xml:space='preserve'><path d='M1.119,16.841c-0.619,0-1.111-0.508-1.111-1.127c0-0.619,0.492-1.111,1.111-1.111h13.475V1.127 C14.595,0.508,15.103,0,15.722,0c0.619,0,1.111,0.508,1.111,1.127v13.476h13.475c0.619,0,1.127,0.492,1.127,1.111 c0,0.619-0.508,1.127-1.127,1.127H16.833v13.476c0,0.619-0.492,1.127-1.111,1.127c-0.619,0-1.127-0.508-1.127-1.127V16.841H1.119z'/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button></div>"
  let tagStart = "<img src='";
  let tagEnd = "'/>";
  let divEnd = "</div>";
  let img = divStart + overlay + tagStart + url + tagEnd + divEnd;
  return img;
}
