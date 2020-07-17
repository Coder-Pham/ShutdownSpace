var enemyVelocity = 300;
let explosiveTexture = cc.textureCache.addImage(res.particle_png);

function isGetHit(enemyBoundingBox, bulletBoundingbox) {
    if (enemyBoundingBox.y + 10 < bulletBoundingbox.y &&
        bulletBoundingbox.y < enemyBoundingBox.y + enemyBoundingBox.height - 20)
        if (enemyBoundingBox.x < bulletBoundingbox.x &&
            enemyBoundingBox.x + enemyBoundingBox.width > bulletBoundingbox.x
        )
            return true;
        else if (enemyBoundingBox.x < bulletBoundingbox.x + bulletBoundingbox.width &&
            enemyBoundingBox.x + enemyBoundingBox.width > bulletBoundingbox.x + bulletBoundingbox.width)
            return true;
    return false;
}

var Enemy = cc.Sprite.extend({
    _score: null,
    _hp: null,
    _scale: null,
    _type: null,
    ctor: function () {
        this._super();
        this.initData();
    },
    initData: function () {
        this._score = 5 * gameStatus.getDifficulty();
        this._hp = gameStatus.getDifficulty();

        let type = Math.ceil(Math.random() * 3);
        this._type = type;
        switch (type) {
            case 1:
                this.initWithFile(res.enemy1_png);
                this._scale = 0.08;
                break;
            case 2:
                this.initWithFile(res.enemy2_png);
                this._scale = 0.1;
                break;
            case 3:
                this.initWithFile(res.enemy3_png);
                this._scale = 0.2;
                break;
        }
    },
    onEnter: function () {
        this._super();
        this.setScale(this._scale);
        let rand_x = Math.random() * (size.width - 80) + 40;
        this.setPosition(rand_x, size.height);

        let realTime = size.height / enemyVelocity;
        if (this._type == 2) {
            let moveAction = new cc.Spawn(cc.MoveTo.create(realTime, cc.p(rand_x, -20)), cc.RotateBy(realTime, 360 * realTime));
            this.runAction(moveAction);
        }
        else {
            let moveAction = cc.MoveTo.create(realTime, cc.p(rand_x, -20));
            this.runAction(moveAction);
        }
        this.scheduleUpdate();
    },
    unuse: function () {
        this._hp = 0;
        this._scale = 0;
        this._score = 0;
        this._type = 0;
        this.retain();
        this.removeFromParent();
    },
    reuse: function () {
        this.initData();
        let rotateNormal = cc.rotateTo(0, 0);
        this.runAction(rotateNormal);
    },
    update: function (dt) {
        // Pause game
        if (gameStatus.isEndGame()) {
            this.stopAllActions();
            return;
        }
        // Remove from screen
        if (this.getPosition().y <= -10) {
            cc.pool.putInPool(this);
            //this.removeFromParent();
        }
        // Check for bullet hit
        else {
            var enemyBoundingBox = this.getBoundingBox();
            var allChildren = this.getParent().getChildren();
            // Check collision with ship
            if (isGetHit(enemyBoundingBox, ship.getBoundingBox())) {
                // Go ka boom
                let ka_boom = new cc.ParticleSun();
                let positionX = (this.getPositionX() + ship.getPositionX()) / 2;
                let positionY = (this.getPositionY() + ship.getPositionY()) / 2;
                ka_boom.setTexture(explosiveTexture);
                ka_boom.setPosition(positionX, positionY);
                ka_boom.setStartSize(1);
                ka_boom.setEndSize(4);
                this.getParent().addChild(ka_boom, 1);

                // End game
                ship._touching = false;
                cc.eventManager.removeListener(this.getParent()._touchListener);
                gameStatus.setEndGame(true);
            }

            // Find bullet and check Collision
            for (var i = 0; i < allChildren.length; i++)
                if (allChildren[i].getTag() == 2) {
                    var bulletBoundingbox = allChildren[i].getBoundingBox();
                    // if (cc.rectIntersectsRect(enemyBoundingBox, bulletBoundingbox)) {
                    if (isGetHit(enemyBoundingBox, bulletBoundingbox)) {
                        // Minus HP
                        this._hp -= allChildren[i]._damage;

                        // Remove bullet
                        try {
                            allChildren[i].removeFromParent();
                        } catch (error) {
                            console.log(allChildren[i]);
                        }

                        // If lose all HP then explosion and REMOVE
                        if (this._hp <= 0) {
                            // Add score
                            gameStatus.addScore(this._score);

                            // Make explosion effect
                            let ka_boom = new cc.ParticleSun();
                            ka_boom.setTexture(explosiveTexture);
                            ka_boom.setPosition(this.getPositionX(), this.getPositionY());
                            ka_boom.setStartSize(2);
                            ka_boom.setEndSize(6);
                            this.getParent().addChild(ka_boom, 1);

                            // Remove this enemy ship & Kaboom
                            this.removeFromParent();
                            setTimeout(function () {
                                ka_boom.removeFromParent();
                            }, 1000);
                            break;
                        }
                    }
                }
        }
    },
});
