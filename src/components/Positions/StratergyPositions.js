import React from "react"

import SimulatorNoPostions from "../utility/SimulatorNoPostions"
import PositionItem, { PositionItemDetails } from "./PositionItem"

const StratergyPositions = (props) => {
  return (
    <div className="min-h-[60vh] bg-pink-50 py-4 px-2">
      {/* <div className="font-bold pb-2 border-b-2 border-gray-400">
        Stratergy Positions
      </div> */}
      {props.positions.length > 0 ? (
        <>
          <div className="ml-2 mt-2 pb-2 border-b-2 border-gray-400 ">
            {props.positions.map((i, index) => (
              <PositionItem
                key={index}
                {...i}
                id={index}
                setsimulatorPosition={props.setsimulatorPosition}
              />
            ))}
          </div>
          <div className="mt-2 mr-10 font-medium text-right">
            Total PnL: ₹{" "}
            {props.positions.reduce((a, b) => a + (b.pnl || 0), 0).toFixed(2)}
          </div>
          {/* <div className="mt-2 mr-10 font-medium text-right">
            Max Profit: ₹ {5000}
          </div>
          <div className="mt-2 mr-10 font-medium text-right">
            Max Loss: ₹ {400}
          </div>
          <div className="mt-2 mr-10 font-medium text-right">
            Breakeven: ₹ {900}
          </div> */}
        </>
      ) : (
        <SimulatorNoPostions />
      )}
    </div>
  )
}

export default StratergyPositions
