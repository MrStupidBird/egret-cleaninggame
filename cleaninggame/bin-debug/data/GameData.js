/** 游戏数据存储类 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    return GameData;
}());
/********舞台宽度和高度*********/
GameData.STAGE_WIDTH = 0;
GameData.STAGE_HEIGHT = 0;
/** MainView长宽最多格子数:8×8 **/
GameData.MAX_UNITS_WIDTH = 8;
GameData.MAX_UNITS_HEIGHT = 8;
GameData.levelNum = 5; //关卡总数
GameData.gameBgImg = ""; //主舞台背景图片	
GameData.elementTypes = [""]; //游戏可使用的所有消除元素类型
/**消除元素
 * 用户点击过程中做flag使用
 * */
GameData.firstTouched = false;
GameData.secondTouched = false;
GameData.firstTouchedElementIndex = null;
GameData.levelReqStep = 0; //当前关卡限制游戏【步数】
GameData.usedElementTypes = [""]; //当前关卡使用的消除元素类型
/**通关 */
GameData.passedLevelNum = 0;
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map