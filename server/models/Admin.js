const mongoose = require('mongoose');

const adminLogin = 'admin';
const adminPassword = 'testtest';

const adminSchema = new mongoose.Schema({
  login: String,
  password: String,
});

adminSchema.methods.checkAccess = function() {
  return this.login === adminLogin && this.password === adminPassword
};

exports.default = mongoose.model('Admin', adminSchema);

