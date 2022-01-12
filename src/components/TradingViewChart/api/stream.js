// api/stream.js
import historyProvider from './historyProvider.js'
import BACKEND_URL_LIVE_TRADE from "../../../Backend_live_feed_url";
import io from 'socket.io-client';
var socket_url = `http://${BACKEND_URL_LIVE_TRADE}`
var socket = io(socket_url)
// keep track of subscriptions
var _subs = []

export default {
  subscribeBars: function (symbolInfo, resolution, updateCb, uid, resetCache) {
    
    var newSub = {
      ...symbolInfo,
      uid,
      resolution,
      symbolInfo,
      lastBar: historyProvider.history[symbolInfo.full_name].lastBar,
      listener: updateCb,
    }
    _subs.push(newSub)
    console.log(_subs)
  },
  unsubscribeBars: function (uid) {
    var subIndex = _subs.findIndex(e => e.uid === uid)
    if (subIndex === -1) {
      //console.log("No subscription found for ",uid)
      return
    }
    var sub = _subs[subIndex]
    _subs.splice(subIndex, 1)
  }
}

socket.on('connect', () => {
  console.log('===Socket connected')
})
socket.on('disconnect', (e) => {
  console.log('===Socket disconnected:', e)
})
socket.on('error', err => {
  console.log('====socket error', err)
})
socket.on("equityData", (e) => {
  // here we get all events the CryptoCompare connection has subscribed to
  // we need to send this new data to our subscribed charts

  const sub = _subs.find(ele => ele.instrument_token === e.instrument_token)

  if (sub) {
    // disregard the initial catchup snapshot of trades for already closed candles
    if (new Date(e.last_trade_time).getTime() < sub.lastBar.time) {
      return
    }

    var _lastBar = updateBar(e, sub)

    // send the most recent bar back to TV's realtimeUpdate callback
    sub.listener(_lastBar)
    // update our own record of lastBar
    sub.lastBar = _lastBar
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
  var rounded = Math.floor(new Date(data.last_trade_time).getTime() / coeff) * coeff
  var lastBarSec = lastBar.time / 1000
  var _lastBar

  if (rounded > lastBarSec) {
    // create a new candle, use last close as open **PERSONAL CHOICE**
    _lastBar = {
      time: rounded * 1000,
      open: lastBar.close,
      high: lastBar.close,
      low: lastBar.close,
      close: data.last_price,
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

// takes symbolInfo object as input and creates the subscription string to send to CryptoCompare
function createChannelString(symbolInfo) {
  var channel = symbolInfo.full_name.split(/[:/]/)
  const exchange = channel[0]
  const to = channel[2]
  const from = channel[1]
  // subscribe to the CryptoCompare trade channel for the pair and exchange
  return `0~${exchange}~${from}~${to}`
}