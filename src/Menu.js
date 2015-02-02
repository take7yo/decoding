var SysMenu = cc.Layer.extend({
    _ship: null,
    _mode: MW.MODE.EASY,
    _grade: MW.GRADE.DIGITAL10,
    _easyMode: null,
    _normalMode: null,
    _hardMode: null,
    _grades: new Array(),

    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        var sp = new cc.Sprite(res.backYellowDot_png);
        sp.anchorX = 0;
        sp.anchorY = 0;
        //sp.scale = MW.SCALE;
        this.addChild(sp, 0, 1);

        var singalHeight = MW.menuHeight;
        var singalWidth = MW.menuWidth;
        // help
        var helpNormal = new cc.Sprite(res.helpNormal_png, cc.rect(0, 0, singalWidth, singalHeight));
        var helpSelected = new cc.Sprite(res.helpSelected_png, cc.rect(0, 0, singalWidth, singalHeight));
        var helpDisabled = new cc.Sprite(res.helpSelected_png, cc.rect(0, 0, singalWidth, singalHeight));
        var help = new cc.MenuItemSprite(helpNormal, helpSelected, helpDisabled, this.onAbout, this);
        help.scale = MW.SCALE;
        // menu help
        var menuHelp = new cc.Menu(help);
        this.addChild(menuHelp, 1, 2);
        menuHelp.x = MW.WIDTH - 60;
        menuHelp.y = MW.HEIGHT - 30;
        // easy
        var modeEasyNormal = new cc.Sprite(res.modeEasyNormal_png, cc.rect(0, 0, singalWidth, singalHeight));
        var modeEasySelected = new cc.Sprite(res.modeEasySelected_png, cc.rect(0, 0, singalWidth, singalHeight));
        var modeEasyDisabled = new cc.Sprite(res.modeEasySelected_png, cc.rect(0, 0, singalWidth, singalHeight));
        // normal
        var modeNormalNormal = new cc.Sprite(res.modeNormalNormal_png, cc.rect(0, 0, singalWidth, singalHeight));
        var modeNormalSelected = new cc.Sprite(res.modeNormalSelected_png, cc.rect(0, 0, singalWidth, singalHeight));
        var modeNormalDisabled = new cc.Sprite(res.modeNormalSelected_png, cc.rect(0, 0, singalWidth, singalHeight));
        // hard
        var modeHardNormal = new cc.Sprite(res.modeHardNormal_png, cc.rect(0, 0, singalWidth, singalHeight));
        var modeHardSelected = new cc.Sprite(res.modeHardSelected_png, cc.rect(0, 0, singalWidth, singalHeight));
        var modeHardDisabled = new cc.Sprite(res.modeHardSelected_png, cc.rect(0, 0, singalWidth, singalHeight));
        // menu items
        var easyMode = new cc.MenuItemSprite(modeEasyNormal, modeEasySelected, modeEasyDisabled, this.onEasy, this);
        var normalMode = new cc.MenuItemSprite(modeNormalNormal, modeNormalSelected, modeNormalDisabled, this.onNormal, this);
        var hardMode = new cc.MenuItemSprite(modeHardNormal, modeHardSelected, modeHardDisabled, this.onHard, this);
        easyMode.scale = MW.SCALE;
        normalMode.scale = MW.SCALE;
        hardMode.scale = MW.SCALE;
        this._easyMode = easyMode;
        this._normalMode = normalMode;
        this._hardMode = hardMode;
        // 默认状态
        easyMode.selected();
        // menu mode
        var menuMode = new cc.Menu(easyMode, normalMode, hardMode);
        menuMode.alignItemsHorizontallyWithPadding(20);
        this.addChild(menuMode, 1, 2);
        menuMode.x = MW.WIDTH / 2;
        menuMode.y = MW.HEIGHT - 120;
        // grade
        var gradeBackground = new cc.Sprite(res.backBegin_png);
        gradeBackground.anchorX = 0;
        gradeBackground.anchorY = 0;
        this.addChild(gradeBackground, 0, 1);
        // grade nodes
        var flare = new cc.Sprite(res.flare_jpg);
        this.addChild(flare, 15, 10);
        flare.visible = false;
        for (var i = 2; i < 11; i++) {
            var gradeImages = new Object();
            var currentGrade = i.toString();
            var nodeRect = cc.rect(0, -20, singalWidth, singalHeight + 20);
            gradeImages.normal = new cc.Sprite(res['grade' + currentGrade + '_png']);
            gradeImages.selected = new cc.Sprite(res['grade' + currentGrade + 'Selected_png']);
            gradeImages.disabled = new cc.Sprite(res['grade' + currentGrade + 'Selected_png']);
            gradeImages.normal.setTextureRect(nodeRect);
            gradeImages.selected.setTextureRect(nodeRect);
            gradeImages.disabled.setTextureRect(nodeRect);
            var grade = new cc.MenuItemSprite(gradeImages.normal, gradeImages.selected, gradeImages.disabled, function (grade) {
                this.onButtonEffect();
                flareEffect(flare, this, this.onNewGame.bind(this, grade));
            }.bind(this, currentGrade));
            grade.scale = MW.SCALE;
            this._grades[i] = grade;
        }
        // 默认状态
        // this._grades[MW.GRADE.DIGITAL2].selected();
        // menu mode
        var menuGrades = new cc.Menu(this._grades.slice(2));
        menuGrades.alignItemsInColumns(3, 3, 3);
        this.addChild(menuGrades, 1, 2);
        menuGrades.x = MW.WIDTH / 2;
        menuGrades.y = MW.HEIGHT / 2;

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
    onEasy: function () {
        this._mode = MW.MODE.EASY;
        this._easyMode.selected();
        this._normalMode.unselected();
        this._hardMode.unselected();
    },
    onNormal: function () {
        this._mode = MW.MODE.NORMAL;
        this._easyMode.unselected();
        this._normalMode.selected();
        this._hardMode.unselected();
    },
    onHard: function () {
        this._mode = MW.MODE.HARD;
        this._easyMode.unselected();
        this._normalMode.unselected();
        this._hardMode.selected();
    },
    onNewGame: function (grade) {
        //load resources
        cc.LoaderScene.preload(g_resources, function () {
            cc.audioEngine.stopMusic();
            cc.audioEngine.stopAllEffects();
            var scene = new cc.Scene();
            this._grade = grade;
            scene.addChild(new ShowLayer(this._mode, this._grade));
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
