/*---------------------------------------------------------------/
|                                                                |
|                     Required components                        |
|                                                                |
----------------------------------------------------------------*/
var request = require('request');
var cheerio = require('cheerio');

//
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");


/*---------------------------------------------------------------/
|                                                                |
|                    Stupid Global Variable                      |
|                                                                |
----------------------------------------------------------------*/
/*need to fix*/
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

/*---------------------------------------------------------------/
|                                                                |
|                         Functions                              |
|                                                                |
----------------------------------------------------------------*/
//this one is good and functions
function initialSaveToDB(actionTitle, url, tags) {
db.collection("Action").doc(actionTitle).set({
  description: "",
  pictureurl: "",
  tag: tags,
  title: actionTitle,
  url: url
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });

}

function updateTags() {
  db.collection("Action").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        var url = doc.data().url;
        //console.log(doc.id, " => ", doc.data().url);
        var tags, description = [];
        description = getDescriptions(url);
        tags = getTags(url);
        //console.log(tags);
        //then save tag to current doc
       // doc.data().tags = tags;
    });
  });
};

//this one is good
function scrapeActionHome(callback){
  var hold = new Array();
request('https://www.amnesty.org/en/get-involved/take-action/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);

    //iterates through each action link
    $('div.ca-list__item__content--half').each(function(i, element){
      var a = $(this);
      var akids = a.children();
      var title = $(akids).eq(1).text();

      //hardcoded to get rid of /t/n
      //tech debt for later
      var splitTitle = title.substring(11, (title.length-10));
      
      // Parse the href attribute from the "a" element
      var url = $(akids).eq(2).attr('href');
      url = 'https://www.amnesty.org' + url;
      actionLinks.push(url);

      // Our parsed meta data object
      var metadata = {
        title: splitTitle,
        url: url,
        tags: [],
        description: ""
      };

      var tags = [];
      initialSaveToDB(splitTitle, url, tags);
    });
    callback(parsedResults, getDescriptions);
  }
});
};

//iterates through each URL to pull the tags on the screen and add them to the string
function getTags(url){
  var holdtags = new Array();
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
          var $ = cheerio.load(html);

          $('li.tags__item--discrete').each(function(i, element){
            var a = $(this);
            
            var tag = $(a).text();
            holdtags.push(tag);
          });
          
          return holdtags;
        }
        else {
          console.log('Error can not reach page.');
        }
    });
};

//iterates through each page to collect all headers and paragraphs
function getDescriptions(url){
  actionLinks.forEach(function(element, i){
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
          var $ = cheerio.load(html);

          var holdDescription = "";
          var akids = $('div.wysiwyg').children();
          $(akids).each(function(i, element){
            var a = $(this);
            
            var description = $(a).text();
            holdDescription = holdDescription + description;
          });
          return holdDescription;
        }
        else {
          console.log('Error can not reach page.');
        }
    });
});
//callback(parsedResults, getTags);
}

/*---------------------------------------------------------------/
|                                                                |
|                        Run Time Call                           |
|                                                                |
----------------------------------------------------------------*/
//scrapeActionHome(getTags);
updateTags();