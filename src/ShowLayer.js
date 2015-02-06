var ShowLayer = cc.Layer.extend({
    _shapeIndex: 0,
    _shapeColumn: 0,
    _shapeRow: 0,
    _countdownUnit: 0.01,
    _countdown: 0,
    ctor: function (mode, grade) {
        this._super();
        this.init(mode, grade);
    },
    init: function (mode, grade) {
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

        // timer
        var scoreBackground = new cc.Sprite(res.score_png);
        scoreBackground.x = MW.WIDTH - 95;
        scoreBackground.y = MW.HEIGHT - 42;
        this.addChild(scoreBackground, 1);
        var gradeTime = this.getGradeTime(grade);
        var score = new cc.LabelTTF(gradeTime.toFixed(2), "Arial", 15, cc.size(111, 41), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        score.x = scoreBackground.x;
        score.y = scoreBackground.y;
        this.addChild(score, 0);
        this.schedule(this.countdown.bind(this, score, gradeTime), this._countdownUnit, (gradeTime / this._countdownUnit) - 1, 0);

        // grades background
        var gradeHeight = 80;
        var gradesHeight = parseInt(grade / 2 + 0.5) * gradeHeight;
        // grade 九宫格 第一个rc参数是整体大小  第二个rc参数是中间区域的范围
        var backGrade = new cc.Scale9Sprite(res.backWhite_png,
            cc.rect(MW.BACK_WHITE.RC_OUT_X, MW.BACK_WHITE.RC_OUT_Y, MW.BACK_WHITE.RC_OUT_WIDTH, MW.BACK_WHITE.RC_OUT_HEIGHT),
            cc.rect(MW.BACK_WHITE.RC_IN_X, MW.BACK_WHITE.RC_IN_Y, MW.BACK_WHITE.RC_IN_WIDTH, MW.BACK_WHITE.RC_IN_HEIGHT));
        backGrade.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: MW.WIDTH / 2,
            y: 400 + gradesHeight / 2,
            width: 320,
            height: gradesHeight + 40
        });
        this.addChild(backGrade, 1);

        // 展示方格
        var numQueue = this.shuffle(MW.NUMBER);
        var imgQueue = this.shuffle(MW.NUMBER);
        var resQueue = this.getResultQueue(numQueue, imgQueue, grade);
        cc.log('img queue: ' + JSON.stringify(imgQueue));
        cc.log('res queue: ' + JSON.stringify(resQueue));
        for (var key in resQueue) {
            this._shapeColumn = this._shapeIndex % 2;
            this._shapeRow = parseInt(this._shapeIndex / 2);
            var shapeX = 130 + 145 * this._shapeColumn;
            var shapeY = backGrade.y - gradeHeight * this._shapeRow - 20;
            // 图形
            var shape = new cc.Sprite(res['shape' + resQueue[key].toString() + '_png']);
            shape.attr({
                anchorX: 0,
                anchorY: 1,
                x: shapeX,
                y: shapeY
            });
            this._shapeIndex++;
            this.addChild(shape, 2);
            // 数字
            var num = new cc.LabelTTF(resQueue[key].toString(), "Arial", 50, cc.size(MW.SHAPE.WIDTH, MW.SHAPE.HEIGHT), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            num.attr({
                anchorX: 0,
                anchorY: 1,
                x: shapeX,
                y: shapeY
            });
            num.setColor(cc.color('#ffffff'));
            this.addChild(num, 3);
        }

        // answer
        var answer = new cc.MenuItemImage(res.answerNormal_png, res.answerSelected_png, this.onAnswer, this);
        var menuAnswer = new cc.Menu(answer);
        menuAnswer.x = MW.WIDTH / 2;
        menuAnswer.y = 75;
        this.addChild(menuAnswer, 2);

        return true;
    },
    getGradeTime: function (grade) {
        return MW.GRADE_TIME['DIGITAL' + grade.toString()];
    },
    getResultQueue: function (numQueue, imageQueue, grade) {
        var resQueue = {};
        for (var i = 0; i < grade; i++) {
            resQueue[numQueue[i].toString()] = imageQueue[i];
        }
        return resQueue;
    },
    shuffle: function (arr) {
        var res = arr.slice();
        res.sort(function () {
            return Math.random() > .5 ? -1 : 1;
        });
        return res;
    },
    countdown: function(score, gradeTime) {
        this._countdown += this._countdownUnit;
        //cc.log('gradeTime: ' + gradeTime + '   countdown: ' + this._countdown);
        var timeLeft = gradeTime - this._countdown;
        if (timeLeft <= 0) {
            timeLeft = 0.0;
            this.unscheduleAllCallbacks();
            this.onAnswer();
        }
        score.setString(timeLeft.toFixed(2));
    },
    onBackCallback: function (pSender) {
        var scene = new cc.Scene();
        scene.addChild(new SysMenu());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    onAnswer: function (pSender) {
        var scene = new cc.Scene();
        scene.addChild(new PlayLayer());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }
});