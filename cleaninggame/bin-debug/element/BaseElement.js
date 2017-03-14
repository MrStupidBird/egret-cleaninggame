/** 基础游戏元素类型，其余游戏元素均继承此类 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseElement = (function () {
    function BaseElement() {
    }
    return BaseElement;
}());
__reflect(BaseElement.prototype, "BaseElement");
//# sourceMappingURL=BaseElement.js.map