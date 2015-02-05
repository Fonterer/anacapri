module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd : 'assets/scss/',
          src : ['*.scss'],
          dest: 'assets/css',
          ext : '.css'
        }]
      }
    },

    concat: {
      task: {
        src : ['assets/css/*.css'],
        dest: 'assets/css/anacapri.min.css'
      }
    },

    cssmin: {
      task: {
        options: {
          report : 'gzip'
        },
        files : {
          'assets/css/anacapri.min.css': [ 'assets/css/anacapri.min.css' ]
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
          'assets/js/anacapri.min.js': ['assets/js/anacapri.js']
        }
      }
    },

    watch: {
      // js: {
      //   files: ['assets/js/anacapri.js'],
      //   tasks: ['uglify']
      // },
      sass: {
        files: ['assets/scss/*.scss'],
        tasks: ['sass', 'concat', 'cssmin']
      }
    }
  });

  grunt.registerTask('default', ['watch'] );
  grunt.registerTask('build',   ['sass', 'concat', 'cssmin'] );
}
