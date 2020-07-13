var enemyVelocity = 300;

function isGetHit(enemyBoundingBox, bulletBoundingbox) {
  if (
    enemyBoundingBox.y + 10 <= bulletBoundingbox.y &&
    enemyBoundingBox.x <= bulletBoundingbox.x &&
    enemyBoundingBox.x + enemyBoundingBox.width >= bulletBoundingbox.x
  ) {
    return true;
  }
}

var Enemy = cc.Sprite.extend({
  ctor: function () {
    this._super();
    this.initWithFile(res.enemy1_png);
  },
  onEnter: function () {
    this._super();
    this.setScale(0.08);
    var rand_x = Math.random() * (size.width - 80) + 40;
    this.setPosition(rand_x, size.height);

    var realTime = size.height / enemyVelocity;
    var moveAction = cc.MoveTo.create(realTime, cc.p(rand_x, -20));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function (dt) {
    // Remove from screen
    if (this.getPosition().y <= -10) {
      this.removeFromParent();
    }
    // Check for bullet hit
    else {
      var enemyBoundingBox = this.getBoundingBox();
      var allChildren = this.getParent().getChildren();

      for (var i = 0; i < allChildren.length; i++)
        if (allChildren[i].getTag() == 2) {
          var bulletBoundingbox = allChildren[i].getBoundingBox();
          // if (cc.rectIntersectsRect(enemyBoundingBox, bulletBoundingbox)) {
          if (isGetHit(enemyBoundingBox, bulletBoundingbox)) {
            // Remove bullet
            try {
              allChildren[i].removeFromParent();
            } catch (error) {
              console.log(allChildren[i]);
            }
            // Make explosion effect

            // Remove this enemy ship
            this.removeFromParent();
            break;
          }
        }
    }
  },
});
