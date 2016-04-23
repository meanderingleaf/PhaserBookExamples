var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	prompting: function () {
		var done = this.async();

		this.prompt({
			type    : 'input',
			name    : 'name',
			message : 'Your project name',
			default : "Phaser Game"
		}, 
		function (answers) {
			this.projectName = answers.name;
			done();
		}.bind(this));
	},
	writing: function() {

		this.copy('index.html');
		this.copy('package.json');
		this.copy('bower.json');
		this.copy('gruntfile.js');
		this.directory('src');
		this.directory('assets');
		this.directory('scripts');

	}
});