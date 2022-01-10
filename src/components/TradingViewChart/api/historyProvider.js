import BACKEND_URL from "../../../Backend_url";
import axios from "axios"
var rp = require('request-promise').defaults({ json: true })

const api_root = `http://${BACKEND_URL}/`
const history = {}

export default {
	history: history,
	getBars: function (symbolInfo, resolution, from, to, first, limit) {
		console.log(from, to)
		const symbol = symbolInfo.full_name.split("/")
		const url = 'api/historicData' + ((resolution === 'D') ? '/data/histoday' : resolution >= 60 ? '/data/histohour' : '/data/histominute')
		const qs = {
			e: symbol[0],
			toTs: to ? to : '',
			limit: limit ? limit : 2000,
		}
		return axios.get(`${api_root}${url}`, {
			params: qs,
		}).then(data => {
			data = data.data
			if (data.Response && data.Response === 'Error') {
				console.log('error:', data.Message)
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
					}

				})
				if (first) {
					var lastBar = bars[bars.length - 1]
					history[symbolInfo.full_name] = { lastBar: lastBar }
				}
				return bars
			} else {
				return []
			}
		})
	}
}