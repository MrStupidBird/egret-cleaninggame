/** 基础游戏元素类型，其余游戏元素均继承此类 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseElement = (function (_super) {
    __extends(BaseElement, _super);
    function BaseElement() {
        return _super.call(this) || this;
    }
    return BaseElement;
}(egret.Sprite));
__reflect(BaseElement.prototype, "BaseElement");
//# sourceMappingURL=BaseElement.js.map