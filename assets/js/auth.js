

//
// // Create an instance of of the Google Provider object
// var provider = new firebase.auth.GoogleAuthProvider();
//
// // To apply the default browser preference
// // If you want to explicitly set the language
// // firebase.auth().languageCode = 'pt';
// firebase.auth().useDeviceLanguage();
//
// // Sign in by re-directing to the sign-in page
// firebase.auth().signInWithRedirect(provider);
//
// // Retrieve the Google provider's OAuth token when the page loads
// firebase.auth().getRedirectResult().then(function(result) {
//     if (result.credential) {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         var token = result.credential.accessToken;
//         // ...
//     }
//     // The signed-in user info.
//     var user = result.user;
// }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
// });