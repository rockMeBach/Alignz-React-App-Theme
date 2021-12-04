import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import UIModal from "../../components/UIElements/UIModal"
import Arrow from "../../assets/icons/caret-down.svg"
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Form, FormControl, InputGroup, Button, ListGroup } from "react-bootstrap";
import axios from "axios"
import "./Trading.css"
import BACKEND_URL from "../../Backend_url";


const Trading = () => {
    const [search, setSearch] = useState('')
    const [selectMarket, setSelectMarket] = useState()
    const [buyModelOpen, setBuyModelOpen] = useState(false)
    const [marketList, setMarketList] = useState([])
    const [tradeWatch, selectTradeWatch] = useState([])
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
                                                setSearch(''); selectTradeWatch([...tradeWatch, marketListItem[selectMarket]])
                                            }} action>
                                                <AddCircleOutlineIcon /> {marketListItem[selectMarket]}
                                            </ListGroup.Item>)
                                    })
                                }


                            </ListGroup>}
                        </InputGroup>
                    </div>
                    {
                        tradeWatch.map((tradeWatchItem,index) => {
                            return (
                                <div className="row">
                                    <div className="col-md-12">
                                        <div class="row border-bottom border-top p-3 stock-row">
                                            <div class="col-md-3">{tradeWatchItem.split(":")[1]}</div>
                                            <div class="col-md-3">{tradeWatchItem.split(":")[0]}</div>
                                            <div className="col-md-3 text-end">-0.22% <KeyboardArrowDownIcon className="text-danger" /> </div>
                                            <div className="text-danger col-md-3 text-end">40.73</div>
                                            <div className="offset-md-6 col-md-6 justify-content-between exchange-row-trade">
                                                <Button variant="success" onClick={() => setBuyModelOpen(true)}>BUY</Button>
                                                <Button variant="danger">SELL</Button>
                                                <Button variant="dark" index={index} onClick={()=>selectTradeWatch(tradeWatch.splice(index,1))}><DeleteIcon /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <UIModal show={buyModelOpen}
                size={'40%'}
                title={
                    <div className="container">
                        <h3 className="text-success">
                            BUY
                        </h3>
                        <div className="row">
                            <div className="col-md-5">
                                <h6>GOLDBEES X 1 QTY</h6>
                            </div>
                            <div className="col-md-7">
                                <div class="form-check d-flex justify-content-between">
                                    <div>
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                                        <label class="form-check-label text-success" for="flexRadioDefault1">
                                            BSE:&#8377;1512
                                        </label>
                                    </div><div>
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                        <label class="form-check-label text-success" for="flexRadioDefault2">
                                            NSE:&#8377;1508
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                } bodyText={
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div class="form-check d-flex justify-content-between">
                                    <div>
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="intraday" checked />
                                        <label class="form-check-label text-success" for="intraday">
                                            Intraday <span>MIS</span>
                                        </label>
                                    </div><div>
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="longterm" />
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
                                <input type="number" class="form-control" id="qty" />
                            </div>
                            <div className="col-md-4">
                                <label class="mb-2" for="price">Price</label>
                                <input type="number" class="form-control" id="price" />
                            </div>
                            <div className="col-md-4">
                                <label class="mb-2" for="triggerPrice">Trigger Price</label>
                                <input type="number" class="form-control" id="triggerPrice" />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <div className=" d-flex justify-content-between">
                                    <div>
                                        <input class="form-check-input" type="radio" name="market" id="market" checked />
                                        <label class="market-label-trading text-success" for="market">
                                            Market
                                        </label>
                                    </div>

                                    <div>
                                        <input class="form-check-input" type="radio" name="limit" id="limit" />
                                        <label class="market-label-trading text-success" for="limit">
                                            Limit
                                        </label>
                                    </div>

                                    <div>
                                        <input class="form-check-input" type="radio" name="sl" id="sl" checked />
                                        <label class="market-label-trading text-success" for="sl">
                                            SL
                                        </label>
                                    </div>

                                    <div>
                                        <input class="form-check-input" type="radio" name="sl-m" id="sl-m" />
                                        <label class="market-label-trading text-success" for="sl-m">
                                            SL-M
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row border-top mt-3">
                            <div class="form-check col-md-6">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    StopLoss
                                </label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Value" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <span class="input-group-text" id="basic-addon2">%</span>
                                </div>
                            </div>
                            <div class="form-check col-md-6">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label class="form-check-label" for="flexCheckChecked">
                                    StopLoss
                                </label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Value" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <span class="input-group-text" id="basic-addon2">%</span>
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
                onClose={() => setBuyModelOpen(false)}
            />
        </div >
    )
}

export default Trading;

