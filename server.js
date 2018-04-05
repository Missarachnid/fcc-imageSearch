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
  const {searchTerm} = req.params;
  const {offset} = req.query;
  //Remeber to take any spaces out with regex
  console.log('Search Term', searchTerm);
  console.log('offset', offset);
  let data = new history({
    term: searchTerm,
    when: new Date()
  });
  //Save search term into database
  data.save(err => {
    if(err){
      res.send('Error saving search term to database');
    } else {
      console.log(JSON.stringify(data));
      res.json(data);
    }
  });
  
  /*Google search goes here*/
  
});

app.get('/api/recent' , (req, res) => {
  const final = [];
  history.find({}, (err, data) => {
    if(err) {
      console.log('Error', err);
    }else{
  const response = Array.from(data);
    
    response.map( val => {
      console.log(response[val]);
    var entry = {
      term: response[val].term,
      when: response[val].when
    };
    
      final.push(JSON.stringify(entry));
    });
    res.json(final);
    }
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

