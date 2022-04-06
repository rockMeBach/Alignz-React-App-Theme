import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import UIModal from "../../components/UIElements/UIModal"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from "axios"
import BACKEND_URL from "../../Backend_url";
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { ToastContainer, toast } from 'react-toastify';

const SellModal = ({ show, onClose, instrument, setShow }) => {

    const auth = useSelector((state) => state.auth);


    const [market, setMarket] = useState('market')
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState()
    const [triggeredPrice, setTriggeredPrice] = useState()
    const [currentPrice, setCurrentPrice] = useState(-1)
    const [tradeTerm, setTradeTerm] = useState('intraday')
    const [leverage, setLeverage] = useState(1)
    const [showToast, setShowToast] = useState(false)
    const [instrumentData, setInstrumentData] = useState({
        future: "",
        minutes: {
            close: 0,
            high: 0,
            low: 0,
            minute: "",
            open: 0,
        }
    })

    useEffect(() => {
        var url = 'wss://stream.binance.com:9443/ws' + `/${instrument.toLowerCase()}@ticker`
        const socket = W3CWebSocket(url);
        socket.onmessage = (data) => {
            data = JSON.parse(data.data)
            setCurrentPrice(parseFloat(data.c))
        }
    }, [instrument])


    useEffect(() => {
        if (market == 'market') {
            setPrice(0);
            setTriggeredPrice(0)
        }
        if (market == 'limit') {
            setTriggeredPrice(0)
        }
        if (market == 'slm') {
            setPrice(0)
        }
    }, [market])

    const sell = () => {
        const data = {
            type: 'sell',
            userID: auth.user._id,
            instrument: instrument,
            qty,
            price,
            triggeredPrice,
            market: false,
            limit: false,
            slm: false,
            product: 'NRML',
            margin: qty * price,
            currentPrice: currentPrice
        }

        data[market] = true;
        if (market == 'slm')
            data.margin = qty * triggeredPrice / leverage

        axios.post(`http://${BACKEND_URL}/api/cryptoTrading/setCryptoTradeBuySell`, data).then(data => {
            toast(data.data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "success"
            });
            return setTimeout(() => {
                setShow(false)
            }, 3000);
        }).catch(err => {
            console.log(err)
            return toast(err.response.data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error"
            });
        })
    }


    return (
        <>
            <UIModal show={show}
                size={'40%'}
                title={
                    <div className="container">
                        <h3 className="text-danger">
                            Sell
                        </h3>
                        <div className="row">
                            <div className="col-md-6">
                                <h6>{instrument} X {qty} QTY</h6>
                            </div>

                            <div className="col-md-6">
                                <h6>{currentPrice == -1 ? 'Current Price Updating' : currentPrice}</h6>
                            </div>
                        </div>
                    </div>
                } bodyText={
                    <div className="container">
                        <div className="row mt-2">
                            <div className="col-md-4">
                                <label class="mb-2" for="qty">QTY</label>
                                <input type="number" class="form-control" id="qty" min={0} onChange={(e) => setQty(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <label class="mb-2" for="price">Price</label>
                                <input type="number" class="form-control" value={price} disabled={market == 'market' || market == 'slm'} id="price" onChange={(e) => setPrice(e.target.value)} step={0.05} />
                            </div>
                            <div className="col-md-4">
                                <label class="mb-2" for="triggerPrice">Trigger Price</label>
                                <input type="number" class="form-control" value={triggeredPrice} disabled={market == 'market' || market == 'limit'} id="triggerPrice"
                                    onChange={(e) => {
                                        setTriggeredPrice(e.target.value)
                                    }} step={0.05} />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <div class="form-check d-flex justify-content-between">
                                    <div >
                                        <input class="form-check-input" type="radio" name="stoploss" id="market" onChange={() => setMarket('market')} checked={market == 'market'} />
                                        <label class="market-label-trading text-success" for="market">
                                            Market
                                        </label>
                                    </div>
                                    <div >
                                        <input class="form-check-input" type="radio" name="stoploss" id="limit" onChange={() => setMarket('limit')} checked={market == 'limit'} />
                                        <label class="market-label-trading text-success" for="limit" >
                                            Limit
                                        </label>
                                    </div><div >
                                        <input class="form-check-input" type="radio" name="stoploss" id="sl-m" onChange={() => setMarket('slm')} checked={market == 'slm'} />
                                        <label class="market-label-trading text-success" for="sl-m">
                                            SL-M
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                footerContent={
                    <span className="text-start" style={{ width: '50%' }}>
                        Margin Required <InfoOutlinedIcon className="text-success" /> &#8377;
                        {
                            market == 'market' && <span>
                                {qty * price}
                            </span>
                        }
                        {
                            market == 'limit' && <span>
                                {qty * price}
                            </span>
                        }
                        {
                            market == 'slm' && <span>
                                {qty * triggeredPrice}
                            </span>
                        }
                    </span>
                }
                onClose={onClose}
                onSave={currentPrice == -1 ? null : sell}
                closeButtonVariant="outline-danger"
                saveButtonVariant={`${currentPrice == -1 ? 'secondary' : 'danger'}`}
                closeButtonContent="Cancel"
                saveButtonContent="Sell"
            />
            <ToastContainer />
        </>
    )
}

export default SellModal