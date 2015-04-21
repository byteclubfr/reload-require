"use strict";

var reload = require("../../index.js")(module);

console.log("This example illustrates a known case of memory leak:");
console.log("if you reload.require a module X from a reload.require'd module Y, then");
console.log("the 'reload:X' event is not cleaned up when Y is reloaded, preventing");
console.log("garbage collection for old versions of module X.");
console.log();
console.log("I'm looking for solutions that would not make the API too complex");
console.log();
console.log("Expected output: 1, 1, 1, 1");
console.log("Current output:  1, 2, 3, 4");
console.log();
console.log();

// Reloadable sub-module
// This submodule also requires a reloadable sub-sub-module
reload.require(exports, "submodule", "./submodule");


// Force-reload sub-module
console.log("sub-module will be reloaded in 1s");
setTimeout(function () {
  reload("./submodule.js");

  console.log("sub-module will be reloaded again in 1s");
  setTimeout(function () {
    reload("./submodule.js");

    console.log("and again!");
    setTimeout(function () {
      reload("./submodule.js");
    }, 1000);
  }, 1000);
}, 1000);
