var PlayLayer = cc.Layer.extend({
    _mode: MW.MODE.EASY,
    _grade: MW.GRADE.DIGITAL2,
    _resQueue: {},
    _numQueue: [],
    _rememberTime: 0.0,
    _shapeIndex: 0,
    _shapeColumn: 0,
    _shapeRow: 0,
    _countdownUnit: 0.01,
    _countdown: 0,
    _curShapeSprite: null,
    _doneShapeSprites: [],
    _shapeSprites: [],
    ctor: function (mode, grade, resQueue, numQueue, rememberTime) {
        this._super();
        this._mode = mode;
        this._grade = grade;
        this._resQueue = resQueue;
        this._numQueue = this.shuffle(numQueue);
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

        // shapes
        var pointList = this.getPonitList();
        for (var i = 0; i < this._grade; i++) {
            var curNum = this._numQueue[i];
            var curPoint = pointList[i];
            // 图形
            var shape = res['shape' + this._resQueue[curNum.toString()] + '_png'];
            var shapeSprite = new ShapeSprite(this._mode, cc.rect(curPoint.x, curPoint.y, MW.SHAPE.WIDTH, MW.SHAPE.HEIGHT), shape, curNum);
            this._shapeSprites.push(shapeSprite);
            this.addChild(shapeSprite, 3);
        }

        // grades background
        // grade 九宫格 第一个rc参数是整体大小  第二个rc参数是中间区域的范围
        var backGrade = new cc.Scale9Sprite(res.backWhite_png,
            cc.rect(MW.BACK_WHITE.RC_OUT_X, MW.BACK_WHITE.RC_OUT_Y, MW.BACK_WHITE.RC_OUT_WIDTH, MW.BACK_WHITE.RC_OUT_HEIGHT),
            cc.rect(MW.BACK_WHITE.RC_IN_X, MW.BACK_WHITE.RC_IN_Y, MW.BACK_WHITE.RC_IN_WIDTH, MW.BACK_WHITE.RC_IN_HEIGHT));
        backGrade.attr({
            x: MW.WIDTH / 2,
            y: 270,
            width: 400,
            height: 170
        });
        this.addChild(backGrade, 1);

        var width = 45, height = 42;
        for (var i = 0; i < 10; i++) {
            var rowIndex = parseInt(i / 5), x = 98 + 70 * (i % 5), y = 300 - 65 * rowIndex;
            var numSprite = new NumGridSprite(cc.rect(x, y, width, height), i);
            this.addChild(numSprite, 3, i);
        }

        // answer
        var confirmBtn = new cc.MenuItemImage(res.confirmNormal_png, res.confirmSelected_png, this.onConfirm, this);
        var deleteBtn = new cc.MenuItemImage(res.deleteNormal_png, res.deleteSelected_png, this.onDelete, this);
        var menu = new cc.Menu(confirmBtn, deleteBtn);
        menu.alignItemsHorizontallyWithPadding(85);
        menu.x = MW.WIDTH / 2;
        menu.y = 100;
        this.addChild(menu, 2);

        return true;
    },
    getPonitList: function () {
        return MW.DIGITAL['D' + this._grade.toString()];
    },
    shuffle: function (arr) {
        var res = arr.slice();
        res.sort(function () {
            return Math.random() > .5 ? -1 : 1;
        });
        return res;
    },
    onBackCallback: function (pSender) {
        var scene = new cc.Scene();
        scene.addChild(new SysMenu());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    onConfirm: function (pSender) {
        var isSucceeded = false;
        var doneShapeSprites = this._doneShapeSprites;
        if (doneShapeSprites.length == this._grade) {
            for (var i in doneShapeSprites) {
                var curSprite = doneShapeSprites[i];
                isSucceeded = (curSprite._num.toString() == curSprite.getNumberLabelString());
                if (!isSucceeded) break;
            }
        }

        var scene = new cc.Scene();
        scene.addChild(new ResultLayer(isSucceeded, this._rememberTime));
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    onDelete: function (pSender) {
        var preShapeSprite = this._doneShapeSprites.pop();
        if (preShapeSprite) {
            var numStr = preShapeSprite.getNumberLabelString();
            if (numStr) {
                var preNumGridSprite = this.getChildByTag(parseInt(numStr));
                preNumGridSprite.setAvailable();
            }
            if (MW.MODE.EASY != this._mode) {
                preShapeSprite.addCoverSprite();
                this._curShapeSprite = preShapeSprite;
            }
            preShapeSprite.setNumberLabelString('');
        }
        this._shapeSprites.unshift(preShapeSprite);
    }
});