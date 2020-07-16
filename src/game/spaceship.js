// * Ship Sprite
var Ship = cc.Sprite.extend({
    _touching: null,
    _position: null,
    _firePower: null,
    _fireRate: null,
    ctor: function () {
        this._super();
        this.initWithFile(res.plane_png);
        this._position = {x: size.width / 2, y: 100};
        this._touching = false;
        this._firePower = 1;
        this._fireRate = 0.5;
    },
    // * Override function - Invoke when being add to Node
    onEnter: function () {
        this._super();
        this.setScale(0.05);
        this.setPosition(this._position.x, -40);
        // Move up when start game
        var moveStartGame = cc.MoveTo.create(1, cc.p(this._position.x, this._position.y));
        this.runAction(moveStartGame);
    },
    increasePower: function () {
        this._firePower *= 2;
    },
    increaseFireRate: function () {
        if (this._fireRate / 1.5 > 0.08)
            this._fireRate /= 1.5;
        else
            this._firePower
    }
});
