/* eslint strict: 0 */

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			grunt: {
				files: "Gruntfile.js"
			},
			src: {
				files: ["*.src.js", "*.less"],
				tasks: ["default"]
			}
		},
		replace: {
			css: {
				options: {
					patterns: [
						{
							match: /'|"/g,
							replacement: "\\$&"
						}
					]
				},
				files: {
					"style.css": "style.css"
				}
			},
			includeCss: {
				options: {
					patterns: [
						{
							match: "CSS",
							replacement: "<%= grunt.file.read('style.css') %>"
						}
					]
				},
				files: {
					"GM_config.js": "GM_config.src.js"
				}
			}
		},
		clean: ["*.css"],
		cssmin: {
			css: {
				files: {
					"style.css": "style.css"
				}
			}
		},
		less: {
			end2end: {
				files: {
					"end2end.css": "end2end.less"
				}
			},
			css: {
				files: {
					"style.css": "GM_config.less"
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

	// Tasks
	grunt.registerTask('default', ["less", "cssmin", 'replace']);
//	grunt.registerTask('default', ["less", "cssmin", 'replace', 'clean']);
};
