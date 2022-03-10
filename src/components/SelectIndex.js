import React from "react"
import { Autocomplete, TextField } from "@mui/material"

const SelectIndex = (props) => {
  // console.log("SelectIndexValue", props.selectIndexValue)

  return (
    <div className="md:w-[50%]">
      {/* <div className="mr-2 text-gray-500 text-sm">Select Index/Stock </div> */}
      <Autocomplete
        disablePortal
        id="SelectIndex"
        className="rounded-md bg-white "
        options={props.optionNames}
        onChange={(event, value) => props.setSelectIndexValue(value)}
        // sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Select Index/Stock" />
        )}
      />
    </div>
  )
}

export default SelectIndex
