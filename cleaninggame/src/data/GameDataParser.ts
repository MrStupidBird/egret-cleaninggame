
/** 游戏资源数据解析器 **/

class GameDataParser {
	public constructor() {
	}

	public parseGameData() {
		GameData.elementTypes = ["hero0_png","hero1_png","hero2_png","hero3_png","hero4_png","hero5_png"];

		var roundData = RES.getRes("round1_json");
		GameData.levelReqStep = roundData.step;
		var num = roundData.element;
		for(var i=0;i<num;i++) {
			GameData.usedElementTypes[i] = GameData.elementTypes[i];
			console.log(GameData.usedElementTypes[i]);
		}
		GameData.gameBgImg = roundData.levelbgimg;
		var arr = roundData.map;
		for(var i = 0;i<arr.length;i++) {
			GameData.mapUnitsData[arr[i]] = -1;
		}
	}

}