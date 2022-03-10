import React from "react"

const PositionGreeksItem = (props) => {
  return (
    <tr className="">
      <td className="px-3 py-1 border-l-0 border-pink-300">
        {props.expiry} - {props.strike}
        {props.optiontype}
      </td>
      <td className="px-3 py-1 border-l-2 border-pink-300">
        {/* IV  */}
        {props.IV?.toFixed(2)}
      </td>
      <td className="px-3 py-1 border-l-2 border-pink-300">
        {/* Delta */}
        {props.delta?.toFixed(3)}
      </td>
      <td className="px-3 py-1 border-l-2 border-pink-300">
        {/* Theta */}
        {props.theta?.toFixed(3)}
      </td>
      <td className="px-3 py-1 border-l-2 border-pink-300">
        {/* Gamma */}
        {props.gamma?.toFixed(3)}
      </td>
      <td className="px-3 py-1 border-l-2 border-pink-300">
        {/* Vega */}
        {props.vega?.toFixed(3)}
      </td>
    </tr>
  )
}

export default PositionGreeksItem
