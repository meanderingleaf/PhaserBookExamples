export default class SwipeHandler extends Phaser.Group {
	
	constructor(game) {

		super(game);
		this.game.input.onUp.add(this.inputUp, this);

  		this.swipeStart = new Phaser.Signal();
  		this.swipeEnd =  new Phaser.Signal();

  		this.swiping = false;
	}


	update() {
		if( this.game.input.activePointer.isDown ) {
	      if( !this.swiping ) {
	        if( this.game.input.speed.getMagnitude() > 20 ) {
	          this.swiping = true;
	          this.swipeStart.dispatch(this);
	        }
	      } else {
	        if(this.game.input.speed.getMagnitude() < 10 ) {
	          this.swiping = false;
	          this.swipeEnd.dispatch(this);
	        }
	      }
	    }

	}

	inputUp() {
		if(this.gesturing) {
			this.swiping = false;
	    	this.swipeEnd.dispatch(this);
		}
	}

}