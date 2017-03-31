var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (evt) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    Main.prototype.onConfigComplete = function (evt) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("preload");
    };
    Main.prototype.onResourceLoadComplete = function (evt) {
        this.createGameScene();
    };
    Main.prototype.createGameScene = function () {
        GameData.STAGE_WIDTH = egret.MainContext.instance.stage.stageWidth;
        GameData.STAGE_HEIGHT = egret.MainContext.instance.stage.stageHeight;
        //console.log(GameData.STAGE_WIDTH+","+GameData.STAGE_HEIGHT);
        this.parser = new GameDataParser();
        this.parser.parseGameDataAndInit();
        this.view = new GameViewCreator(this);
        this.view.createGameView();
    };
    /**游戏结束 */
    Main.prototype.gameOver = function (evt) {
        console.log("游戏失败！");
        this.removeChildren();
        var bmp = new egret.Bitmap();
        bmp.texture = RES.getRes("gameover_png");
        bmp.width = GameData.STAGE_WIDTH;
        bmp.height = GameData.STAGE_HEIGHT;
        this.addChild(bmp);
    };
    /**进入下一关卡 */
    Main.prototype.toNextLevel = function (evt) {
        console.log("进入下一关！");
        GameData.passedLevelNum++;
        console.log("GameData.passedLevelNum：" + GameData.passedLevelNum);
        this.removeChildren();
        egret.Tween.removeAllTweens();
        this.clearGameData();
        this.createGameScene();
    };
    /**游戏通关 */
    Main.prototype.passGame = function (evt) {
        console.log("游戏通关！");
        this.removeChildren();
        // GameData.STAGE_WIDTH = egret.MainContext.instance.stage.stageWidth;
        // GameData.STAGE_HEIGHT = egret.MainContext.instance.stage.stageHeight;
        var bmp = new egret.Bitmap();
        bmp.texture = RES.getRes("gamesuccess_png");
        bmp.width = GameData.STAGE_WIDTH;
        bmp.height = GameData.STAGE_HEIGHT;
        this.addChild(bmp);
    };
    Main.prototype.clearGameData = function () {
        GameData.gameBgImg = "";
        GameData.elementTypes = [""];
        GameData.unusedMapUnits = [0];
        GameData.firstTouched = false;
        GameData.secondTouched = false;
        GameData.firstTouchedElementIndex = null;
        GameData.gameElements = null; //消除元素集合
        GameData.levelReqElements = null; //关卡元素集合
        GameData.propElements = null; //道具元素集合
        GameData.levelLimitNumElement = null;
        GameData.levelReqNum = null;
        GameData.levelReqStep = 0;
        GameData.usedElementTypes = [""];
        GameData.propsNum = null;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map