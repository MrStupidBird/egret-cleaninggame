var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PropViewController = (function () {
    function PropViewController() {
    }
    /** */
    PropViewController.prototype.addPropElementListener = function () {
        GameData.propElements[0].touchEnabled = true;
        GameData.propElements[0].addEventListener(egret.TouchEvent.TOUCH_TAP, this.propOneOnTouch, this);
        GameData.propElements[1].touchEnabled = true;
        GameData.propElements[1].addEventListener(egret.TouchEvent.TOUCH_TAP, this.propRowOnTouch, this);
        GameData.propElements[2].touchEnabled = true;
        GameData.propElements[2].addEventListener(egret.TouchEvent.TOUCH_TAP, this.propColumnOnTouch, this);
        GameData.propElements[3].touchEnabled = true;
        GameData.propElements[3].addEventListener(egret.TouchEvent.TOUCH_TAP, this.propCrossOnTouch, this);
    };
    /**第一个道具元素的执行事件，随机更换一种元素 */
    PropViewController.prototype.propOneOnTouch = function (evt) {
        if (GameData.propElements[0].propNum != 0) {
            GameData.propElements[0].propNum = GameData.propElements[0].propNum - 1;
            GameData.propElements[0].text.$setText("" + GameData.propElements[0].propNum);
            var randomType = GameData.usedElementTypes[this.getTypeNum()];
            for (var i = 0; i < GameData.gameElements.length; i++) {
                if (GameData.gameElements[i] != null) {
                    if (GameData.gameElements[i].type == randomType) {
                        GameData.gameElements[i].bmp.texture = null;
                        GameData.gameElements[i].type = "";
                    }
                }
            }
            this.func();
        }
        else {
            console.log("道具1次数已用完！");
        }
    };
    /**第二个道具元素的执行事件，随机更换一行元素 */
    PropViewController.prototype.propRowOnTouch = function (evt) {
        if (GameData.propElements[1].propNum != 0) {
            GameData.propElements[1].propNum = GameData.propElements[1].propNum - 1;
            GameData.propElements[1].text.$setText("" + GameData.propElements[1].propNum);
            var n = this.generateRandomNum();
            for (var t = 8 * n; t < 8 * n + 8; t++) {
                if (GameData.gameElements[t] != null) {
                    GameData.gameElements[t].bmp.texture = null;
                    GameData.gameElements[t].type = "";
                }
            }
            this.func();
        }
        else {
            console.log("道具2次数已用完！");
        }
    };
    /**第三个道具元素的执行事件，随机更换一列元素 */
    PropViewController.prototype.propColumnOnTouch = function (evt) {
        if (GameData.propElements[2].propNum != 0) {
            GameData.propElements[2].propNum = GameData.propElements[2].propNum - 1;
            GameData.propElements[2].text.$setText("" + GameData.propElements[2].propNum);
            var n = this.generateRandomNum();
            for (var t = n; t < n + 57; t = t + 8) {
                if (GameData.gameElements[t] != null) {
                    GameData.gameElements[t].bmp.texture = null;
                    GameData.gameElements[t].type = "";
                }
            }
            this.func();
        }
        else {
            console.log("道具3次数已用完！");
        }
    };
    /**第四个道具元素的执行事件，随机更换十字行列元素 */
    PropViewController.prototype.propCrossOnTouch = function (evt) {
        if (GameData.propElements[3].propNum != 0) {
            GameData.propElements[3].propNum = GameData.propElements[3].propNum - 1;
            GameData.propElements[3].text.$setText("" + GameData.propElements[3].propNum);
            var row = this.generateRandomNum();
            var col = this.generateRandomNum();
            for (var t = 8 * row; t < 8 * row + 8; t++) {
                if (GameData.gameElements[t] != null) {
                    GameData.gameElements[t].bmp.texture = null;
                    GameData.gameElements[t].type = "";
                }
            }
            for (var t = col; t < col + 57; t = t + 8) {
                if (GameData.gameElements[t] != null) {
                    GameData.gameElements[t].bmp.texture = null;
                    GameData.gameElements[t].type = "";
                }
            }
            this.func();
        }
        else {
            console.log("道具4次数已用完！");
        }
    };
    PropViewController.prototype.func = function () {
        this.generateElementAfterProp();
        this.clean();
    };
    /**使用道具之后对空白单位重新生成图案 */
    PropViewController.prototype.generateElementAfterProp = function () {
        for (var i = 0; i < GameData.gameElements.length; i++) {
            if (GameData.gameElements[i] != null) {
                if (GameData.gameElements[i].type == "") {
                    GameData.gameElements[i].type = GameData.usedElementTypes[this.getTypeNum()];
                    GameData.gameElements[i].bmp.texture = RES.getRes(GameData.gameElements[i].type);
                }
            }
        }
    };
    /**伪随机函数产生0到7之间某一个自然数 */
    PropViewController.prototype.generateRandomNum = function () {
        var num = Math.random();
        while (num >= 0.8 && num < 1) {
            num = Math.random();
        }
        console.log(Math.floor(10 * num));
        return Math.floor(10 * num);
    };
    /** 使用道具之后的清理 **/
    PropViewController.prototype.cleanAfterProp = function () {
        for (var i = 0; i < GameData.gameElements.length; i++) {
            /**横向搜索 */
            var lineEleNumRow = this.getLinedElementsNumRowRight(i);
            if (lineEleNumRow >= 3) {
                this.operaOnLevelReqElement(GameData.gameElements[i].type);
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
    /**每消除一次元素令特定元素指定消除次数减一 */
    PropViewController.prototype.operaOnLevelReqElement = function (elementType) {
        for (var i = 0; i < GameData.levelReqElements.length; i++) {
            if (GameData.levelReqElements[i].type == elementType) {
                if (GameData.levelReqElements[i].num != 0) {
                    GameData.levelReqElements[i].num--;
                    GameData.levelReqElements[i].text.$setText("" + GameData.levelReqElements[i].num);
                }
            }
        }
    };
    PropViewController.prototype.isCleanable = function () {
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
    /**检测横向（向右）是否有三个同类型元素相连
     * 返回值为相连元素的个数
     */
    PropViewController.prototype.getLinedElementsNumRowRight = function (n) {
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
    PropViewController.prototype.getLinedElementsNumRowLeft = function (n) {
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
    PropViewController.prototype.getLinedElementsNumCol = function (n) {
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
    PropViewController.prototype.moveElementsDownEachCol = function (col) {
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
    PropViewController.prototype.freshElementsPos = function (col) {
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
    PropViewController.prototype.generateNewGameElement = function (col) {
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
    PropViewController.prototype.getTypeNum = function () {
        var n = Math.random();
        while (n >= (0.1 * GameData.usedElementTypes.length)) {
            n = Math.random();
        }
        return Math.floor(n * 10);
    };
    /**接着clean()方法后调用，面向所有列，往下移动元素图片至空白处 */
    PropViewController.prototype.moveDown = function () {
        for (var i = 0; i < 8; i++) {
            this.moveElementsDownEachCol(i);
            this.freshElementsPos(i);
        }
    };
    /**使用道具消除元素后的消除操作，直至不存在可消除元素组合 */
    PropViewController.prototype.clean = function () {
        if (!this.timer) {
            this.timer = new egret.Timer(1500, 50);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFuncWhenPlaying, this);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            this.timer.start();
        }
    };
    /**游戏阶段的清理操作 */
    PropViewController.prototype.timerFuncWhenPlaying = function () {
        if (this.isCleanable()) {
            this.cleanAfterProp();
            this.moveDown();
        }
        else {
            this.timer.stop();
            this.timer = null;
        }
    };
    PropViewController.prototype.timerComFunc = function () {
        console.log("计时结束");
    };
    return PropViewController;
}());
__reflect(PropViewController.prototype, "PropViewController");
//# sourceMappingURL=PropViewController.js.map