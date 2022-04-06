import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux'
import PageHeader from "../../components/PageHeader";
import { InputGroup, FormControl, Button, Table, Spinner } from 'react-bootstrap'
import ReactExport from "react-export-excel";
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';
import BACKEND_URL from "../../Backend_url";
import BACKEND_URL_LIVE_TRADE from "../../Backend_live_feed_url";
import io from 'socket.io-client';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const HistoricHoldings = () => {
    const auth = useSelector((state) => state.auth);
    const [holdings, setHoldings] = useState([])
    const [sum, setSum] = useState(0)
    const [search, setSearch] = useState('')
    const [currentDate, setCurrentDate] = useState('')
    const [currentTime, setCurrentTime] = useState('')
    const [loader, setLoader] = useState(false)
    const holdingsRef = useRef([])
    var prevDateTime = useRef('')


    useEffect(() => {
        axios.get(`http://${BACKEND_URL}/api/historicTrading/getHistoricTradingWatchlist`, {
            params: {
                userID: auth.user._id
            }
        }).then(data => {
            if (data.data) {
                var currentLocalDate = new Date(new Date(data.data.currentTime).getTime() - new Date().getTimezoneOffset() * 60000)
                setCurrentDate(currentLocalDate.toISOString().split('T')[0])
                setCurrentTime(currentLocalDate.toISOString().split('T')[1].split('.')[0])
            }
        })
    }, [auth])

    useEffect(() => {
        if (currentDate != '' && currentTime != '') {
            const getCurrentFeed = new Promise((resolve, reject) => {
                if (!prevDateTime.current)
                    prevDateTime.current = new Date(currentDate + " " + currentTime)
                var time = new Date(currentDate + " " + currentTime)
                if (time.getTime() > new Date().getTime())
                    return toast.error("Please select a valid time")
                if (time.getTime() < prevDateTime.current.getTime())
                    prevDateTime.current = time
                setLoader(true)
                return axios.post(`http://${BACKEND_URL}/api/historicTrading/getHistoricFeed`, { time: time, userID: auth.user._id, prevDateTime: prevDateTime.current }).then(data => {
                    setLoader(false)
                    resolve(data.data)
                }).catch(err => {
                    setLoader(false)
                    reject()
                })
            })
            getCurrentFeed.then((ltpData) => {
                setLoader(true)
                setSum(0)
                axios.get(`http://${BACKEND_URL}/api/historicHoldings/getHistoricHoldings`, {
                    params: {
                        userId: auth.user._id,
                        currentTime: new Date(currentDate + " " + currentTime)
                    }
                }).then(data => {
                    setLoader(false)
                    if (data.data) {
                        setHoldings(data.data)
                        holdingsRef.current = data.data
                        setLtp(ltpData)
                    }
                })
            })

        }
    }, [auth, currentDate, currentTime])

    const setLtp = (ltpData) => {
        const val = ltpData.forEach((feed, index) => {
            if (feed) {
                const products = ["MIS", "NRML", "CNC"]
                products.forEach(product => {
                    updateColumns(feed.instrument_token + "-" + product, parseFloat(feed.close).toFixed(2))
                })
            }
        })
    }




    const setTime = (time = 0) => {
        prevDateTime.current = new Date(currentDate + " " + currentTime)
        var current = new Date((new Date(currentDate + " " + currentTime).getTime() + time * 1000) - new Date().getTimezoneOffset() * 60000)
        setCurrentDate(current.toISOString().split('T')[0])
        setCurrentTime(current.toISOString().split('T')[1].split('.')[0])
    }

    const updateColumns = (id, val) => {
        if (document.getElementById(id)) {
            var net_qty = parseInt(document.getElementById(id + "-net-qty").innerHTML)
            var buy_val = parseFloat(document.getElementById(id + "-buy-value").innerHTML)
            var sell_val = parseFloat(document.getElementById(id + "-sell-value").innerHTML)
            var ltp = val;
            var cur_val = -(net_qty * ltp);
            var pnl = cur_val + buy_val + sell_val;
            cur_val = cur_val.toFixed(2);
            pnl = pnl.toFixed(2);
            document.getElementById(id + "-current-value").innerHTML = cur_val
            document.getElementById(id + "-ltp").innerHTML = ltp;
            document.getElementById(id + "-pnl").innerHTML = pnl;
            var sum = 0
            Array.from(document.querySelectorAll('[id$="-pnl"]')).forEach(ele => {
                sum += parseFloat(ele.innerHTML)
            })
            setSum(sum.toFixed(2))
        }
    }


    const getSearchResults = (search) => {
        if (search == '')
            return setHoldings(holdingsRef.current)
        const res = holdingsRef.current.filter(holding => {
            if (new RegExp(search).test(holding.instrument))
                return holding
        })
        setHoldings(res)
    }

    return (
        <div className="container">
            <PageHeader
                HeaderText="Holdings"
                Breadcrumb={[{ name: "Historic Tradings" }, { name: "Holdings" }]}
            />
            <div className="row mb-2">
                <div className="col-md-3">
                    <div>
                        <h6>Current Date</h6>
                        <input type="date" className="form-control" value={currentDate} onChange={e => setCurrentDate(e.target.value)} />
                    </div>
                </div>
                <div className="col-md-6 mt-2 mb-2 mt-md-0 mb-md-0">
                    <div className="row d-flex align-items-end" style={{ height: '100%' }}>
                        <div className="col-2 d-flex justify-content-center">
                            <Button variant="danger" disabled={loader} onClick={() => setTime(-60 * 60)}>-1 hr</Button>
                        </div>
                        <div className="col-2 d-flex justify-content-center">
                            <Button variant="danger" disabled={loader} onClick={() => setTime(-5 * 60)}>-5 min</Button>
                        </div>
                        <div className="col-2 d-flex justify-content-center">
                            <Button variant="danger" disabled={loader} onClick={() => setTime(-1 * 60)}>-1 min</Button>
                        </div>
                        <div className="col-2 d-flex justify-content-center">
                            <Button variant="primary" disabled={loader} onClick={() => setTime(1 * 60)}>+1 min</Button>
                        </div>
                        <div className="col-2 d-flex justify-content-center">
                            <Button variant="primary" disabled={loader} onClick={() => setTime(5 * 60)}>+5 min</Button>
                        </div>
                        <div className="col-2 d-flex justify-content-center">
                            <Button variant="primary" disabled={loader} onClick={() => setTime(60 * 60)}>+1 hr</Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div>
                        <h6>Current Time</h6>
                        <input type="time" className="form-control" value={currentTime} onChange={e => setCurrentTime(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p className="border border-primary text-center rounded p-2 fw-bold">{new Date(currentDate + " " + currentTime).toLocaleString()}</p>
                </div>
            </div>

            <div className="row mb-3">
                {loader && <div className="col-12 mb-2 d-flex justify-content-center">
                    <Spinner animation="border" />
                </div>}
            </div>
            <div className="row">
                <div className='col-lg-6 col-md-12'>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><SearchIcon /></InputGroup.Text>
                        <FormControl
                            placeholder="Search e.g. Infy, Nifty fut etc"
                            aria-label="Search"
                            aria-describedby="basic-addon1"
                            value={search}
                            onChange={(e) => {
                                if (e.target.value == '')
                                    getSearchResults('');
                                setSearch(e.target.value.toUpperCase())
                            }}
                        />
                        <Button variant="danger" style={{ backgroundColor: 'rgb(226, 116, 152)', bpositonColor: 'rgb(226, 116, 152)' }}
                            onClick={() => getSearchResults(search)}
                        >
                            Search
                        </Button>
                    </InputGroup>
                </div>
                <div className='col-lg-6 col-md-12 text-end'>
                    <ExcelFile element={<Button variant="outline-danger"
                        style={{ bpositonColor: 'rgb(226, 116, 152)', color: 'rgb(226, 116, 152)' }}>
                        <DownloadIcon /> Download Historical positons
                    </Button>}>
                        <ExcelSheet data={holdingsRef.current} name="positons">
                            <ExcelColumn label="Instrument" value="instrument" />
                            <ExcelColumn label="Product" value="product" />
                            <ExcelColumn label="Net QTY"
                                value="net_qty" />
                            <ExcelColumn label="Average"
                                value="avg" />
                            <ExcelColumn label="Buy value"
                                value="buy_value" />
                            <ExcelColumn label="Sell Value"
                                value="sell_value" />
                        </ExcelSheet>
                    </ExcelFile>

                </div>
                <div className="row">
                    <div className="col-3">
                        Date Set by User: {new Date(currentDate + " " + currentTime).toLocaleString()}
                    </div>
                    <div className='col-md-12'>
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>Instrument</th>
                                    <th>Product</th>
                                    <th>Net QTY</th>
                                    <th>Average</th>
                                    <th>LTP</th>
                                    <th>Buy value</th>
                                    <th>Sell Value</th>
                                    <th>Current Value</th>
                                    <th>PnL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    holdings.map((holding, key) => {
                                        return (

                                            <tr>
                                                <td id={`${holding.instrument_token + "-" + holding.product}`}>{holding.instrument}</td>
                                                <td>{holding.product}</td>
                                                <td id={`${holding.instrument_token + "-" + holding.product}-net-qty`}>{holding.net_qty.toFixed(2)}</td>
                                                <td>{holding.avg.toFixed(2)}</td>
                                                <td id={`${holding.instrument_token + "-" + holding.product}-ltp`}>{0}</td>
                                                <td id={`${holding.instrument_token + "-" + holding.product}-buy-value`}>{holding.buy_value}</td>
                                                <td id={`${holding.instrument_token + "-" + holding.product}-sell-value`}>{holding.sell_value}</td>
                                                <td id={`${holding.instrument_token + "-" + holding.product}-current-value`}>{0}</td>
                                                <td id={`${holding.instrument_token + "-" + holding.product}-pnl`}>{0}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td colSpan={8} className='text-right font-weight-bold'>Sum = </td>
                                    <td className={`${sum >= 0 ? 'text-success' : 'text-danger'} font-weight-bold`}>{sum}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoricHoldings;