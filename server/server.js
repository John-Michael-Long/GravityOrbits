const express = require('express');
const path = require('path')
const port = process.env.PORT || 3000;
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.static(path.join(__dirname, '../public')));



app.listen(port, () => console.log(`Listening on port ${port}`))
