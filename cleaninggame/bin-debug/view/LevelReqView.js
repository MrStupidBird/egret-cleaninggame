var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LevelReqView = (function (_super) {
    __extends(LevelReqView, _super);
    function LevelReqView() {
        return _super.call(this) || this;
    }
    LevelReqView.prototype.createView = function () {
        this.initLevelReqElements();
        this.createLimitNumView();
    };
    LevelReqView.prototype.initLevelReqElements = function () {
        var length = GameData.usedElementTypes.length;
        var girdSideLength = (GameData.STAGE_WIDTH - 40) / GameData.MAX_UNITS_WIDTH;
        var MainViewY = GameData.STAGE_WIDTH * 0.3;
        var padding = (MainViewY - 2 * girdSideLength) / 3;
        for (var i = 0; i < length; i++) {
            var levelReqElement = new LevelReqElement(GameData.levelReqNum[i]);
            levelReqElement.type = GameData.usedElementTypes[i];
            var txt = new egret.TextField();
            txt.size = 0.4 * girdSideLength;
            txt.bold = true;
            txt.textColor = 0xFFFFF0;
            txt.text = "" + levelReqElement.num;
            levelReqElement.text = txt;
            var bmp = new egret.Bitmap();
            levelReqElement.width = girdSideLength;
            levelReqElement.height = girdSideLength;
            if (i >= 0 && i <= 2) {
                levelReqElement.x = 40 + i * 20 + i * girdSideLength;
                levelReqElement.y = padding;
            }
            else {
                levelReqElement.x = 40 + (i - 3) * 20 + (i - 3) * girdSideLength;
                levelReqElement.y = 2 * padding + girdSideLength;
            }
            bmp.width = girdSideLength;
            bmp.height = girdSideLength;
            bmp.texture = RES.getRes(levelReqElement.type);
            levelReqElement.bmp = bmp;
            levelReqElement.addChild(bmp);
            levelReqElement.addChild(levelReqElement.text);
            GameData.levelReqElements.push(levelReqElement);
            this.addChild(levelReqElement);
        }
    };
    LevelReqView.prototype.createLimitNumView = function () {
        var girdSideLength = (GameData.STAGE_WIDTH - 40) / GameData.MAX_UNITS_WIDTH;
        var bmp = new egret.Bitmap();
        var MainViewY = GameData.STAGE_WIDTH * 0.3;
        bmp.width = 2 * girdSideLength;
        bmp.height = bmp.width;
        bmp.texture = RES.getRes("LevReqNum_png");
        GameData.levelLimitNumElement.bmp = bmp;
        GameData.levelLimitNumElement.addChild(bmp);
        GameData.levelLimitNumElement.num = GameData.levelReqStep;
        var txt = new egret.TextField();
        txt.x = 0.35 * bmp.width;
        txt.y = 0.3 * bmp.height;
        txt.size = 0.5 * girdSideLength;
        txt.bold = true;
        txt.textColor = 0xFFFFF0;
        txt.text = "" + GameData.levelLimitNumElement.num;
        GameData.levelLimitNumElement.text = txt;
        GameData.levelLimitNumElement.addChild(GameData.levelLimitNumElement.text);
        GameData.levelLimitNumElement.x = GameData.STAGE_WIDTH - 20 - 3 * girdSideLength;
        GameData.levelLimitNumElement.y = (MainViewY - 2 * girdSideLength) / 2;
        this.addChild(GameData.levelLimitNumElement);
    };
    return LevelReqView;
}(egret.Sprite));
__reflect(LevelReqView.prototype, "LevelReqView");
//# sourceMappingURL=LevelReqView.js.map