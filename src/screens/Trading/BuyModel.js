import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import UIModal from "../../components/UIElements/UIModal"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from "axios"
import BACKEND_URL from "../../Backend_url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BuyModal = ({ show, onClose, instrument, setShow }) => {

    const [orderTypes, setOrderTypes] = useState('market')
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const [triggeredPrice, setTriggeredPrice] = useState(0)
    const [currentPrice, setCurrentPrice] = useState(0)
    const [tradeTerm, setTradeTerm] = useState('intradayMIS')
    const [leverage, setLeverage] = useState(1)
    const [instrumentData, setInstrumentData] = useState({
        market: "",
        minutes: {
            close: 0,
            high: 0,
            low: 0,
            minute: "",
            open: 0,
        }
    })


    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        setPrice(0)
        setTriggeredPrice(0)
        setCurrentPrice(0)
        axios.get(`http://${BACKEND_URL}/api/trading/getInstrumentData`, {
            params: {
                market: instrument.market,
                instrument_token: instrument.instrument_token
            }
        }).then(data => {
            console.log(data)
            setInstrumentData(data.data)
            setPrice(data.data.minutes.close)
            setTriggeredPrice(data.data.minutes.close)
            setCurrentPrice(data.data.minutes.close)
        })
    }, [show])


    const buy = () => {
        const data = { userID:auth.user._id,
            type:'buy',
            instrument_token:instrument.instrument_token,
            marketSearch:instrument.market, // Equity, future, Crypto....
            qty,
            price,
            triggeredPrice,
            intradayMIS:false,
            longtermCNC:false,
            market:false,
            limit:false,
            slm:false,
            name:instrumentData[instrument.market].split(":")[1],
            product:'product',
            exchange:instrumentData[instrument.market].split(":")[0],
            margin:qty * price / leverage ,
            currentPrice:currentPrice
        }

            data[tradeTerm]=true;
            data[orderTypes]=true;
            if(orderTypes== 'slm')
            data.margin = qty * triggeredPrice / leverage

            axios.post(`http://${BACKEND_URL}/api/trading/setTradeBuySell`,data).then(data=>{
                setShow(false)
                return toast(data.data, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    type: "success"
                });
            }).catch(err=>{
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
                        <h3 className="text-success">
                            BUY
                        </h3>
                        <div className="row">
                            <div className="col-md-12">
                                <h6>{instrumentData[instrument.market]} X {qty} QTY</h6>
                            </div>

                        </div>
                    </div>
                } bodyText={
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div class="form-check d-flex justify-content-between">
                                    <div>
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="intraday" onChange={() => setTradeTerm('intradayMIS')} checked={tradeTerm == 'intradayMIS'} />
                                        <label class="form-check-label text-success" for="intraday">
                                            Intraday <span>MIS</span>
                                        </label>
                                    </div><div>
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="longterm" onChange={() => setTradeTerm('longtermCNC')}  checked={tradeTerm == 'longtermCNC'}/>
                                        <label class="form-check-label text-success" for="longterm">
                                            Longterm <span>CNC</span>
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
                                <input type="number" class="form-control" value={price} disabled={orderTypes== 'market' || orderTypes== 'slm'} id="price" onChange={(e) => setPrice(parseFloat(e.target.value))} step={0.05} />
                            </div>
                            <div className="col-md-4">
                                <label class="mb-2" for="triggerPrice">Trigger Price</label>
                                <input type="number" class="form-control" value={triggeredPrice} disabled={orderTypes== 'market' || orderTypes== 'limit'} id="triggerPrice"
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
                            orderTypes== 'market' && <span>
                                {qty * price / leverage}
                            </span>
                        }
                        {
                            orderTypes== 'limit' && <span>
                                {qty * price / leverage}
                            </span>
                        }
                        {
                            orderTypes== 'slm' && <span>
                                {qty * triggeredPrice / leverage}
                            </span>
                        }
                    </span>
                }
                onClose={onClose}
                onSave={currentPrice==0?null:buy}
                closeButtonVariant="outline-success"
                saveButtonVariant="success"
                closeButtonContent="Cancel"
                saveButtonContent="BUY"
            />
            <ToastContainer />
        </>
    )
}

export default BuyModal