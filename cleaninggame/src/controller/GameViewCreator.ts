
/****** 游戏视图生成器 ******/

class GameViewCreator {
	
	private spr:egret.DisplayObjectContainer;
	private bmpBg:egret.Bitmap;
	private mainViewBg:egret.Bitmap[];
	private mainView:MainView;
	//private mainViewSpr:egret.Sprite;

	public constructor(spr:egret.DisplayObjectContainer) {
		this.spr = spr;
	}

	public createGameView() {
		this.createBg();
		this.createMainViewBg();
		this.createMainView();
	}

	/** 生成背景图片 **/
	private createBg() {
		if(!this.bmpBg) {
			this.bmpBg = new egret.Bitmap();
		}	
		this.bmpBg.texture = RES.getRes(GameData.gameBgImg);
		this.bmpBg.width = GameData.STAGE_WIDTH;
		this.bmpBg.height = GameData.STAGE_WIDTH*1.5;		
		this.spr.addChild(this.bmpBg);
	}

	/** 生成MainView的背景 **/
	private createMainViewBg() {
		if(!this.mainViewBg) {
			this.mainViewBg = new Array();
		}
		var girdSideLength = (GameData.STAGE_WIDTH - 40)/GameData.MAX_UNITS_WIDTH;
		var startY = GameData.STAGE_WIDTH*1.5*(1/5);
		var girdBg:egret.Bitmap;
		for(var j=0;j<GameData.MAX_UNITS_HEIGHT;j++) {
			for(var i=0;i<GameData.MAX_UNITS_WIDTH;i++) {
				if(GameData.mapUnitsData[j*GameData.MAX_UNITS_WIDTH+i] != -1) {
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
					this.spr.addChild(girdBg);
				}
			}
		}
	}

	/** 生成MainView **/
	private createMainView() {
		this.mainView = new MainView();
		this.mainView.y = GameData.STAGE_WIDTH*1.5*(1/5);
		this.mainView.createView();
		this.spr.addChild(this.mainView);
	}

}