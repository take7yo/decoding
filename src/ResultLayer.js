var ResultLayer = cc.Layer.extend({
    _isSucceeded: false,
    _rememberTime: 0.0,
    ctor: function (isSucceeded, rememberTime) {
        this._super();
        this._isSucceeded = isSucceeded;
        this._rememberTime = rememberTime;
        this.init();
    },
    init: function () {
        var sp = new cc.Sprite(res.backYellowDot_png);
        sp.anchorX = 0;
        sp.anchorY = 0;
        this.addChild(sp, 0);

        // back
        var back = new cc.MenuItemImage(res.homeNormal_png, res.homeSelected_png, this.onBackCallback, this);
        var menu = new cc.Menu(back);
        menu.x = 85;
        menu.y = MW.HEIGHT - 45;
        this.addChild(menu, 1);

        var resultRes = res.failed_png;
        var backLightRes = res.backDot_png;
        if (this._isSucceeded) {
            backLightRes = res.backLightStar_png;
            resultRes = res.success_png;
        }

        var backLight = new cc.Sprite(backLightRes);
        backLight.anchorX = 0;
        backLight.anchorY = 0;
        this.addChild(backLight, 0);

        // back result show
        var resultShow = new cc.Sprite(res.backResultShow_png);
        resultShow.x = MW.WIDTH / 2;
        resultShow.y = 485;
        this.addChild(resultShow, 0);

        var result = new cc.Sprite(resultRes);
        result.x = MW.WIDTH / 2;
        result.y = 485;
        this.addChild(result, 0);

        // remember time
        var ticker = new cc.Sprite(res.ticker_png);
        ticker.x = 140;
        ticker.y = 340;
        this.addChild(ticker, 0);
        var rememberTime = new cc.LabelTTF(this._rememberTime.toFixed(2), "Arial", MW.FONT_SIZE, cc.size(MW.WIDTH, MW.SHAPE.HEIGHT), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        rememberTime.x = 240;
        rememberTime.y = 340;
        this.addChild(rememberTime);
        // menu
        var rank = new cc.MenuItemImage(res.rankBlueNormal_png, res.rankBlueSelected_png, this.onRank, this);
        var again = new cc.MenuItemImage(res.againNormal_png, res.againSelected_png, this.onAgain, this);
        var menu = new cc.Menu(rank, again);
        menu.alignItemsVerticallyWithPadding(25);
        menu.x = MW.WIDTH / 2;
        menu.y = 165;
        this.addChild(menu, 2);

        return true;
    },
    onBackCallback: function (pSender) {
        var scene = new cc.Scene();
        scene.addChild(new SysMenu());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    onRank: function () {
        this.onBackCallback();
    },
    onAgain: function () {
        this.onBackCallback();
    }
});