import React from "react"
import { Autocomplete, TextField } from "@mui/material"
import moment from "moment"

const OptionsExpiry = (props) => {
  return (
    <div className="my-2 md:w-[50%]">
      {/* <div className="text-gray-500 text-sm">Date</div> */}
      {/* <div className="mr-2 text-gray-500 text-sm">Select Expiry</div> */}
      <Autocomplete
        disablePortal
        id="selectExpiry"
        className="rounded-md bg-white "
        options={props.expiryDateList}
        onChange={(event, value) => props.setSelectExpiryDate(value)}
        // sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Select Expiry Date" />
        )}
        getOptionLabel={(option) => moment(option).format("DD-MMM-YY")}
      />
      {/* <select
        name="date-expiry"
        id="date-expiry"
        className="min-w-[50%] px-2 border-b-2 border-purple-500 text-black rounded-md"
      >
        <option value="20JAN2022">20JAN2022</option>
        <option value="30DEC2021">30DEC2021</option>
        <option value="23DEC2021">23DEC2021</option>
      </select> */}
    </div>
  )
}

export default OptionsExpiry
