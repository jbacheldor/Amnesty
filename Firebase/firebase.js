/*---------------------------------------------------------------/
|                                                                |
|                     Required components                        |
|                                                                |
----------------------------------------------------------------*/

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");
//!!! DO WE NEED TO HAVE VARS HERE?? I THINK NOT.
/*---------------------------------------------------------------/
|                                                                |
|                   Firebase Configuration                       |
|                                                                |
----------------------------------------------------------------*/

const firebaseConfig = {
  apiKey: "AIzaSyDmxCFBvrrUywaJqoss2_9Z683DTzMB7B4",
  authDomain: "amnesty-orientation.firebaseapp.com",
  databaseURL: "https://amnesty-orientation.firebaseio.com",
  projectId: "amnesty-orientation",
  storageBucket: "amnesty-orientation.appspot.com",
  messagingSenderId: "980364352527",
  appId: "1:980364352527:web:10d7acb12e502546"
};

/*---------------------------------------------------------------/
|                                                                |
|                         Functions                              |
|                                                                |
----------------------------------------------------------------*/
//https://firebase.google.com/docs/database/web/read-and-write

//sets user information within the database
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

//reads static information from the database
var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
starCountRef.on('value', function(snapshot) {
  updateStarCount(postElement, snapshot.val());
});