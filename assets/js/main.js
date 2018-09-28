
// Firebase app is required and must be listed first
src="https://www.gstatic.com/firebasejs/5.5.1/firebase.js">

// Add any additional services you want to use -->
src="https://www.gstatic.com/firebasejs/5.4.1/firebase-database.js">

// Comment out (or don't include) services that you don't want to use
// src="https://www.gstatic.com/firebasejs/5.4.1/firebase-auth.js">
// src="https://www.gstatic.com/firebasejs/5.4.1/firebase-database.js">
// src="https://www.gstatic.com/firebasejs/5.4.1/firebase-firestore.js">
// src="https://www.gstatic.com/firebasejs/5.4.1/firebase-messaging.js">
// src="https://www.gstatic.com/firebasejs/5.4.1/firebase-functions.js">
// src="https://www.gstatic.com/firebasejs/5.4.1/firebase-storage.js">

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDHar8VdiUJPi5fnayZmc9pgyFyNhyAlxk",
    authDomain: "twitter-search-wrapper.firebaseapp.com",
    databaseURL: "https://twitter-search-wrapper.firebaseio.com",
    projectId: "twitter-search-wrapper",
    storageBucket: "twitter-search-wrapper.appspot.com",
    messagingSenderId: "139961615979"
};
firebase.initializeApp(config);

// Get a reference to the Firebase database
var database = firebase.database();

// function to save search entries to database
function saveToFirebase(search) {
    var searchObject = {
        search: search
    };

    database().ref('search-entries').push().set(searchObject)
        .then(function(snapshot) {
            success(); // some success method
        }, function(error) {
            console.log('error' + error);
            error(); // some error method
        });
}

saveToFirebase(search);
