export default class SliceBody extends Phaser.Physics.P2.Body {

  constructor(game, ray, collisionGroup, sliceGroup) {  
    super(game, null, ray.x, ray.y, 1);

    this.ray = ray;
    this.addRectangle(ray.length,2,0,0,ray.angle);

    this.setCollisionGroup(sliceGroup);
    this.collides(collisionGroup);
    this.addToWorld();
    this.static = true;
    this.onBeginContact.add(this.sliceHit, this);

   // this.debug = true;
    this.life = 10;
    this.success = new Phaser.Signal();
  }
  

  updateLife() {
    this.life --;

    if(this.life <= 0) {
      this.removeFromWorld();
      this.group.remove(this);
    }
  }

  sliceHit(other) {
    other.sprite.kill();
    this.success.dispatch(this, other);
  }
}