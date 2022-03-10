import React from "react"

const PositionDetailsItem = (props) => {
  return (
    <tr className="">
      <td className="px-3 py-1 border-l-0 border-pink-300">
        {props.expiry} - {props.strike}
        {props.optiontype} ({props.action})
      </td>
      <td className="px-3 py-1 border-l-2 border-pink-300">
        {/* Entry Price */}₹ {props.entryPrice}
      </td>
      <td className="px-3 py-1 border-l-2 border-pink-300">
        {/* Current Price */}₹ {props.currentPrice}
      </td>
      <td className="px-3 py-1 border-l-2 border-pink-300">
        {/* Exit Price */}
        {props.exitPrice ? `₹ ${props.exitPrice}` : " - "}
      </td>
      <td className="px-3 py-1 border-l-2 border-pink-300">
        {/* PnL */}
        {props.pnl ? `₹ ${props.pnl.toFixed(2)}` : " - "}
        {/* {props.exitPrice
          ? `₹ ${props.exitPrice - props.entryPrice}`
          : `₹ ${props.currentPrice - props.entryPrice}`} */}
      </td>
    </tr>
  )
}

export default PositionDetailsItem
