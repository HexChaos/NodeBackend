var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String
});

var UserFileSchema = new mongoose.Schema({
  userId: String,
  fileId: String
});

module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('UserFiles', UserFileSchema);
