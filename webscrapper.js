var request = require('request');
var cheerio = require('cheerio');

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
    // Log our finished parse results in the terminal
    console.log(parsedResults);
  }
  //again tech debt -- need to figure out what scope of
  //this bitch is
  
    actionLinks.forEach(function(element){
    var url = 'https://www.amnesty.org' + element;
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            //first off wtf is this element
            //secondly we dont need a for loop here so how to fix it 
            var tag = $('').children();
            console.log(tag);
        }
    });
});
 
});