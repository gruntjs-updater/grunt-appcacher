/*
 * grunt-offline
 * https://github.com/ubuntu/grunt-offline
 *
 * Copyright (c) 2015 Rob Higgins
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('appcacher', 'Generate and bust appcache on build', function() {


    var options = this.options();

    var out = options.dest || options.out;

    if(typeof out !== "string"){
      throw new Error("you must specify a destination with options.dest or options.out");
    }

    var src = [
      "CACHE MANIFEST",
      "# timestamp: " + new Date(),
      "",
      "CACHE:",
    ];

    var count = 0;

    if(typeof options.cache === "string"){
      options.cache = options.cache.split(" ");
    }
    if(Object.prototype.toString.call(options.cache) === "[object Array]"){
      options.cache.forEach(function(item){
        if(typeof item === "string"){
          count++;
          src.push(item);
        }
      });
    }
    this.files.forEach(function(f) {
      f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(filepath) {
        count++;
        src.push(filepath);
      });

    });

    src.push("");
    src.push("NETWORK:");

    if(typeof options.network === "string"){
      options.network = options.network.split(" ");
    }
    if(Object.prototype.toString.call(options.network) === "[object Array]"){
      options.network.forEach(function(item){
        if(typeof item === "string"){
          src.push(item);
        }
      });
    } else {
      src.push("*");
    }

    // Write the destination file.
    grunt.file.write(out, src.join("\n"));

    // // Print a success message.
    grunt.log.writeln(count + ' files in manifest "' + out + '"');

  });

};
