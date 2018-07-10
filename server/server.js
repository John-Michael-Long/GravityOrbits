const express = require('express');
const bodyParser = require('body-parser');
const dbHandler = require('../database/dbHandler.js');
const path = require('path')
const port = process.env.PORT || 3000;
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../public')));

app.post('/savedgames', (req, res) => {
  dbHandler.saveGameToDB(req.body, (err, message) => {
    if(err) {
      console.log('callback err', err)
      res.send(err)
    }
    console.log('callback response:', message)
    res.send(message)
  })
})

app.get('/savedgames', (req, res) => {
  dbHandler.fetchGameFromDB('user2')
  .then(response => {
    console.log('response:', response)
    res.send(response)
  })
  .catch(err => {
    console.log('err:', err)
    res.send(err)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
