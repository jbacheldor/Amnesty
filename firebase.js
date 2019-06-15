 // Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    // ...
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://amnesty-orientation.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
  };

  var firebaseConfig = {
    apiKey: "api-key",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "sender-id",
    appID: "app-id",
  };
  
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();