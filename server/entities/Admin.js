var adminLogin = 'admin';
var adminPassword = 'testtest';


exports.default = function Admin(login, password) {
  this.login = login;
  this.password = password;
  this.checkAccess = function() {
    return this.password === adminPassword && this.login === adminLogin;
  }
}
