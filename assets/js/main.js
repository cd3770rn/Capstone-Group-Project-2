window.onload = function(){
    // Get a reference to the Firebase database
    var database = firebase.firestore();

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
