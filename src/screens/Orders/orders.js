import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import PageHeader from "../../components/PageHeader";
import { InputGroup, FormControl, Button, Table } from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';
import BACKEND_URL from "../../Backend_url";
import moment from "moment"
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const Orders = () => {
    const auth = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([])


    useEffect(() => {
        axios.get(`http://${BACKEND_URL}/api/trading/getOrders`, {
            params: {
                userID: auth.user._id
            }
        }).then(data => {
            console.log(data)
            const updatedTimeData = data.data.map(order=>{
                order.orderTime = moment(order.orderTime).format("YYYY-MM-DDTHH:mm")
                return order;
            })
            setOrders(updatedTimeData)
        })
    }, [auth])

    return (
        <div className="container">
            <PageHeader
                HeaderText="Orders"
                Breadcrumb={[{ name: "Orders" }]}
            />
            <div className="row">
                <div className='col-lg-6 col-md-12'>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><SearchIcon /></InputGroup.Text>
                        <FormControl
                            placeholder="Search e.g. Infy, Nifty fut etc"
                            aria-label="Search"
                            aria-describedby="basic-addon1"
                        />
                        <Button variant="danger" style={{ backgroundColor: 'rgb(226, 116, 152)', borderColor: 'rgb(226, 116, 152)' }}>Search</Button>
                    </InputGroup>
                </div>
                <div className='col-lg-6 col-md-12 text-end'>
                    <ExcelFile element={<Button variant="outline-danger" style={{ borderColor: 'rgb(226, 116, 152)', color: 'rgb(226, 116, 152)' }}>
                        <DownloadIcon /> Download Historical Orders
                    </Button>}>
                        <ExcelSheet data={orders} name="orders">
                            <ExcelColumn label="Instrument" value="name" />
                            <ExcelColumn label="Type" value="type" />
                            <ExcelColumn label="Exch"
                                value="exchange" />
                            <ExcelColumn label="Time"
                                value="orderTime" />
                            <ExcelColumn label="Product"
                                value="product" />
                            <ExcelColumn label="QTY"
                                value="qty" />
                            <ExcelColumn label="LTP"
                                value="triggeredPrice" />
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
                                orders.map(order => {
                                    return (

                                        <tr>
                                            <td>{order.name}</td>
                                            <td>{order.type}</td>
                                            <td>{order.exchange}</td>
                                            <td>{moment(order.orderTime).format("YYYY-MM-DDTHH:mm")}</td>
                                            <td>{order.product}</td>
                                            <td>{order.qty}</td>
                                            <td>{order.triggeredPrice}</td>
                                            <td>{order.price}</td>
                                            <td>
                                                <span className={`p-1 rounded ${order.orderType == 'open' ? "bg-primary" : order.orderType == 'executed' ? "bg-success" : "bg-danger"} text-white`}>
                                                    {order.orderType}
                                                </span>
                                            </td>
                                            <td>Action</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Orders