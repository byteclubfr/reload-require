# reload-require

Node module to reload require'd modules

## General idea

You require a module, then anywhere from your application you can trigger a "reload" to flush `require`'s cache such that next call to `require(module)` will call a new version.

This library comes with a handy `reload.require` (*) that keeps an object's property mapped to a module.

## Install

```sh
npm install --save reload-require
```

## Usage

```js
var reload = require('reload-require')(module);
```

### API

Use-case: an interface in your app allows to edit a JSON file that is require'd

```js

// Trigger a reload
reload("module");


// Watch for module's reload
reload.watch("module", function (oldVersion, mod) {
  …
});


// Assign a module to an object's property and watch it (*)
reload.require(object, "property", "module");

// Optional callback:
reload.require(object, "property", "module", function (prev, curr) { … });


// Note that "reload" is an EventEmitter, two events may be triggered
reload.on("reload", function (modulePath) {
  console.log("flushed", modulePath);
});
reload.on("reload:/absolute/path/to/toto.js", function () {
  console.log("flushed", "toto.js");
});

// It provides helper for event name dedicated to reloading
reload.event() === "reload"
reload.event("./toto.js") === "reload:/absolute/path/to/toto.js"
```

### (*) reload.require considered harmful

Modifying a variable is considered harmful by functional programmers. Modifying a variable from an unpredictable event, located in a totally different part of the application, is considered harmuful by anyone :)


## TODO

* Tests
* Fix memory leak (see examples/memory-leak)
