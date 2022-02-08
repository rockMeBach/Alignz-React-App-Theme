import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Form, FormControl, InputGroup, Button, ListGroup, Spinner } from "react-bootstrap";
import axios from "axios"
// import "./CryptoTrading.css"
import BACKEND_URL from "../../Backend_url";
// import BuyModel from "./BuyModel"
// import SellModel from "./SellModel"
import { io } from 'socket.io-client';
// import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { w3cwebsocket as W3CWebSocket } from "websocket"
import coins from "../../Data/CryptoCoins.json"

const CryptoTrading = () => {
    const [search, setSearch] = useState('')
    const [cryptos, setCryptos] = useState(['BTCUSDT'])
    const [selectMarket, setSelectMarket] = useState('crypto')
    const [buyModelOpen, setBuyModelOpen] = useState(false)
    const [sellModelOpen, setSellModelOpen] = useState(false)
    const [cryptoList, setCryptoList] = useState([])
    const [tradeWatch, selectTradeWatch] = useState([])
    const [buyInstrument, setBuyInstrument] = useState({ instrument_token: '', market: '' })
    const [sellInstrument, setSellInstrument] = useState({ instrument_token: '', market: '' })

    useEffect(() => {
        var url = 'wss://stream.binance.com:9443/ws'
        cryptos.forEach(crypto => {
            url = url + `/${crypto.toLowerCase()}@ticker`
        }
        )
        const socket = io(url);
        socket.onmessage = liveData
    }, [cryptos])

    const liveData = (data) => {
        data = JSON.parse(data.data)
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
            if (new RegExp(e).test(coin))
                return coin
        })
        setCryptoList(ele)
    }



    return (
        <div className="container">
            <PageHeader
                HeaderText="Crypto Trading"
                Breadcrumb={[{ name: "Virtual Trading" }, { name: "Crypto Trading" }]}
            />
            <div className="row clearfix" style={{ height: '100%' }}>
                <div className="col-lg-4 col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="d-inline me-1">BTCUSDT</h5>
                        </div>
                        <div className="col-md-6 text-end">
                            <p className="d-inline me-1 text-success" id="BTCUSDT">52735.39</p>
                            <p className="d-inline" id="BTCUSDT-change" >0.36%</p>
                        </div>

                    </div>
                    <div className="row">
                        <InputGroup className="mb-3 mt-3">
                            <InputGroup.Text id="basic-addon1"><SearchIcon /></InputGroup.Text>
                            <FormControl aria-label="Search" value={search} onChange={(e) => { getSearchResults(e.target.value) }} placeholder="Search e.g. Nifty, Infy" />
                            {search && <ListGroup className="search-input">
                                {
                                    cryptoList.map(cryptoListItem => {
                                        return (
                                            <ListGroup.Item onClick={(e) => {
                                                setSearch(''); setCryptos([...cryptos, cryptoListItem])
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
                            if (index != 0)
                                return (
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div class="row border-bottom border-top p-3 stock-row">
                                                <div class="col-md-6 text-break">{crypto}</div>
                                                <div className="col-md-3 text-md-end" id={`${crypto}-change`}>0.00</div>
                                                <div className="col-md-3  text-md-end" id={crypto}>$0.00</div>
                                                <div className="offset-md-6 col-md-6 justify-content-between exchange-row-trade">
                                                    <Button variant="success">BUY</Button>
                                                    <Button variant="danger">SELL</Button>
                                                    <Button variant="dark" index={index} onClick={() => { setCryptos(cryptos.splice(index, 1)) }}><DeleteIcon /></Button>
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
            {/* <BuyModel show={buyModelOpen}
                onClose={() => setBuyModelOpen(false)}
                instrument={buyInstrument}
            />
            <SellModel show={sellModelOpen}
                onClose={() => setSellModelOpen(false)}
                instrument={sellInstrument}
            /> */}
        </div >
    )
}

export default CryptoTrading;

