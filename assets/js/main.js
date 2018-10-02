let database;

window.onload = function(){
    const config = {
          apiKey: "AIzaSyDHar8VdiUJPi5fnayZmc9pgyFyNhyAlxk",
          authDomain: "twitter-search-wrapper.firebaseapp.com",
          databaseURL: "https://twitter-search-wrapper.firebaseio.com",
          projectId: "twitter-search-wrapper",
          storageBucket: "twitter-search-wrapper.appspot.com",
          messagingSenderId: "139961615979"
        };
    
    const app = firebase.initializeApp(config);
    
    database = firebase.firestore();
    const settings = {
        timestampsInSnapshots: true
    };
    database.settings(settings);
    
    //saveToFirebase(database, "test", "test1", {name1: "Hello", name2: "World!"})
    get("cities", "LA");
};

function save(db, collection, doc, json) {
    db.collection(collection).doc(doc).set(json)
    .then(function(){
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}
    
function get(collection, doc) {
    var docRef = 

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


function getGiphy(){
  let input = $("#search").val();
  console.log(input);
  let xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=blYVByaqQPzRnJ2n8uYs3zfe5kSqcMzO&limit=1");
  xhr.done(function (response) {
      console.log("success got data", response);
      var jiffs = response.data
      for (i in jiffs){
          $("html").append("<img src='" + jiffs[i].images.original.url + "' style='height=250px; width:250px'/>")
      }
  });
}
