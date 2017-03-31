
/****** 游戏视图生成器 ******/

class GameViewCreator {
	
	// private doc:egret.DisplayObjectContainer;
	private _main:Main;
	private bmpBg:egret.Bitmap;
	private mainViewBg:egret.Bitmap[];
	private mainView:MainView;
	private propView:PropView;
	private levelReqView:LevelReqView;
	private limitNumView:LevelLimitNumElement;

	public constructor(main:Main) {
		//this.doc = doc;
		this._main = main;
	}

	public createGameView() {
		this.createBg();  //创建游戏关卡背景
		this.createMainViewBg();   //创建MianView背景
		this.createMainView();   //创建MainView
		this.createPropView();   //创建PropView
		this.createLevelReqView();  //创建关卡要求视图
	}

	public clear() {	
		this._main.removeChildren();		
	}

	/** 生成背景图片 **/
	private createBg() {
		if(!this.bmpBg) {
			this.bmpBg = new egret.Bitmap();
		}	
		this.bmpBg.texture = RES.getRes(GameData.gameBgImg);
		this.bmpBg.width = GameData.STAGE_WIDTH;
		this.bmpBg.height = GameData.STAGE_WIDTH*1.5;		
		this._main.addChild(this.bmpBg);
	}

	/** 生成MainView的背景 **/
	private createMainViewBg() {
		if(!this.mainViewBg) {
			this.mainViewBg = new Array();
		}
		var girdSideLength = (GameData.STAGE_WIDTH - 40)/GameData.MAX_UNITS_WIDTH;
		var startY = GameData.STAGE_WIDTH*0.3;
		var girdBg:egret.Bitmap;
		for(var j=0;j<GameData.MAX_UNITS_HEIGHT;j++) {
			for(var i=0;i<GameData.MAX_UNITS_WIDTH;i++) {
				if(!this.isUnusedUnit(j*GameData.MAX_UNITS_WIDTH+i)) {
					if(this.mainViewBg.length < (j*GameData.MAX_UNITS_WIDTH+i+1)) {
						girdBg = new egret.Bitmap();
						this.mainViewBg.push(girdBg);
					} else {
						girdBg = this.mainViewBg[j*GameData.MAX_UNITS_WIDTH+i];
					}
					girdBg.width = girdSideLength;
					girdBg.height = girdSideLength;
					girdBg.x = 20+girdSideLength*i;
					girdBg.y = startY+girdSideLength*j;
					girdBg.texture = RES.getRes("bg_png");
					this._main.addChild(girdBg);
				}
			}
		}
	}

	/** 生成MainView **/
	private createMainView() {
		this.mainView = new MainView(this._main);
		this.mainView.y = GameData.STAGE_WIDTH*0.3;
		this.mainView.createView();
		this.mainView.preClean();
		this.mainView.addGameEventListener();
		this._main.addChild(this.mainView);
	}

	/** 生成PropView **/
	private createPropView() {
		var girdSideLength = (GameData.STAGE_WIDTH - 40)/GameData.MAX_UNITS_WIDTH;
		this.propView = new PropView();
		this.propView.y = GameData.STAGE_WIDTH*0.3+8*girdSideLength;
		this.propView.createView();
		this.propView.addOnPropTapListener();
		this._main.addChild(this.propView);
	}

	/**生成关卡要求视图 */
	private createLevelReqView() {
		this.levelReqView = new LevelReqView();
		this.levelReqView.createView();
		this._main.addChild(this.levelReqView);
	}

	/** 检验是否是不可用地图单元 **/
	private isUnusedUnit(num:number):boolean {
		for(var i=0;i<GameData.unusedMapUnits.length;i++) {
			if(num == GameData.unusedMapUnits[i]) {
				return true;
			}
		}
		return false;
	}
}