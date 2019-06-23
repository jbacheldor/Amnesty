/*---------------------------------------------------------------/
|                                                                |
|                     Required components                        |
|                                                                |
----------------------------------------------------------------*/
var request = require('request');
var cheerio = require('cheerio');

/*---------------------------------------------------------------/
|                                                                |
|                    Stupid Global Variable                      |
|                                                                |
----------------------------------------------------------------*/
/*need to fix*/
const actionLinks = [];
var parsedResults = [];

/*---------------------------------------------------------------/
|                                                                |
|                         Functions                              |
|                                                                |
----------------------------------------------------------------*/

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
        tags: [],
        description: ""
      };
      parsedResults.push(metadata);
    });
    getTags();
    getDescriptions();
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

          $('li.tags__item--discrete').each(function(i, element){
            var a = $(this);
            
            var tag = $(a).text();
            holdtags.push(tag);
          });
          parsedResults[i].tags = holdtags;
        }
        else {
          console.log('Error can not reach page.');
        }
    });
});
};

//iterates through each page to collect all headers and paragraphs
function getDescriptions(){
  actionLinks.forEach(function(element, i){
    var url = element;
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
          console.log(parsedResults[i]);
        }
        else {
          console.log('Error can not reach page.');
        }
    });
});
}


/*---------------------------------------------------------------/
|                                                                |
|                        Run Time Call                           |
|                                                                |
----------------------------------------------------------------*/

scrapeActionHome();