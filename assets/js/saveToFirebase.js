function saveToFirebase(search) {
    var searchObject = {
        search: search
    };

    firebase.database().ref('search-entries').push().set(searchObject)
        .then(function(snapshot) {
            success(); // some success method
        }, function(error) {
            console.log('error' + error);
            error(); // some error method
        });
}

saveToFirebase(search);