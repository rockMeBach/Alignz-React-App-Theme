import React from "react"

import { TableCell, TableRow, Table } from "@mui/material"
import moment from "moment"

import { PositionItemDetails } from "../Positions/PositionItem"

const OptionsTableRow = (props) => {
  const expiry = moment(props.expiryDate).format("DDMMMYY").toUpperCase()
  return (
    <TableRow className="">
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="border-b-0 border-fuchsia-400"
      >
        <button
          className="p-2 m-1 font-medium text-sm rounded-md bg-pink-400 disabled:bg-gray-400"
          disabled={props.call === undefined}
          onClick={() => {
            // Add buy CE postion to simulator
            const position = {
              action: "BUY",
              size: 1,
              strike: props.strike_price,
              expiry: expiry,
              entryPrice: props.call?.LTP || 0,
              currentPrice: props.call?.LTP || 0,
              optiontype: "CE",
              pnl: 0,
            }
            props.setsimulatorPosition((prev) => [...prev, position])
          }}
        >
          BUY
        </button>
        <button
          className="p-2 m-1 font-medium text-sm rounded-md bg-fuchsia-400 disabled:bg-gray-400"
          disabled={props.call === undefined}
          onClick={() => {
            // Add sell CE postion to simulator
            const position = {
              action: "SELL",
              size: 1,
              strike: props.strike_price,
              expiry: expiry,
              entryPrice: props.call?.LTP || 0,
              currentPrice: props.call?.LTP || 0,
              optiontype: "CE",
              pnl: 0,
            }
            props.setsimulatorPosition((prev) => [...prev, position])
          }}
        >
          SELL
        </button>
      </TableCell>
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="border-b-0 border-pink-400"
      >
        {/* Call LTP */}
        {/* {Math.floor(Math.random() * 100 + 1)} */}
        {props.call?.LTP !== undefined ? props.call?.LTP?.toFixed(2) : "-"}
      </TableCell>
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="border-b-0 border-pink-400"
      >
        {/* Call IV */}
        {props.call?.IV !== undefined ? props.call?.IV?.toFixed(2) : "-"}
      </TableCell>
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="border-b-0 border-pink-400"
      >
        {/* Call Delta */}
        {props.call?.delta !== undefined ? props.call?.delta?.toFixed(3) : "-"}
      </TableCell>
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="border-b-0 border-pink-400"
      >
        {/* Call Theta */}
        {props.call?.theta !== undefined ? props.call?.theta?.toFixed(3) : "-"}
      </TableCell>
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="border-b-0 border-pink-400"
      >
        {/* Call Gamma */}
        {props.call?.gamma !== undefined ? props.call?.gamma?.toFixed(3) : "-"}
      </TableCell>
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="border-b-0 border-pink-400"
      >
        {/* Call Vega */}
        {props.call?.vega !== undefined ? props.call?.vega?.toFixed(3) : "-"}
      </TableCell>
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="bg-gradient-to-r from-pink-300 to-fuchsia-300"
      >
        {/* // Strike Price  */}
        {props.strike_price}
      </TableCell>
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="border-b-0 border-fuchsia-400"
      >
        {/* put Vega */}
        {props.put?.vega !== undefined ? props.put?.vega?.toFixed(3) : "-"}
      </TableCell>
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="border-b-0 border-fuchsia-400"
      >
        {/* put Gamma */}
        {props.put?.gamma !== undefined ? props.put?.gamma?.toFixed(3) : "-"}
      </TableCell>
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="border-b-0 border-fuchsia-400"
      >
        {/* put Theta */}
        {props.put?.theta !== undefined ? props.put?.theta?.toFixed(3) : "-"}
      </TableCell>
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="border-b-0 border-fuchsia-400"
      >
        {/* put Delta */}
        {props.put?.delta !== undefined ? props.put?.delta?.toFixed(3) : "-"}
      </TableCell>
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="border-b-0 border-fuchsia-400"
      >
        {/* put IV */}
        {props.put?.IV !== undefined ? props.put?.IV?.toFixed(2) : "-"}
      </TableCell>
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="border-b-0 border-fuchsia-400"
      >
        {/* Put LTP */}
        {/* {Math.floor(Math.random() * 100 + 1)} */}
        {props.put?.LTP !== undefined ? props.put?.LTP?.toFixed(2) : "-"}
      </TableCell>
      <TableCell
        sx={{ fontSize: "medium" }}
        align="center"
        className="border-b-0 border-fuchsia-400"
      >
        <button
          className="p-2 m-1 font-medium text-sm rounded-md bg-fuchsia-400 disabled:bg-gray-400"
          disabled={props.put === undefined}
          onClick={() => {
            const position = {
              action: "SELL",
              size: 1,
              strike: props.strike_price,
              expiry: expiry,
              entryPrice: props.put?.LTP || 0,
              currentPrice: props.put?.LTP || 0,
              optiontype: "PE",
              pnl: 0,
            }
            // Add sell PE postion to simulator
            props.setsimulatorPosition((prev) => [...prev, position])
          }}
        >
          SELL
        </button>
        <button
          className="p-2 m-1 font-medium text-sm rounded-md bg-pink-400 disabled:bg-gray-400"
          disabled={props.put === undefined}
          onClick={() => {
            const position = {
              action: "BUY",
              size: 1,
              strike: props.strike_price,
              expiry: expiry,
              entryPrice: props.put?.LTP || 0,
              currentPrice: props.put?.LTP || 0,
              optiontype: "PE",
              pnl: 0,
            }
            // Add buy PE postion to simulator
            props.setsimulatorPosition((prev) => [...prev, position])
          }}
        >
          BUY
        </button>
      </TableCell>
    </TableRow>
  )
}

export default OptionsTableRow
