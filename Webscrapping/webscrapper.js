/*---------------------------------------------------------------/
|                                                                |
|                     Required components                        |
|                                                                |
----------------------------------------------------------------*/
var request = require('request');
var cheerio = require('cheerio');

/*---------------------------------------------------------------/
|                                                                |
|                         Functions                              |
|                                                                |
----------------------------------------------------------------*/

const actionLinks = [];
var parsedResults = [];

function scrapeActionHome(){
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
        tags: []
      };
      parsedResults.push(metadata);
    });
    getTags();
  }
});
};

//iterates through each URL to pull the tags on the screen and add them to the string
function getTags(){
actionLinks.forEach(function(element, i){
    var url = element;
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {

          var $ = cheerio.load(html);
          var holdtags = [];
          console.log(url);
          $('li.tags__item--discrete').each(function(i, element){
            var a = $(this);
            
            var title = $(a).text();
            holdtags.push(title);
          });
          parsedResults[i].tags = holdtags;
          console.log(parsedResults[i]);
        }
        else {
          console.log('Error can not reach page.');
        }
        console.log('---');
    });
});
};



/*---------------------------------------------------------------/
|                                                                |
|                        Run Time Call                           |
|                                                                |
----------------------------------------------------------------*/

scrapeActionHome();