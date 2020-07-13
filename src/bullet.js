let velocity = 560;

// * Create a bullet
var Bullet = cc.Sprite.extend({
  init: function (create_position) {
    this._super();
    //this.initWithFile(res.redBullet);
    this.initWithFile(res.redBullet);
    this.userData = {
      scale: 0.3,
      position: create_position,
    };
  },
  onEnter: function () {
    this._super();
    this.setTag(2);
    this.setScale(this.userData.scale);
    this.setPosition(
      this.getUserData().position.x,
      this.getUserData().position.y
    );

    var realTime = (size.height - this.getUserData().position.y) / velocity;
    var moveAction = cc.MoveTo.create(
      realTime,
      cc.p(this.getPositionX(), size.height + 10)
    );
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function (dt) {
    if (this.getPosition().y >= size.height) {
      // this.getParent().removeChild(this);
      this.removeFromParent();
    }
  },
});
