class PropView extends egret.Sprite{

	private propViewController:PropViewController;

	public constructor() {
		super();
	}

	public createView() {
		var girdSideLength = (GameData.STAGE_WIDTH - 40)/GameData.MAX_UNITS_WIDTH*1.2;
		var paddingRow = (GameData.STAGE_WIDTH-4*girdSideLength)/5;
		var paddingCol = 0.5*girdSideLength;

		/**第一个道具视图，随机消除一种元素 */
		var propOne:PropElement = new PropElement();
		var bmpPropOne:egret.Bitmap = new egret.Bitmap();
		var propOneNum:egret.TextField = new egret.TextField();
		propOne.propNum = GameData.propsNum[0];
		propOneNum.textColor = 0xDC143C;
		propOneNum.bold = true;
		propOneNum.text = ""+propOne.propNum;
		propOne.text = propOneNum;
		propOne.width = girdSideLength;
		propOne.height = girdSideLength;
		propOne.x = paddingRow;
		propOne.y = paddingCol;
		bmpPropOne.width = girdSideLength;
		bmpPropOne.height = girdSideLength;
		bmpPropOne.texture = RES.getRes("prop_one_png");
		propOne.bmp = bmpPropOne;
		propOne.addChild(bmpPropOne);
		propOneNum.size = girdSideLength*0.5;
		propOne.addChild(propOneNum);
		GameData.propElements.push(propOne);
		this.addChild(propOne);

		/**第二种道具视图，随机消除一行元素 */
		var propTwo:PropElement = new PropElement();
		var bmpPropTwo:egret.Bitmap = new egret.Bitmap();
		var propTwoNum:egret.TextField = new egret.TextField();
		propTwo.propNum = GameData.propsNum[1];
		propTwoNum.textColor = 0xDC143C;
		propTwoNum.bold = true;
		propTwoNum.text = ""+propTwo.propNum;
		propTwo.text = propTwoNum;
		propTwo.width = girdSideLength;
		propTwo.height = girdSideLength;
		propTwo.x = 2*paddingRow+girdSideLength;
		propTwo.y = paddingCol;
		bmpPropTwo.width = girdSideLength;
		bmpPropTwo.height = girdSideLength;
		bmpPropTwo.texture = RES.getRes("prop_row_png");
		propTwo.bmp = bmpPropTwo;
		propTwo.addChild(bmpPropTwo);
		propTwoNum.size = girdSideLength*0.5;
		propTwo.addChild(propTwoNum);
		GameData.propElements.push(propTwo);
		this.addChild(propTwo);

		/**第三种道具视图，随机消除一列元素 */
		var propThree:PropElement = new PropElement();
		var bmpPropThree:egret.Bitmap = new egret.Bitmap();
		var propThreeNum:egret.TextField = new egret.TextField();
		propThree.propNum = GameData.propsNum[2];
		propThreeNum.textColor = 0xDC143C;
		propThreeNum.bold = true;
		propThreeNum.text = ""+propThree.propNum;
		propThree.text = propThreeNum;
		propThree.width = girdSideLength;
		propThree.height = girdSideLength;
		propThree.x = 3*paddingRow+2*girdSideLength;
		propThree.y = paddingCol;
		bmpPropThree.width = girdSideLength;
		bmpPropThree.height = girdSideLength;
		bmpPropThree.texture = RES.getRes("prop_column_png");
		propThree.bmp = bmpPropThree;
		propThree.addChild(bmpPropThree);
		propThreeNum.size = girdSideLength*0.5;
		propThree.addChild(propThreeNum);
		GameData.propElements.push(propThree);
		this.addChild(propThree);

		/**第四种道具视图，随机消除一个十字行列 */
		var propFour:PropElement = new PropElement();
		var bmpPropFour:egret.Bitmap = new egret.Bitmap();
		var propFourNum:egret.TextField = new egret.TextField();
		propFour.propNum = GameData.propsNum[3];
		propFourNum.textColor = 0xDC143C;
		propFourNum.bold = true;
		propFourNum.text = ""+propFour.propNum;
		propFour.text = propFourNum;
		propFour.width = girdSideLength;
		propFour.height = girdSideLength;
		propFour.x = 4*paddingRow+3*girdSideLength;
		propFour.y = paddingCol;
		bmpPropFour.width = girdSideLength;
		bmpPropFour.height = girdSideLength;
		bmpPropFour.texture = RES.getRes("prop_cross_png");
		propFour.bmp = bmpPropFour;
		propFour.addChild(bmpPropFour);
		propFourNum.size = girdSideLength*0.5;
		propFour.addChild(propFourNum);
		GameData.propElements.push(propFour);
		this.addChild(propFour);
	}

	public addOnPropTapListener() {
		this.propViewController = new PropViewController();
		this.propViewController.addPropElementListener();
	}
}