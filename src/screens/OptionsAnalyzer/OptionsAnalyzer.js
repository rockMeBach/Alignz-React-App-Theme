import React, { useEffect, useState } from "react"
import moment, { Moment } from "moment"
import AdapterMoment from "@mui/lab/AdapterMoment"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import Tab from "@mui/material/Tab"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box } from "@mui/system"
import axios from "axios"
import {Container, Row, Col} from "react-bootstrap"
import "./OptionsAnalyzer.css"

// import { Search as SearchIcon } from "@mui/icons-material"

import Navbar from "../../components/Navbar"
import SelectIndex from "../../components/SelectIndex"
import OptionLabels from "../../components/OptionLabels"
import OptionsStartPayoff from "../../components/OptionsStartPayoff"
import OptionsExpiry from "../../components/OptionsExpiry"
import OptionsCurrentBar from "../../components/OptionsCurrentBar"
import OptionsTable from "../../components/OptionsTable/OptionsTable"
import Chart from "../../components/Chart"
import StratergyPositions from "../../components/Positions/StratergyPositions"
import PositionGreeks from "../../components/PositionGreeks/PositionGreeks"
import PositionDetails from "../../components/PositionDetails/PositionDetials"
import OptionsTableRowDetails from "../../components/OptionsTable/OptionsTableRow"
import PositionItemDetails from "../../components/Positions/PositionItem"

import BACKEND_URL from "../../Backend_url"

const OptionsAnalyzer = () => {
  const [optionStockNames, setoptionStockNames] = useState([])

  const [optionExpiryDate, setoptionExpiryDate] = useState([])

  const optionNames = optionStockNames.map((ele) => ele.option)

  const expiryDateList = optionExpiryDate
    .map((ele) => ele.date)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  const [selectIndexValue, setSelectIndexValue] = useState(null)
  // optionNames[0] ? optionNames[0] : null

  const [selectExpiryDate, setSelectExpiryDate] = useState(null)
  // expiryDateList[0] ? expiryDateList[0] : null

  const [selectStartDate, setSelectStartDate] = useState(Moment)

  const [selectPayoffDate, setSelectPayoffDate] = useState(Moment)

  let maxPayoffDate = moment.min([moment(selectExpiryDate), moment()])

  if (!maxPayoffDate.isValid()) {
    maxPayoffDate = moment()
  }

  // If expiry date changes then set start date and payoff date to accordingly
  useEffect(() => {
    if (selectExpiryDate) {
      setSelectPayoffDate(maxPayoffDate)
    }
  }, [selectExpiryDate])

  // Simulator Date state
  const [simulatorDate, setSimulatorDate] = useState(moment())

  useEffect(() => {
    if (selectStartDate) {
      setSimulatorDate(selectStartDate)
    }
  }, [selectStartDate])

  // Simulator Position state
  const [simulatorPosition, setSimulatorPosition] = useState([])

  // Fetching first load data
  useEffect(() => {
    /*if (!process.env.REACT_APP_BACKEND_URL) {
      throw new Error("REACT_APP_BACKEND_URL is not defined")
    }*/
    //axios.get(`http://${BACKEND_URL}/getStockNames`).then((res)=>{console.log(res.data)});

    axios.get(`http://${BACKEND_URL}/getStockNames`)
      .then((res) => {setoptionStockNames(res.data)})

    axios.get(`http://${BACKEND_URL}/expiryList`)
      .then((res) => {setoptionExpiryDate(res.data)})
  }, [])

  // const [selectDate, setselectDate] = useState("2021-10-24T18:30:00.000Z")
  // console.log("Selected Date", selectDate)

  // options table data
  const [optionTableData, setOptionTableData] = useState([])

  const [equityPrice, setequityPrice] = useState(0)

  // On index or eqpiry change
  useEffect(() => {
    /*if (!process.env.REACT_APP_BACKEND_URL) {
      throw new Error("REACT_APP_BACKEND_URL is not defined")
    }*/
    // Check if index and expiry date is selected
    if (selectIndexValue === null || selectExpiryDate === null) {
      console.log("Please select index and expiry date")
      return
    }
    // console.log(selectIndexValue, selectExpiryDate)

    // Find expiry date name
    const expiryDateName = optionExpiryDate.find(
      (ele) => ele.date === selectExpiryDate
    )?.name

    // Get earliest entry for given index expiry
    fetch(
      `http://${BACKEND_URL}/earliestdate?index=${selectIndexValue}&expiry=${expiryDateName}`
    )
      .then((res) => res.json())
      .then((earliestDate) => {
        //
        if (!earliestDate) {
          console.log("Earliest date empty: ", earliestDate)
          return
        }
        // Set start date
        setSelectStartDate(moment(earliestDate.minute))
        setSimulatorDate(moment(earliestDate.minute))
      })

    // End of useEffect
  }, [selectIndexValue, selectExpiryDate])

  // On simulator date change
  useEffect(() => {
    if (!selectIndexValue || !selectExpiryDate) {
      console.log("index and expiry date required")
      return
    }
    // Get table data for given index expiry
    console.log("Fetching table data")
    fetch(
      `http://${BACKEND_URL}/optiontable?index=${selectIndexValue}&expiryDate=${selectExpiryDate}&currentDate=${simulatorDate.toISOString()}`
    ).then((res) => {
      console.log(res.ok)
      if (!res.ok) {
        console.log("Invalid response for fetch option table data")
        // Set optionData state to empty array
        setOptionTableData([])
      } else {
        console.log(res);
        res
          .json()
          .then((optiontable) => {
            //
            if (!optiontable) {
              console.log("Table data empty: ", optiontable)
            }
            // Set optionData state to empty array
            setOptionTableData(
              optiontable.sort(
                (a, b) => a.strike_price - b.strike_price
              )
            )
            // Update current price of simulator positions and pnl
            setSimulatorPosition((prev) => {
              return prev.map((ele) => {
                if (ele.exitPrice) {
                  return ele
                }
                // Incase option not found in table data let price be 0
                let currentPrice = 0
                // Find option by strike price in table data
                const currentPositionEntry = optiontable.find(
                  (ele2) => ele2.strike_price === ele.strike
                )
                // console.log(currentPositionEntry)
                // Get current price accordign to type
                if (ele.optiontype === "CE") {
                  currentPrice = currentPositionEntry?.call?.LTP || 0
                } else if (ele.optiontype === "PE") {
                  currentPrice = currentPositionEntry?.put?.LTP || 0
                }

                const setPrice = ele.exitPrice ? ele.exitPrice : currentPrice
                console.log(setPrice, ele.exitPrice, currentPrice)
                if (ele.action === "BUY") {
                  return {
                    ...ele,
                    currentPrice: currentPrice,
                    pnl: setPrice - ele.entryPrice,
                  }
                } else if (ele.action === "SELL") {
                  return {
                    ...ele,
                    currentPrice: currentPrice,
                    pnl: ele.entryPrice - setPrice,
                  }
                }

                return {
                  ...ele,
                  currentPrice: currentPrice,
                  pnl: null,
                }
              })
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
    // Fetch equity data
    // Get spot price
    fetch(
      `http://localhost:80/spotprice?index=${selectIndexValue}&minute=${simulatorDate.toISOString()}`
    )
      .then((res) =>
        res.json().then((equityData) => {
          console.log(equityData);
          if (!equityData?.close) {
            console.log(
              `Couldnt find spot price for index ${selectIndexValue} minute ${simulatorDate}`
            )
            setequityPrice(0)
            return
          }
          setequityPrice(equityData.close)
        })
      )
      .catch((err) => {
        console.log(err)
      })
  }, [simulatorDate])

  // Tabs scaffold
  // Left half
  const [tabValue1, settabValue1] = useState("1")

  const tabHandleChange1 = (event, newValue) => {
    settabValue1(newValue)
  }

  // Right half
  const [tabValue2, settabValue2] = useState("1")

  const tabHandleChange2 = (event, newValue) => {
    settabValue2(newValue)
  }

  // Loading page
  if (optionStockNames.length < 1 || optionExpiryDate.length < 1) {
    console.log("Loading...")
    return <div>Loading...</div>
  }

  // console.log(optionStockNames.length < 1)

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="">
        <div style={{height:"50px"}}></div>
        <div className="md:text-xl mx-4 mt-6 ">
          <Container fluid>
            <Row>
              <Col xs={12} md={8}>
                <SelectIndex
                  optionNames={optionNames}
                  // selectIndexValue={selectIndexValue}
                  setSelectIndexValue={setSelectIndexValue}
                />
                {/* Simple seperator line  */}
                <div className="border-t-2 my-4 w-[60%] border-gray-300"></div>
                <OptionsExpiry
                  expiryDateList={expiryDateList}
                  setSelectExpiryDate={setSelectExpiryDate}
                />
              </Col>
              <Col className="basis-1/2">
                <div className="flex justify-center">
                  {/* TODO: Add essential tag prices here */}
                  <OptionLabels spotPrice={equityPrice} />
                </div>
              </Col>
            </Row>
          </Container>

          {/* Simple seperator line  */}
          <div className="border-t-2 my-4 border-gray-300"></div>
          <OptionsStartPayoff
            selectStartDate={selectStartDate}
            setSelectStartDate={setSelectStartDate}
            selectPayoffDate={selectPayoffDate}
            setSelectPayoffDate={setSelectPayoffDate}
            maxPayoffDate={maxPayoffDate}
          />
          {/* Simple seperator line  */}
          <div className="border-t-2 my-4 border-gray-300"></div>

          {!selectExpiryDate || !selectIndexValue ? (
            <div className="flex justify-center">
              <Box className="text-center font-medium bg-pink-50 md:w-[50%] p-2">
                Please select Index and Expiry
              </Box>
            </div>
          ) : (
            <>
              <OptionsCurrentBar
                simulatorDate={simulatorDate}
                setSimulatorDate={setSimulatorDate}
              />
              <div className="md:flex">
              <Row>
                <Col>
                <div className="basis-1/2 p-2">
                  <TabContext value={tabValue1}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={tabHandleChange1}
                        aria-label="wrapped label tabs example"
                      >
                        <Tab value={"1"} label="Positions" />
                        <Tab value={"2"} label="Greeks" />
                        <Tab value={"3"} label="Details" />
                      </TabList>
                    </Box>
                    <TabPanel
                      sx={{
                        padding: "0px",
                      }}
                      value={"1"}
                    >
                      {/* Position details here */}
                      <StratergyPositions
                        positions={simulatorPosition}
                        setsimulatorPosition={setSimulatorPosition}
                      />
                    </TabPanel>
                    <TabPanel
                      sx={{
                        padding: "0px",
                      }}
                      value={"2"}
                    >
                      <PositionGreeks
                        positions={simulatorPosition}
                        index={selectIndexValue}
                        simulatorDate={simulatorDate.toISOString()}
                      />
                    </TabPanel>
                    <TabPanel
                      sx={{
                        padding: "0px",
                      }}
                      value={"3"}
                    >
                      <PositionDetails positions={simulatorPosition} />
                    </TabPanel>
                  </TabContext>
                </div>
                </Col>
                <Col>
                <div className="basis-1/2 p-2 h-[70vh]">
                  <TabContext value={tabValue2}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={tabHandleChange2}
                        aria-label="wrapped label tabs example"
                      >
                        <Tab value={"1"} label="Chart" />
                      </TabList>
                    </Box>
                    <TabPanel
                      sx={{
                        padding: "0px",
                      }}
                      value={"1"}
                    >
                      <Chart
                        positions={simulatorPosition}
                        equityPrice={equityPrice}
                      />
                    </TabPanel>
                  </TabContext>
                </div>
                </Col>
                {/* End of Flex */}
              </Row>
              </div>
              <OptionsTable
                data={optionTableData}
                setsimulatorPosition={setSimulatorPosition}
                equityPrice={equityPrice}
              />
            </>
          )}
          {/* Footer Padding */}
          <div style={{height:"20px"}}></div>
        </div>
      </div>
    </LocalizationProvider>
  )
}

export default OptionsAnalyzer