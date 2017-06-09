var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    role: Schema.ObjectId
},{
  timestamps: true,
  versionKey: false,
  strict: true
});

module.exports = mongoose.model('User', UserSchema, 'user');
