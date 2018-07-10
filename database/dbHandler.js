const mongoose = require('mongoose');

const path = process.env.dbPath || 'mongodb://localhost/savedgames';

const savedGamesSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: String, // {type: String, required: true},
  planetProperties: Object
});

const SavedGame = mongoose.model('SavedGame', savedGamesSchema);

mongoose.connect(path);
const db = mongoose.connection;
db.on('error', () => { console.log('connection err:', error) });
db.once('open', () => { console.log('connection open') });

//TODO:

const saveGameToDB = (data, callback) => {
  //check to see if user already has saved game
  console.log('username:', data.username)
  fetchGameFromDB(data.username)
  .then( games => {
    console.log('games:', games)
    if(games.length !== 0){
      callback(null, 'This username already exists')
    } else {
      SavedGame.create(data, (err) => {
        if(err) {
          callback(err, null)
        }
        callback(null, 'saved!')
      })
    }
  })
  .catch( err => {
    console.log('error:', error)
  })
}

const fetchGameFromDB = (username, callback) => {
  return SavedGame.find({username: username}).exec();
}

module.exports = {
  saveGameToDB,
  fetchGameFromDB
}


// var db = mongoose.connection;
//   db.on('error', () => console.log('error connecting to DB on save'));
//   db.once('open', function(){
//     gameList.findRandom({},{},{limit: 12}, function(err, data) {
//       if(err) {
//         console.log('filter error');
//         return callback(err, null)
//       }
//       callback(null, data)
//       db.close();
//     })
//   })