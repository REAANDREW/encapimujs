'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                src: ['lib/**/*.js']
            },
            test: {
                src: ['test/**/*.js']
            },
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            packagejson: {
                files: 'package.json',
                tasks: ['jshint:test', 'mochaTest']
            },
            lib: {
                files: '<%= jshint.lib.src %>',
                tasks: ['jshint:lib', 'mochaTest']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'mochaTest']
            },
        },
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task.
    grunt.registerTask('default', ['jshint', 'mochaTest']);
};
