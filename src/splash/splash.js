var MenuLayer = cc.Layer.extend({
    _background: null,
    ctor: function () {
        this._super();
        let size = cc.winSize;

        this._background = new ScrollingBG();
        this.addChild(this._background);
        this.scheduleUpdate();

        //let start = new ccui.Button();
        //start.setTitleText("New Game");
        //start.setTitleFontSize(34);
        //start.setPosition(size.width / 2, size.height / 2);
        let start = new cc.Sprite.create(res.start);
        start.setScale(0.1);
        start.setAnchorPoint(0.5, 0.5);
        start.setPosition(size.width / 2, size.height / 2);

        let touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function () {
                cc.director.runScene(new cc.TransitionFade(1, new GameScene()));
            }
        });
        cc.eventManager.addListener(touchListener, start);
        this.addChild(start);
    },
    update: function (dt) {
        this._background.scroll();
    }
});

var StartGame = function () {
    //let gameScene = new GameScene();
    cc.log("Click");
    cc.director.runScene(new GameScene());
    //cc.director.runScene(new cc.TransitionFade(1, new GameScene()));

};

var menuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        let layer = new MenuLayer();
        this.addChild(layer);
    },
});