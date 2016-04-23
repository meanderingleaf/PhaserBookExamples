export default class UIComponent extends Phaser.Group { 

	constructor(game, parent) {  
	  	super(game, parent);

	  	// initialize your components here
	  	//add hearts, text, or whatever else is needed.

	  	//for instance, here's some text
		var style = { font: "30px Arial", align: "center", fill: "#fff" };
		this.txtValue = new Phaser.Text(this.game, 55, 55, "Hello World", style);
		this.add(this.txtValue);
	}

	update() {

	}
}