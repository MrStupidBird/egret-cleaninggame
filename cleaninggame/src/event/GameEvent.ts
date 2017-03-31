class GameEvent extends egret.Event{

	public static GAME_OVER:string = "game over";
	public static TO_NEXT_LEVEL:string = "to next level";
	public static Pass_Game:string = "pass the game";

	public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false){
		super(type,bubbles,cancelable);
	}

}