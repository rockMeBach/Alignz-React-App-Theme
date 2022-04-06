import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import PageHeader from "../../components/PageHeader";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Form, FormControl, InputGroup, Button, ListGroup, Spinner } from "react-bootstrap";
import axios from "axios"
// import "./CryptoTrading.css"
import BACKEND_URL from "../../Backend_url";
import BACKEND_URL_LIVE_TRADE from "../../Backend_live_feed_url";
import BuyModel from "./BuyModel"
import SellModel from "./SellModel"
import { io } from 'socket.io-client';
// import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import coins from "../../Data/CryptoCoins.json"

const CryptoTrading = () => {

    const auth = useSelector((state) => state.auth);


    const [search, setSearch] = useState('')
    const [cryptos, setCryptos] = useState([])
    const [selectMarket, setSelectMarket] = useState('crypto')
    const [buyModelOpen, setBuyModelOpen] = useState(false)
    const [sellModelOpen, setSellModelOpen] = useState(false)
    const [cryptoList, setCryptoList] = useState([])
    const [tradeWatch, selectTradeWatch] = useState([])
    const [buyInstrument, setBuyInstrument] = useState('')
    const [sellInstrument, setSellInstrument] = useState('')

    useEffect(() => {
        var socket = io(BACKEND_URL_LIVE_TRADE);
        socket.on('cryptoData', function incoming(data) {
            liveData(data)
        })
    }, [cryptos])

    useEffect(() => {
        axios.get(`http://${BACKEND_URL}/api/cryptoTrading/getCryptoTradingWatchlist`, {
            params: {
                userID: auth.user._id
            }
        }).then(data => {
            console.log(data.data.watchlist)
            if (data.data) {
                setCryptos(data.data.watchlist)
            }
        })
    }, [auth])

    const liveData = (data) => {
        if (document.getElementById(data.s)) {
            var change = parseFloat(data.P).toFixed(2)
            document.getElementById(data.s).innerHTML = "$" + parseFloat(data.c).toFixed(5)
            document.getElementById(data.s).style.color = change < 0 ? "red" : "green"
            document.getElementById(data.s + "-change").innerHTML = change + "%"
            document.getElementById(data.s + "-change").style.color = change < 0 ? "red" : "green"
        }
    }

    const getSearchResults = (e) => {
        e = e.toUpperCase()
        setSearch(e)
        const ele = coins.filter(coin => {
            if (new RegExp(e).test(coin) && !cryptos.includes(coin))
                return coin
        })
        setCryptoList(ele)
    }

    const addToWatchList = (cryptoListItem) => {
        console.log(cryptoListItem)
        // setCryptos([...cryptos, cryptoListItem])
        const data = {
            userID: auth.user._id,
            instrument_token: cryptoListItem,
        }
        axios.post(`http://${BACKEND_URL}/api/cryptoTrading/addCryptoTradingWatchlist`, data).then(data => {
            console.log(data)
            setCryptos(data.data.watchlist)
        })
    }

    const deleteTrade = (instrument_token) => {
        const data = {
            userID: auth.user._id,
            instrument_token: instrument_token
        }
        axios.put(`http://${BACKEND_URL}/api/cryptoTrading/pullCryptoTradingWatchlist`, data).then(data => {
            setCryptos(['BTCUSDT', ...data.data.watchlist])
        })
    }

    return (
        <div className="container">
            <PageHeader
                HeaderText="Crypto Trading"
                Breadcrumb={[{ name: "Virtual Trading" }, { name: "Crypto Trading" }]}
            />
            <div className="row clearfix" style={{ height: '100%' }}>
                <div className="col-lg-4 col-md-12">
                    {/* <div className="row">
                        <div className="col-md-6">
                            <h5 className="d-inline me-1">BTCUSDT</h5>
                        </div>
                        <div className="col-md-6 text-end">
                            <p className="d-inline me-1 text-success" id="BTCUSDT">52735.39</p>
                            <p className="d-inline" id="BTCUSDT-change" >0.36%</p>
                        </div>
                    </div> */}
                    <div className="row">
                        <InputGroup className="mb-3 mt-3">
                            <InputGroup.Text id="basic-addon1"><SearchIcon /></InputGroup.Text>
                            <FormControl aria-label="Search" value={search} onChange={(e) => { getSearchResults(e.target.value) }} placeholder="Search e.g. BTCUSDT, ETHUSDT" />
                            {search && <ListGroup className="search-input">
                                {
                                    cryptoList.map(cryptoListItem => {
                                        return (
                                            <ListGroup.Item onClick={(e) => {
                                                setSearch(''); addToWatchList(cryptoListItem)
                                            }} action>
                                                <AddCircleOutlineIcon /> {cryptoListItem}
                                            </ListGroup.Item>)
                                    })
                                }
                            </ListGroup>}
                        </InputGroup>
                    </div>
                    {
                        cryptos.map((crypto, index) => {
                            return (
                                <div className="row">
                                    <div className="col-md-12">
                                        <div class="row border-bottom border-top p-3 stock-row">
                                            <div class="col-md-6 text-break">{crypto}</div>
                                            <div className="col-md-3 text-md-end" id={`${crypto}-change`}>0.00</div>
                                            <div className="col-md-3  text-md-end" id={crypto}>$0.00</div>
                                            <div className="offset-md-6 col-md-6 justify-content-between exchange-row-trade">
                                                <Button variant="success" onClick={() => { setBuyInstrument(crypto); setBuyModelOpen(true) }}>BUY</Button>
                                                <Button variant="danger" onClick={() => { setSellInstrument(crypto); setSellModelOpen(true) }}>SELL</Button>
                                                <Button variant="dark" index={index} onClick={() => { deleteTrade(crypto) }}><DeleteIcon /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="col-lg-8 col-md-12 order-first order-lg-1">
                    {/* <TradingViewWidget
                        symbol="BSE:SENSEX"
                        theme={Themes.DARK}
                    /> */}
                </div>
            </div>
            {buyModelOpen && <BuyModel show={buyModelOpen}
                onClose={() => setBuyModelOpen(false)}
                instrument={buyInstrument}
                setShow={setBuyModelOpen}
            />}
            {sellModelOpen && <SellModel show={sellModelOpen}
                onClose={() => setSellModelOpen(false)}
                instrument={sellInstrument}
                setShow={setSellModelOpen}
            />}
        </div >
    )
}

export default CryptoTrading;

