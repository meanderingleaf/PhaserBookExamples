module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),    
    browserify: {

        main: {
          options: {
            browserifyOptions: {
              debug: true
            }
          },
          src: 'src/app.js',
          dest: 'scripts/app.js'
        }
    },
    watch: {
      files: [ 'src/**/*.js' ],
      tasks: ['browserify'],
      options: {
          spawn: false,
        },
    },
    connect: {
      target:{
            options: {
                port: 9001
            }
        }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', [ 'connect', 'watch']);

};