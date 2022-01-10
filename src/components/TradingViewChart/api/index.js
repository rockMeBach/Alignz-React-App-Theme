import historyProvider from './historyProvider'
import stream from './stream'

import { makeApiRequest, generateSymbol } from './helper.js';
// ...
var symbolsData = [{
	symbol: 'NIFTY50',
	full_name: 'NSE:NIFTY50',
	description: 'NSE:NIFTY50',
	exchange: 'NSE',
	type: 'equity',
}];
async function getAllSymbols() {
	const data = await makeApiRequest('api/historicData/data/v3/all/exchanges');
	let allSymbols = [];
	const symbols = data.map(symbol => {
		const symbolInfo = symbol.equity.split(":")
		return {
			symbol: symbolInfo[1],
			full_name: symbol.equity,
			description: symbol.equity,
			exchange: symbolInfo[0],
			type: 'equity',
		};
	});
	allSymbols = [...allSymbols, ...symbols];

	symbolsData = allSymbols
	return allSymbols;
}



const supportedResolutions = ["1", "3", "5", "15", "30", "60", "120", "240", "D"]

const config = {
	supported_resolutions: supportedResolutions
};

export default {
	onReady: cb => {
		console.log('=====onReady running')
		setTimeout(() => cb(config), 0)

	},
	searchSymbols: async (userInput, exchange, symbolType, onResultReadyCallback) => {
		console.log(userInput)
		console.log('====Search Symbols running')
		console.log('[searchSymbols]: Method call');
		const symbols = await getAllSymbols();
		const newSymbols = symbols.filter(symbol => {
			const isExchangeValid = exchange === '' || symbol.exchange === exchange;
			const isFullSymbolContainsInput = symbol.full_name
				.toLowerCase()
				.indexOf(userInput.toLowerCase()) !== -1;
			return isExchangeValid && isFullSymbolContainsInput;
		});
		onResultReadyCallback(newSymbols);
	},
	resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
		// expects a symbolInfo object in response
		console.log('======resolveSymbol running')
		console.log(symbolName,symbolsData)
		const symbolItem = symbolsData.find((item) => item.full_name === symbolName);
		console.log(symbolItem)
		var symbol_stub = {
			name: symbolItem.symbol,
			description: symbolItem.description,
			type: symbolItem.type,
			session: '24x7',
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			
			ticker: symbolItem.full_name,
			exchange: symbolItem.exchange,
			minmov: 1,
			pricescale: 100,
			has_intraday: true,
			has_no_volume: true,
			supported_resolution: supportedResolutions,
			data_status:"streaming"
		}

		// if (split_data[2].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
		// 	symbol_stub.pricescale = 100
		// }
		console.log(symbol_stub)
		setTimeout(function () {
			onSymbolResolvedCallback(symbol_stub)
			console.log('Resolving that symbol....', symbol_stub)
		}, 0)


		// onResolveErrorCallback('Not feeling it today')

	},
	getBars: function (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) {
		console.log('=====getBars running')
		let { from, to, firstDataRequest } = periodParams;
		// console.log('function args',arguments)
		// console.log(`Requesting bars between ${new Date(from * 1000).toISOString()} and ${new Date(to * 1000).toISOString()}`)
		historyProvider.getBars(symbolInfo, resolution, from, to, firstDataRequest)
			.then(bars => {
				if (bars.length>0) {
					onHistoryCallback(bars, { noData: false })
				} else {
					onHistoryCallback(bars, { noData: true })
				}
			}).catch(err => {
				console.log({ err })
				onErrorCallback(err)
			})

	},
	subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
		console.log('=====subscribeBars runnning')
		// stream.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback)
	},
	unsubscribeBars: subscriberUID => {
		console.log('=====unsubscribeBars running')

		// stream.unsubscribeBars(subscriberUID)
	},
	calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
		//optional
		// console.log('=====calculateHistoryDepth running')
		// while optional, this makes sure we request 24 hours of minute data at a time
		// CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
		// return resolution < 60 ? { resolutionBack: 'D', intervalBack: '1' } : undefined
	},
	getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		console.log('=====getMarks running')
	},
	getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		console.log('=====getTimeScaleMarks running')
	},
	getServerTime: cb => {
		console.log('=====getServerTime running')
	}
}