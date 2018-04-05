// init project
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const GoogleSearch = require('google-search');
const app = express();
app.use(bodyParser.json());
app.use(cors());

//connect to MLab
const uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var googleSearch = new GoogleSearch({
  key: process.env.GOOGLE_API_KEY,
  cx: process.env.GOOGLE_ID
});
 
 
googleSearch.build({
  q: "",
  safe: "medium",
  searchType: "image"
}, (error, response) =>  {
  if(error){
    console.log("Error", error);
  } else{
    console.log("Response", response);
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
//I can paginate through the responses by adding a ?offset=2 parameter to the URL.
//I can get a list of the most recently submitted search strings.
// /api/imagesearch/
// /api/latest



/*"template": "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}
&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}
&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}
&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}
&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}
&imgDominantColor={imgDominantColor?}&alt=json"*/