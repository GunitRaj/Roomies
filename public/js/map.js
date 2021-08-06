const restaurantButton = document.querySelector("#restaurantSearch");
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const getRandom = (max) => {
 return Math.floor(Math.random() * Math.floor(max));
}
 
restaurantButton.addEventListener("click", (e) =>{
 let myKey = 'AIzaSyBKPP8OsN0p3bjN5DYHCrXwR3WMHEEW4aw';
 let location = '38.0228999,-78.493029';
 let radius = '1500';
 let myQuery = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=restaurant&key=${myKey}`;
 
 fetch(proxyurl + myQuery)
   .then((response) => response.json())
   .then((json) => {
       const i = getRandom(json.results.length);
       console.log(json.results[i].vicinity);
       document.querySelector("#restaurantName").innerHTML = json.results[i].name;
       document.querySelector("#restaurantAddress").innerHTML = 'Address: ' + json.results[i].vicinity;
       document.querySelector("#restaurantRating").innerHTML = 'Rating: ' + json.results[i].rating;
       console.log(json.results[i])
   })
})