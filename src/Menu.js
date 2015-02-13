var SysMenu = cc.Layer.extend({
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
        this.addChild(sp, 0);
        // help
        var help = new cc.MenuItemImage(res.helpNormal_png, res.helpSelected_png, this.onAbout, this);
        help.scale = MW.SCALE;
        // menu help
        var menuHelp = new cc.Menu(help);
        this.addChild(menuHelp, 1);
        menuHelp.x = MW.WIDTH - 100;
        menuHelp.y = MW.HEIGHT - 48;
        // menu mode node
        var easyMode = new cc.MenuItemImage(res.modeEasyNormal_png, res.modeEasySelected_png, this.onEasy, this);
        var normalMode = new cc.MenuItemImage(res.modeNormalNormal_png, res.modeNormalSelected_png, this.onNormal, this);
        var hardMode = new cc.MenuItemImage(res.modeHardNormal_png, res.modeHardSelected_png, this.onHard, this);
        this._easyMode = easyMode;
        this._normalMode = normalMode;
        this._hardMode = hardMode;
        // menu mode
        var menuMode = new cc.Menu(easyMode, normalMode, hardMode);
        menuMode.alignItemsHorizontallyWithPadding(40);
        menuMode.x = MW.WIDTH / 2;
        menuMode.y = MW.HEIGHT - 137;
        this.addChild(menuMode, 1);
        // 默认状态
        easyMode.selected();
        // 缓存九宫格图片
        // grade 九宫格 第一个rc参数是整体大小  第二个rc参数是中间区域的范围
        var backGrade = new cc.Scale9Sprite(res.backWhite_png,
            cc.rect(MW.BACK_WHITE.RC_OUT_X, MW.BACK_WHITE.RC_OUT_Y, MW.BACK_WHITE.RC_OUT_WIDTH, MW.BACK_WHITE.RC_OUT_HEIGHT),
            cc.rect(MW.BACK_WHITE.RC_IN_X, MW.BACK_WHITE.RC_IN_Y, MW.BACK_WHITE.RC_IN_WIDTH, MW.BACK_WHITE.RC_IN_HEIGHT));
        backGrade.x = MW.WIDTH / 2;
        backGrade.y = 330;
        backGrade.width = MW.BACK_WHITE.WIDTH;
        backGrade.height = MW.BACK_WHITE.HEIGHT;
        this.addChild(backGrade, 0);
        // grade nodes
        var flare = new cc.Sprite(res.flare_jpg);
        this.addChild(flare, 15, 10);
        flare.visible = false;
        for (var i = 2; i < 11; i++) {
            var gradeImages = new Object();
            var currentGrade = i.toString();
            gradeImages.normal = new cc.Sprite(res['grade' + currentGrade + '_png']);
            gradeImages.selected = new cc.Sprite(res['grade' + currentGrade + 'Selected_png']);
            gradeImages.disabled = new cc.Sprite(res['grade' + currentGrade + 'Selected_png']);
            var grade = new cc.MenuItemSprite(gradeImages.normal, gradeImages.selected, gradeImages.disabled, function (grade) {
                this.onButtonEffect();
                flareEffect(flare, this, this.onNewGame.bind(this, grade));
            }.bind(this, currentGrade));
            grade.height = 77 + 40;
            this._grades[i] = grade;
        }
        // menu mode
        var menuGrades = new cc.Menu(this._grades.slice(2));
        menuGrades.alignItemsInColumns(3, 3, 3);
        menuGrades.x = MW.WIDTH / 2;
        menuGrades.y = 350;
        this.addChild(menuGrades, 1);

        // rank menu
        var rank = new cc.MenuItemImage(res.rankNormal_png, res.rankSelected_png, this.onRank, this);
        var menuRank = new cc.Menu(rank);
        menuRank.alignItemsHorizontally();
        menuRank.x = MW.WIDTH / 2;
        menuRank.y = 88;
        this.addChild(menuRank, 1, 2);

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
    onRank: function () {
        this.onButtonEffect();
        var scene = new cc.Scene();
        scene.addChild(new AboutLayer());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    //onSettings: function (pSender) {
    //    this.onButtonEffect();
    //    var scene = new cc.Scene();
    //    scene.addChild(new HelloWorldLayer());
    //    cc.director.runScene(new cc.TransitionFade(1.2, scene));
    //},
    onAbout: function (pSender) {
        this.onButtonEffect();
        var scene = new cc.Scene();
        scene.addChild(new AboutLayer());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    onButtonEffect: function () {
        if (MW.SOUND) {
            var s = cc.audioEngine.playEffect(res.buttonEffect_mp3);
        }
    }
});

SysMenu.scene = function () {
    var scene = new cc.Scene();
    var layer = new SysMenu();
    scene.addChild(layer);
    return scene;
};
