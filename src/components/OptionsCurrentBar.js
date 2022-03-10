import React from "react"
import moment, { Moment } from "moment"

const OptionsCurrentBar = (props) => {
  const minTime = props.simulatorDate
    .clone()
    .set({ hour: 9, minute: 16, second: 0, millisecond: 0 })
  const maxTime = props.simulatorDate
    .clone()
    .set({ hour: 15, minute: 30, second: 0, millisecond: 0 })
  // console.log(props.simulatorDate)
  return (
    <div className="mt-4 text-center text-sm items-center flex flex-wrap justify-around text-white">
      {/* Previous buttons */}
      {/* <div className="my-2 flex flex-wrap justify-around"> */}
      <button
        className="px-2 md:py-1 my-1 font-bold bg-pink-700 rounded-md disabled:bg-gray-500"
        onClick={() => {
          // Go back 1 day
          props.setSimulatorDate((prev) => moment(prev).subtract(1, "days"))
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        1 Day
      </button>
      <button
        className="px-2 md:py-1 my-1 font-bold bg-pink-500 rounded-md disabled:bg-gray-500"
        onClick={() => {
          // Go back 30 mins
          props.setSimulatorDate((prev) => moment(prev).subtract(30, "minutes"))
        }}
        disabled={props.simulatorDate
          .clone()
          .subtract(30, "minutes")
          .isBefore(minTime)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        30 MIN
      </button>
      <button
        className="px-2 md:py-1 my-1 font-bold bg-pink-400 rounded-md disabled:bg-gray-500"
        onClick={() => {
          // Go back 15 mins
          props.setSimulatorDate((prev) => moment(prev).subtract(15, "minutes"))
        }}
        disabled={props.simulatorDate
          .clone()
          .subtract(15, "minutes")
          .isBefore(minTime)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        15 MIN
      </button>
      <button
        className="px-2 md:py-1 my-1 font-bold bg-pink-400 text-hite rounded-md disabled:bg-gray-500"
        onClick={() => {
          // Go back 5 mins
          props.setSimulatorDate((prev) => moment(prev).subtract(5, "minutes"))
        }}
        disabled={props.simulatorDate
          .clone()
          .subtract(5, "minutes")
          .isBefore(minTime)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        5 MIN
      </button>
      <button
        className="px-2 md:py-1 my-1 font-bold bg-pink-400 text-hite rounded-md disabled:bg-gray-500"
        onClick={() => {
          // Go back 1 mins
          props.setSimulatorDate((prev) => moment(prev).subtract(1, "minutes"))
        }}
        disabled={props.simulatorDate
          .clone()
          .subtract(1, "minutes")
          .isBefore(minTime)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        1 MIN
      </button>
      {/* </div> */}
      {/* Current Date time div */}
      <div className="text-pink-400 underline bg-white rounded-lg p-2 shadow-lg">
        <div className="font-bold text-xl">
          {moment(props.simulatorDate).format("DD-MMM-YY HH:mm")}
        </div>
      </div>
      {/* Next buttons */}
      {/* <div className="my-2 flex flex-wrap justify-around"> */}
      <button
        className="px-2 md:py-1 my-1 font-bold bg-fuchsia-400 text-hite rounded-md disabled:bg-gray-500"
        onClick={() => {
          // Go forward 1 mins
          props.setSimulatorDate((prev) => moment(prev).add(1, "minutes"))
        }}
        disabled={props.simulatorDate
          .clone()
          .add(1, "minutes")
          .isAfter(maxTime)}
      >
        1 MIN
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
      <button
        className="px-2 md:py-1 my-1 font-bold bg-fuchsia-400 text-hite rounded-md disabled:bg-gray-500"
        onClick={() => {
          // Go forward 5 mins
          props.setSimulatorDate((prev) => moment(prev).add(5, "minutes"))
        }}
        disabled={props.simulatorDate
          .clone()
          .add(5, "minutes")
          .isAfter(maxTime)}
      >
        5 MIN
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
      <button
        className="px-2 md:py-1 my-1 font-bold bg-fuchsia-400 rounded-md disabled:bg-gray-500"
        onClick={() => {
          // Go forward 15 mins
          props.setSimulatorDate((prev) => moment(prev).add(15, "minutes"))
        }}
        disabled={props.simulatorDate
          .clone()
          .add(15, "minutes")
          .isAfter(maxTime)}
      >
        15 MIN
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
      <button
        className="px-2 md:py-1 my-1 font-bold bg-fuchsia-500 rounded-md disabled:bg-gray-500"
        onClick={() => {
          // Go forward 30 mins
          props.setSimulatorDate((prev) => moment(prev).add(30, "minutes"))
        }}
        disabled={props.simulatorDate
          .clone()
          .add(30, "minutes")
          .isAfter(maxTime)}
      >
        30 MIN
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
      <button
        className="px-2 md:py-1 my-1 font-bold bg-fuchsia-700 rounded-md disabled:bg-gray-500"
        onClick={() => {
          // Go forward 1 day
          props.setSimulatorDate((prev) => moment(prev).add(1, "days"))
        }}
      >
        1 Day
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
    // </div>
  )
}

export default OptionsCurrentBar
