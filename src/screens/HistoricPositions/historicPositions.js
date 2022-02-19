import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux'
import PageHeader from "../../components/PageHeader";
import { InputGroup, FormControl, Button, Table } from 'react-bootstrap'
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


const HistoricPositions = () => {
    const auth = useSelector((state) => state.auth);
    const [positions, setPositions] = useState([])
    const [sum, setSum] = useState(0)
    const [search, setSearch] = useState('')
    const [currentDate, setCurrentDate] = useState()
    const [currentTime, setCurrentTime] = useState()
    const positionsRef = useRef([])

    useEffect(() => {
        axios.get(`http://${BACKEND_URL}/api/historicPositions/getHistoricPositions`, {
            params: {
                userId: auth.user._id
            }
        }).then(data => {
            setPositions(data.data)
            positionsRef.current = data.data
        })
        axios.get(`http://${BACKEND_URL}/api/historicTrading/getHistoricTradingWatchlist`, {
            params: {
                userID: auth.user._id
            }
        }).then(data => {
            console.log(data)
            if (data.data) {
                var currentLocalDate = new Date(new Date(data.data.currentTime).getTime() - new Date().getTimezoneOffset() * 60000)
                setCurrentDate(currentLocalDate.toISOString().split('T')[0])
                setCurrentTime(currentLocalDate.toISOString().split('T')[1].split('.')[0])
            }
        })
    }, [auth])


    const updateColumns = (id, val, change) => {
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
            document.getElementById(id + "-ltp").style.color = change < 0 ? 'red' : 'green'
            document.getElementById(id + "-pnl").innerHTML = pnl;
            var sum = 0
            Array.from(document.querySelectorAll('[id$="-pnl"]')).forEach(ele => {
                sum += parseFloat(ele.innerHTML)
            })
            setSum(sum.toFixed(2))
        }
    }

    const futureLiveData = (futureData) => {
        const products = ["MIS", "NRML"]
        products.forEach(product => {
            updateColumns(futureData.instrument_token + "-" + product, futureData.last_price.toFixed(2), futureData.change)
        })
    }

    const equityLiveData = (equityData) => {
        const products = ["MIS", "CNC"]
        products.forEach(product => {
            updateColumns(equityData.instrument_token + "-" + product, equityData.last_price.toFixed(2), equityData.change)
        })
    }
    const optionLiveData = (optionData) => {
        const products = ["MIS", "NRML"]
        products.forEach(product => {
            updateColumns(optionData.instrument_token + "-" + product, optionData.last_price.toFixed(2), optionData.change)
        })
    }

    const getSearchResults = (search) => {
        if (search == '')
            return setPositions(positionsRef.current)
        const res = positionsRef.current.filter(position => {
            if (new RegExp(search).test(position.instrument))
                return position
        })
        setPositions(res)
    }

    return (
        <div className="container">
            <PageHeader
                HeaderText="Positions"
                Breadcrumb={[{ name: "Positions" }]}
            />
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
                        <ExcelSheet data={positionsRef.current} name="positons">
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
                                    positions.map((position, key) => {
                                        return (

                                            <tr>
                                                <td id={`${position.instrument_token + "-" + position.product}`}>{position.instrument}</td>
                                                <td>{position.product}</td>
                                                <td id={`${position.instrument_token + "-" + position.product}-net-qty`}>{position.net_qty.toFixed(2)}</td>
                                                <td>{position.avg.toFixed(2)}</td>
                                                <td id={`${position.instrument_token + "-" + position.product}-ltp`}>{0}</td>
                                                <td id={`${position.instrument_token + "-" + position.product}-buy-value`}>{position.buy_value}</td>
                                                <td id={`${position.instrument_token + "-" + position.product}-sell-value`}>{position.sell_value}</td>
                                                <td id={`${position.instrument_token + "-" + position.product}-current-value`}>{0}</td>
                                                <td id={`${position.instrument_token + "-" + position.product}-pnl`}>{0}</td>
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

export default HistoricPositions;