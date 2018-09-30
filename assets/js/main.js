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
    
    saveToFirebase(database, "test", "test1", {name1: "Hello", name2: "World!"})
}

function saveToFirebase(db, collection, doc, json) {
    db.collection(collection).doc(doc).set(json)
    .then(function(){
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}
    
