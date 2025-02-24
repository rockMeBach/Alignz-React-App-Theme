import React from "react"

import ExitIcon from "@mui/icons-material/ExitToApp"
import { PositionDetailsItemProps } from "../PositionDetails/PositionDetailsItem"

const PositionItem = (props) => {
  return (
    <div className="flex bg-white shadow-md p-2 rounded-md font-medium my-2">
      <div className="mr-auto">
        +{props.size}x {props.expiry} {props.strike}
        {props.optiontype} ({props.action})
      </div>
      <div className="mx-2">₹ {props.currentPrice}</div>
      {/* Exit Position */}
      <button
        className="mx-2"
        onClick={() => {
          console.log(props.id)
          props.setsimulatorPosition((prev) => {
            prev[props.id].exitPrice = props.currentPrice
            // console.log(prev[props.id])
            return prev
          })
        }}
      >
        <ExitIcon />
      </button>
      {/* Delete position button */}
      <button
        className="mx-2"
        onClick={() => {
          // console.log("Clicked on delete")
          // Remove from positions
          props.setsimulatorPosition((positions) =>
            positions.filter((x, index) => index !== props.id)
          )
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-5"
          viewBox="0 0 20 20"
          fill="red"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default PositionItem
