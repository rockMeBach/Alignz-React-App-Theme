import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import PageHeader from "../../components/PageHeader";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Form, FormControl, InputGroup, Button, ListGroup, Spinner } from "react-bootstrap";
import axios from "axios"
import "./Trading.css"
import BACKEND_URL from "../../Backend_url";
import BACKEND_URL_LIVE_TRADE from "../../Backend_live_feed_url";
import BuyModel from "./BuyModel"
import SellModel from "./SellModel"
import io from 'socket.io-client';
import TVChartContainer from '../../components/TradingViewChart/TradingViewChart'


const Trading = () => {

    const auth = useSelector((state) => state.auth);


    const [search, setSearch] = useState('')
    const [selectMarket, setSelectMarket] = useState()
    const [buyModelOpen, setBuyModelOpen] = useState(false)
    const [sellModelOpen, setSellModelOpen] = useState(false)
    const [marketList, setMarketList] = useState([])
    const [tradeWatch, setTradeWatch] = useState([])
    const [buyInstrument, setBuyInstrument] = useState({ instrument_token: 0, market: '' })
    const [sellInstrument, setSellInstrument] = useState({ instrument_token: 0, market: '' })
    const [selectedSymbol, setSelectedSymbol] = useState('NSE:NIFTY50')
    var market = ["equity", "future", "option", "mcx", "currency", "crypto"]

    useEffect(() => {
        console.log(auth)
        axios.get(`http://${BACKEND_URL}/api/trading/getWatchlist`, {
            params: {
                userID: auth.user._id
            }
        }).then(data => {
            console.log(data)
            if (data.data)
                setTradeWatch(data.data.watchlist)
        })
    }, [auth])

    useEffect(() => {
        const socket = io(`http://${BACKEND_URL_LIVE_TRADE}`);
        socket.on("futureData", futureLiveData);
        socket.on("equityData", equityLiveData);
    }, [])



    const futureLiveData = (futureData) => {

        if (document.getElementById(futureData.instrument_token)) {
            var change = futureData.change.toFixed(2)
            document.getElementById(futureData.instrument_token).innerHTML = futureData.last_price.toFixed(2)
            document.getElementById(futureData.instrument_token).style.color = change < 0 ? "red" : "green"
            document.getElementById(futureData.instrument_token + "-change").innerHTML = change + "%"
            document.getElementById(futureData.instrument_token + "-change").style.color = change < 0 ? "red" : "green"
        }
    }
    const equityLiveData = (equityData) => {
        // console.log(equityData)
        if (document.getElementById(equityData.instrument_token)) {
            var change = equityData.change.toFixed(2)
            document.getElementById(equityData.instrument_token).innerHTML = equityData.last_price.toFixed(2)
            document.getElementById(equityData.instrument_token).style.color = change < 0 ? "red" : "green"
            document.getElementById(equityData.instrument_token + "-change").innerHTML = change + "%"
            document.getElementById(equityData.instrument_token + "-change").style.color = change < 0 ? "red" : "green"
        }
    }


    const getSearchResults = (e) => {
        setSearch(e);
        axios.get(`http://${BACKEND_URL}/api/trading/getSearchResults`, {
            params: {
                market: selectMarket,
                search: e
            }
        }).then(data => {
            // console.log(data.data)
            const reduceRedundancyData = data.data.filter(listItem => {
                if (!tradeWatch.some(trade => trade.instrument_token == listItem.instrument_token))
                    return listItem;
            })
            setMarketList(reduceRedundancyData)
        })
    }

    const addToWatchList = (marketListItem) => {
        const data = {
            userID: auth.user._id,
            instrument_token: marketListItem.instrument_token,
            name: marketListItem[marketListItem.type].split(":")[1],
            exch: marketListItem[marketListItem.type].split(":")[0],
            type: marketListItem.type
        }
        axios.post(`http://${BACKEND_URL}/api/trading/setWatchlist`, data).then(data => {
            setTradeWatch(data.data.watchlist)
        })
    }


    const deleteTrade = (instrument_token) => {
        const data = {
            userID: auth.user._id,
            instrument_token: instrument_token
        }
        axios.put(`http://${BACKEND_URL}/api/trading/pullWatchlist`, data).then(data => {
            setTradeWatch(data.data.watchlist)
        })
    }


    return (
        <div className="container">
            <PageHeader
                HeaderText="Trading"
                Breadcrumb={[{ name: "Virtual Trading" }, { name: "Trading" }]}
            />
            <div className="row clearfix" style={{ height: '100%' }}>
                <div className="col-lg-4 col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="d-inline me-1">Nifty 50</h5>
                            <p className="d-inline text-primary">NSE</p>
                        </div>
                        <div className="col-md-6 text-end">
                            <p className="d-inline me-1" id={`256265-change`}>0</p>
                            <p className="d-inline" id={`256265`}>0.0%</p>
                        </div>

                    </div>
                    <div className="row">
                        <InputGroup className="mb-3 mt-3">
                            <Form.Select className="col-md-2" aria-label="Default select example"
                                onChange={(e) => setSelectMarket(e.target.value)}
                            >
                                <option selected disabled>Select</option>
                                {
                                    market.map(market => {
                                        return (
                                            <option value={market}>{market.charAt(0).toUpperCase() + market.slice(1)}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                            <InputGroup.Text id="basic-addon1"><SearchIcon /></InputGroup.Text>
                            <FormControl aria-label="Search" value={search} onChange={(e) => { getSearchResults(e.target.value) }} placeholder="Search e.g. Nifty, Infy" />
                            {search &&
                                marketList.length == 0 ?
                                <InputGroup className="justify-content-center mt-2">
                                    <Spinner animation="border" variant="dark" />
                                </InputGroup>
                                :
                                <ListGroup className="search-input">
                                    {
                                        marketList.map(marketListItem => {
                                            return (
                                                <ListGroup.Item onClick={(e) => {
                                                    setSearch('');
                                                    addToWatchList(marketListItem)
                                                    setMarketList([]);
                                                }} action>
                                                    <AddCircleOutlineIcon /> {marketListItem[marketListItem.type]}
                                                </ListGroup.Item>)
                                        })
                                    }
                                </ListGroup>
                            }
                        </InputGroup>
                    </div>
                    {
                        tradeWatch.map((tradeWatchItem, index) => {
                            return (
                                <div className="row">
                                    <div className="col-md-12">
                                        <div class="row border-bottom border-top p-3 stock-row" onClick={() => setSelectedSymbol(`${tradeWatchItem.exch}:${tradeWatchItem.name}`)}>
                                            <div class="col-6 col-md-3 text-break order-md-1">{tradeWatchItem.name}</div>
                                            <div className="col-6 col-md-3 text-end order-md-6" id={tradeWatchItem.instrument_token}>0.00</div>
                                            <div class="col-6 col-md-3 order-md-3">{tradeWatchItem.exch}</div>
                                            <div className="col-6 col-md-3 text-end order-md-9" id={`${tradeWatchItem.instrument_token}-change`}>0% <KeyboardArrowDownIcon className="text-danger" /> </div>
                                            <div className="offset-md-6 col-md-6 justify-content-between exchange-row-trade">
                                                <Button variant="success" onClick={() => { setBuyInstrument({ instrument_token: tradeWatchItem.instrument_token, market: tradeWatchItem.marketType, name: tradeWatchItem.name, exchange: tradeWatchItem.exch }); setBuyModelOpen(true) }}>BUY</Button>
                                                <Button variant="danger" onClick={() => { setSellInstrument({ instrument_token: tradeWatchItem.instrument_token, market: tradeWatchItem.marketType, name: tradeWatchItem.name, exchange: tradeWatchItem.exch }); setSellModelOpen(true) }}>SELL</Button>
                                                <Button variant="dark" index={index} onClick={() => deleteTrade(tradeWatchItem.instrument_token)}><DeleteIcon /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="col-lg-8 col-md-12 order-md-1 order-first" id="trading-view-chart" style={{ height: '500px' }}>
                    <TVChartContainer
                        containerId="trading-view-chart"
                        fullScreen={false}
                        symbol={selectedSymbol}
                    />

                </div>
            </div>
            <BuyModel show={buyModelOpen}
                setShow={setBuyModelOpen}
                onClose={() => setBuyModelOpen(false)}
                instrument={buyInstrument}
            />
            <SellModel show={sellModelOpen}
                setShow={setSellModelOpen}
                onClose={() => setSellModelOpen(false)}
                instrument={sellInstrument}
            />
        </div >
    )
}

export default Trading;

