import React from 'react'

const ScannerTable = ({key, value}) => {
    return (
        <>
            <tr>
               <th scope="row">{key}</th>
               {/* <th scope="row">{i + 1}</th> */}
               <td></td>
               <td><strong></strong></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
            </tr>

            {
                value.map((e, i) => (
                    <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{e.ticker}</td>
                        <td><strong>NSE</strong></td>
                        <td>{e.close}</td>
                        <td>{e.volume}</td>
                        <td>{e.date}</td>
                        <td>{e.time}</td>
                    </tr>
                ))
            }
        </>
    )
}

export default ScannerTable
