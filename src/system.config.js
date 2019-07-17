/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
      paths: {
        // paths serve as alias
        'npm:': 'node_modules/',
        "syncfusion:": "node_modules/@syncfusion/", // syncfusion alias
      },
      // map tells the System loader where to look for things
      map: {
        // our app is within the app folder
        'app': 'app',
  
        // angular bundles
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
   
        // syncfusion bundles
          "@syncfusion/ej2-base": "syncfusion:ej2-base/dist/ej2-base.umd.min.js",
          "@syncfusion/ej2-schedule": "syncfusion:ej2-schedule/dist/ej2-schedule.umd.min.js",
          "@syncfusion/ej2-angular-schedule": "syncfusion:ej2-angular-schedule/dist/ej2-angular-schedule.umd.min.js",
          "cldr-data": 'npm:cldr-data',
          "plugin-json": "npm:systemjs-plugin-json/json.js",
  
        // other libraries
        'rxjs':                      'npm:rxjs',
        'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
      },
      meta: {
        '*.json': { loader: 'plugin-json' }
      },
      // packages tells the System loader how to load when no filename and/or no extension
      packages: {
        app: {
          defaultExtension: 'js',
          meta: {
            './*.js': {
              loader: 'systemjs-angular-loader.js'
            }
          }
        },
        "cldr-data": { main: 'index.js', defaultExtension: 'js' },
        rxjs: {
          defaultExtension: 'js'
        }
      }
    });
  })(this);