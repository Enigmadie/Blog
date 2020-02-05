var mongoose = require('mongoose');

var adminLogin = 'admin';
var adminPassword = 'testtest';

var adminSchema = new mongoose.Schema({
  login: String,
  password: String,
});

adminSchema.methods.checkAccess = function() {
  return this.login === adminLogin && this.password === adminPassword
};

exports.default = mongoose.model('Admin', adminSchema);

