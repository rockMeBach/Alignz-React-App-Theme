"use strict";
exports.__esModule = true;
exports.calculatePutSell = exports.calculatePutBuy = exports.calculateCallSell = exports.calculateCallBuy = void 0;
var calculateCallBuy = function (strikePrice, spotPrice, buyPrice) {
    var intrensicValue = Math.max(spotPrice - strikePrice, 0);
    var pnl = intrensicValue - buyPrice;
    // console.log("Call Buy ", strikePrice, spotPrice, buyPrice, pnl)
    return pnl;
};
exports.calculateCallBuy = calculateCallBuy;
var calculateCallSell = function (strikePrice, spotPrice, sellPrice) {
    var intrensicValue = Math.max(spotPrice - strikePrice, 0);
    var pnl = sellPrice - intrensicValue;
    // console.log("Call Sell ", strikePrice, spotPrice, sellPrice, pnl)
    return pnl;
};
exports.calculateCallSell = calculateCallSell;
var calculatePutBuy = function (strikePrice, spotPrice, buyPrice) {
    var intrensicValue = Math.max(strikePrice - spotPrice, 0);
    var pnl = intrensicValue - buyPrice;
    // console.log("Put Buy ", strikePrice, spotPrice, buyPrice, pnl)
    return pnl;
};
exports.calculatePutBuy = calculatePutBuy;
var calculatePutSell = function (strikePrice, spotPrice, sellPrice) {
    var intrensicValue = Math.max(strikePrice - spotPrice, 0);
    var pnl = sellPrice - intrensicValue;
    // console.log("Put Sell ", strikePrice, spotPrice, sellPrice, pnl)
    return pnl;
};
exports.calculatePutSell = calculatePutSell;
