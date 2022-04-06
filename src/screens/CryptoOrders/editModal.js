import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import UIModal from "../../components/UIElements/UIModal"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from "axios"
import BACKEND_URL from "../../Backend_url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { w3cwebsocket as W3CWebSocket } from "websocket"
import BACKEND_URL_LIVE_TRADE from "../../Backend_live_feed_url";
import io from 'socket.io-client';

const EditModal = ({ show, onClose, order, setShow }) => {

    const [orderTypes, setOrderTypes] = useState(order['market'] ? 'market' : order['limit'] ? 'limit' : 'slm')
    const [qty, setQty] = useState(order.qty)
    const [price, setPrice] = useState(order.price)
    const [triggeredPrice, setTriggeredPrice] = useState(order.triggeredPrice)
    const [currentPrice, setCurrentPrice] = useState(-1)
    const [leverage, setLeverage] = useState(1)
    const [multiple, setMultiple] = useState(1)
    const [product, setProduct] = useState('MIS')



    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);


    useEffect(() => {
        console.log(order)
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


    useEffect(() => {
        console.log(order)
        if (order.instrument) {
            setCurrentPrice(-1)
            setOrderTypes(order['market'] ? 'market' : order['limit'] ? 'limit' : 'slm')
            setQty(order.qty)
            setPrice(order.slm ? 0 : order.price)
            setTriggeredPrice(order.triggeredPrice)
            setProduct(order.product)
            var url = 'wss://stream.binance.com:9443/ws' + `/${order.instrument.toLowerCase()}@ticker`
            const socket = W3CWebSocket(url);
            socket.onmessage = (data) => {
                data = JSON.parse(data.data)
                setCurrentPrice(parseFloat(data.c))
            }
        }
    }, [order])

    const update = () => {
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
            orderID: order._id,
            qty,
            price,
            type: order.type,
            triggeredPrice,
            market: false,
            product: product,
            limit: false,
            slm: false,
            margin: qty * price,
            currentPrice: currentPrice,
            instrument: order.instrument
        }

        data[orderTypes] = true;
        if (orderTypes == 'slm')
            data.margin = qty * triggeredPrice / leverage

        axios.put(`http://${BACKEND_URL}/api/cryptoTrading/updateCryptoOrder`, data).then(data => {
            setShow(false)
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

        }).catch(err => {
            console.log(err.response)
            if (err.response.data == "Order can't be edited due to recent change in status") {
                toast(err.response.data, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    type: "error"
                });
                setShow(false)

            }
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
                        <h3>
                            Edit order
                        </h3>
                        <div className="row">
                            <div className="col-md-6">
                                <h6>{order.instrument} X {qty} QTY</h6>
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
                                        <label class="market-label-trading text-success" for="market">
                                            Market
                                        </label>
                                    </div>
                                    <div >
                                        <input class="form-check-input" type="radio" name="stoploss" id="limit" onChange={() => setOrderTypes('limit')} checked={orderTypes == 'limit'} />
                                        <label class="market-label-trading text-success" for="limit" >
                                            Limit
                                        </label>
                                    </div><div >
                                        <input class="form-check-input" type="radio" name="stoploss" id="slm" onChange={() => setOrderTypes('slm')} checked={orderTypes == 'slm'} />
                                        <label class="market-label-trading text-success" for="slm">
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
                            orderTypes == 'market' && <span>
                                {qty * currentPrice}
                            </span>
                        }
                        {
                            orderTypes == 'limit' && <span>
                                {qty * price}
                            </span>
                        }
                        {
                            orderTypes == 'slm' && <span>
                                {qty * triggeredPrice}
                            </span>
                        }
                    </span>
                }
                onClose={onClose}
                onSave={currentPrice == -1 ? null : update}
                closeButtonVariant="outline-primary"
                saveButtonVariant={`${currentPrice == -1 ? 'secondary' : 'primary'}`}
                closeButtonContent="Cancel"
                saveButtonContent="Update"
            />
            <ToastContainer />
        </>
    )
}

export default EditModal