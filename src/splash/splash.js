var MenuLayer = cc.Layer.extend({
    _background: null,
    ctor: function () {
        this._super();
        let size = cc.winSize;

        this._background = new ScrollingBG();
        this.addChild(this._background);
        this.scheduleUpdate();

        let start = new cc.Sprite(res.start);
        this.addChild(start);

        start.setScale(0.2);
        start.setAnchorPoint(0.5, 0.5);
        start.setPosition(size.width / 2, size.height / 4);

        let touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function () {
                cc.director.runScene(new cc.TransitionFade(1, new GameScene()));
                return true;
            }
        });
        cc.eventManager.addListener(touchListener, start);

    },
    update: function (dt) {
        this._background.scroll();
    }
});

var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        let layer = new MenuLayer();
        this.addChild(layer);
    },
});