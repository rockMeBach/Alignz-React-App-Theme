import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Form, FormControl, InputGroup, Button, ListGroup, Spinner } from "react-bootstrap";
import axios from "axios"
import "./EquityTrading.css"
import BACKEND_URL from "../../Backend_url";
import BuyModel from "./BuyModel"
import SellModel from "./SellModel"
import io from 'socket.io-client';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';


const EquityTrading = () => {
    const [search, setSearch] = useState('')
    const [selectMarket, setSelectMarket] = useState('equity')
    const [buyModelOpen, setBuyModelOpen] = useState(false)
    const [sellModelOpen, setSellModelOpen] = useState(false)
    const [marketList, setMarketList] = useState([])
    const [tradeWatch, selectTradeWatch] = useState([])
    const [buyInstrument ,setBuyInstrument]= useState({instrument_token:'',market:''})
    const [sellInstrument,setSellInstrument] = useState({instrument_token:'',market:''})

    useEffect(()=>{
        const socket = io(`http://${BACKEND_URL}`);
        socket.on("equityData",equityLiveData);
    },[])

    const equityLiveData = (equityData) =>{
        
        if(document.getElementById(equityData.instrument_token))
        {
            console.log(equityData)
            var change =equityData.change.toFixed(2)
            document.getElementById(equityData.instrument_token).innerHTML = equityData.last_price.toFixed(2)
            document.getElementById(equityData.instrument_token).style.color = change<0?"red":"green"
            document.getElementById(equityData.instrument_token+"-change").innerHTML = change+"%"
            document.getElementById(equityData.instrument_token+"-change").style.color = change<0?"red":"green"
        }
    }

    const getSearchResults = (e) => {
        setSearch(e)
        axios.get(`http://${BACKEND_URL}/api/trading/getSearchResults`, {
            params: {
                market: selectMarket,
                search: e
            }
        }).then(data => {
            // console.log(data.data)
            setMarketList(data.data)
        })
    }


    
    return (
        <div className="container">
            <PageHeader
                HeaderText="Equity Trading"
                Breadcrumb={[{ name: "Virtual Trading" }, { name: "Equity Trading" }]}
            />
            <div className="row clearfix" style={{height:'100%'}}>
                <div className="col-lg-4 col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="d-inline me-1">Nifty 50</h5>
                            <p className="d-inline text-danger">15814.70</p>
                        </div>
                        <div className="col-md-6 text-end">
                            <p className="d-inline me-1 text-success">52735.39</p>
                            <p className="d-inline">0.36%</p>
                        </div>

                    </div>
                    <div className="row">
                        <InputGroup className="mb-3 mt-3">
                            <InputGroup.Text id="basic-addon1"><SearchIcon /></InputGroup.Text>
                            <FormControl aria-label="Search" value={search} onChange={(e) => { getSearchResults(e.target.value) }} placeholder="Search e.g. Nifty, Infy" />
                            {search && <ListGroup className="search-input">
                                {
                                    marketList.map(marketListItem => {
                                        return (
                                            <ListGroup.Item onClick={(e) => {
                                                setSearch(''); selectTradeWatch([...tradeWatch, marketListItem])
                                            }} action>
                                                <AddCircleOutlineIcon /> {marketListItem[marketListItem.type]}
                                            </ListGroup.Item>)
                                    })
                                }
                            </ListGroup>}
                        </InputGroup>
                    </div>
                    {
                        tradeWatch.map((tradeWatchItem, index) => {
                            return (
                                <div className="row">
                                    <div className="col-md-12">
                                        <div class="row border-bottom border-top p-3 stock-row">
                                            <div class="col-md-3 text-break">{tradeWatchItem[tradeWatchItem.type].split(":")[1]}</div>
                                            <div class="col-md-3 ">{tradeWatchItem[tradeWatchItem.type].split(":")[0]}</div>
                                            <div className="col-md-3 text-md-end" id={`${tradeWatchItem.instrument_token}-change`}><Spinner animation="border" /> </div>
                                            <div className="col-md-3  text-md-end" id={tradeWatchItem.instrument_token}><Spinner animation="border" /></div>
                                            <div className="offset-md-6 col-md-6 justify-content-between exchange-row-trade">
                                                <Button variant="success" onClick={() => {setBuyInstrument({instrument_token:tradeWatchItem.instrument_token,market:selectMarket});setBuyModelOpen(true)}}>BUY</Button>
                                                <Button variant="danger" onClick={() => {setSellInstrument({instrument_token:tradeWatchItem.instrument_token,market:selectMarket});setSellModelOpen(true)}}>SELL</Button>
                                                <Button variant="dark" index={index} onClick={() => {selectTradeWatch(tradeWatch.splice(index, 1))}}><DeleteIcon /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="col-lg-8 col-md-12 order-first order-lg-1">
                <TradingViewWidget 
                symbol="BSE:SENSEX"
                theme={Themes.DARK}
                
                />
                </div>
            </div>
            <BuyModel show={buyModelOpen}
                onClose={()=>setBuyModelOpen(false)}
                instrument={buyInstrument}
            />
            <SellModel show={sellModelOpen}
                onClose={()=>setSellModelOpen(false)}
                instrument={sellInstrument}
            />
        </div >
    )
}

export default EquityTrading;

