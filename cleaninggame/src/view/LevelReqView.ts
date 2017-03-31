class LevelReqView extends egret.Sprite{
	public constructor() {
		super();
	}

	public createView() {
		this.initLevelReqElements();
		this.createLimitNumView();
	}

	private initLevelReqElements() {
		var length = GameData.usedElementTypes.length;
		var girdSideLength = (GameData.STAGE_WIDTH - 40)/GameData.MAX_UNITS_WIDTH;
		var MainViewY = GameData.STAGE_WIDTH*0.3;
		var padding = (MainViewY-2*girdSideLength)/3;
		for(var i=0;i<length;i++) {
			var levelReqElement:LevelReqElement = new LevelReqElement(GameData.levelReqNum[i]);
			levelReqElement.type = GameData.usedElementTypes[i];
			var txt:egret.TextField = new egret.TextField();
			txt.size = 0.4*girdSideLength;
			txt.bold = true;
			txt.textColor = 0xFFFFF0;
			txt.text = ""+levelReqElement.num;
			levelReqElement.text = txt;
			var bmp:egret.Bitmap = new egret.Bitmap();				
			levelReqElement.width = girdSideLength;
			levelReqElement.height = girdSideLength;
			if(i>=0 && i<=2) {
				levelReqElement.x = 40+i*20+i*girdSideLength;
				levelReqElement.y = padding;
			} else {
				levelReqElement.x = 40+(i-3)*20+(i-3)*girdSideLength;
				levelReqElement.y = 2*padding+girdSideLength;
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
	}

	private createLimitNumView() {
		var girdSideLength = (GameData.STAGE_WIDTH - 40)/GameData.MAX_UNITS_WIDTH;
		var bmp:egret.Bitmap = new egret.Bitmap();
		var MainViewY = GameData.STAGE_WIDTH*0.3;
		bmp.width = 2*girdSideLength;
		bmp.height = bmp.width;
		bmp.texture = RES.getRes("LevReqNum_png");
		GameData.levelLimitNumElement.bmp = bmp;
		GameData.levelLimitNumElement.addChild(bmp);
		GameData.levelLimitNumElement.num = GameData.levelReqStep;
		var txt:egret.TextField = new egret.TextField();
		txt.x = 0.35*bmp.width;
		txt.y = 0.3*bmp.height;
		txt.size = 0.5*girdSideLength;
		txt.bold = true;
		txt.textColor = 0xFFFFF0;
		txt.text = ""+GameData.levelLimitNumElement.num;
		GameData.levelLimitNumElement.text = txt;
		GameData.levelLimitNumElement.addChild(GameData.levelLimitNumElement.text);
		GameData.levelLimitNumElement.x = GameData.STAGE_WIDTH - 20 - 3*girdSideLength;
		GameData.levelLimitNumElement.y = (MainViewY-2*girdSideLength)/2;
		this.addChild(GameData.levelLimitNumElement);
	}

}