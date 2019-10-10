class gco{
    constructor(type,...params){
        this._type=type;
        this._params=params || null;
    }
    get type(){
        return this._type;
    }
    set type(val){
        this._type=val;
    }
    get params(){
        return this._params;
    }
}
//各种绘图命令枚举。
const gct={
    
    "BEGINPATH":0,
    "LINETO":1,
    "MOVETO":2,
    "RECT":3,
    "FILLRECT":4,
    "STOCKRECT":5,
    "CLEARRECT":6,
    "FILL":7,
    "STOKE":8,
    "CLOSEPATH":9,
    "CLIP":10,
    "QUADRATICURVETO":11,
    "BEZIRECURETO":12,
    "ARC":13,
    "ARCTO":14,
    "ISPOINTINPATH":15,
    "CREATELINEARGRADIENT":16,
    "CREATEPATTERN":17,
    "CREATERADIALGRADIENT":18,
    "ADDCOLORSTOP":19,


    "FILLSTYLE":100,
    "STROKESTYLE":101,
    "SHADOWCOLOR":102,
    "SHADOWBLUR":103,
    "SHADOWOFFSETX":104,
    "SHADOWOFFSETY":105,
    "LINECAP":106,
    "LINEJOIN":107,
    "LINEWIDTH":108,
    "MITERLIMIT":109

}
export {gco,gct}