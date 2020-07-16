// * Scrolling Background
var scrollSpeed = 2;
var ScrollingBG = cc.Sprite.extend({
    ctor: function () {
      this._super();
      this.initWithFile(res.background_jpg);
    },
    onEnter: function () {
        this._super();
        //this.setAnchorPoint(0,0);
        this.setRotation(90);
        this.setPosition(cc.winSize.width / 2, cc.winSize.height);
    },
    scroll: function () {
      this.setPosition(this.getPosition().x, this.getPosition().y - scrollSpeed);
      if (this.getPosition().y < -640) {
        this.setPosition(this.getPosition().x, cc.winSize.height + 3 * this.height / 4);
      }
    },
  });