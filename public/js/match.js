console.log("script running");

let user = "jack";
let count=0;
let score=0;
let userInfo = {};//object that stores userData from the Firebase for easy access when creating the Modal
let matchInfo = {};//object that stores best roommate match

matchRef = firebase.database().ref();

matchRef.on('value', (snapshot)=>{
    const data = snapshot.val();
    console.log(data);
    for (let key in data) {
        let info = data[key]
        //console.log(info)
        if(info.name == user){//identifies and stores user information to the userInfo object
            userInfo = info
            //console.log(userInfo)
        }
        else if(info.name != user){
            if(userInfo.gender == info.gender){//checks if both profiles are the same gender
                if(userInfo.personality == info.personality){
                    count+=1;
                }
                else if(userInfo.year == info.year){
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
    console.log(score);
    console.log(matchInfo);
});


const createCard = (matchInfo) => {
//     return `<script>
//     <div class="card">
//   <div class="card-image">
//     <figure class="image is-4by3">
//       <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
//     </figure>
//   </div>
//   <div class="card-content">
//     <div class="media">
//       <div class="media-left">
//         <figure class="image is-48x48">
//           <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
//         </figure>
//       </div>
//       <div class="media-content">
//         <p class="title is-4">John Smith</p>
//         <p class="subtitle is-6">@johnsmith</p>
//       </div>
//     </div>

//     <div class="content">
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//       Phasellus nec iaculis mauris. <a>@bulmaio</a>.
//       <a href="#">#css</a> <a href="#">#responsive</a>
//       <br>
//       <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
//     </div>
//   </div>
// </div></script>`

};