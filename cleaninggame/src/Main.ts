class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(evt:egret.EventDispatcher) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
    }

    private onConfigComplete(evt:RES.ResourceEvent) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.loadGroup("preload");
    }

    private onResourceLoadComplete(evt:RES.ResourceEvent) {
        this.createGameScene();
    }

    private view:GameViewCreator;
    private parser:GameDataParser;

    private createGameScene() {
        GameData.STAGE_WIDTH = egret.MainContext.instance.stage.stageWidth;
        GameData.STAGE_HEIGHT = egret.MainContext.instance.stage.stageHeight;
        //console.log(GameData.STAGE_WIDTH+","+GameData.STAGE_HEIGHT);
        this.parser = new GameDataParser();
        this.parser.parseGameDataAndInit();
        this.view = new GameViewCreator(this);
        this.view.createGameView();
    }

    /**游戏结束 */
    public gameOver(evt:GameEvent) {
        console.log("游戏失败！");
        this.removeChildren();
        var bmp:egret.Bitmap = new egret.Bitmap();
        bmp.texture = RES.getRes("gameover_png");
        bmp.width = GameData.STAGE_WIDTH;
        bmp.height = GameData.STAGE_HEIGHT;
        this.addChild(bmp);
    }

    /**进入下一关卡 */
    public toNextLevel(evt:GameEvent) {
        console.log("进入下一关！");
        GameData.passedLevelNum++;
        console.log("GameData.passedLevelNum："+GameData.passedLevelNum);
        this.removeChildren();
        egret.Tween.removeAllTweens();
        this.clearGameData();
        this.createGameScene();
    }

    /**游戏通关 */
    public passGame(evt:GameEvent) {
        console.log("游戏通关！");
        this.removeChildren();
        // GameData.STAGE_WIDTH = egret.MainContext.instance.stage.stageWidth;
        // GameData.STAGE_HEIGHT = egret.MainContext.instance.stage.stageHeight;
        var bmp:egret.Bitmap = new egret.Bitmap();
        bmp.texture = RES.getRes("gamesuccess_png");
        bmp.width = GameData.STAGE_WIDTH;
        bmp.height = GameData.STAGE_HEIGHT;
        this.addChild(bmp);
    }

    private clearGameData() {
        GameData.gameBgImg = "";
        GameData.elementTypes = [""];
        GameData.unusedMapUnits = [0];
        GameData.firstTouched = false;
	    GameData.secondTouched = false;
	    GameData.firstTouchedElementIndex = null;
        GameData.gameElements = null; //消除元素集合
	    GameData.levelReqElements = null;  //关卡元素集合
	    GameData.propElements = null;  //道具元素集合
        GameData.levelLimitNumElement = null;
        GameData.levelReqNum = null;
        GameData.levelReqStep = 0;
        GameData.usedElementTypes = [""];
        GameData.propsNum = null;
    }
}