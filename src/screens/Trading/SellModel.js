import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import UIModal from "../../components/UIElements/UIModal"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from "axios"
import BACKEND_URL from "../../Backend_url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BACKEND_URL_LIVE_TRADE from "../../Backend_live_feed_url";
import io from 'socket.io-client';

const SellModal = ({ show, onClose, instrument, setShow }) => {

    const [orderTypes, setOrderTypes] = useState('market')
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const [triggeredPrice, setTriggeredPrice] = useState(0)
    const [currentPrice, setCurrentPrice] = useState(-1)
    const [product, setProduct] = useState('MIS')
    const [leverage, setLeverage] = useState(1)
    const [multiple, setMultiple] = useState(1)

    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);

    const [socket, setSocket] = useState(null);
    useEffect(() => {
        setPrice(0)
        setTriggeredPrice(0)
        setCurrentPrice(-1)
        if (show == true) {
            setSocket(io(`http://${BACKEND_URL_LIVE_TRADE}`));

        }
        else {

            if (socket) {
                console.log("closed")
                socket.disconnect()
            }
        }
    }, [show])

    useEffect(() => {
        if (socket) {
            socket.on("futureData", futureLiveDataModal);
            socket.on("equityData", equityLiveDataModal);
            socket.on("optionData", optionLiveDataModal);
        }
    }, [socket])

    useEffect(() => {
        if (orderTypes == 'market') {
            setPrice(0);
            setTriggeredPrice(0)
        }
        if (orderTypes == 'limit') {
            setTriggeredPrice(0)
        }
        if (orderTypes == 'slm') {
            setPrice(0)
        }
    }, [orderTypes])

    const futureLiveDataModal = (futureData) => {
        if (instrument.instrument_token == futureData.instrument_token)
            setCurrentPrice(futureData.last_price.toFixed(2))
        console.log(instrument)
    }
    const equityLiveDataModal = (equityData) => {
        if (instrument.instrument_token == equityData.instrument_token)
            setCurrentPrice(equityData.last_price.toFixed(2))
        console.log(instrument)
    }
    const optionLiveDataModal = (optionData) => {
        if (instrument.instrument_token == optionData.instrument_token)
            setCurrentPrice(optionData.last_price.toFixed(2))
    }
    useEffect(() => {
        console.log(instrument.instrument_token)
        axios.get(`http://${BACKEND_URL}/api/trading/getInstrumentData`, {
            params: {
                market: instrument.market,
                symbol: instrument.exchange + ":" + instrument.name
            }
        }).then(data => {
            console.log(data)
            setLeverage(data.data.leverage || data.data['sell leverage'])
            setMultiple(data.data.multiple)
        })
    }, [instrument])

    const sell = () => {
        if (qty % multiple != 0)
            return toast(`Quantity not multiple of ${multiple}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error"
            });
        const data = {
            userID: auth.user._id,
            type: 'sell',
            instrument_token: instrument.instrument_token,
            marketSearch: instrument.market, // Equity, future, Crypto....
            qty,
            price,
            triggeredPrice,
            market: false,
            limit: false,
            slm: false,
            name: instrument.name,
            product: product,
            exchange: instrument.exchange,
            margin: instrument.market == 'option' ? qty * leverage : qty * price / leverage,
            currentPrice
        }

        data[orderTypes] = true;
        if (orderTypes == 'slm')
            data.margin = instrument.market == 'option' ? qty * leverage : qty * triggeredPrice / leverage

        axios.post(`http://${BACKEND_URL}/api/trading/setTradeBuySell`, data).then(data => {
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
            console.log(err.response)
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
                            SELL
                        </h3>
                        <div className="row">
                            <div className="col-md-6">
                                <h6>{instrument.name} X {qty} QTY</h6>
                            </div>
                            <div className="col-md-6">
                                <h6>{currentPrice == -1 ? 'Current Price Updating' : currentPrice}</h6>
                            </div>
                        </div>
                    </div>
                } bodyText={
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div class="form-check d-flex justify-content-between">
                                    <div>
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="intraday" onChange={() => setProduct('MIS')} checked={product == 'MIS'} />
                                        <label class="form-check-label text-danger" for="intraday">
                                            Intraday <span>MIS</span>
                                        </label>
                                    </div><div>
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="longterm" onChange={() => setProduct(instrument.market == 'equity' ? 'CNC' : 'NRML')} checked={product == 'CNC' || product == 'NRML'} />
                                        <label class="form-check-label text-danger" for="longterm">
                                            Longterm {instrument.market == 'equity' ? <span>CNC</span> : <span>NRML</span>}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-4">
                                <label class="mb-2" for="qty">QTY</label>
                                <input type="number" class="form-control" id="qty" min={0}
                                    value={qty}
                                    onChange={(e) =>
                                        setQty(parseFloat(e.target.value))}
                                />
                            </div>
                            <div className="col-md-4">
                                <label class="mb-2" for="price">Price</label>
                                <input type="number" class="form-control" value={price} disabled={orderTypes == 'market' || orderTypes == 'slm'} id="price" onChange={(e) => setPrice(parseFloat(e.target.value))} step={0.05} />
                            </div>
                            <div className="col-md-4">
                                <label class="mb-2" for="triggerPrice">Trigger Price</label>
                                <input type="number" class="form-control" value={triggeredPrice} disabled={orderTypes == 'market' || orderTypes == 'limit'} id="triggerPrice"
                                    onChange={(e) => {
                                        setTriggeredPrice(parseFloat(e.target.value))
                                    }}
                                    step={0.05} />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <div class="form-check d-flex justify-content-between">
                                    <div >
                                        <input class="form-check-input" type="radio" name="stoploss" id="market" onChange={() => setOrderTypes('market')} checked={orderTypes == 'market'} />
                                        <label class="market-label-trading text-danger" for="market">
                                            Market
                                        </label>
                                    </div>
                                    <div >
                                        <input class="form-check-input" type="radio" name="stoploss" id="limit" onChange={() => setOrderTypes('limit')} checked={orderTypes == 'limit'} />
                                        <label class="market-label-trading text-danger" for="limit" >
                                            Limit
                                        </label>
                                    </div><div >
                                        <input class="form-check-input" type="radio" name="stoploss" id="slm" onChange={() => setOrderTypes('slm')} checked={orderTypes == 'slm'} />
                                        <label class="market-label-trading text-danger" for="slm">
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
                        Margin Required <InfoOutlinedIcon className="text-danger" /> &#8377;
                        {
                            orderTypes == 'market' && <span>
                                {instrument.market == 'option' ? qty * leverage : qty * currentPrice / leverage}
                            </span>
                        }
                        {
                            orderTypes == 'limit' && <span>
                                {instrument.market == 'option' ? qty * leverage : qty * price / leverage}
                            </span>
                        }
                        {
                            orderTypes == 'slm' && <span>
                                {instrument.market == 'option' ? qty * leverage : qty * triggeredPrice / leverage}
                            </span>
                        }
                    </span>
                }
                onClose={onClose}
                onSave={currentPrice == -1 ? null : sell}
                closeButtonVariant="outline-danger"
                saveButtonVariant={`${currentPrice == -1 ? 'secondary' : 'danger'}`}
                closeButtonContent="Cancel"
                saveButtonContent="SELL"
            />
            <ToastContainer />
        </>
    )
}

export default SellModal