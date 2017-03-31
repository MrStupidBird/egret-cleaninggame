
/** 游戏数据存储类 **/

class GameData {
	/********舞台宽度和高度*********/
	public static STAGE_WIDTH:number = 0; 
	public static STAGE_HEIGHT:number = 0;

	/** MainView长宽最多格子数:8×8 **/
	public static MAX_UNITS_WIDTH:number = 8;
	public static MAX_UNITS_HEIGHT:number = 8;

	public static levelNum:number = 5;      //关卡总数
	public static gameBgImg:string = "";    //主舞台背景图片	
	public static elementTypes:string[] = [""];  //游戏可使用的所有消除元素类型
	public static unusedMapUnits:number[];  //记录64个地图单位使用情况，-1为不可使用
			
	/**消除元素
	 * 用户点击过程中做flag使用 
	 * */
	public static firstTouched:boolean = false;
	public static secondTouched:boolean = false;
	public static firstTouchedElementIndex:number = null;

	/**三大游戏元素集合 */
	public static gameElements:GameElement[]; //消除元素集合
	public static levelReqElements:LevelReqElement[];  //关卡元素集合
	public static propElements:PropElement[];  //道具元素集合
	public static levelLimitNumElement:LevelLimitNumElement;  //当前关卡限制游戏步数【元素】

	/**关卡元素 */
	public static levelReqNum:number[];   //当前关卡特定元素需要消除的次数
	public static levelReqStep:number = 0;   //当前关卡限制游戏【步数】
	public static usedElementTypes:string[] = [""];   //当前关卡使用的消除元素类型
	
	/**道具元素 */
	public static propsNum:number[];//道具数量集合

	/**通关 */
	public static passedLevelNum:number = 0;
	
}