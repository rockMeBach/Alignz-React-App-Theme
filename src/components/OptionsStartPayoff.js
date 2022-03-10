import React from "react"
import { DatePicker } from "@mui/lab"
import { TextField } from "@mui/material"
import { Moment } from "moment"

const OptionsStartPayoff = (props) => {
  return (
    <div className="basis-1/3">
      {/* <div className="my-2 text-xl text-gray-700 font-bold">
        Simulator Dates
      </div> */}
      <div className="flex flex-wrap justify-around text-center">
        {/* Start Date cointainer */}
        <div className="mx-2 min-w-[15%] bg-white">
          {/* <div className="text-gray-500 text-base">Select Start Date</div> */}
          <DatePicker
            disableFuture={true}
            label="Date Start"
            value={props.selectStartDate}
            views={["day", "month", "year"]}
            onChange={(newValue) => {
              props.setSelectStartDate(newValue || undefined)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        {/* Pay-off Date cointainer */}
        <div className="mx-2 min-w-[15%] bg-white">
          {/* <div className="text-gray-500 text-base">Select Pay-off Date</div> */}
          <DatePicker
            label="Date Payoff"
            value={props.selectPayoffDate}
            maxDate={props.maxPayoffDate}
            views={["day", "month", "year"]}
            onChange={(newValue) => {
              props.setSelectPayoffDate(newValue || undefined)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </div>
    </div>
  )
}

export default OptionsStartPayoff
