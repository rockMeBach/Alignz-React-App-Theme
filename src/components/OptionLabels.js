import React from "react"

const OptionLabels = (props) => {
  return (
    <div className="">
      <div className="my-2 text-xl text-gray-700 font-bold text-center">
        Essentials
      </div>
      <div className="flex flex-wrap text-sm font-medium items-center">
        <div className="p-2 rounded-sm shadow-md m-1 bg-green-300 hover:bg-green-400">
          Spot Price: {props.spotPrice || "N/A"}
        </div>
        <div className="p-2 rounded-sm shadow-md m-1 bg-amber-300 hover:bg-amber-400">
          Futures Price: {props.futuresPrice || "N/A"}
        </div>
        <div className="p-2 rounded-sm shadow-md m-1 bg-purple-300 hover:bg-purple-400">
          Lot Size: {props.lotSize || "N/A"}
        </div>
        <div className="p-2 rounded-sm shadow-md m-1 bg-green-200 hover:bg-green-400">
          IV: {props.iv || "N/A"}
        </div>
        <div className="p-2 rounded-sm shadow-md m-1 bg-red-300 hover:bg-red-400">
          NIFTY IV Chart
        </div>
      </div>
    </div>
  )
}

export default OptionLabels
