var NumGridSprite = cc.Sprite.extend({
    _sprite: null,
    _label: null,
    _num: 0,
    _listener: null,
    _rect: null,
    ctor: function (rect, num) {
        this._super();
        this.anchorX = 0;
        this.anchorY = 0;
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;
        this._num = num;
        this._rect = rect;
        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });
        this.addListener();
        this.init();
    },
    init: function () {
        this.createNormalSprite();
        this.createLabel();
    },
    createNormalSprite: function () {
        this.addChild(new cc.Sprite(res.numNormal_png), 0, NumGridSprite.TAG.NORMAL);
    },
    createLabel: function () {
        this._label = new cc.LabelTTF(this._num.toString(), "Arial", MW.FONT_SIZE, cc.size(MW.SHAPE.WIDTH, MW.SHAPE.HEIGHT), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._label, 10);
    },
    addSelectedSprite: function () {
        this.addChild(new cc.Sprite(res.numSelected_png), 0, NumGridSprite.TAG.SELECTED);
    },
    addDisabledSprite: function () {
        this.addChild(new cc.Sprite(res.numDisabled_png), 0, NumGridSprite.TAG.SELECTED);
    },
    addListener: function() {
        cc.eventManager.addListener(this._listener, this);
    },
    removeNormalSprite: function () {
        this.removeChildByTag(NumGridSprite.TAG.NORMAL);
    },
    removeSelectedSprite: function () {
        this.removeChildByTag(NumGridSprite.TAG.SELECTED);
    },
    removeDisabledSprite: function () {
        this.removeChildByTag(NumGridSprite.TAG.DISABLED);
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
        if (MW.MODE.EASY == target.parent._mode) {
            target.parent._curShapeSprite = target.parent._shapeSprites.shift();
            target.parent._doneShapeSprites.push(target.parent._curShapeSprite);
        }
        var curShapeSprite = target.parent._curShapeSprite;
        if (!curShapeSprite) return false;

        curShapeSprite.setNumberLabelString(target._num.toString());
        target.addSelectedSprite();
        target.removeNormalSprite();

        return true;
    },
    onTouchMoved: function (touch, event) {
        cc.log('onTouchMoved. do nothing');
    },
    onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        target.addDisabledSprite();
        target.removeSelectedSprite();
        target.parent._curShapeSprite = null;
        cc.eventManager.removeListener(target._listener);
        cc.log('remove listener of button num ' + target._num);
    },
    setAvailable: function () {
        this.removeDisabledSprite();
        this.createNormalSprite();
        this.addListener();
    }
});

NumGridSprite.TAG = {
    NORMAL: 0,
    SELECTED: 1,
    DISABLED: 2
};