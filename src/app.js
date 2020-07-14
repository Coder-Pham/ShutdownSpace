var background;
var ship;
var enableTouch = true;
var pauseGame = false;
var currentScore = 0;

var BackgroundLayer = cc.Layer.extend({
    sprite: null,
    init: function () {
        this._super();
        var size = cc.winSize;

        // 2. add your codes below...
        background = new ScrollingBG();
        this.addChild(background);
        // schedules the "update" method, call it every frame
        this.scheduleUpdate();

        // Add ship
        ship = new Ship();
        this.addChild(ship);
        // Add score label
        //var ScoreText = cc.LabelTTF.create("Score: 0","Arial","18",cc.TEXT_ALIGNMENT_RIGHT);

        // Add enemy and make shot
        this.schedule(this.shipMakeShot, 0.4);
        this.schedule(this.addEnemy, 1);
        cc.eventManager.addListener(touchListener, this);
    },
    // * Update sprite every frame
    update: function (dt) {
        if (!pauseGame) {
            background.scroll();
            return;
        }
    },
    addEnemy: function (event) {
        var enemy = new Enemy();
        this.addChild(enemy, 1);
    },
    shipMakeShot: function (event) {
        if (ship.getUserData().touching) {
            var bullet = new Bullet();
            bullet.init(ship.getUserData().position);
            this.addChild(bullet, 1);
        }
    },
});

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new BackgroundLayer();
        layer.init();
        this.addChild(layer);
    },
});
