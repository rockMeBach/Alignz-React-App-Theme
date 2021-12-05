import React, { useEffect, useState } from "react";
import UIModal from "../../components/UIElements/UIModal"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from "axios"
import BACKEND_URL from "../../Backend_url";


const BuyModal = ({ show, onClose, instrument }) => {

    const [market, setMarket] = useState('market')
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState()
    const [triggeredPrice, setTriggeredPrice] = useState()
    const [tradeTerm, setTradeTerm] = useState('intraday')
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
        console.log(instrument.instrument_token)
        axios.get(`http://${BACKEND_URL}/api/trading/getInstrumentData`, {
            params: {
                market: instrument.market,
                instrument_token: instrument.instrument_token
            }
        }).then(data => {
            console.log(data)
            setInstrumentData(data.data)
        })
    }, [instrument])

    return (
        <UIModal show={show}
            size={'40%'}
            title={
                <div className="container">
                    <h3 className="text-success">
                        BUY
                    </h3>
                    <div className="row">
                        <div className="col-md-12">
                            <h6>{instrumentData[instrument.market]}</h6>
                        </div>

                    </div>
                </div>
            } bodyText={
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div class="form-check d-flex justify-content-between">
                                <div>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="intraday" onChange={() => setTradeTerm('intraday')} checked />
                                    <label class="form-check-label text-success" for="intraday">
                                        Intraday <span>MIS</span>
                                    </label>
                                </div><div>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="longterm" onChange={() => setTradeTerm('longterm')} />
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
                            <input type="number" class="form-control" id="qty" min={0} />
                        </div>
                        <div className="col-md-4">
                            <label class="mb-2" for="price">Price</label>
                            <input type="number" class="form-control" disabled={market == 'market' || market == 'sl-m'} id="price" step={0.05} />
                        </div>
                        <div className="col-md-4">
                            <label class="mb-2" for="triggerPrice">Trigger Price</label>
                            <input type="number" class="form-control" disabled={market == 'market' || market == 'limit'} id="triggerPrice" step={0.05} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <div class="form-check d-flex justify-content-between">
                                <div >
                                    <input class="form-check-input" type="radio" name="stoploss" id="market" onChange={() => setMarket('market')} checked />
                                    <label class="market-label-trading text-success" for="market">
                                        Market
                                    </label>
                                </div>
                                <div >
                                    <input class="form-check-input" type="radio" name="stoploss" id="limit" onChange={() => setMarket('limit')} />
                                    <label class="market-label-trading text-success" for="limit" >
                                        Limit
                                    </label>
                                </div><div >
                                    <input class="form-check-input" type="radio" name="stoploss" id="sl-m" onChange={() => setMarket('sl-m')} />
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
                <span className="text-start">
                    Margin Required <InfoOutlinedIcon className="text-success" /> &#8377;1512
                </span>
            }
            onClose={onClose}
        />
    )
}

export default BuyModal