export default class Admin {
  static login = 'admin';
  static password = 'testtest';

  constructor(login, password) {
    this.login = login;
    this.password = password;
  }

  checkAccess() {
    return this.password === Admin.password && this.login === Admin.login;
  }
}
