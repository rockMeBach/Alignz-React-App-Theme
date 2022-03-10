import React from "react"
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Label,
} from "recharts"
import {
  calculateCallBuy,
  calculateCallSell,
  calculatePutBuy,
  calculatePutSell,
} from "./functions/optionsPnL"
import { PositionItemDetails } from "./Positions/PositionItem"

const Chart = (props) => {
  // Calculate pnl according to equity price
  const datapoints = parseInt(process.env.REACT_APP_CHART_DATAPOINTS || "40")
  const chartData = Array.from({ length: datapoints }, (_, index) => {
    // Equity price offset
    const counter = (index - datapoints / 2) * 2

    const simulatedEquityPrice =
      props.equityPrice + (props.equityPrice * counter) / 100

    // For simulatedEquityPrice, calculate pnl
    const simulatedPNL = props.positions.map((ele) => {
      // Calculate accordign to type
      if (ele.optiontype === "CE") {
        if (ele.action === "BUY") {
          return {
            ...ele,
            pnl: calculateCallBuy(
              ele.strike,
              simulatedEquityPrice,
              ele.entryPrice
            ),
          }
        } else if (ele.action === "SELL") {
          return {
            ...ele,
            pnl: calculateCallSell(
              ele.strike,
              simulatedEquityPrice,
              ele.entryPrice
            ),
          }
        }
      } else if (ele.optiontype === "PE") {
        if (ele.action === "BUY") {
          return {
            ...ele,
            pnl: calculatePutBuy(
              ele.strike,
              simulatedEquityPrice,
              ele.entryPrice
            ),
          }
        } else if (ele.action === "SELL") {
          return {
            ...ele,
            pnl: calculatePutSell(
              ele.strike,
              simulatedEquityPrice,
              ele.entryPrice
            ),
          }
        }
      }
      // Default Case
      return {
        ...ele,
        pnl: null,
      }
    })

    const sumPNL = simulatedPNL.reduce((acc, curr) => {
      if (curr.pnl) {
        return acc + curr.pnl
      }
      return acc
    }, 0)

    // console.log(counter, simulatedEquityPrice)
    // console.log(simulatedPNL)
    // console.log(sumPNL)

    return {
      SpotPrice: Math.round(simulatedEquityPrice * 100) / 100,
      PNL: Math.round(sumPNL * 100) / 100,
    }
  })

  return (
    <div className="mt-0 md:mt-4 py-6 px-4 bg-white text-sm">
      {/* <div className="font-bold pl-4 pb-2">Chart</div> */}
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart
          // width={500}
          // height={400}
          data={chartData}
        >
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis dataKey="SpotPrice">
            <Label value="Equity Price" offset={-2} position="insideBottom" />
          </XAxis>
          <YAxis
            dataKey="PNL"
            label={{ value: "P&L", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line type="linear" dataKey="PNL" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
