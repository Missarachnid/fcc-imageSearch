// init project
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
//const cors = require('cors');
const bodyParser = require('body-parser');
const GoogleSearch = require('google-search');
const history = require('./models/history');
const app = express();
const axios = require('axios');
app.use(bodyParser.json());
//app.use(cors());

//connect to MLab
const uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
mongoose.connect(uri).then((err, res) => {
  if(err){
    console.log(err);
  }
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/api/imagesearch/:searchTerm*', (req, res) => {
  const {searchTerm} = req.params;
  console.log('Search Term', searchTerm);
  let data = new history({
    term: searchTerm,
  });
  data.save
  /*const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_ID}&q=${searchTerm}&searchType=image&alt=json`;
  axios.get(url)
  .then(response => {
  console.log('Response', response);
  })
  .catch(error => {
    console.log('Error', error);
  })*/
  
});

/*var googleSearch = new GoogleSearch({
  key: process.env.GOOGLE_API_KEY,
  cx: process.env.GOOGLE_ID
});
 
 
googleSearch.build({
  q: "corgis",
  num: 100,
  searchType: "image"
}, (error, response) =>  {
  if(error){
    console.log("Error", error);
  } else{
    console.log("Response", response.items.length);
  }
  
});*/

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

/*main:
url, snippet, thumbnail, context

recent
term, when
{"term":"lolcats funny","when":"2018-04-05T13:54:11.479Z"}

{"url":"https://llwproductions.files.wordpress.com/2012/05/funny-cat-pictures-with-caption-lolcats-one-dumbazh-away.jpg","snippet":"This is Motley News' 1,000th Post! Time to Celebrate with Funnies ...","thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvgMU-uS_Czv-Gw7eHFYf2Ue6wMoNX00AImn8Ljk0ZHKzjG7_us5FCG6K5","context":"https://motleynews.net/2012/05/01/this-is-motley-news-1000th-post-time-to-celebrate-with-funnies/"}

kind for each object, its in the items array
url = image.context link
snippet = snippet
thumbnail = image.thumbnail link*/
/*https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={'+process.env.GOOGLE_ID+'}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json"*/