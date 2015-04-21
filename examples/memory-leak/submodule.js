"use strict";

var reload = require("../../index.js")(module);

// Reloadable sub-sub-module
reload.require(exports, "subsubmodule", "./subsubmodule");

var listeners = reload.listeners(reload.event("./subsubmodule"));
console.log("(from submodule.js) reload-require listeners for subsubmodule:", listeners.length);
