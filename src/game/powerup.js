let velocity = 400;

var PowerUp = cc.Sprite.extend({
    _type: null,
    ctor: function (type) {
        this._super();
        this._type = type;
        if (this._type == 1)
            this.initWithFile(res.power);
        else
            this.initWithFile(res.rate);
    },
    onEnter: function () {
        this._super();
        this.setScale(0.7);
        let rand_x = Math.random() * (size.width - 80) + 40;
        this.setPosition(rand_x, size.height);

        let realTime = size.height / velocity;
        let moveAction = cc.MoveTo.create(realTime, cc.p(rand_x, -20));
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update: function () {
        // Pause game
        if (gameStatus.isEndGame()) {
            this.stopAllActions();
            return;
        }
        // Remove from screen
        if (this.getPosition().y <= -10) {
            this.removeFromParent();
        }
        // Buff for ship
        else {
            var powerBoundingBox = this.getBoundingBox();
            //if (isGetHit(powerBoundingBox, ship.getBoundingBox()))
            if (cc.rectIntersectsRect(powerBoundingBox, ship.getBoundingBox())) {
                this.removeFromParent();
                if (this._type == 1)
                    ship.increasePower();
                else
                    ship.increaseFireRate();
            }
        }
    }
});