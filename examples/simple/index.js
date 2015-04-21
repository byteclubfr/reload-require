"use strict";

var reload = require("../../index.js")(module);

reload.require(exports, "hello", "./hello.js", function (curr, prev) {
  console.log("old module:", prev);
  console.log("new module:", curr);
});


// Force-reload hello.js
console.log("hello.js will be reloaded in 1s");
setTimeout(function () {
  reload("./hello.js");
}, 1000);
