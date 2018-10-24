self.addEventListener('message', function(event) {
  console.log(event);
  if (event.data === 'Get Giphy!') {
    console.log('Mr. Giphy is getting gifs from Giphy!');  
  }
});
 
