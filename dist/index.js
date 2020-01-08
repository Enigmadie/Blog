"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pathway = _path["default"].join(__dirname, '/public');

var _default = function _default() {
  console.log(pathway);
  var app = new _express["default"]();
  app.set('view engine', 'pug');
  app.use('/assets', _express["default"]["static"](pathway));
  (0, _routes["default"])(app);
  return app;
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJwYXRod2F5IiwicGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJjb25zb2xlIiwibG9nIiwiYXBwIiwiRXhwcmVzcyIsInNldCIsInVzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTUEsT0FBTyxHQUFHQyxpQkFBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLFNBQXJCLENBQWhCOztlQUVlLG9CQUFNO0FBQ25CQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUwsT0FBWjtBQUNBLE1BQU1NLEdBQUcsR0FBRyxJQUFJQyxtQkFBSixFQUFaO0FBQ0FELEVBQUFBLEdBQUcsQ0FBQ0UsR0FBSixDQUFRLGFBQVIsRUFBdUIsS0FBdkI7QUFDQUYsRUFBQUEsR0FBRyxDQUFDRyxHQUFKLENBQVEsU0FBUixFQUFtQkYsOEJBQWVQLE9BQWYsQ0FBbkI7QUFDQSwwQkFBVU0sR0FBVjtBQUNBLFNBQU9BLEdBQVA7QUFDRCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgRXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBhZGRSb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnO1xuXG5jb25zdCBwYXRod2F5ID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy9wdWJsaWMnKTtcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhwYXRod2F5KVxuICBjb25zdCBhcHAgPSBuZXcgRXhwcmVzcygpO1xuICBhcHAuc2V0KCd2aWV3IGVuZ2luZScsICdwdWcnKTtcbiAgYXBwLnVzZSgnL2Fzc2V0cycsIEV4cHJlc3Muc3RhdGljKHBhdGh3YXkpKTtcbiAgYWRkUm91dGVzKGFwcCk7XG4gIHJldHVybiBhcHA7XG59XG4iXX0=