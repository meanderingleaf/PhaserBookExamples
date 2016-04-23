module.exports = function(grunt) {


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
        main: {
          options: {
            browserifyOptions: {
              debug: true
            },
            transform: [["babelify", { "stage": 1 }]]
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
    },
    copy: {
      build: {
        files: [
          {expand: true, src: ['assets/**'], dest: 'build/'},
          {expand: true, src: ['css/**'], dest: 'build/'},
          {src: ['index.html'], dest: 'build/index.html'}
    
        ]
      }
    },
    uglify: {
      build: {
        files: [{
          expand: true,
          cwd: 'scripts',
          src: '**/*.js',
          dest: 'build/scripts'
        }]
      }
    },
    clean: {
       build: ["build"]
    },
    bower: {
        flat: { /* flat folder/file structure */
            dest: 'scripts',
            options: {
                debugging: true
            }
        }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('main-bower-files');

  grunt.registerTask('default', [ 'bower', 'connect', 'watch']);
  grunt.registerTask('build', [ 'clean', 'bower', 'copy', 'uglify' ]);

};