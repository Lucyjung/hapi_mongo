var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    name: String,
    permission: [Schema.Types.Mixed]
},{
  timestamps: true,
  versionKey: false,
  strict: true
});

module.exports = mongoose.model('Role', RoleSchema, 'role');
