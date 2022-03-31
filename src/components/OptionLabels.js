import React from "react"
import { Badge } from "react-bootstrap"

const OptionLabels = (props) => {
  return (
    <div className="">
      <div className="my-2 text-xl text-gray-700 font-bold text-center">
        Essentials
      </div>
      <div className="flex flex-wrap text-sm font-medium items-center">
          <Badge bg="primary">Spot Price: {props.spotPrice || "N/A"}</Badge>
          <Badge bg="success">Futures Price: {props.futuresPrice || "N/A"}</Badge>
          <Badge bg="danger">Lot Size: {props.lotSize || "N/A"}</Badge>
          <Badge bg="warning">IV: {props.iv || "N/A"}</Badge>
          <Badge bg="info">NIFTY IV Chart</Badge>
      </div>
    </div>
  )
}

export default OptionLabels
