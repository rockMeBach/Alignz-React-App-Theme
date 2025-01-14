import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux'
import PageHeader from "../../components/PageHeader";
import { InputGroup, FormControl, Button, Table } from 'react-bootstrap'
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
import EditModal from "./editModal"

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const Orders = () => {
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
    const ordersRef = useRef([])


    useEffect(() => {
        const socket = io(`http://${BACKEND_URL_LIVE_TRADE}`);
        socket.on("futureData", futureLiveData);
        socket.on("equityData", equityLiveData);
        socket.on("optionData", optionLiveData);
    }, [])

    const futureLiveData = (futureData) => {
        if (document.getElementsByClassName(futureData.instrument_token)) {
            var elements = document.getElementsByClassName(futureData.instrument_token)
            var change = futureData.change < 0 ? "red" : "green"
            var data = futureData.last_price.toFixed(2)
            Array.from(elements).forEach(element => {
                element.innerHTML = data
                element.style.color = change
            });

        }
    }

    const equityLiveData = (equityData) => {
        if (document.getElementsByClassName(equityData.instrument_token)) {
            var elements = document.getElementsByClassName(equityData.instrument_token)
            var change = equityData.change < 0 ? "red" : "green"
            var data = equityData.last_price.toFixed(2)
            Array.from(elements).forEach(element => {
                element.innerHTML = data
                element.style.color = change
            });

        }
    }
    const optionLiveData = (optionData) => {
        if (document.getElementsByClassName(optionData.instrument_token)) {
            var elements = document.getElementsByClassName(optionData.instrument_token)
            var change = optionData.change < 0 ? "red" : "green"
            var data = optionData.last_price.toFixed(2)
            Array.from(elements).forEach(element => {
                element.innerHTML = data
                element.style.color = change
            });

        }
    }
    useEffect(() => {
        if (!openEditModal || !deleteModal)
            axios.get(`http://${BACKEND_URL}/api/trading/getOrders`, {
                params: {
                    userID: auth.user._id
                }
            }).then(data => {
                ordersRef.current = data.data.map(order => {
                    order.orderTime = moment(order.orderTime).format("YYYY-MM-DDTHH:mm:ss")
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

                const todaysData = ordersRef.current.filter(order => {
                    if (new Date(order.orderTime).getDate() == new Date().getDate() && new Date(order.orderTime).getMonth() == new Date().getMonth()
                        && new Date(order.orderTime).getFullYear() == new Date().getFullYear()
                    )
                        return order;
                })

                const openData = todaysData.filter(order => {
                    if (order.orderType == 'open' || order.orderType == 'trigger pending')
                        return order;
                })

                const executedData = todaysData.filter(order => {
                    if (order.orderType == 'success' || new RegExp('AUTO').test(order.orderType))
                        return order;
                })
                console.log(openData)
                setOrdersOpen(openData)
                setOrdersExecuted(executedData)
                setTodaysData(todaysData)
            })
    }, [auth, openEditModal, deleteModal])

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
            if (new RegExp(order).test(item.name) && item.orderType != 'open' && item.orderType != 'trigger pending')
                return item;
        })

        setOrdersExecuted(results);
    }

    const deleteOrder = () => {
        const orderID = deleteOrderID
        axios.delete(`http://${BACKEND_URL}/api/trading/deleteOrder`,
            {
                params: {
                    orderID: orderID
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

    return (
        <div className="container">
            <PageHeader
                HeaderText="Orders"
                Breadcrumb={[{ name: "Virtual Trading" }, { name: "Orders" }]}
            />
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
                                            <td>{new Date(order.orderTime).toLocaleString()}</td>
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
            <EditModal show={openEditModal}
                setShow={setOpenEditModal}
                onClose={() => setOpenEditModal(false)}
                order={editOrderDetail}
            />
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

export default Orders