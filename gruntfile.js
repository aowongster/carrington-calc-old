module.exports = function(grunt) {
    'use strict';

    var _js = {
        app: ['app/js/*.js'],
        grunt: ['gruntfile.js']
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: true
            },
            build: {
                src: _js.app,
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            all: _js.app.concat(_js.grunt)
        },
        karma: {
            options: {
                configFile: 'test/karma.conf.js'
            },
            continuous: {
                singleRun: true,
                browsers: ['PhantomJS']
            },
            live: {
            }
        },
        coveralls: {
            options: {
                force: true
            },
            app: {
                src: 'coverage/**/lcov.info'
            }
        },
        watch: {
            all: {
                files: _js.app.concat(_js.grunt),
                tasks: ['jshint', 'karma:continuous']
            }
        }
    });

    // loading tasks the hard way
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-coveralls');
    // grunt.loadNpmTasks('grunt-karma-coveralls');
    grunt.loadNpmTasks('grunt-shell');

    // registering tasks the hard way
    grunt.registerTask('build',[
        'jshint',
        'uglify',
        'karma:continuous'
    ]);

    // updates coverage badge when run on travis
    grunt.registerTask('travis-ci',[
        'build',
        'coveralls'
    ]);

    // default
    grunt.registerTask('default', ['build']);
};