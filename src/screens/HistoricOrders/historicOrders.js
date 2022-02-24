import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux'
import PageHeader from "../../components/PageHeader";
import { InputGroup, FormControl, Button, Table, Spinner } from 'react-bootstrap'
import UIModal from "../../components/UIElements/UIModal"
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';
import BACKEND_URL from "../../Backend_url";
import moment from "moment"
import ReactExport from "react-export-excel";
import { ToastContainer, toast } from 'react-toastify';
import BACKEND_URL_LIVE_TRADE from "../../Backend_live_feed_url";
import io from 'socket.io-client';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import EditModal from "./editModal"

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const HistoricOrders = () => {
    const auth = useSelector((state) => state.auth);
    const [searchOpen, setSearchOpen] = useState('')
    const [searchExecuted, setSearchExecuted] = useState('')
    const [ordersOpen, setOrdersOpen] = useState([])
    const [ordersExecuted, setOrdersExecuted] = useState([])
    const [todaysData, setTodaysData] = useState([])
    const [editOrderDetail, setEditOrderDetail] = useState({})
    const [deleteOrderID, setDeleteOrderID] = useState(null)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [currentDate, setCurrentDate] = useState()
    const [currentTime, setCurrentTime] = useState()
    const [loader, setLoader] = useState(false)
    const ordersRef = useRef([])


    useEffect(() => {
        if (!openEditModal || !deleteModal) {
            setLoader(true)
            axios.get(`http://${BACKEND_URL}/api/historicTrading/getHistoricOrders`, {
                params: {
                    userID: auth.user._id
                }
            }).then(data => {
                ordersRef.current = data.data.map(order => {
                    if (order.market)
                        order.order = "Market"
                    if (order.limit)
                        order.order = "Limit"
                    if (order.slm)
                        order.order = "SL-M"
                    if (order.slm)
                        order.price = order.triggeredPrice

                    return order;
                })
                axios.get(`http://${BACKEND_URL}/api/historicTrading/getHistoricTradingWatchlist`, {
                    params: {
                        userID: auth.user._id
                    }
                }).then(data => {
                    if (data.data) {
                        if (!currentDate && !currentTime) {
                            var currentLocalDate = new Date(new Date(data.data.currentTime).getTime() - new Date().getTimezoneOffset() * 60000)
                            setCurrentDate(currentLocalDate.toISOString().split('T')[0])
                            setCurrentTime(currentLocalDate.toISOString().split('T')[1].split('.')[0])
                        }
                        var currentDateTime = new Date(currentDate + " " + currentTime)
                        const todaysData = ordersRef.current.filter(order => {
                            if (new Date(order.orderTime).getDate() == new Date(currentDateTime).getDate() && new Date(order.orderTime).getMonth() == new Date(currentDateTime).getMonth()
                                && new Date(order.orderTime).getFullYear() == new Date(currentDateTime).getFullYear()

                            ) {
                                if (new Date(order.orderTime).getTime() <= new Date(currentDateTime).getTime())
                                    return order;
                            }
                        })

                        const openData = todaysData.filter(order => {
                            console.log("initial", order, currentDateTime)
                            if (order.orderType == 'open' || order.orderType == 'trigger pending')
                                return order;
                            else if (new Date(order.executedTime).getTime() > new Date(currentDateTime).getTime()) {
                                console.log("Execution", order, currentDateTime)
                                if (order.slm) {
                                    order.orderType = 'trigger pending'
                                    return order;
                                }
                                else {
                                    order.orderType = 'open'
                                    return order;
                                }
                            }
                        })

                        const executedData = todaysData.filter(order => {
                            if ((order.orderType == 'success' || new RegExp('AUTO').test(order.orderType)) && new Date(order.executedTime).getTime() <= new Date(currentDateTime).getTime())
                                return order;
                        })
                        setOrdersOpen(openData)
                        setOrdersExecuted(executedData)
                        setTodaysData(todaysData)
                        getCurrentFeed()
                    }
                })
            })
        }
    }, [auth, openEditModal, deleteModal, currentDate, currentTime])



    const getSearchResultsOpen = (order) => {
        if (order == '') {
            const openData = todaysData.filter(order => {
                if (order.orderType == 'open' || order.orderType == 'trigger pending')
                    return order;
            })
            return setOrdersOpen(openData)
        }
        const results = todaysData.filter(item => {

            if (new RegExp(order).test(item.name) && (item.orderType == 'open' || item.orderType == 'trigger pending'))
                return item;
        })
        setOrdersOpen(results);
    }

    const getSearchResultsExecuted = (order) => {
        if (order == '') {
            const executedData = todaysData.filter(order => {
                if (order.orderType == 'success' || new RegExp('AUTO').test(order.orderType))
                    return order;
            })
            return setOrdersExecuted(executedData)
        }
        const results = todaysData.filter(item => {
            if (
                new RegExp(order).test(item.name)
                && item.orderType != 'open'
                && item.orderType != 'trigger pending'
            )
                return item;
        })

        setOrdersExecuted(results);

    }

    const deleteOrder = () => {
        const orderID = deleteOrderID
        axios.delete(`http://${BACKEND_URL}/api/historicTrading/deleteHistoricOrder`,
            {
                params: {
                    orderID: orderID,
                    executedTime: new Date(currentDate + ' ' + currentTime)
                }
            }
        ).then(data => {
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
            setDeleteModal(false)
        }).catch(err => {
            toast(err.response.data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "success"
            });
        })
    }

    const getCurrentFeed = () => {
        if (!currentDate || !currentTime)
            return;
        var time = new Date(currentDate + " " + currentTime)
        if (time.getTime() > new Date().getTime())
            return toast.error("Please select a valid time")
        setLoader(true)
        axios.post(`http://${BACKEND_URL}/api/historicTrading/getHistoricFeed`, { time, userID: auth.user._id }).then(data => {
            setLoader(false)
            const val = data.data.forEach((feed, index) => {
                if (feed && document.getElementsByClassName(feed.instrument_token)) {
                    var elements = document.getElementsByClassName(feed.instrument_token)
                    var data = feed.open.toFixed(2)
                    Array.from(elements).forEach(element => {
                        element.innerHTML = data
                    });

                }
            })
        })
            .catch(err => {
                setLoader(false)
            })
    }

    const setTime = (time = 0) => {
        var current = new Date((new Date(currentDate + " " + currentTime).getTime() + time * 1000) - new Date().getTimezoneOffset() * 60000)
        setCurrentDate(current.toISOString().split('T')[0])
        setCurrentTime(current.toISOString().split('T')[1].split('.')[0])
    }

    return (
        <div className="container">
            <PageHeader
                HeaderText="Orders"
                Breadcrumb={[{ name: "Historic Trading" }, { name: "Orders" }]}
            />
            <div className="row mb-4">
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

            {/* Open Orders */}
            <div className="row">
                <div className='col-lg-6 col-md-12'>
                    <h5>Open Orders</h5>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><SearchIcon /></InputGroup.Text>
                        <FormControl
                            placeholder="Search e.g. Infy, Nifty fut etc"
                            aria-label="Search"
                            aria-describedby="basic-addon1"
                            value={searchOpen}
                            onChange={(e) => {
                                if (e.target.value == '')
                                    getSearchResultsOpen('');
                                setSearchOpen(e.target.value.toUpperCase())
                            }}
                        />
                        <Button variant="danger" style={{ backgroundColor: 'rgb(226, 116, 152)', borderColor: 'rgb(226, 116, 152)' }}
                            onClick={() => getSearchResultsOpen(searchOpen)}>
                            Search
                        </Button>
                    </InputGroup>
                </div>
                <div className='col-lg-6 col-md-12 text-end'>
                    <ExcelFile element={<Button variant="outline-danger"
                        style={{ borderColor: 'rgb(226, 116, 152)', color: 'rgb(226, 116, 152)' }}>
                        <DownloadIcon /> Download Historical Orders
                    </Button>}>
                        <ExcelSheet data={ordersRef.current} name="orders">
                            <ExcelColumn label="Instrument" value="name" />
                            <ExcelColumn label="Type" value="type" />
                            <ExcelColumn label="Exch"
                                value="exchange" />
                            <ExcelColumn label="Time"
                                value="orderTime" />
                            <ExcelColumn label="Order Type"
                                value="order" />
                            <ExcelColumn label="Product"
                                value="product" />
                            <ExcelColumn label="QTY"
                                value="qty" />
                            <ExcelColumn label="LTP"
                                value="currentPrice" />
                            <ExcelColumn label="Price"
                                value="price" />
                            <ExcelColumn label="Status"
                                value="orderType" />
                        </ExcelSheet>
                    </ExcelFile>

                </div>
            </div>
            <div className="row">
                <div className='col-md-12'>
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th>Instrument</th>
                                <th>Type</th>
                                <th>Exch</th>
                                <th>Time</th>
                                <th>Order Type</th>
                                <th>Product</th>
                                <th>QTY</th>
                                <th>LTP</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ordersOpen.map(order => {
                                    return (

                                        <tr>
                                            <td>{order.name}</td>
                                            <td>{order.type[0].toUpperCase() + order.type.slice(1)}</td>
                                            <td>{order.exchange}</td>
                                            <td>{new Date(order.orderTime).toLocaleString()}</td>
                                            <td>{order.order}</td>
                                            <td>{order.product}</td>
                                            <td>{order.qty}</td>
                                            <td className={`${order.instrument_token}`}>0.00</td>
                                            <td>{order.price}</td>
                                            <td>
                                                <span className={`p-1 rounded bg-primary text-white`}>
                                                    {order.orderType == 'trigger pending' ? 'Trigger Pending' : 'Open'}
                                                </span>
                                            </td>
                                            <td>
                                                <EditOutlinedIcon onClick={() => { setOpenEditModal(true); setEditOrderDetail(order) }} />
                                                <DeleteOutlineOutlinedIcon onClick={() => { setDeleteOrderID(order._id); setDeleteModal(true); }} />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
            {/* Executed Orders */}
            <div className="row mt-5">
                <div className='col-lg-6 col-md-12'>
                    <h5>Executed Orders</h5>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><SearchIcon /></InputGroup.Text>
                        <FormControl
                            placeholder="Search e.g. Infy, Nifty fut etc"
                            aria-label="Search"
                            aria-describedby="basic-addon1"
                            value={searchExecuted}
                            onChange={(e) => {
                                if (e.target.value == '')
                                    getSearchResultsExecuted('');
                                setSearchExecuted(e.target.value.toUpperCase())
                            }}
                        />
                        <Button variant="danger" style={{ backgroundColor: 'rgb(226, 116, 152)', borderColor: 'rgb(226, 116, 152)' }}
                            onClick={() => getSearchResultsExecuted(searchExecuted)}>
                            Search
                        </Button>
                    </InputGroup>
                </div>

            </div>
            <div className="row">
                <div className='col-md-12'>
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th>Instrument</th>
                                <th>Type</th>
                                <th>Exch</th>
                                <th>Execution Time</th>
                                <th>Order Type</th>
                                <th>Product</th>
                                <th>QTY</th>
                                <th>LTP</th>
                                <th>Executed at Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ordersExecuted.map(order => {
                                    return (

                                        <tr>
                                            <td>{order.name}</td>
                                            <td>{order.type[0].toUpperCase() + order.type.slice(1)}</td>
                                            <td>{order.exchange}</td>
                                            <td>{new Date(order.executedTime).toLocaleString()}</td>
                                            <td>{order.order}</td>
                                            <td>{order.product}</td>
                                            <td>{order.qty}</td>
                                            <td className={`${order.instrument_token}`}>0.00</td>
                                            <td>{order.executedPrice}</td>
                                            <td>
                                                <span className={`p-1 rounded ${order.orderType == 'success' ? "bg-success" : "bg-danger"} text-white`}>
                                                    {order.orderType[0].toUpperCase() + order.orderType.slice(1)}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
            <ToastContainer />
            {/* <EditModal show={openEditModal}
                setShow={setOpenEditModal}
                onClose={() => setOpenEditModal(false)}
                order={editOrderDetail}
            /> */}
            <UIModal show={deleteModal}
                title={<h4>Delete Order</h4>}
                bodyText={<h6>Are you sure?</h6>}
                onClose={() => setDeleteModal(false)}
                onSave={deleteOrder}
                closeButtonVariant="outline-primary"
                saveButtonVariant="danger"
                closeButtonContent="Cancel"
                saveButtonContent="Delete"
            />
        </div>
    )
}

export default HistoricOrders