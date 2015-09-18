# grunt-appcacher

> Generate and bust appcache

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-appcacher --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-appcacher');
```

## The "appcacher" task

### Overview
In your project's Gruntfile, add a section named `appcacher` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  appcacher: {
    options: {
      // we will save the .appcache file in the same location for both
      // production and dev environments
      out: "public/index.appcache",
      // here is a good place to add static CDN resources that will
      // not change from development to production
      cache: [
        "https://some/",
        "https://permanent/",
        "https://shared/",
        "https://static/",
        "https://resources/",
        "https://here/"
      ],
      network: "*"
    },
    production: {
      // this target will add all html,js,css, and png files in the
      // folder 'public' to the manifest `Cache` section
      files: [{
        expand: true,
        cwd: "public/",
        src: [
          '**/*.html',
          '**/*.js',
          '**/*.css',
          '**/*.png'
        ]
      }]
    },
    dev: {
      // the 'dev' target should not specify files,
      // this way a browser will see that the manifest
      // has changed and clear the appcache.
      // You will need to listen for appcache events in
      // your code, and reload the page when an update is ready
    }
  },
});

```

### Options

#### options.out
Type: `String`

Destination path where your manifest file will be saved to disk.

#### options.cache
Type: `String` | `Array`
Default value: `[]`

A string or array of strings representing paths to resources.  These files will be added to the `Cache` section of the manifest.

#### options.network
Type: `String` | `Array`
Default value: `*`

A string or array of strings representing paths to network resources.  These files will be added to the `Network` section of the manifest.  If not specified then `*` will be used, that tells browsers to treat all files not specified in the `Cache` section to be treated as a network resource.


### Output generated from grunt appcacher:dev from above :

```shell
CACHE MANIFEST
# timestamp: Fri Sep 18 2015 23:16:09 GMT+0000 (UTC)

CACHE:
https://some/
https://permanent/
https://shared/
https://static/
https://resources/

NETWORK:
*

```

### Output generated from grunt appcacher:production from above :

```shell
CACHE MANIFEST
# timestamp: Fri Sep 18 2015 23:14:03 GMT+0000 (UTC)

CACHE:
https://some/
https://permanent/
https://shared/
https://static/
https://resources/
public/js/amd/almond.js
public/js/amd/app.js
public/js/amd/deep_merge.js
public/js/amd/idb.js
public/js/amd/leaflet.js
public/js/amd/main.js
public/js/amd/map.js
public/js/amd/modernizr.js
public/js/amd/react.js
public/js/amd/require.js
public/js/amd/xhr.js
public/css/leaflet.css
public/css/site.css
public/js/amd/images/layers-2x.png
public/js/amd/images/layers.png
public/js/amd/images/marker-icon-2x.png
public/js/amd/images/marker-icon.png
public/js/amd/images/marker-shadow.png

NETWORK:
*
```