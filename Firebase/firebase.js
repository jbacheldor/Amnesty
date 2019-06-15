 // Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmxCFBvrrUywaJqoss2_9Z683DTzMB7B4",
  authDomain: "amnesty-orientation.firebaseapp.com",
  databaseURL: "https://amnesty-orientation.firebaseio.com",
  projectId: "amnesty-orientation",
  storageBucket: "amnesty-orientation.appspot.com",
  messagingSenderId: "980364352527",
  appId: "1:980364352527:web:10d7acb12e502546"
};

