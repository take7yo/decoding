var ShapeSprite = cc.Sprite.extend({
    _shapeSprite: null,
    _numLabel: null,
    _coverSprite: null,
    _mode: MW.MODE.EASY,
    _shapePng: 'shape0',
    _num: 0,
    _listener: null,
    _rect: null,
    ctor: function (mode, rect, shapePng, num) {
        this._super();
        this.anchorX = 0;
        this.anchorY = 0;
        this.x = rect.x;
        this.y = rect.y;
        this._mode = mode;
        this._shapePng = shapePng;
        this._num = num;
        this.width = rect.width;
        this.height = rect.height;
        this._rect = rect;
        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });
        if (MW.MODE.EASY != this._mode) {
            cc.eventManager.addListener(this._listener, this);
        }
        this.init();
    },
    init: function () {
        this.createShapeSprite();
        this.createNumLabel();
        if (this._mode != MW.MODE.EASY) {
            this.createCoverSprite();
        }
        //cc.log('num: ' + this._num + '  x: ' + this.x + '  y: ' + this.y + '  nx: ' + this._shapeSprite.x + '  ny: ' + this._shapeSprite.y);
    },
    createShapeSprite: function () {
        this._shapeSprite = new cc.Sprite(this._shapePng);
        this.addChild(this._shapeSprite, 0, ShapeSprite.TAG.SHAPE_SPRITE);
    },
    createNumLabel: function () {
        this._numLabel = new cc.LabelTTF('', "Arial", MW.FONT_SIZE, cc.size(MW.SHAPE.WIDTH, MW.SHAPE.HEIGHT), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._numLabel, 1, ShapeSprite.TAG.NUMBER_LABEL);
    },
    createCoverSprite: function () {
        this._coverSprite = new cc.Sprite(res.shapeCover_png);
        this.addChild(this._coverSprite, 2, ShapeSprite.TAG.COVER_SPRITE);
    },
    getNumberLabelString: function () {
        return this._numLabel.getString();
    },
    setNumberLabelString: function (numStr) {
        this._numLabel.setString(numStr);
    },
    addCoverSprite: function () {
        this.addChild(this._coverSprite, 2, ShapeSprite.TAG.COVER_SPRITE);
        cc.eventManager.addListener(this._listener, this);
    },
    rect: function () {
        return cc.rect(-this._rect.width / 2, -this._rect.height / 2, this._rect.width, this._rect.height);
    },
    containsTouchLocation: function (touch) {
        var touchPoint = touch.getLocation();
        var myRect = this.rect();

        myRect.x += this.x;
        myRect.y += this.y;
        return cc.rectContainsPoint(myRect, touchPoint);
    },
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        if (!target.containsTouchLocation(touch)) return false;
        cc.log('target num: ' + target._num);
        // 翻牌
        var doneShapeSprites = target.parent._doneShapeSprites;
        if (target._mode != MW.MODE.EASY && target.getChildByTag(ShapeSprite.TAG.COVER_SPRITE)) {
            target.removeChildByTag(ShapeSprite.TAG.COVER_SPRITE);
            var preShapeSprite = doneShapeSprites.pop();
            if (preShapeSprite) {
                if (!preShapeSprite._numLabel.getString()) {
                    preShapeSprite.addCoverSprite();
                } else {
                    doneShapeSprites.push(preShapeSprite);
                }
            }
        }

        target.parent._curShapeSprite = target;
        doneShapeSprites.push(target);
        //target.parent._hasNextShapeSprite = (doneShapeSprites.length < target.parent._grade);

        return true;
    },
    onTouchMoved: function (touch, event) {
        cc.log('onTouchMoved. do nothing');
    },
    onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        cc.eventManager.removeListener(target._listener);
        cc.log('remove listener of num ' + target._num);
    }
});

ShapeSprite.TAG = {
    SHAPE_SPRITE: 0,
    NUMBER_LABEL: 1,
    COVER_SPRITE: 2
};