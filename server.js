// init project
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const GoogleSearch = require('google-search');
const history = require('./models/history');
const app = express();
const axios = require('axios');
const search = require('./search');
app.use(bodyParser.json());
app.use(cors());



/*var data2 = {
      "term": searchTerm,
      "when": data.createdAt
      };
      JSON.strigify(data2);*/


//connect to MLab
const uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
mongoose.connect(uri).then((err, res) => {
  if(err){
    console.log(err);
  } else {

  }
});



app.use(express.static('public'));

//Gathers parameters from search and serves results
app.get('/api/imagesearch/:searchTerm*', (req, res) => {
  let {searchTerm} = req.params;
  //replace the spaces with %20 to send query to google search
   const googleTerm = searchTerm.replace(/ /g, '%20');
  let {offset} = req.query;
  
  //console.log('Search Term', searchTerm);
  //console.log('offset', offset);
  let data = new history({
    term: searchTerm,
    when: new Date()
  });
  //Save search term into database
  data.save(err => {
    if(err){
      res.send('Error saving search term to database');
    } else {
      /*Google search goes here*/
      //const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_ID}&q=${googleTerm}&searchType=image&start=${offset}&alt=json`;
      /*axios.get(url)
      .then(response => {*/
        let googleData = [];
        for(var i = 0; i < search.items.length; i++){
          let entry = {
            url: search.items[i].link,
            snippet: search.items[i].snippet,
            thumbnail: search.items[i].image.thumbnailLink,
            context: search.items[i].title
          }
          
        }
      
      
      /*})
      .catch(error => {
      console.log('Error', error);
      })*/
      
      
    }
  });
});



//gathers collection entries and displays on page
app.get('/api/recent' , (req, res) => {
  const final = [];
  //return items saved in the collection
  history.find({}, (err, data) => {
    if(err) {
      //console.log('Error', err);
    }else{
      console.log(data);
      for(var i = 0; i < data.length; i++){
        var entry = {
          term: data[i].term,
          when: data[i].when
        };
        final.push(entry);
      }
      res.send(final);}
  });
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

