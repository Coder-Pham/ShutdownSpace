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
    ctor: function () {
        this._super();
        this.initWithFile(res.enemy1_png);
    },
    onEnter: function () {
        this._super();
        this.setScale(0.08);
        let rand_x = Math.random() * (size.width - 80) + 40;
        this.setPosition(rand_x, size.height);

        let realTime = size.height / enemyVelocity;
        let moveAction = cc.MoveTo.create(realTime, cc.p(rand_x, -20));
        this.userData = {moveAction: moveAction};
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update: function (dt) {
        // Pause game
        if (pauseGame) {
            this.stopAllActions();
            return;
        }
        // Remove from screen
        if (this.getPosition().y <= -10) {
            this.removeFromParent();
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

                // Pause game
                enableTouch = false;
                pauseGame = true;
            }


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
    },
});
