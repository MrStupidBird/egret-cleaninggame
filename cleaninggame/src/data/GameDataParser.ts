
/** 游戏资源数据解析器 **/

class GameDataParser {
	public constructor() {
	}

	public parseGameDataAndInit() {
		/**消除元素可使用的类型列表 */
		GameData.elementTypes = ["hero0_png","hero1_png","hero2_png","hero3_png","hero4_png","hero5_png"];

		/**游戏关卡对应Json文件 */
		var levels:string[] = ["round1_json","round2_json","round3_json","round4_json","round5_json"];

		/**消除元素集合初始化 */
		GameData.gameElements = new Array();		
		for(var i=0;i<64;i++) {
			GameData.gameElements[i] = null;
		}

		/**关卡元素(集合)初始化 */
		GameData.levelReqElements = new Array();
		GameData.levelLimitNumElement = new LevelLimitNumElement();

		
		/**道具元素集合初始化 */
		GameData.propElements = new Array();		
		
		/**从Json文件中解析关卡数据 */
		var roundData = RES.getRes(levels[GameData.passedLevelNum]);   
		for(var i=0;i<roundData.element;i++) {
			GameData.usedElementTypes[i] = GameData.elementTypes[i]; //对当前关卡使用到的消除元素类型进行初始化
		}
		GameData.gameBgImg = roundData.levelbgimg;  //获取关卡背景图片
		GameData.unusedMapUnits = roundData.map;    //初始化64个地图单位使用情况
		GameData.propsNum = roundData.propnum;      //初始化道具数量
		GameData.levelReqNum = roundData.levelreq;  //初始化当前关卡各个特定元素需要被消除的次数
		GameData.levelReqStep = roundData.step;     //当前关卡限制游戏【步数】
	}

}