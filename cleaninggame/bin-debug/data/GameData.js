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
GameData.gameBgImg = "";
// public static unusedMapData:number[] = [0];  //当前关卡64格地图中不予使用的格子
GameData.levelReqStep = 0; //当前关卡限制游戏步数
GameData.usedElementTypes = [""]; //当前关卡使用的消除元素类型
GameData.elementTypes = [""]; //游戏可使用的所有消除元素类型
GameData.mapUnitsData = [0]; //记录64个地图单位使用情况，-1为不可使用
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map