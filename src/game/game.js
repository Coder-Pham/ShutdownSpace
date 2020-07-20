var layer;
var background;
var ship;
var gameStatus;
var ScoreText;

var BackgroundLayer = cc.Layer.extend({
    _touchListener: null,
    ctor: function () {
        this._super();

        var size = cc.winSize;
        gameStatus = new GameStatus();

        // 2. add your codes below...
        background = new ScrollingBG();
        this.addChild(background);
        // schedules the "update" method, call it every frame
        this.scheduleUpdate();

        // Add ship
        ship = new Ship();
        this.addChild(ship);

        // Add score label
        ScoreText = cc.LabelTTF.create("Score: 0", 'Times New Roman', 28, cc.size(320, 28), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM);
        ScoreText.setPosition(size.width - 170, size.height - 35);
        this.addChild(ScoreText);

        // Add pause.png/play button
        let pauseButton = new cc.MenuItemImage(res.pause);
        let playButton = new cc.MenuItemImage(res.play);
        pauseButton.setScale(0.75);
        playButton.setScale(0.75);
        let button = new cc.MenuItemToggle(pauseButton, playButton, pause_resume);
        button.setPosition(cc.p(25, size.height - 45));
        let menu = cc.Menu(button);
        menu.setPosition(0, 0);
        this.addChild(menu);

        // Prepare bullet and enemy
        this.preparePool();

        // Add enemy and make shot
        //this.schedule(this.shipMakeShot, 0.4);
        this.scheduleShipShot();
        this.schedule(this.addEnemy, 1);

        this._touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this)
        });

        cc.eventManager.addListener(this._touchListener, this);

        // schedule random time for PowerUp
        this.schedulePowerup();
    },
    onTouchBegan: function (touch, event) {
        var location = touch.getLocation();
        let planeBoundingBox = ship.getBoundingBox();
        if (isTouch(location, planeBoundingBox)) {
            ship._touching = true;
        }
        return true;
    },
    onTouchMoved: function (touch, event) {
        var location = touch.getLocation();
        if (ship._touching)
            if (
                location.x >= 40 &&
                location.x <= size.width - 40 &&
                location.y >= 40 &&
                location.y <= size.height - 40
            ) {
                ship.setPosition(location.x, location.y);
                ship._position = location;
            }
    },
    onTouchEnded: function (touch, event) {
        ship._touching = false;
    },
    // * Update sprite every frame
    update: function (dt) {
        if (!gameStatus.isEndGame()) {
            background.scroll();
            ScoreText.setString("Score: " + gameStatus.getScore());
            gameStatus.setDifficulty(Math.floor(gameStatus.getScore() / 50) + 1);
            return;
        }
    },
    // Add enemy
    addEnemy: function (event) {
        if (!gameStatus.isEndGame()) {
            //var enemy = new Enemy();
            var enemy = cc.pool.getFromPool(Enemy);
            this.addChild(enemy, 1);
        }
    },
    // Change ship fire rate
    scheduleShipShot: function () {
        this.unschedule(this.shipMakeShot);
        this.schedule(this.shipMakeShot, ship._fireRate);
    },
    shipMakeShot: function () {
        this.scheduleShipShot();
        if (ship._touching) {
            var bullet = CreateBullet(ship._position, ship._firePower, 1);
            //var bullet = new Bullet(ship._position);
            this.addChild(bullet, 1);
        }
    },
    // Add power up at random 0 - 15 sec
    schedulePowerup: function () {
        this.unschedule(this.addPowerup);
        this.schedule(this.addPowerup, Math.ceil(Math.random() * 15));
    },
    addPowerup: function () {
        this.schedulePowerup();
        let type = Math.ceil(Math.random() * 2);
        let powerUp = new PowerUp(type);
        this.addChild(powerUp);
    },
    // Prepare for cc.pool
    preparePool: function () {
        for (let i = 0; i < 1000; i++) {
            let node = new Bullet(ship._position, ship._firePower);
            cc.pool.putInPool(node);
            node = new Enemy();
            cc.pool.putInPool(node);
        }
    }
});

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        layer = new BackgroundLayer();
        this.addChild(layer);
    },
});

var pause_resume = function () {
    if (!cc.director.isPaused())
        cc.director.pause();
    else
        cc.director.resume();
}

function isTouch(location, boundingBox) {
    if (location.x >= boundingBox.x &&
        location.x <= boundingBox.x + boundingBox.width &&
        location.y >= boundingBox.y &&
        location.y <= boundingBox.y + boundingBox.height)
        return true;
    return false;
}


