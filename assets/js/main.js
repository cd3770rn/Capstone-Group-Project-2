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
    
    //save2(database, "test", "tests", "test1", "test", {name1: "Test", name2: "#1"});
    save2(database, "devices", "iPhone 6", "Apple", "10012011124U", {tech: "Alex Mastin", actions: "Cellbie", date: "10/3/2018"});
    //get("cities", "LA");
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

function save2(db, collection, collection1, doc, doc1, json) {
    db.collection(collection).doc(doc).collection(collection1).doc(doc1).set(json)
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
