module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    copy: {
      main: {
        files: [
        //js
        {
          cwd: 'bower_components/',
          src: [
            'angular/angular.js',
            'angular-route/angular-route.min.js',
            'leaflet/dist/leaflet.js',
            'angular-leaflet-directive/dist/angular-leaflet-directive.min.js'
          ],
          dest: 'public/js',
          expand: true
        },
        //css
        {
          cwd: 'bower_components/',
          src: [
            'bootstrap/dist/css/bootstrap.min.css',
            'leaflet/dist/leaflet.css',
          ],
          dest: 'public/css',
          expand: true
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy']);

};