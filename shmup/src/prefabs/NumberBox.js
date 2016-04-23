export default class NumberBox extends Phaser.Group { 

	constructor(game, bgasset, val, parent) {  
	  	super(game, parent);

	  	// initialize your prefab here
	  	this.create(0,0, bgasset);

		var style = { font: "30px Arial", align: "center", fill: "#fff" };
		this.txtValue = new Phaser.Text(this.game, 55, 55, val.toString(), style);
		this.txtValue.anchor.setTo(.5, .5);
		this.add(this.txtValue);

	}

	setValue(val) {
		this.txtValue.text = val.toString();
	}
}