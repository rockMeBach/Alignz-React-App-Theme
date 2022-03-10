import React, { useEffect, useState } from "react"
import { PositionItemDetails } from "../Positions/PositionItem"
import PositionGreeksItem, {
  PositionGreeksItemProps,
} from "./PositionGreeksItem"

import SimulatorNoPostions from "../utility/SimulatorNoPostions"
import BACKEND_URL from "../../Backend_url"

const PositionGreeks = (props) => {
  const [positionGreeksList, setPositionGreeksList] = useState([])

  useEffect(() => {
    getPositionGreeks(props, setPositionGreeksList)
  }, [props.positions])

  return (
    <div className="min-h-[60vh] bg-pink-50 pb-4">
      {props.positions.length > 0 ? (
        <table className="w-full text-center p-3">
          <thead>
            <tr>
              <th className="p-3 bg-pink-300 text-white border-l-0 border-b-2 border-pink-300">
                Position
              </th>
              <th className="p-3 bg-pink-300 text-white border-l-2 border-b-2 border-pink-300">
                IV
              </th>
              <th className="p-3 bg-pink-300 text-white border-l-2 border-b-2 border-pink-300">
                Delta
              </th>
              <th className="p-3 bg-pink-300 text-white border-l-2 border-b-2 border-pink-300">
                Theta
              </th>
              <th className="p-3 bg-pink-300 text-white border-l-2 border-b-2 border-pink-300">
                Gamma
              </th>
              <th className="p-3 bg-pink-300 text-white border-l-2 border-b-2 border-pink-300">
                Vega
              </th>
            </tr>
          </thead>
          <tbody className="">
            {positionGreeksList.map((i, index) => (
              <PositionGreeksItem key={index} {...i} />
            ))}
          </tbody>
        </table>
      ) : (
        <SimulatorNoPostions />
      )}
    </div>
  )
}

export default PositionGreeks

function getPositionGreeks(
  props,
  setPositionGreeksList
) {
  // Map through position items
  const positionwithGreeksPromise = props.positions.map(async (item) => {
    // Get spot price
    const equityData = await (
      await fetch(
        `http://localhost:5000/spotprice?index=${props.index}&minute=${props.simulatorDate}`
      )
    ).json()

    if (!equityData?.close) {
      console.log(
        `Couldnt find spot price for index ${props.index} minute ${props.simulatorDate}`
      )
    }

    // Get greeks
    const itemGreeks = await (
      await fetch(
        `http://${BACKEND_URL}/greeks?spotprice=${equityData.close}&strikeprice=${item.strike}&expirydate=${item.expiry}&currentdate=${props.simulatorDate}&ltp=${item.currentPrice}&type=${item.optiontype}`
      )
    ).json()

    // return item object
    return {
      expiry: item.expiry,
      strike: item.strike,
      optiontype: item.optiontype,
      IV: itemGreeks?.IV,
      delta: itemGreeks?.delta,
      theta: itemGreeks?.theta,
      gamma: itemGreeks?.gamma,
      vega: itemGreeks?.vega,
      ryo: itemGreeks?.ryo,
    }
  })

  Promise.all(positionwithGreeksPromise).then((positionGreeks) => {
    // console.log(positionGreeks)
    setPositionGreeksList(positionGreeks)
  })
}
