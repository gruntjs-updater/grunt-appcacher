/*
 * grunt-offline
 * https://github.com/ubuntu/grunt-offline
 *
 * Copyright (c) 2015 Rob Higgins
 * Licensed under the MIT license.
 *//* global module */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    clean: {
      tests: ['tmp']
    },

    appcacher: {
      options: {
        cache: "http://common/resource/"
      },
      dev: {
        options: {
          out: "tmp/out_a.appcache"
        }
      },
      production: {
        options: {
          out: "tmp/out_b.appcache"
        },
        files: [{
          expand: true,
          cwd: "test",
          src: ["**/*.html", "**/*.js", "**/*.css", "**/*.json", "**/*.png"]
        }]
      }
    }


  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'appcacher']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
