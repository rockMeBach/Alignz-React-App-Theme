import React from "react"

import { PositionItemDetails } from "../Positions/PositionItem"
import PositionDetailsItem from "./PositionDetailsItem"

import SimulatorNoPostions from "../utility/SimulatorNoPostions"

const PositionDetails = (props) => {
  return (
    <div className="min-h-[60vh] bg-pink-50 pb-4 ">
      {/* Table here */}
      {props.positions.length > 0 ? (
        <table className="w-full text-center p-3">
          <thead>
            <tr>
              <th className="p-3 bg-fuchsia-300 text-white border-l-0 border-b-2 border-fuchsia-300">
                Position
              </th>
              <th className="p-3 bg-fuchsia-300 text-white border-l-2 border-b-2 border-fuchsia-300">
                Entry Price
              </th>
              <th className="p-3 bg-fuchsia-300 text-white border-l-2 border-b-2 border-fuchsia-300">
                Current Price
              </th>
              <th className="p-3 bg-fuchsia-300 text-white border-l-2 border-b-2 border-fuchsia-300">
                Exit Price
              </th>
              <th className="p-3 bg-fuchsia-300 text-white border-l-2 border-b-2 border-fuchsia-300">
                PnL
              </th>
            </tr>
          </thead>
          <tbody className="">
            {props.positions.map((i, index) => (
              <PositionDetailsItem key={index} {...i} />
            ))}
          </tbody>
        </table>
      ) : (
        <SimulatorNoPostions />
      )}
    </div>
  )
}

export default PositionDetails
