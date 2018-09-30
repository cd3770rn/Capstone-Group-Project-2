window.onload = function(){
    let config = {
          apiKey: "AIzaSyDHar8VdiUJPi5fnayZmc9pgyFyNhyAlxk",
          authDomain: "twitter-search-wrapper.firebaseapp.com",
          databaseURL: "https://twitter-search-wrapper.firebaseio.com",
          projectId: "twitter-search-wrapper",
          storageBucket: "twitter-search-wrapper.appspot.com",
          messagingSenderId: "139961615979"
        };
    
    let app = firebase.initializeApp(config);
    
    // Get a reference to the Firebase database
    let database = firebase.firestore();
    
    // Add a new document in collection "cities"
    database.collection("cities").doc("LA").set({
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    
//     // function to save search entries to database
//     function saveToFirebase(search) {
//         var searchObject = {
//             search: search
//         };

//         database().ref('search-entries').push().set(searchObject)
//             .then(function(snapshot) {
//                 success(); // some success method
//             }, function(error) {
//                 console.log('error' + error);
//                 error(); // some error method
//             });
//     }

//     saveToFirebase("test");
}
