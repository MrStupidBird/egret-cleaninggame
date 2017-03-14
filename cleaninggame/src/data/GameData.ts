
/** 游戏数据存储类 **/

class GameData {
	/********舞台宽度和高度*********/
	public static STAGE_WIDTH:number = 0; 
	public static STAGE_HEIGHT:number = 0;

	/** MainView长宽最多格子数:8×8 **/
	public static MAX_UNITS_WIDTH:number = 8;
	public static MAX_UNITS_HEIGHT:number = 8;

	public static gameBgImg:string = "";
	// public static unusedMapData:number[] = [0];  //当前关卡64格地图中不予使用的格子
	public static levelReqStep:number = 0;   //当前关卡限制游戏步数
	public static usedElementTypes:string[] = [""];   //当前关卡使用的消除元素类型
	public static elementTypes:string[] = [""];  //游戏可使用的所有消除元素类型
	public static mapUnitsData:number[] = [0];  //记录64个地图单位使用情况，-1为不可使用
	
}