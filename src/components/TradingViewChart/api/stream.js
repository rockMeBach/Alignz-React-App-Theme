// api/stream.js
import historyProvider from './historyProvider.js'
import BACKEND_URL_LIVE_TRADE from "../../../Backend_live_feed_url";
import io from 'socket.io-client';
var socket_url = `http://${BACKEND_URL_LIVE_TRADE}`
var socket = io(socket_url)
// keep track of subscriptions
var _subs = []
var currentSymbol = null
export default {
  subscribeBars: function (symbolInfo, resolution, updateCb, uid, resetCache) {
    // console.log(historyProvider.history[symbolInfo.full_name])
    // console.log(resolution)
    var newSub = {
      ...symbolInfo,
      uid,
      resolution,
      symbolInfo,
      lastBar: historyProvider.history[symbolInfo.full_name],
      listener: updateCb,
    }
    currentSymbol = newSub
    // console.log(currentSymbol)
    // _subs.push(newSub)
  },
  unsubscribeBars: function (uid) {
    // var subIndex = _subs.findIndex(e => e.uid === uid)
    // console.log(subIndex, _subs)
    // if (subIndex === -1) {
    //   //console.log("No subscription found for ",uid)
    //   return
    // }
    // var sub = _subs[subIndex]
    // _subs.splice(subIndex, 1)
    // currentSymbol = null
  }
}

socket.on('connect', () => {
  // console.log('===Socket connected')
})
socket.on('disconnect', (e) => {
  // console.log('===Socket disconnected:', e)
})
socket.on('error', err => {
  // console.log('====socket error', err)
})
socket.on("equityData", (e) => {
  // here we get all events the CryptoCompare connection has subscribed to
  // we need to send this new data to our subscribed charts

  // const sub = _subs.find(ele => ele.instrument_token === e.instrument_token)

  if (currentSymbol && currentSymbol.instrument_token === e.instrument_token) {
    // disregard the initial catchup snapshot of trades for already closed candles
    // console.log(new Date(currentSymbol.lastBar.time), new Date(e.exchange_timestamp))
    if (new Date(e.exchange_timestamp).getTime() < currentSymbol.lastBar.time) {
      return
    }
    var _lastBar = updateBar(e, currentSymbol)

    console.log(currentSymbol)
    // send the most recent bar back to TV's realtimeUpdate callback
    currentSymbol.listener(_lastBar)
    // update our own record of lastBar
    currentSymbol.lastBar = _lastBar
  }
})

socket.on("futureData", (e) => {
  // here we get all events the CryptoCompare connection has subscribed to
  // we need to send this new data to our subscribed charts

  // const sub = _subs.find(ele => ele.instrument_token === e.instrument_token)

  if (currentSymbol && currentSymbol.instrument_token === e.instrument_token) {
    // disregard the initial catchup snapshot of trades for already closed candles
    // console.log(currentSymbol)
    if (new Date(e.exchange_timestamp).getTime() < currentSymbol.lastBar.time) {
      return
    }
    var _lastBar = updateBar(e, currentSymbol)

    // send the most recent bar back to TV's realtimeUpdate callback
    currentSymbol.listener(_lastBar)
    // update our own record of lastBar
    currentSymbol.lastBar = _lastBar
  }
})



// Take a single trade, and subscription record, return updated bar
function updateBar(data, sub) {
  var lastBar = sub.lastBar
  let resolution = sub.resolution
  if (resolution.includes('D')) {
    // 1 day in minutes === 1440
    resolution = 1440
  } else if (resolution.includes('W')) {
    // 1 week in minutes === 10080
    resolution = 10080
  }
  var coeff = resolution * 60
  // console.log({coeff})
  var rounded = Math.floor(new Date(data.exchange_timestamp).getTime() / coeff) * coeff
  var lastBarSec = lastBar.time / 1000
  var _lastBar

  if (rounded > lastBarSec) {
    // create a new candle, use last close as open **PERSONAL CHOICE**
    _lastBar = {
      time: rounded,
      open: lastBar.close,
      high: lastBar.close,
      low: lastBar.close,
      close: data.last_price,
      volume: data.volume_traded
    }

  } else {
    // update lastBar candle!
    if (data.last_price < lastBar.low) {
      lastBar.low = data.last_price
    } else if (data.last_price > lastBar.high) {
      lastBar.high = data.last_price
    }

    lastBar.close = data.last_price
    _lastBar = lastBar
  }
  return _lastBar
}

