/** MainView元素控制器 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainViewController = (function () {
    function MainViewController(spr, mainView) {
        this.spr = spr;
        this._mainView = mainView;
    }
    /** 预“清理”可消除元素组合 **/
    MainViewController.prototype.clean = function () {
        for (var i = 0; i < GameData.gameElements.length; i++) {
            /**横向搜索 */
            var lineEleNumRow = this.getLinedElementsNumRowRight(i);
            if (lineEleNumRow >= 3) {
                for (var col = i; col < i + lineEleNumRow; col++) {
                    var tmpLineEleNumCol = this.getLinedElementsNumCol(col);
                    if (tmpLineEleNumCol >= 3) {
                        for (var t = col + 8; t < col + 8 * tmpLineEleNumCol; t = t + 8) {
                            GameData.gameElements[t].bmp.texture = null;
                            GameData.gameElements[t].type = "";
                        }
                    }
                    GameData.gameElements[col].bmp.texture = null;
                    GameData.gameElements[col].type = "";
                }
            }
            /**纵向搜索 */
            var lineEleNumCol = this.getLinedElementsNumCol(i);
            if (lineEleNumCol >= 3) {
                GameData.gameElements[i].bmp.texture = null;
                GameData.gameElements[i].type = "";
                for (var row = i + 8; row < i + 8 * lineEleNumCol; row = row + 8) {
                    var tmpLineEleNumRowRight = this.getLinedElementsNumRowRight(row);
                    var tmpLineEleNumRowLeft = this.getLinedElementsNumRowLeft(row);
                    if ((tmpLineEleNumRowLeft + tmpLineEleNumRowRight - 1) >= 3) {
                        /**消除左边元素 */
                        for (var m = row - 1; m > (row - tmpLineEleNumRowLeft); m--) {
                            GameData.gameElements[m].bmp.texture = null;
                            GameData.gameElements[m].type = "";
                        }
                        /**消除右边元素 */
                        for (var p = row + 1; p < row + tmpLineEleNumRowRight; p++) {
                            GameData.gameElements[p].bmp.texture = null;
                            GameData.gameElements[p].type = "";
                        }
                    }
                    GameData.gameElements[row].bmp.texture = null;
                    GameData.gameElements[row].type = "";
                }
            }
        }
    };
    /** 游戏进行过程中的消除操作，这里与游戏正式开始前的预清理阶段不同 **/
    MainViewController.prototype.cleanWhenPlaying = function () {
        for (var i = 0; i < GameData.gameElements.length; i++) {
            /**横向搜索 */
            var lineEleNumRow = this.getLinedElementsNumRowRight(i);
            if (lineEleNumRow >= 3) {
                this.operaOnLevelReqElement(GameData.gameElements[i].type);
                if (this.isPass() && (GameData.passedLevelNum == (GameData.levelNum - 1))) {
                    //发送事件Pass_Game
                    this._mainView.order(GameEvent.Pass_Game);
                }
                else if (this.isPass() && (GameData.passedLevelNum != (GameData.levelNum - 1))) {
                    //发送事件TO_NEXT_LEVEL
                    this._mainView.order(GameEvent.TO_NEXT_LEVEL);
                }
                for (var col = i; col < i + lineEleNumRow; col++) {
                    var tmpLineEleNumCol = this.getLinedElementsNumCol(col);
                    if (tmpLineEleNumCol >= 3) {
                        for (var t = col + 8; t < col + 8 * tmpLineEleNumCol; t = t + 8) {
                            GameData.gameElements[t].bmp.texture = null;
                            GameData.gameElements[t].type = "";
                        }
                    }
                    GameData.gameElements[col].bmp.texture = null;
                    GameData.gameElements[col].type = "";
                }
            }
            /**纵向搜索 */
            var lineEleNumCol = this.getLinedElementsNumCol(i);
            if (lineEleNumCol >= 3) {
                this.operaOnLevelReqElement(GameData.gameElements[i].type);
                if (this.isPass() && (GameData.passedLevelNum == (GameData.levelNum - 1))) {
                    //发送事件Pass_Game
                    this._mainView.order(GameEvent.Pass_Game);
                }
                else if (this.isPass() && (GameData.passedLevelNum != (GameData.levelNum - 1))) {
                    //发送事件TO_NEXT_LEVEL
                    this._mainView.order(GameEvent.TO_NEXT_LEVEL);
                }
                GameData.gameElements[i].bmp.texture = null;
                GameData.gameElements[i].type = "";
                for (var row = i + 8; row < i + 8 * lineEleNumCol; row = row + 8) {
                    var tmpLineEleNumRowRight = this.getLinedElementsNumRowRight(row);
                    var tmpLineEleNumRowLeft = this.getLinedElementsNumRowLeft(row);
                    if ((tmpLineEleNumRowLeft + tmpLineEleNumRowRight - 1) >= 3) {
                        /**消除左边元素 */
                        for (var m = row - 1; m > (row - tmpLineEleNumRowLeft); m--) {
                            GameData.gameElements[m].bmp.texture = null;
                            GameData.gameElements[m].type = "";
                        }
                        /**消除右边元素 */
                        for (var p = row + 1; p < row + tmpLineEleNumRowRight; p++) {
                            GameData.gameElements[p].bmp.texture = null;
                            GameData.gameElements[p].type = "";
                        }
                    }
                    GameData.gameElements[row].bmp.texture = null;
                    GameData.gameElements[row].type = "";
                }
            }
        }
    };
    /**检测横向（向右）是否有三个同类型元素相连
     * 返回值为相连元素的个数
     */
    MainViewController.prototype.getLinedElementsNumRowRight = function (n) {
        var num = 1;
        var index = n;
        if (GameData.gameElements[index] == null) {
            return num;
        }
        if (GameData.gameElements[index].type == "") {
            return num;
        }
        while (GameData.gameElements[index + 1] != null) {
            if (GameData.gameElements[index].type == GameData.gameElements[index + 1].type) {
                num++;
                index++;
                if (index % 8 > 6) {
                    break;
                }
            }
            else {
                break;
            }
        }
        return num;
    };
    /**检测横向（向左）是否有三个同类型元素相连
     * 返回值为相连元素的个数
     */
    MainViewController.prototype.getLinedElementsNumRowLeft = function (n) {
        var num = 1;
        var index = n;
        if (GameData.gameElements[index] == null) {
            return num;
        }
        if (GameData.gameElements[index].type == "") {
            return num;
        }
        while (GameData.gameElements[index - 1] != null) {
            if (GameData.gameElements[index].type == GameData.gameElements[index - 1].type) {
                num++;
                index--;
                if (index % 8 < 1) {
                    break;
                }
            }
            else {
                break;
            }
        }
        return num;
    };
    /**检测纵向（向下）是否有三个同类型元素相连
     * 返回值为相连元素的个数
     */
    MainViewController.prototype.getLinedElementsNumCol = function (n) {
        var num = 1;
        var index = n;
        if (GameData.gameElements[index] == null) {
            return num;
        }
        if (GameData.gameElements[index].type == "") {
            return num;
        }
        while (GameData.gameElements[index + 8] != null) {
            if (GameData.gameElements[index].type == GameData.gameElements[index + 8].type) {
                num++;
                index = index + 8;
                if (Math.floor(index / 8) > 6) {
                    break;
                }
            }
            else {
                break;
            }
        }
        return num;
    };
    /**仅面向一列，往下移动元素图片至空白处 */
    MainViewController.prototype.moveElementsDownEachCol = function (col) {
        var unusedUnits = new Array();
        var usingUnits = new Array();
        var cleanedUnits = new Array();
        var usedUnits = new Array();
        var num = col + 56;
        for (var t = col; t < col + 57; t = t + 8) {
            if (GameData.gameElements[t] == null) {
                unusedUnits.push(t);
            }
            else {
                usedUnits.push(t);
                if (GameData.gameElements[t].bmp.texture == null) {
                    cleanedUnits.push(t);
                }
                else {
                    usingUnits.push(t);
                }
            }
        }
        /**将一列中未被消除的单位往下掉落 */
        for (var i = usingUnits.length - 1; i >= 0; i--) {
            var twDown = egret.Tween.get(GameData.gameElements[usingUnits[i]]);
            while (GameData.gameElements[num] == null) {
                num = num - 8;
            }
            twDown.to({ y: GameData.gameElements[num].y }, 400);
            num = num - 8;
        }
        /**将一列中被消除的单位上浮同时生成新的元素图案 */
        for (var i = cleanedUnits.length - 1; i >= 0; i--) {
            var twUp = egret.Tween.get(GameData.gameElements[cleanedUnits[i]]);
            while (GameData.gameElements[num] == null) {
                num = num - 8;
            }
            if (i == 0) {
                twUp.to({ y: GameData.gameElements[num].y }, 500).call(this.generateNewGameElement, this, [col]);
            }
            else {
                twUp.to({ y: GameData.gameElements[num].y }, 500);
            }
            num = num - 8;
        }
    };
    /**消除元素移动后，需要更新其在GameElement数组中的位置 */
    MainViewController.prototype.freshElementsPos = function (col) {
        var numCleaned = 0;
        for (var t = col; t < col + 57; t = t + 8) {
            if (GameData.gameElements[t] != null) {
                if (GameData.gameElements[t].bmp.texture == null) {
                    var tmpNumCleaned = numCleaned;
                    var numNow = t;
                    var numNext = t - 8;
                    var tmpElement = GameData.gameElements[t];
                    while (tmpNumCleaned > 0) {
                        while (GameData.gameElements[numNext] == null && numNext >= col) {
                            numNext = numNext - 8;
                        }
                        GameData.gameElements[numNow] = GameData.gameElements[numNext];
                        numNow = numNow - 8;
                        numNext = numNext - 8;
                        tmpNumCleaned--;
                    }
                    GameData.gameElements[numNext + 8] = tmpElement;
                }
                else {
                    numCleaned++;
                }
            }
        }
    };
    MainViewController.prototype.generateNewGameElement = function (col) {
        for (var t = col; t < col + 57; t = t + 8) {
            if (GameData.gameElements[t] != null) {
                if (GameData.gameElements[t].type == "") {
                    GameData.gameElements[t].type = GameData.usedElementTypes[this.getTypeNum()];
                    GameData.gameElements[t].bmp.texture = RES.getRes(GameData.gameElements[t].type);
                }
            }
        }
    };
    /** 生成随机类型的游戏元素 **/
    MainViewController.prototype.getTypeNum = function () {
        var n = Math.random();
        while (n >= (0.1 * GameData.usedElementTypes.length)) {
            n = Math.random();
        }
        return Math.floor(n * 10);
    };
    MainViewController.prototype.isCleanable = function () {
        for (var i = 0; i < GameData.gameElements.length; i++) {
            if (this.getLinedElementsNumRowRight(i) >= 3) {
                return true;
            }
            if (this.getLinedElementsNumCol(i) >= 3) {
                return true;
            }
        }
        return false;
    };
    /**接着clean()方法后调用，面向所有列，往下移动元素图片至空白处 */
    MainViewController.prototype.moveDown = function () {
        for (var i = 0; i < 8; i++) {
            this.moveElementsDownEachCol(i);
            this.freshElementsPos(i);
        }
    };
    /**游戏开始前的所有准备操作在这里完成 */
    MainViewController.prototype.preClean = function () {
        if (!this.timer) {
            this.timer = new egret.Timer(1500, 50);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFuncBeforePlaying, this);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            this.timer.start();
        }
    };
    /**此方法在preClean()方法后面执行 */
    MainViewController.prototype.addElementListenser = function () {
        this.spr.touchEnabled = true;
        this.spr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onElementTouch, this);
    };
    MainViewController.prototype.onElementTouch = function (evt) {
        var x = evt.stageX;
        var y = evt.stageY;
        var girdSideLength = (GameData.STAGE_WIDTH - 40) / GameData.MAX_UNITS_WIDTH;
        var startY = GameData.STAGE_WIDTH * 0.3;
        var i = Math.floor((x - 20) / girdSideLength);
        var j = Math.floor((y - startY) / girdSideLength);
        var index = j * GameData.MAX_UNITS_WIDTH + i;
        if (GameData.gameElements[index] != null) {
            if (GameData.firstTouched == false && GameData.secondTouched == false) {
                GameData.firstTouched = true;
                GameData.firstTouchedElementIndex = index;
                console.log("first touch:" + GameData.gameElements[index].type);
            }
            else if (GameData.firstTouched == true && GameData.secondTouched == false) {
                console.log("second touch:" + GameData.gameElements[index].type);
                if (this.isNeighbor(GameData.firstTouchedElementIndex, index)) {
                    var twFirst = egret.Tween.get(GameData.gameElements[GameData.firstTouchedElementIndex]);
                    twFirst.to({ x: GameData.gameElements[index].x, y: GameData.gameElements[index].y }, 400);
                    var twSecond = egret.Tween.get(GameData.gameElements[index]);
                    twSecond.to({ x: GameData.gameElements[GameData.firstTouchedElementIndex].x, y: GameData.gameElements[GameData.firstTouchedElementIndex].y }, 400);
                    if (this.isHasLineAfterMove(GameData.firstTouchedElementIndex, index)) {
                        //移动后可以进行消除
                        if (GameData.levelLimitNumElement.num != 0) {
                            GameData.levelLimitNumElement.num--;
                            GameData.levelLimitNumElement.text.$setText("" + GameData.levelLimitNumElement.num);
                        }
                        if (GameData.levelLimitNumElement.num == 0 && !this.isPass()) {
                            //发送事件GAME_OVER
                            this._mainView.order(GameEvent.GAME_OVER);
                        }
                        this.cleanAfterMove();
                    }
                    else {
                        twFirst.to({ x: GameData.gameElements[GameData.firstTouchedElementIndex].x, y: GameData.gameElements[GameData.firstTouchedElementIndex].y }, 400);
                        twSecond.to({ x: GameData.gameElements[index].x, y: GameData.gameElements[index].y }, 400);
                    }
                }
                else {
                    console.log("非法移动！");
                }
                GameData.secondTouched = true;
            }
            if (GameData.firstTouched == true && GameData.secondTouched == true) {
                GameData.firstTouched = false;
                GameData.secondTouched = false;
                GameData.firstTouchedElementIndex = null;
            }
        }
    };
    /**移动元素后的消除操作 */
    MainViewController.prototype.cleanAfterMove = function () {
        if (!this.timer) {
            this.timer = new egret.Timer(1500, 50);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFuncWhenPlaying, this);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            this.timer.start();
        }
    };
    //移动元素后是否可进行消除
    MainViewController.prototype.isHasLineAfterMove = function (from, to) {
        var tmpObj = GameData.gameElements[to];
        GameData.gameElements[to] = GameData.gameElements[from];
        GameData.gameElements[from] = tmpObj;
        if (this.isCleanable()) {
            return true;
        }
        else {
            var tmpObj = GameData.gameElements[to];
            GameData.gameElements[to] = GameData.gameElements[from];
            GameData.gameElements[from] = tmpObj;
            return false;
        }
    };
    /**检查第一次点击的Element与第二次点击的元素是否相邻 */
    MainViewController.prototype.isNeighbor = function (from, to) {
        var x1 = from % GameData.MAX_UNITS_WIDTH;
        var y1 = Math.floor(from / GameData.MAX_UNITS_HEIGHT);
        var x2 = to % GameData.MAX_UNITS_WIDTH;
        var y2 = Math.floor(to / GameData.MAX_UNITS_HEIGHT);
        if ((Math.abs(x1 - x2) == 1 && Math.abs(y1 - y2) == 0) || (Math.abs(x1 - x2) == 0 && Math.abs(y1 - y2) == 1)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**游戏阶段的清理操作 */
    MainViewController.prototype.timerFuncWhenPlaying = function () {
        if (this.isCleanable()) {
            this.cleanWhenPlaying();
            this.moveDown();
        }
        else {
            this.timer.stop();
            this.timer = null;
        }
    };
    /**准备阶段的预清理操作 */
    MainViewController.prototype.timerFuncBeforePlaying = function () {
        if (this.isCleanable()) {
            this.clean();
            this.moveDown();
        }
        else {
            this.timer.stop();
            this.timer = null;
        }
    };
    MainViewController.prototype.timerComFunc = function () {
        console.log("计时结束");
    };
    /**每消除一次元素令特定元素指定消除次数减一 */
    MainViewController.prototype.operaOnLevelReqElement = function (elementType) {
        for (var i = 0; i < GameData.levelReqElements.length; i++) {
            if (GameData.levelReqElements[i].type == elementType) {
                if (GameData.levelReqElements[i].num != 0) {
                    GameData.levelReqElements[i].num--;
                    GameData.levelReqElements[i].text.$setText("" + GameData.levelReqElements[i].num);
                }
            }
        }
    };
    /**检测关卡元素指定消除次数是否均为0 */
    MainViewController.prototype.isPass = function () {
        var num = 0;
        for (var i = 0; i < GameData.levelReqElements.length; i++) {
            if (GameData.levelReqElements[i].num == 0) {
                num++;
            }
        }
        if (num == GameData.levelReqElements.length) {
            return true;
        }
        return false;
    };
    /**输出GameElement[]各位置上的type值 */
    MainViewController.prototype.test = function () {
        for (var i = 0; i < 8; i++) {
            for (var t = i; t < i + 57; t = t + 8) {
                if (GameData.gameElements[t] != null) {
                    console.log("类型：" + i + "：" + GameData.gameElements[t].type + " ;坐标Y：" + GameData.gameElements[t].y);
                }
                else {
                    console.log("NULL");
                }
            }
        }
    };
    return MainViewController;
}());
__reflect(MainViewController.prototype, "MainViewController");
//# sourceMappingURL=MainViewController.js.map