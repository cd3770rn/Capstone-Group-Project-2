let database;
let currentUser;

window.onload = function(){
  initDatabase();
  login();
};

// ===================
// ===== GENERIC =====
// ===================

function hideSignIn() {
  $(".action-bar").html("<button class='lowercase font-18' onclick='getSaved()'>Saved images</button><button id='sign-out' class='lowercase font-18' onclick='logOut()'>Sign Out</button>");
}

function showSignIn() {
  $(".action-bar").html("<button id='sign-in' class='lowercase font-18' onclick='login()'>Sign In</button>");
}

function getSaved() {
  setURL("https://cd3770rn.github.io/Capstone-Group-Project-2/saved.html");  
}

function getPage(){
  return location.pathname.split("/").pop();
}

function setURL(url) {
  document.location.href = url;
}

function sizeImgOverlay() {
  if (getPage() == "results.html" || getPage() == "saved.html") {
    
    let images = $(".img-container");
    for (let i = 0; i < images.length; i++){
      let targetWidth = $(images[i]).find("img").width();
      $(images[i]).find(".img-overlay").width(targetWidth);
    }
  }
}

// ================
// ===== AUTH =====
// ================

function login() {
  function newLoginHappened(user) {
    if (user) {
      // User is signed in
      app(user);
    } 

    else {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {
          // Existing and future Auth states are now persisted even when the 
          // browser window is closed.
          // ...
          // New sign-in will be persisted.
          return firebase.auth().signInWithRedirect(provider);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      }
    }
  
  // If user login persisted, hide the 'Login' button.
  if (firebase.auth().currentUser) {
    hideSignIn();
    return;
  }
  firebase.auth().onAuthStateChanged(newLoginHappened);
}

function app(user) {
    // user.email
    // user.photoURL
    // user.uid
    hideSignIn();
}

function logOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Sign-out successful.");
      showSignIn();
    }).catch(function(error) {
      // An error happened.
      alert("An error occurred while attempting to sign out.");
    });
}

// ====================
// ===== FIREBASE =====
// ====================

function initDatabase(){
  const config = {
    apiKey: "AIzaSyDHar8VdiUJPi5fnayZmc9pgyFyNhyAlxk",
    authDomain: "twitter-search-wrapper.firebaseapp.com",
    databaseURL: "https://twitter-search-wrapper.firebaseio.com",
    projectId: "twitter-search-wrapper",
    storageBucket: "twitter-search-wrapper.appspot.com",
    messagingSenderId: "139961615979"
  };
  
  const app = firebase.initializeApp(config);
  const settings = {
    timestampsInSnapshots: true  
  };
  database = firebase.firestore();
  database.settings(settings);
}  

function remove(collection, doc) {
  database.collection(collection).doc(doc).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
      alert("An error occurred while processing your request. Please try again.");
  });  
}

function removeAll(collection) {
  let action = confirm("Remove all saved images?");
  
  if (action == true) {
    let docs = getAll(collection);
    setTimeout(function() {
      for (let i = 0; i < docs.length; i++){
        remove(collection, docs[i]);
      }
    }, 1000);
  }
  else {
    return;  
  }
}

function save(collection, doc, json) {
  database.collection(collection).doc(doc).set(json)
  .then(function(){
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
      alert("An error occurred while processing your request. Please try again.");
    });
}

function get(collection, doc) {
    database.collection(collection).doc(doc).get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

function getWhere(collection, field, operator, expected) {
  let array = [];
  database.collection(collection).where(field, operator, expected).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          array.push(doc.data())
        });
    })
  return array;
}

function getAll(collection) {
  let array = [];
  database.collection(collection).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      array.push(doc.data());
    });
  });
  return array;
}

function merge(collection, doc, json) {
  database.collection(collection).doc(doc).set(json, { merge: true });
}
