/* eslint strict: 0 */
/* globals module */

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			grunt: {
				files: "Gruntfile.js"
			},
			src: {
				files: ["src/*"],
				tasks: ["default"]
			}
		},
		replace: {
			css2Js: {
				options: {
					patterns: [
						{
							match: /'|"/g,
							replacement: "\\$&"
						}
					]
				},
				expand: true,
				cwd: "temp",
				src: "*.css",
				dest: "temp"
			},
			injectCss: {
				options: {
					patterns: [
						{
							match: "CSS",
							replacement: "<%= grunt.file.read('temp/style.css') %>"
						},
						{
							match: "CONFIGCSS",
							replacement: "<%= grunt.file.read('temp/style-dialog.css') %>"
						}
					]
				},
				files: {
					"dist/GM_config.js": "src/GM_config.js"
				}
			}
		},
		clean: ["temp"],
		cssmin: {
			css: {
				expand: true,
				cwd: "temp",
				src: "*.css",
				dest: "temp"
			}
		},
		less: {
			css: {
				expand: true,
				cwd: "src",
				src: "*.less",
				dest: "temp",
				ext: ".css"
			}
		},
		concat: {
			js: {
				files: {
					"dist/GM_config.js": ["license/copyright.txt", "dist/GM_config.js"]
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Tasks
	grunt.registerTask('default', ["less", "cssmin", 'replace', 'concat', 'clean']);
};
