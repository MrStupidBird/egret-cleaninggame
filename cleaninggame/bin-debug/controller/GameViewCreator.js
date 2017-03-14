/****** 游戏视图生成器 ******/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameViewCreator = (function () {
    //private mainViewSpr:egret.Sprite;
    function GameViewCreator(spr) {
        this.spr = spr;
    }
    GameViewCreator.prototype.createGameView = function () {
        this.createBg();
        this.createMainViewBg();
        this.createMainView();
    };
    /** 生成背景图片 **/
    GameViewCreator.prototype.createBg = function () {
        if (!this.bmpBg) {
            this.bmpBg = new egret.Bitmap();
        }
        this.bmpBg.texture = RES.getRes(GameData.gameBgImg);
        this.bmpBg.width = GameData.STAGE_WIDTH;
        this.bmpBg.height = GameData.STAGE_WIDTH * 1.5;
        this.spr.addChild(this.bmpBg);
    };
    /** 生成MainView的背景 **/
    GameViewCreator.prototype.createMainViewBg = function () {
        if (!this.mainViewBg) {
            this.mainViewBg = new Array();
        }
        var girdSideLength = (GameData.STAGE_WIDTH - 40) / GameData.MAX_UNITS_WIDTH;
        var startY = GameData.STAGE_WIDTH * 1.5 * (1 / 5);
        var girdBg;
        for (var j = 0; j < GameData.MAX_UNITS_HEIGHT; j++) {
            for (var i = 0; i < GameData.MAX_UNITS_WIDTH; i++) {
                if (GameData.mapUnitsData[j * GameData.MAX_UNITS_WIDTH + i] != -1) {
                    if (this.mainViewBg.length < (j * GameData.MAX_UNITS_WIDTH + i + 1)) {
                        girdBg = new egret.Bitmap();
                        this.mainViewBg.push(girdBg);
                    }
                    else {
                        girdBg = this.mainViewBg[j * GameData.MAX_UNITS_WIDTH + i];
                    }
                    girdBg.width = girdSideLength;
                    girdBg.height = girdSideLength;
                    girdBg.x = 20 + girdSideLength * i;
                    girdBg.y = startY + girdSideLength * j;
                    girdBg.texture = RES.getRes("bg_png");
                    this.spr.addChild(girdBg);
                }
            }
        }
    };
    /** 生成MainView **/
    GameViewCreator.prototype.createMainView = function () {
        this.mainView = new MainView();
        this.mainView.y = GameData.STAGE_WIDTH * 1.5 * (1 / 5);
        this.mainView.createView();
        this.spr.addChild(this.mainView);
    };
    return GameViewCreator;
}());
__reflect(GameViewCreator.prototype, "GameViewCreator");
//# sourceMappingURL=GameViewCreator.js.map