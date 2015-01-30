var AboutLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        var sp = new cc.Sprite(res.loading_png);
        sp.anchorX = 0;
        sp.anchorY = 0;
        sp.scale = MW.SCALE;
        this.addChild(sp, 0, 1);

        //var cacheImage = cc.textureCache.addImage(res.menuTitle_png);
        //var title = new cc.Sprite(cacheImage, cc.rect(0, 40, 120, 38));
        //title.x = winSize.width / 2;
        //title.y = winSize.height - 60;
        //this.addChild(title);

        var title = new cc.LabelTTF("游戏说明", "Arial", 23, cc.size(MW.WIDTH * 1.25, 0), cc.TEXT_ALIGNMENT_CENTER);
        title.attr({
            x: winSize.width / 2,
            y: MW.HEIGHT - 100,
            anchorX: 0.5,
            anchorY: 0.5
        });
        title.setColor(cc.color(MW.FONTCOLOR));
        this.addChild(title);

        // There is a bug in LabelTTF native. Apparently it fails with some unicode chars.
        var desc = "    舒尔特表是全世界范围内最简单、最有效也是最科学的注意力训练方法。在规定时间内按顺序从小到大点击数字，所用时间越短，注意力水平越高。\n\n";
        desc += "    舒尔特表的主要作用如下：\n";
        desc += "    ·培养注意力集中、分配、控制能力;\n";
        desc += "    ·拓展视幅、加快视频;\n";
        desc += "    ·提高视觉的稳定性、辨别力、定向搜索能力。\n\n";
        desc += "    如果你每天都坚持练习几分钟，除了会增加注意力以外，更重要的是会拓展你的视幅，该项技能对你快速阅读能力的提高非常有帮助。";
        var about = new cc.LabelTTF(desc, "Arial", 16, cc.size(MW.WIDTH * 0.85, 0), cc.TEXT_ALIGNMENT_LEFT);
        about.attr({
            x: winSize.width / 2,
            y: MW.HEIGHT / 2 + 30,
            anchorX: 0.5,
            anchorY: 0.5
        });
        about.setColor(cc.color(MW.FONTCOLOR));
        this.addChild(about);

        //var label = new cc.LabelTTF("Go back", "Arial", 21);
        //label.setColor(cc.color(MW.FONTCOLOR));
        //var back = new cc.MenuItemLabel(label, this.onBackCallback);
        var back = new cc.MenuItemImage(res.CloseNormal_png, res.CloseSelected_png, this.onBackCallback, this);
        //back.attr({
        //    x: winSize.width - 20,
        //    y: 20,
        //    anchorX: 0.5,
        //    anchorY: 0.5
        //});
        var menu = new cc.Menu(back);
        menu.x = winSize.width - 30;
        menu.y = MW.HEIGHT - 30;
        this.addChild(menu);

        return true;
    },
    onBackCallback: function (pSender) {
        var scene = new cc.Scene();
        scene.addChild(new SysMenu());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }
});
