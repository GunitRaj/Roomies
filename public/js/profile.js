//selecting radial button values from quiz.html
const gender = document.getElementsByName("gender");
const year = document.getElementsByName("year");
const personality = document.getElementsByName("personality");
const sleep = document.getElementsByName("sleep");
const describe = document.getElementsByName("describe");
const user_name = document.getElementById("profile_name");
const submitButton = document.querySelector("#submitButton")
const profile_pic = document.querySelector("#profile_picture");
const user_instagram = document.querySelector("#user_instagram");
const user_snapchat = document.querySelector("#user_snapchat")
let user = " ";
// reference to firebase database
const dataRef = firebase.database().ref();
 
//User Edit Profile Page
// 1. Edit Name, Instagram, Description, and Active Status  (use viewNotes.js)
 
//Save Socials and Description function
const saveChanges = () => {
   const user_instagram = document.querySelector("#instragram")
   const user_snap = document.querySelector("#snap")
   const user_linkedin = document.querySelector("#linkedin")
   const user_description = document.querySelector("#description")
 
   user_instagram.innerHTML = user_instragram
   user_snap.innerHTML = user_snap
   user_linkedin.innerHTML = user_linkedin
   user_description.innerHTML = user_description
}
 
//Active Status should be automatically changed if match is selected
 
//----start of handleQuizSubmit function ----//
//pushes selected buttons to database
const handleQuizSubmit = () => {
  // 1. Traverse through names array to find selected value
  //Gender
  let chosen_gender = " ";
  for(let i = 0; i < gender.length; i++){
      if(gender[i].checked){
          chosen_gender = gender[i].value;
      }
  }
   //Year
  let chosen_year = " ";
  for(let x = 0; x < year.length; x++){
      if(year[x].checked){
          chosen_year = year[x].value;
      }
  }
   //Personality
  let chosen_personality = " ";
  for(let y = 0; y < personality.length; y++){
      if(personality[y].checked){
          chosen_personality = personality[y].value;
      }
  }
 
  let chosen_description = " ";
  for(let i = 0; i < describe.length; i++){
      if(describe[i].checked){
          chosen_description = describe[i].value;
      }
  }
 
   let chosen_sleep = " ";
  for(let i = 0; i < sleep.length; i++){
      if(sleep[i].checked){
          chosen_sleep = sleep[i].value;
      }
  }
   // 2. Format the data and write it to our database
   dataRef.push({
   name: user_name.value,
   gender: chosen_gender,
   year: chosen_year,
   personality: chosen_personality,
   pic: profile_pic.value,
   sleep: chosen_sleep,
   describe: chosen_description,
   instagram: user_instagram.value,
   snapchat: user_snapchat.value
 
 })
 // 3. Clear the form so that we can write a new note
 .then(() => {
   //user_name = "";
   chosen_gender.value = "";
   chosen_year.value = "";
   chosen_personality.value = "";
   profile_pic.value = "";
   chosen_sleep.value = "";
   chosen_description.value = "";
   user_snapchat.value = "";
 });
}
 
const profilePage = () =>{
   const user = user_name.value;
   localStorage.setItem("name", user);
   return;
}
 
const redirect = () => {
   window.location = "profile.html";
};
 
//Matching Algorithm
 
//let user = user_name.value;
let count=0;
let score=0;
let userInfo = {};//object that stores userData from the Firebase for easy access when creating the Modal
let matchInfo = {};//object that stores best roommate match
 
const matching_algo = () => {
   const user = localStorage.getItem("name");
   console.log(user);
dataRef.on('value', (snapshot)=>{
   const data = snapshot.val();
   console.log(data);
   for (let key in data) {
       let info = data[key]
       //console.log(info)
       if(info.name == user){//identifies and stores user information to the userInfo object
           userInfo = info
           //console.log(userInfo)
       }
   }
 
   for(let key in data){
       let info = data[key]
       if(info.name != userInfo.name){
           if(userInfo.gender == info.gender){
               if(userInfo.personality == info.personality){
                   count+=1;
               }
               if(userInfo.year == info.year){
                   count+=1;
               }
               if(userInfo.describe == info.describe){
                   count+=1;
               }
               if(userInfo.sleep == info.sleep){
                   count+=1;
               }
           }
           if(count>score){
               score = count;
               matchInfo = info
           };
           count = 0;
       }
   }
   console.log(userInfo);
   console.log(score);
   console.log(matchInfo);
 
   renderData(matchInfo);
});
}
 
const renderData = (matchInfo)=>{
   const profileCard = document.querySelector("#profileCard");
   profileCard.innerHTML = " ";
 
   const titleTag = document.querySelector("#profile");
   titleTag.innerHTML = "Your Match!"
 
   profileCard.innerHTML += createCard(matchInfo);
};
 
const createCard = (matchInfo) => {
   return `
<div class="columns is-centered">
<div class="column is-one-third mt-4">
   <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img src="${matchInfo.pic}" alt="user image">
            </figure>
        </div>
    <div class="card-content">
         <div class="media">
     <div class="media-content">
            <p class="title is-4">${matchInfo.name}</p>
            <p class="subtitle is-6">${matchInfo.gender}</p>
            </div>
   </div>
   <div class="content">
     <b>Year:</b> ${matchInfo.year}<br>
     <b>Personality:</b> ${matchInfo.personality}<br>
     <b>Interest:</b> ${matchInfo.describe}<br>
     <b>Energy:</b> ${matchInfo.sleep}<br>
     <b>Instagram:</b> <a>@${matchInfo.instagram}</a><br>
     <b>Snapchat:</b> <a href="#">@${matchInfo.snapchat}</a>
   </div>
 </div>
</div>
</div>
</div>

<br>
<div class="columns is-centered">
<a class="button is-large cavalier-orange" href="map.html">Find Meetup Location</a>
</div><br>`
};
