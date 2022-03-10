import React from "react"

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import OptionsTableRow, {
  OptionsTableRowDetails,
  OptionsTableRowPassOn,
} from "./OptionsTableRow"

const OptionsTable = (props) => {
  return (
    <TableContainer
      component={Paper}
      className="overflow-auto rounded bg-white "
    >
      <Table
        sx={{ textAlign: "center" }}
        aria-label="simple table"
        className=" border-x-0 border-gray-400  w-full text-center"
      >
        <TableHead>
          <TableRow className="text-white">
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              rowSpan={2}
              className="bg-pink-300"
            >
              Actions
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              colSpan={6}
              className=" bg-pink-300"
            >
              Call
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              rowSpan={2}
              className="bg-gradient-to-r from-pink-300 to-fuchsia-300"
            >
              Strike
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              colSpan={6}
              className="bg-fuchsia-300"
            >
              Put
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              rowSpan={2}
              className="bg-fuchsia-300"
            >
              Actions
            </TableCell>
          </TableRow>
          <TableRow className="text-white">
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              className="bg-pink-300 "
            >
              LTP
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              className="bg-pink-300 "
            >
              IV
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              className="bg-pink-300 "
            >
              Delta
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              className="bg-pink-300 "
            >
              Theta
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              className="bg-pink-300 "
            >
              Gamma
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              className="bg-pink-300 "
            >
              Vega
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              className="bg-fuchsia-300"
            >
              Vega
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              className="bg-fuchsia-300"
            >
              Gamma
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              className="bg-fuchsia-300"
            >
              Theta
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              className="bg-fuchsia-300"
            >
              Delta
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              className="bg-fuchsia-300"
            >
              IV
            </TableCell>
            <TableCell
              sx={{ fontWeight: 700, fontSize: "medium" }}
              align="center"
              className="bg-fuchsia-300"
            >
              LTP
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Rows Starting here */}
          {props.data.length > 0 ? (
            props.data.map((data, index) => (
              <OptionsTableRow
                key={index}
                strike_price={data.strike_price}
                call={data.call}
                put={data.put}
                expiryDate={data.expiryDate}
                setsimulatorPosition={props.setsimulatorPosition}
                equityPrice={props.equityPrice}
              />
            ))
          ) : (
            <TableRow className="">
              <TableCell
                sx={{ fontSize: "large" }}
                align="center"
                className="border-b-0 border-fuchsia-400"
                rowSpan={2}
                colSpan={16}
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OptionsTable
