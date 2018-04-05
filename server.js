// init project
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const history = require('./models/history');
const app = express();
const axios = require('axios');
app.use(bodyParser.json());
app.use(cors());

//connect to MLab
const uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
mongoose.connect(uri).then((err, res) => {
  if(err){
    console.log(err);
  } else {

  }
});

//display home page
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
      const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_ID}&q=${googleTerm}&searchType=image&start=${offset}&alt=json`;
      axios.get(url)
      .then(response => {
        let googleData = [];
        for(var i = 0; i < response.data.items.length - 1; i++){
          let entry = {
            url: response.data.items[i].link,
            snippet: response.data.items[i].snippet,
            thumbnail: response.data.items[i].image.thumbnailLink,
            context: response.data.items[i].title
          }
          googleData.push(entry)
        }
        res.send(googleData);
      })
      .catch(error => {
      res.send(error);
      })
    }
  });// end of save
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
      res.send(final);
    }
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});