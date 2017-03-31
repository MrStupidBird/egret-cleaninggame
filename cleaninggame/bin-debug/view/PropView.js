var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PropView = (function (_super) {
    __extends(PropView, _super);
    function PropView() {
        return _super.call(this) || this;
    }
    PropView.prototype.createView = function () {
        var girdSideLength = (GameData.STAGE_WIDTH - 40) / GameData.MAX_UNITS_WIDTH * 1.2;
        var paddingRow = (GameData.STAGE_WIDTH - 4 * girdSideLength) / 5;
        var paddingCol = 0.5 * girdSideLength;
        /**第一个道具视图，随机消除一种元素 */
        var propOne = new PropElement();
        var bmpPropOne = new egret.Bitmap();
        var propOneNum = new egret.TextField();
        propOne.propNum = GameData.propsNum[0];
        propOneNum.textColor = 0xDC143C;
        propOneNum.bold = true;
        propOneNum.text = "" + propOne.propNum;
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
        propOneNum.size = girdSideLength * 0.5;
        propOne.addChild(propOneNum);
        GameData.propElements.push(propOne);
        this.addChild(propOne);
        /**第二种道具视图，随机消除一行元素 */
        var propTwo = new PropElement();
        var bmpPropTwo = new egret.Bitmap();
        var propTwoNum = new egret.TextField();
        propTwo.propNum = GameData.propsNum[1];
        propTwoNum.textColor = 0xDC143C;
        propTwoNum.bold = true;
        propTwoNum.text = "" + propTwo.propNum;
        propTwo.text = propTwoNum;
        propTwo.width = girdSideLength;
        propTwo.height = girdSideLength;
        propTwo.x = 2 * paddingRow + girdSideLength;
        propTwo.y = paddingCol;
        bmpPropTwo.width = girdSideLength;
        bmpPropTwo.height = girdSideLength;
        bmpPropTwo.texture = RES.getRes("prop_row_png");
        propTwo.bmp = bmpPropTwo;
        propTwo.addChild(bmpPropTwo);
        propTwoNum.size = girdSideLength * 0.5;
        propTwo.addChild(propTwoNum);
        GameData.propElements.push(propTwo);
        this.addChild(propTwo);
        /**第三种道具视图，随机消除一列元素 */
        var propThree = new PropElement();
        var bmpPropThree = new egret.Bitmap();
        var propThreeNum = new egret.TextField();
        propThree.propNum = GameData.propsNum[2];
        propThreeNum.textColor = 0xDC143C;
        propThreeNum.bold = true;
        propThreeNum.text = "" + propThree.propNum;
        propThree.text = propThreeNum;
        propThree.width = girdSideLength;
        propThree.height = girdSideLength;
        propThree.x = 3 * paddingRow + 2 * girdSideLength;
        propThree.y = paddingCol;
        bmpPropThree.width = girdSideLength;
        bmpPropThree.height = girdSideLength;
        bmpPropThree.texture = RES.getRes("prop_column_png");
        propThree.bmp = bmpPropThree;
        propThree.addChild(bmpPropThree);
        propThreeNum.size = girdSideLength * 0.5;
        propThree.addChild(propThreeNum);
        GameData.propElements.push(propThree);
        this.addChild(propThree);
        /**第四种道具视图，随机消除一个十字行列 */
        var propFour = new PropElement();
        var bmpPropFour = new egret.Bitmap();
        var propFourNum = new egret.TextField();
        propFour.propNum = GameData.propsNum[3];
        propFourNum.textColor = 0xDC143C;
        propFourNum.bold = true;
        propFourNum.text = "" + propFour.propNum;
        propFour.text = propFourNum;
        propFour.width = girdSideLength;
        propFour.height = girdSideLength;
        propFour.x = 4 * paddingRow + 3 * girdSideLength;
        propFour.y = paddingCol;
        bmpPropFour.width = girdSideLength;
        bmpPropFour.height = girdSideLength;
        bmpPropFour.texture = RES.getRes("prop_cross_png");
        propFour.bmp = bmpPropFour;
        propFour.addChild(bmpPropFour);
        propFourNum.size = girdSideLength * 0.5;
        propFour.addChild(propFourNum);
        GameData.propElements.push(propFour);
        this.addChild(propFour);
    };
    PropView.prototype.addOnPropTapListener = function () {
        this.propViewController = new PropViewController();
        this.propViewController.addPropElementListener();
    };
    return PropView;
}(egret.Sprite));
__reflect(PropView.prototype, "PropView");
//# sourceMappingURL=PropView.js.map