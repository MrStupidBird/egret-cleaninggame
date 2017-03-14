/**游戏主要操作界面，共可以有8×8=64个小格，对应最多有64个可移动的游戏元素单位**/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        return _super.call(this) || this;
    }
    MainView.prototype.createView = function () {
        if (!this.gameElements) {
            this.gameElements = new Array();
        }
        if (!this.bmpElements) {
            this.bmpElements = new Array();
        }
        var girdSideLength = (GameData.STAGE_WIDTH - 40) / GameData.MAX_UNITS_WIDTH;
        var girdBg;
        var girdElement;
        for (var j = 0; j < GameData.MAX_UNITS_HEIGHT; j++) {
            for (var i = 0; i < GameData.MAX_UNITS_WIDTH; i++) {
                if (GameData.mapUnitsData[j * GameData.MAX_UNITS_WIDTH + i] != -1) {
                    if (this.gameElements.length < (j * GameData.MAX_UNITS_WIDTH + i + 1)) {
                        girdElement = new GameElement();
                        girdElement.type = GameData.usedElementTypes[this.getTypeNum()];
                        girdElement.location = i + j * GameData.MAX_UNITS_WIDTH;
                        this.gameElements.push(girdElement);
                    }
                    else {
                        girdElement = this.gameElements[j * GameData.MAX_UNITS_WIDTH + i];
                    }
                    girdBg = new egret.Bitmap();
                    girdBg.width = girdSideLength;
                    girdBg.height = girdSideLength;
                    girdBg.x = 20 + girdSideLength * i;
                    girdBg.y = girdSideLength * j;
                    girdBg.texture = RES.getRes(girdElement.type);
                    console.log("girdElement.type: " + girdElement.type);
                    this.addChild(girdBg);
                }
            }
        }
    };
    /** 生成随机类型的游戏元素 **/
    MainView.prototype.getTypeNum = function () {
        var n = Math.random();
        while (n >= (0.1 * GameData.usedElementTypes.length)) {
            n = Math.random();
        }
        console.log("getTypeNum():" + Math.floor(n * 10));
        return Math.floor(n * 10);
    };
    return MainView;
}(egret.Sprite));
__reflect(MainView.prototype, "MainView");
//# sourceMappingURL=MainView.js.map