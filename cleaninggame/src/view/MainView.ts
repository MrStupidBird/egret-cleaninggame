
/**游戏主要操作界面，共可以有8×8=64个小格，对应最多有64个可移动的游戏元素单位**/

class MainView extends egret.Sprite{

	private _mainViewController:MainViewController; 
	private _main:Main;

	public constructor(main:Main) {
		super();
		this._main = main;
	}	

	public addGameEventListener() {
		this.addEventListener(GameEvent.GAME_OVER,this._main.gameOver,this._main);
		this.addEventListener(GameEvent.TO_NEXT_LEVEL,this._main.toNextLevel,this._main);
		this.addEventListener(GameEvent.Pass_Game,this._main.passGame,this._main);
	}

	public order(event:string) {
		var evt:GameEvent = new GameEvent(event);
		this.dispatchEvent(evt);
	}

	public createView() {		
		var girdSideLength = (GameData.STAGE_WIDTH - 40)/GameData.MAX_UNITS_WIDTH;
		var girdBg:egret.Bitmap;
		var girdElement:GameElement;
		for(var j=0;j<GameData.MAX_UNITS_HEIGHT;j++) {
			for(var i=0;i<GameData.MAX_UNITS_WIDTH;i++) {
				if(!this.isUnusedUnit(j*GameData.MAX_UNITS_WIDTH+i)) {
					
					girdElement = new GameElement();
					girdElement.type = GameData.usedElementTypes[this.getTypeNum()];
					girdElement.location = i+j*GameData.MAX_UNITS_WIDTH;
					GameData.gameElements[j*GameData.MAX_UNITS_WIDTH+i] = girdElement;

					girdElement.width = girdSideLength;
					girdElement.height = girdSideLength;
					girdElement.x = 20+girdSideLength*i;
					girdElement.y = girdSideLength*j;
					girdBg = new egret.Bitmap();
					girdBg.width = girdSideLength;
					girdBg.height = girdSideLength;
					girdBg.texture = RES.getRes(girdElement.type);
					//console.log("girdElement.type: "+girdElement.type);
					girdElement.bmp = girdBg;

					girdElement.addChild(girdBg);
					this.addChild(girdElement);
				}
			}
		}	
	}

	/** 正式开始游戏前的预清理 **/
	public preClean() {
		this._mainViewController = new MainViewController(this,this);
		this._mainViewController.preClean();
		this._mainViewController.addElementListenser();
	}

	/** 生成随机类型的游戏元素 **/
	private getTypeNum():number {
		var n = Math.random();
		while(n>=(0.1*GameData.usedElementTypes.length)) {
			n = Math.random();
		}
		//console.log("getTypeNum():"+Math.floor(n*10));
		return Math.floor(n*10);
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