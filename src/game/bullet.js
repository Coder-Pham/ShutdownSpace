let velocity = 560;

// * Create a bullet
var Bullet = cc.Sprite.extend({
    _scale: null,
    _position: null,
    _damage: null,
    ctor: function (create_position, damage) {
        this._super();
        //this.initWithFile(res.redBullet);
        this.initWithFile(res.redBullet);
        this._scale = 0.3;
        this.initData(create_position, damage);
        this._damage = 1;
    },
    initData: function (create_position, damage) {
        this._position = create_position;
        this._damage = damage;
    },
    unuse: function () {
        this._position = cc.p(-100, -100);
        this._damage = 0;
        this.retain();
        this.removeFromParent();
    },
    reuse: function (position, damage) {
        this._damage = damage;
        this._position = position;
    },
    onEnter: function () {
        this._super();
        this.setTag(2);
        this.setScale(this._scale);
        this.setPosition(
            this._position.x,
            this._position.y
        );

        var realTime = (size.height - this._position.y) / (velocity * Math.min(5, gameStatus.getDifficulty()));
        var moveAction = cc.MoveTo.create(
            realTime,
            cc.p(this.getPositionX(), size.height + 10)
        );
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update: function (dt) {
        if (this.getPosition().y >= size.height) {
            cc.pool.putInPool(this);
            //this.removeFromParent();
        }
    }
});

var CreateBullet = function (position, damage) {
    if (cc.pool.hasObject(Bullet))
        return cc.pool.getFromPool(Bullet, position, damage);
    else
        return new Bullet(position, damage);
}
