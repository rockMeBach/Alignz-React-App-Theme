import BACKEND_URL from "../../../Backend_url";
import axios from "axios"
var rp = require('request-promise').defaults({ json: true })

const api_root = `http://${BACKEND_URL}/`
const history = {}


export default {
	history: history,
	getBars: function (symbolInfo, resolution, from, to, first, limit) {
		console.log(symbolInfo)
		const symbol = symbolInfo.full_name.split("/")
		const url = 'api/historicData/data/histoTradingminute'
		var toTs = new Date(sessionStorage.getItem('currentDate') + " " + sessionStorage.getItem('currentTime'))
		console.log(toTs)
		const qs = {
			e: symbolInfo.instrument_token,
			toTs: toTs ? toTs : '',
			limit: limit ? limit : 2000,
			type: symbolInfo.type,
			name: symbolInfo.name,
			resolution
		}
		return axios.get(`${api_root}${url}`, {
			params: qs,
		}).then(data => {
			data = data.data
			if (data.Response && data.Response === 'Error') {
				// console.log('error:', data.Message)
				return []
			}
			if (data.length) {
				var bars = data.map(el => {
					var date = new Date(el.minute).getTime()
					return {
						time: date, //TradingView requires bar time in ms
						low: el.low,
						high: el.high,
						open: el.open,
						close: el.close,
						volume: el.volume
					}

				})
				if (first) {
					var lastBar = bars[bars.length - 1]
					history[symbolInfo.full_name] = lastBar
				}
				return bars
			} else {
				return []
			}
		})
	}
}