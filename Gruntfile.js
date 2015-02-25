module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd : 'assets/dev/scss/',
          src : ['*.scss'],
          dest: 'assets/dist/css',
          ext : '.css'
        }]
      }
    },

    concat: {
      task: {
        src : ['assets/dist/css/*.css'],
        dest: 'assets/dist/css/anacapri.min.css'
      }
    },

    cssmin: {
      task: {
        options: {
          report : 'gzip'
        },
        files : {
          'assets/dist/css/anacapri.min.css': [ 'assets/dist/css/anacapri.min.css' ]
        }
      }
    },

    uglify : {
      task : {
        options : {
          report  : 'gzip',
          compress: true,
          mangle  : false
        },
        files : {
          'assets/dist/js/main.js'            : ['assets/dev/js/main.js'],
          'assets/dist/js/view/User.js'       : ['assets/dev/js/view/User.js'],
          'assets/dist/js/view/Ui.js'         : ['assets/dev/js/view/Ui.js'],
          'assets/dist/js/view/Friend.js'     : ['assets/dev/js/view/Friend.js'],
          'assets/dist/js/route/App.js'       : ['assets/dev/js/route/App.js'],
          'assets/dist/js/model/User.js'      : ['assets/dev/js/model/User.js'],
          'assets/dist/js/model/Friend.js'    : ['assets/dev/js/model/Friend.js'],
          'assets/dist/js/collection/User.js' : ['assets/dev/js/collection/User.js']
        }
      }
    },

    clean : {
      js: {
        src: ['assets/dist/js/*']
      },
      css: {
        src: ['assets/dist/css/*']
      }
    },

    watch: {
      js: {
        files: ['assets/dev/js/**/*.js'],
        tasks: ['uglify']
      },
      sass: {
        files: ['assets/dev/scss/*.scss'],
        tasks: ['sass', 'concat', 'cssmin']
      }
    }
  });

  grunt.registerTask('default', ['watch'] );
  grunt.registerTask('build',   ['clean', 'sass', 'concat', 'cssmin', 'uglify'] );
}
