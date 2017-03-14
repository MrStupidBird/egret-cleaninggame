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
        this.creatGameScene();
    }

    private view:GameViewCreator;
    private parser:GameDataParser;

    private creatGameScene() {
        GameData.STAGE_WIDTH = egret.MainContext.instance.stage.stageWidth;
        GameData.STAGE_HEIGHT = egret.MainContext.instance.stage.stageHeight;
        console.log(GameData.STAGE_WIDTH+","+GameData.STAGE_HEIGHT);
        this.parser = new GameDataParser();
        this.parser.parseGameData();
        this.view = new GameViewCreator(this);
        this.view.createGameView();
    }

}