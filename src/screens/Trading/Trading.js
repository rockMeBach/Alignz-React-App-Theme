import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Form, FormControl, InputGroup, Button, ListGroup } from "react-bootstrap";
import axios from "axios"
import "./Trading.css"
import BACKEND_URL from "../../Backend_url";
import BuyModel from "./BuyModel"


const Trading = () => {
    const [search, setSearch] = useState('')
    const [selectMarket, setSelectMarket] = useState()
    const [buyModelOpen, setBuyModelOpen] = useState(false)
    const [marketList, setMarketList] = useState([])
    const [tradeWatch, selectTradeWatch] = useState([])
    const [buyInstrument ,setBuyInstrument]= useState({instrument_token:'',market:''})
    const [sellInstrument,setSellInstrument] = useState({instrument_token:'',market:''})
    var market = ["equity", "future", "option", "mcx", "currency", "crypto"]

    const getSearchResults = (e) => {
        setSearch(e)
        axios.get(`http://${BACKEND_URL}/api/trading/getSearchResults`, {
            params: {
                market: selectMarket,
                search: e
            }
        }).then(data => {
            console.log(data.data)
            setMarketList(data.data)
        })
    }
    return (
        <div className="container">
            <PageHeader
                HeaderText="Trading"
                Breadcrumb={[{ name: "Virtual Trading" }, { name: "Trading" }]}
            />
            <div className="row clearfix">
                <div className="col-lg-6 col-md-12">
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
                            {search && <ListGroup className="search-input">
                                {
                                    marketList.map(marketListItem => {
                                        return (
                                            <ListGroup.Item onClick={(e) => {
                                                setSearch(''); selectTradeWatch([...tradeWatch, marketListItem])
                                            }} action>
                                                <AddCircleOutlineIcon /> {marketListItem[selectMarket]}
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
                                            <div class="col-md-3">{tradeWatchItem[selectMarket].split(":")[1]}</div>
                                            <div class="col-md-3">{tradeWatchItem[selectMarket].split(":")[0]}</div>
                                            <div className="col-md-3 text-end">-0.22% <KeyboardArrowDownIcon className="text-danger" /> </div>
                                            <div className="text-danger col-md-3 text-end">40.73</div>
                                            <div className="offset-md-6 col-md-6 justify-content-between exchange-row-trade">
                                                <Button variant="success" onClick={() => {setBuyInstrument({instrument_token:tradeWatchItem.instrument_token,market:selectMarket});setBuyModelOpen(true)}}>BUY</Button>
                                                <Button variant="danger">SELL</Button>
                                                <Button variant="dark" index={index} onClick={() => selectTradeWatch(tradeWatch.splice(index, 1))}><DeleteIcon /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <BuyModel show={buyModelOpen}
                onClose={()=>setBuyModelOpen(false)}
                instrument={buyInstrument}
            />
        </div >
    )
}

export default Trading;

