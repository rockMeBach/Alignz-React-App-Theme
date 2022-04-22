import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux"
import PageHeader from "../../components/PageHeader";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Form, FormControl, InputGroup, Button, ListGroup, Spinner } from "react-bootstrap";
import axios from "axios"
import BACKEND_URL from "../../Backend_url";
import BuyModel from "./BuyModel"
import SellModel from "./SellModel"
import TVChartContainer from '../../components/HistoricTradingViewChart/TradingViewChart'
import { toast } from "react-toastify";


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
    const [currentDate, setCurrentDate] = useState('')
    const [currentTime, setCurrentTime] = useState('')
    const [loader, setLoader] = useState(false)
    const [selectedSymbol, setSelectedSymbol] = useState('NSE:NIFTY50')
    var market = ["equity", "future", "option", "mcx", "currency", "crypto"]
    var prevDateTime = useRef('')

    useEffect(() => {
        axios.get(`http://${BACKEND_URL}/api/historicTrading/getHistoricTradingWatchlist`, {
            params: {
                userID: auth.user._id
            }
        }).then(data => {
            if (data.data) {
                var currentLocalDate = new Date(new Date(data.data.currentTime).getTime() - new Date().getTimezoneOffset() * 60000)
                setCurrentDate(currentLocalDate.toISOString().split('T')[0])
                setCurrentTime(currentLocalDate.toISOString().split('T')[1].split('.')[0])

                sessionStorage.setItem('currentDate', currentLocalDate.toISOString().split('T')[0])
                sessionStorage.setItem('currentTime', currentLocalDate.toISOString().split('T')[1].split('.')[0])
                const val = data.data.watchlist.map(item => {
                    return {
                        ...item,
                        feed: 0,
                        change: 0
                    }
                })
                setTradeWatch(val)
            }
        })
    }, [auth])

    useEffect(() => {
        getCurrentFeed()
    }, [currentTime, currentDate, tradeWatch])

    const getSearchResults = (e) => {
        setSearch(e);
        if (!e) {
            return setMarketList([])
        }

        axios.get(`http://${BACKEND_URL}/api/trading/getSearchResults`, {
            params: {
                market: selectMarket,
                search: e
            }
        }).then(data => {
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
        axios.post(`http://${BACKEND_URL}/api/historicTrading/addHistoricTradingWatchlist`, data).then(data => {

            if (data.data) {

                const val = data.data.watchlist.map(item => {
                    return {
                        ...item,
                        feed: 0,
                        change: 0
                    }
                })
                setTradeWatch(val)
            }
        })
    }


    const deleteTrade = (instrument_token) => {
        const data = {
            userID: auth.user._id,
            instrument_token: instrument_token
        }
        axios.put(`http://${BACKEND_URL}/api/historicTrading/deleteHistoricTradingWatchlist`, data).then(data => {
            setTradeWatch(data.data.watchlist)
        })
    }

    const getCurrentFeed = () => {

        if (!currentDate || !currentTime)
            return;
        if (prevDateTime.current == '')
            prevDateTime.current = new Date(currentDate + " " + currentTime)
        var time = new Date(currentDate + " " + currentTime)
        if (time.getTime() > new Date().getTime())
            return toast.error("Please select a valid time")
        if (time.getTime() < prevDateTime.current.getTime())
            prevDateTime.current = time
        setLoader(true)
        axios.post(`http://${BACKEND_URL}/api/historicTrading/getHistoricFeed`, { time, userID: auth.user._id, prevDateTime: prevDateTime.current }).then(data => {
            setLoader(false)
            const val = data.data.forEach((feed, index) => {
                console.log(feed)
                if (feed && document.getElementById(`${feed.instrument_token}`)) {
                    document.getElementById(`${feed.instrument_token}`).innerHTML = parseFloat(feed.open).toFixed(2)
                }
            })
        })
    }

    const setTime = async (time = 0) => {
        prevDateTime.current = new Date(currentDate + " " + currentTime)
        var current = new Date((new Date(currentDate + " " + currentTime).getTime() + time * 1000) - new Date().getTimezoneOffset() * 60000)

        sessionStorage.setItem('currentDate', current.toISOString().split('T')[0])
        sessionStorage.setItem('currentTime', current.toISOString().split('T')[1].split('.')[0])

        setCurrentDate(current.toISOString().split('T')[0])
        setCurrentTime(current.toISOString().split('T')[1].split('.')[0])


    }

    return (
        <div className="container">
            <PageHeader
                HeaderText="Trading"
                Breadcrumb={[{ name: "Virtual Trading" }, { name: "Trading" }]}
            />
            <div className="row mb-2">
                <div className="col-md-3">
                    <div>
                        <h6>Current Date</h6>
                        <input type="date" className="form-control" value={currentDate} onChange={e => setCurrentDate(e.target.value)} />
                    </div>
                </div>
                <div className="col-md-6 mt-2 mb-2 mt-md-0 mb-md-0">
                    <div className="row d-flex align-items-end" style={{ height: '100%' }}>
                        <div className="col-2 d-flex justify-content-center">
                            <Button variant="danger" disabled={loader} onClick={() => setTime(-60 * 60)}>-1 hr</Button>
                        </div>
                        <div className="col-2 d-flex justify-content-center">
                            <Button variant="danger" disabled={loader} onClick={() => setTime(-5 * 60)}>-5 min</Button>
                        </div>
                        <div className="col-2 d-flex justify-content-center">
                            <Button variant="danger" disabled={loader} onClick={() => setTime(-1 * 60)}>-1 min</Button>
                        </div>
                        <div className="col-2 d-flex justify-content-center">
                            <Button variant="primary" disabled={loader} onClick={() => setTime(1 * 60)}>+1 min</Button>
                        </div>
                        <div className="col-2 d-flex justify-content-center">
                            <Button variant="primary" disabled={loader} onClick={() => setTime(5 * 60)}>+5 min</Button>
                        </div>
                        <div className="col-2 d-flex justify-content-center">
                            <Button variant="primary" disabled={loader} onClick={() => setTime(60 * 60)}>+1 hr</Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div>
                        <h6>Current Time</h6>
                        <input type="time" className="form-control" value={currentTime} onChange={e => setCurrentTime(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p className="border border-primary text-center rounded p-2 fw-bold">{new Date(currentDate + " " + currentTime).toLocaleString()}</p>
                </div>
            </div>

            <div className="row mb-3">
                {loader && <div className="col-12 mb-2 d-flex justify-content-center">
                    <Spinner animation="border" />
                </div>}
            </div>
            <div className="row clearfix">
                <div className="col-lg-4 col-md-12 watchlist">

                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="d-inline me-1">Nifty 50</h5>
                            <p className="d-inline text-primary">NSE</p>
                        </div>
                        <div className="col-md-6 text-end">
                            <p className="d-inline me-1" id={`256265`}>0</p>
                        </div>
                    </div>
                    <div className="row">
                        <InputGroup className="mb-3 mt-3">
                            <Form.Select className="col-2" aria-label="Default select example"
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
                                    <div className="col-md-12 stock-row">
                                        <div class="row border-bottom border-top p-3" onClick={() => setSelectedSymbol(`${tradeWatchItem.exch}:${tradeWatchItem.name}`)}>
                                            <div class="col-6 col-md-3 text-break order-md-1">{tradeWatchItem.name}</div>
                                            <div className="col-6 col-md-3 text-end order-md-6" id={tradeWatchItem.instrument_token}>0.00</div>
                                            <div class="col-6 col-md-6 order-md-3">{tradeWatchItem.exch}</div>
                                        </div>

                                        <div className="row col-md-9 offset-3 exchange-row-trade">
                                            <div className="row justify-content-evenly p-2">
                                                <div className="col-3  d-flex align-items-center">
                                                    <Button variant="success"
                                                        disabled={loader}
                                                        onClick={() => {
                                                            setBuyInstrument({
                                                                instrument_token: tradeWatchItem.instrument_token,
                                                                market: tradeWatchItem.marketType,
                                                                name: tradeWatchItem.name,
                                                                exchange: tradeWatchItem.exch,
                                                                price: parseFloat(document.getElementById(tradeWatchItem.instrument_token).innerText),
                                                            });
                                                            setBuyModelOpen(true)
                                                        }}>BUY</Button>
                                                </div>
                                                <div className="col-3  d-flex align-items-center">
                                                    <Button variant="danger"
                                                        disabled={loader}
                                                        onClick={() => {
                                                            setSellInstrument({
                                                                instrument_token: tradeWatchItem.instrument_token,
                                                                market: tradeWatchItem.marketType,
                                                                name: tradeWatchItem.name,
                                                                exchange: tradeWatchItem.exch,
                                                                price: parseFloat(document.getElementById(tradeWatchItem.instrument_token).innerText),
                                                            });
                                                            setSellModelOpen(true)
                                                        }}>SELL</Button>
                                                </div>
                                                <div className="col-3  d-flex align-items-center">
                                                    <Button variant="dark" index={index} disabled={loader} onClick={() => deleteTrade(tradeWatchItem.instrument_token)}><DeleteIcon /></Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                {loader ? '' :
                    <div className="col-lg-8 col-md-12 order-md-1 order-first" id="historic-trading-view-chart" style={{ height: '500px' }}>
                        <TVChartContainer
                            containerId="historic-trading-view-chart"
                            fullScreen={false}
                            symbol={selectedSymbol}
                            currentDate={currentDate}
                            currentTime={currentTime}
                        />
                    </div>
                }
            </div>
            <BuyModel show={buyModelOpen}
                setShow={setBuyModelOpen}
                onClose={() => setBuyModelOpen(false)}
                instrument={buyInstrument}
                currentTime={new Date(currentDate + " " + currentTime)}
            />
            <SellModel show={sellModelOpen}
                setShow={setSellModelOpen}
                onClose={() => setSellModelOpen(false)}
                instrument={sellInstrument}
                currentTime={new Date(currentDate + " " + currentTime)}
            />
        </div >
    )
}

export default Trading;

