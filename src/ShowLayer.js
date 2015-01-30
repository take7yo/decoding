var ShowLayer = cc.Layer.extend({
    _shapeIndex: 0,
    _shapeColumn: 0,
    _shapeRow: 0,
    ctor: function (mode, grade) {
        this._super();
        this.init(mode, grade);
    },
    init: function (mode, grade) {
        var winSize = cc.director.getWinSize();
        var sp = new cc.Sprite(res.loading_png);
        sp.anchorX = 0;
        sp.anchorY = 0;
        sp.scale = MW.SCALE;
        this.addChild(sp, 0, 1);
        // 展示东西
        var gradeTime = this.getGradeTime(grade);
        var numQueue = this.shuffle(MW.NUMBER);
        var imgQueue = this.shuffle(MW.NUMBER);
        cc.log('num queue: ' + numQueue);
        cc.log('num queue: ' + imgQueue);
        var resQueue = this.getResultQueue(numQueue, imgQueue, grade);
        cc.log('num queue: ' + JSON.stringify(resQueue));
        for (var key in resQueue) {
            this._shapeColumn = this._shapeIndex % 3;
            this._shapeRow = parseInt(this._shapeIndex / 3);
            var shape = new cc.Sprite(res['shape' + resQueue[key].toString() + '_png']);
            shape.attr({
                anchorX: 0,
                anchorY: 0,
                x: 30 + 150 * this._shapeColumn,
                y: winSize.height - 100 * (this._shapeRow + 1),
                scale: MW.SCALE
            });
            this._shapeIndex++;
            this.addChild(shape, 10, 1);
        }

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
    }
});