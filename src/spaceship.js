// * Ship Sprite
var Ship = cc.Sprite.extend({
  ctor: function () {
    this._super();
    this.initWithFile(res.plane_png);
    this.userData = {
      position: { x: size.width / 2, y: 60 },
      touching: false,
    };
  },
  // * Override function - Invoke when being add to Node
  onEnter: function () {
    this.setScale(0.05);
    this.setPosition(
      this.getUserData().position.x,
      this.getUserData().position.y
    );
  },
});

// * Touch & Drag spaceship
var touchListener = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function (touch, event) {
    var location = touch.getLocation();
    let planeBoundingBox = ship.getBoundingBox();
    if (cc.rectIntersectsRect(location, planeBoundingBox)) {
      ship.getUserData().touching = true;
    }
    return true;
  },
  onTouchMoved: function (touch, event) {
    var location = touch.getLocation();
    if (ship.getUserData().touching)
      if (
        location.x >= 40 &&
        location.x <= size.width - 40 &&
        location.y >= 40 &&
        location.y <= size.height - 40
      ) {
        ship.setPosition(location.x, location.y);
        ship.userData = {
          position: location,
          touching: ship.getUserData().touching,
        };
      }
  },
  onTouchEnded: function (touch, event) {
    var location = touch.getLocation();
    ship.getUserData().touching = false;
  },
});
