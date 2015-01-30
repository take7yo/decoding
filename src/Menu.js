var SysMenu = cc.Layer.extend({
    _ship: null,
    _mode: MW.MODE.EASY,
    _grade: MW.GRADE.DIGITAL10,

    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        winSize = cc.director.getWinSize();
        var sp = new cc.Sprite(res.loading_png);
        sp.anchorX = 0;
        sp.anchorY = 0;
        sp.scale = MW.SCALE;
        this.addChild(sp, 0, 1);

        var singalHeight = MW.menuHeight;
        var singalWidth = MW.menuWidth;
        var newGameNormal = new cc.Sprite(res.menu_png, cc.rect(0, 0, singalWidth, singalHeight));
        var newGameSelected = new cc.Sprite(res.menu_png, cc.rect(0, singalHeight, singalWidth, singalHeight));
        var newGameDisabled = new cc.Sprite(res.menu_png, cc.rect(0, singalHeight * 2, singalWidth, singalHeight));

        var gameSettingsNormal = new cc.Sprite(res.menu_png, cc.rect(singalWidth, 0, singalWidth, singalHeight));
        var gameSettingsSelected = new cc.Sprite(res.menu_png, cc.rect(singalWidth, singalHeight, singalWidth, singalHeight));
        var gameSettingsDisabled = new cc.Sprite(res.menu_png, cc.rect(singalWidth, singalHeight * 2, singalWidth, singalHeight));

        var aboutNormal = new cc.Sprite(res.menu_png, cc.rect(singalWidth * 2, 0, singalWidth, singalHeight));
        var aboutSelected = new cc.Sprite(res.menu_png, cc.rect(singalWidth * 2, singalHeight, singalWidth, singalHeight));
        var aboutDisabled = new cc.Sprite(res.menu_png, cc.rect(singalWidth * 2, singalHeight * 2, singalWidth, singalHeight));
        var flare = new cc.Sprite(res.flare_jpg);
        this.addChild(flare, 15, 10);
        flare.visible = false;
        var newGame = new cc.MenuItemSprite(newGameNormal, newGameSelected, newGameDisabled, function () {
            this.onButtonEffect();
            //this.onNewGame();
            flareEffect(flare, this, this.onNewGame);
        }.bind(this));
        var gameSettings = new cc.MenuItemSprite(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);
        var about = new cc.MenuItemSprite(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);
        newGame.scale = MW.SCALE;
        gameSettings.scale = MW.SCALE;
        about.scale = MW.SCALE;

        //var menu = new cc.Menu(newGame, gameSettings, about);
        //menu.alignItemsInColumns(1, 2);
        ////menu.alignItemsHorizontallyWithPadding(15);
        ////menu.alignItemsVerticallyWithPadding(15);
        ////menu.alignItemsInRows(2, 1);
        //this.addChild(menu, 1, 2);
        //menu.x = winSize.width / 2;
        //menu.y = winSize.height / 2 - 140;

        var menu1st = new cc.Menu(newGame, gameSettings);
        menu1st.alignItemsHorizontallyWithPadding(15);
        this.addChild(menu1st, 1, 2);
        menu1st.x = winSize.width / 2;
        menu1st.y = winSize.height / 2 - 100;
        var menu2nd = new cc.Menu(about);
        menu2nd.alignItemsHorizontallyWithPadding(15);
        this.addChild(menu2nd, 1, 2);
        menu2nd.x = winSize.width / 2;
        menu2nd.y = winSize.height / 2 - 160;

        //var label = new cc.LabelTTF("Power by Cocos2d-JS", "Arial", 21);
        //label.setColor(cc.color(MW.FONTCOLOR));
        //this.addChild(label, 1);
        //label.x = winSize.width  / 2;
        //label.y = 80;

        //this.schedule(this.update, 0.1);
        //
        //this._ship = new cc.Sprite("#ship03.png");
        //this.addChild(this._ship, 0, 4);
        //this._ship.x = Math.random() * winSize.width;
        //this._ship.y = 0;
        //this._ship.runAction(cc.moveBy(2, cc.p(Math.random() * winSize.width, this._ship.y + winSize.height + 100)));

        if (MW.SOUND) {
            cc.audioEngine.setMusicVolume(0.7);
            cc.audioEngine.playMusic(res.mainMainMusic_mp3, true);
        }

        return true;
    },
    onNewGame: function (pSender) {
        //load resources
        cc.LoaderScene.preload(g_resources, function () {
            cc.audioEngine.stopMusic();
            cc.audioEngine.stopAllEffects();
            var scene = new cc.Scene();
            scene.addChild(new ShowLayer(this._mode, this._grade));
            //scene.addChild(new GameControlMenu());
            cc.director.runScene(new cc.TransitionFade(1.2, scene));
        }.bind(this), this);
    },
    onSettings: function (pSender) {
        this.onButtonEffect();
        var scene = new cc.Scene();
        scene.addChild(new HelloWorldLayer());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    onAbout: function (pSender) {
        this.onButtonEffect();
        var scene = new cc.Scene();
        scene.addChild(new AboutLayer());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    update: function () {
        if (this._ship.y > 750) {
            this._ship.x = Math.random() * winSize.width;
            this._ship.y = 10;
            this._ship.runAction(cc.moveBy(
                parseInt(5 * Math.random(), 10),
                cc.p(Math.random() * winSize.width, this._ship.y + 750)
            ));
        }
    },
    onButtonEffect: function () {
        if (MW.SOUND) {
            var s = cc.audioEngine.playEffect(res.buttonEffet_mp3);
        }
    }
});

SysMenu.scene = function () {
    var scene = new cc.Scene();
    var layer = new SysMenu();
    scene.addChild(layer);
    return scene;
};
