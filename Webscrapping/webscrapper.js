//import {heck} from '../Firebase/firebase'
//import firebase document here
var request = require('request');
var cheerio = require('cheerio');
const firebaseJS = require('../Firebase/firebase');

const actionLinks = [];

request('https://www.amnesty.org/en/get-involved/take-action/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var parsedResults = [];
    $('div.ca-list__item__content--half').each(function(i, element){
      // Select the previous element
      var a = $(this);
      // Get the rank by parsing the element two levels above the "a" element
      var akids = a.children();
      // Parse the link title
      var title = $(akids).eq(1).text();
      //hardcoded to get rid of /t/n
      //tech debt for later
      var splitTitle = title.substring(11, (title.length-10));
      
      // Parse the href attribute from the "a" element
      var url = $(akids).eq(2).attr('href');
      actionLinks.push(url);

      // Our parsed meta data object
      var metadata = {
        title: splitTitle,
        url: url
      };
      // Push meta-data into parsedResults array
      parsedResults.push(metadata);
    });
    //both of these still have /r and /t
    // Log our finished parse results in the terminal 
    console.log(parsedResults);
    //converts to json file
    console.log( JSON.stringify(parsedResults) );
  }
  //again tech debt -- need to figure out what scope of
  //this one is
  
    actionLinks.forEach(function(element){
    var url = 'https://www.amnesty.org' + element;
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {

          var $ = cheerio.load(html);
          var holdtags = [];

          $('li.tags__item--discrete').each(function(i, element){
            var a = $(this);

            //how to associate this particular tag(s) with the prior urls
            var akids = a.children();
            var title = $(akids).eq(0).text();
            console.log(title);
          });

          
        }
    });
});
firebaseJS.heck();
});