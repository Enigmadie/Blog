#!/usr/bin/env node
"use strict";

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = process.env.PORT || 5000;
var app = (0, _index["default"])();
app.listen(port, function () {
  console.log("Server was started on ".concat(port));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9iaW4vYmxvZy5qcyJdLCJuYW1lcyI6WyJwb3J0IiwicHJvY2VzcyIsImVudiIsIlBPUlQiLCJhcHAiLCJsaXN0ZW4iLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiQUFBQTs7O0FBRUE7Ozs7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxJQUFaLElBQW9CLElBQWpDO0FBRUEsSUFBTUMsR0FBRyxHQUFHLHdCQUFaO0FBRUFBLEdBQUcsQ0FBQ0MsTUFBSixDQUFXTCxJQUFYLEVBQWlCLFlBQU07QUFDckJNLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixpQ0FBcUNQLElBQXJDO0FBQ0QsQ0FGRCIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0IGdldEFwcCBmcm9tICcuLi9pbmRleCc7XG5cbmNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDUwMDA7XG5cbmNvbnN0IGFwcCA9IGdldEFwcCgpO1xuXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgY29uc29sZS5sb2coYFNlcnZlciB3YXMgc3RhcnRlZCBvbiAke3BvcnR9YCk7XG59KTtcbiJdfQ==