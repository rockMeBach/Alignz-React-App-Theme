import * as React from 'react';
import DataFeed from "./api"
import { widget } from '../../charting_library';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}



export default class TVChartContainer extends React.PureComponent {

	static defaultProps = {
		symbol: 'NSE:NIFTY50',
		exchange: 'NSE',
		interval: '1',
		containerId: 'tv_chart_container',
		datafeedUrl: 'https://demo_feed.tradingview.com',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
		currentDate: '',
		currentTime: ''
	};



	tvWidget = null;
	useEffect
	componentDidMount() {
		const widgetOptions = {
			symbol: this.props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: DataFeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			enabled_features: ["fix_left_edge"],
			timezone: "Asia/Kolkata",
			currentDate: this.props.currentDate,
			currentTime: this.props.currentTime
		};

		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));
				button.innerHTML = 'Check API';
			});
		});
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	getSnapshotBeforeUpdate(prevProps) {
		if (prevProps.symbol !== this.props.symbol) {
			this.tvWidget.chart().setSymbol(this.props.symbol);
		}
		if (this.props.currentDate
			&& this.props.currentTime
			&& prevProps.currentDate
			&& prevProps.currentTime) {
			// var prom = []

			// console.log("yes")
			// this.tvWidget.chart().resetData();

		}
		return null;
	}

	render() {

		return (
			<div
				id={this.props.containerId}
				className={'TVChartContainer'}
			/>
		);
	}
}