var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

var request = require('request');
var cheerio = require('cheerio');


const actionLinks = [];
var parsedResults = [];

const firebaseConfig = {
  apiKey: "AIzaSyDmxCFBvrrUywaJqoss2_9Z683DTzMB7B4",
  authDomain: "amnesty-orientation.firebaseapp.com",
  databaseURL: "https://amnesty-orientation.firebaseio.com",
  projectId: "amnesty-orientation",
  storageBucket: "amnesty-orientation.appspot.com",
  messagingSenderId: "980364352527",
  appId: "1:980364352527:web:10d7acb12e502546"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

async function updateTags() {
    var docs = [];
    db.collection("Action").get().then(async function(querySnapshot) {
        querySnapshot.forEach(doc => {
            docs.push(doc);
        });
        await Promise.all(docs.map(async (doc) => {
            var url =  doc.data().url;
            await getTags(url)
            .then((result) => {
                console.log("good");
            })
            .catch((error) => {
                //this isn't catching errors
                console.log(error.message);
            })
        }))

    });
}

//iterates through each URL to pull the tags on the screen and add them to the string
async function getTags(url){
    var holdtags = new Array();
    try {
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
              var $ = cheerio.load(html);
    
              $('li.tags__item--discrete').each(async function(i, element){
                var a = $(this);
                
                var tag = $(a).text();
                holdtags.push(tag);
              });
              console.log(holdtags);
              return Promise.resolve(holdtags);
            }
            else {
              var message = 'Error can not reach page.';
              return Promise.reject(new Error(message));
            }
        });
    }
    catch(error) {
        console.log("error: ", error);
    }

};

async function findTags(){

}


updateTags();
