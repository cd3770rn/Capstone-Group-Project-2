let database;

window.onload = function(){

    // commented out below code because now located in index.html file
    // const config = {
    //     apiKey: "AIzaSyDHar8VdiUJPi5fnayZmc9pgyFyNhyAlxk",
    //     authDomain: "twitter-search-wrapper.firebaseapp.com",
    //     databaseURL: "https://twitter-search-wrapper.firebaseio.com",
    //     projectId: "twitter-search-wrapper",
    //     storageBucket: "twitter-search-wrapper.appspot.com",
    //     messagingSenderId: "139961615979"
    // };
    //
    // firebase.initializeApp(config);

    database = firebase.firestore();
    const settings = {
        timestampsInSnapshots: true
    };
    database.settings(settings);
    enableSlider();
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

function enableSlider(){
    $(".slider").change(function() {
        if ($(".lbl").css("background-color") == "rgb(204, 204, 204)") {
            $("#form").attr("action", "results-flickr.html");
        }
        else if ($(".lbl").css("background-color") == "rgb(241, 241, 241)") {
            $("#form").attr("action", "results-giphy.html");
        }
    });
}

