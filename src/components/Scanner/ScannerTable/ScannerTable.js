import React from 'react'

const ScannerTable = ({key, value, index}) => {

    if(value === undefined || value[0] === undefined)
        return <></>;

    return (
        <>
            {/* <tr>
               <th scope="row">{key}</th>
               <th scope="row">{i + 1}</th>
               <td></td>
               <td><strong></strong></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
            </tr> */}

            {document.getElementById('duplicate-switch').checked ? 
                value.map((e, i) => (
                    <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{e.ticker}</td>
                        <td><strong>NSE</strong></td>
                        <td>{e.close}</td>
                        <td>{e.volume}</td>
                        <td>{e.date}</td>
                        <td>{e.time}</td>
                        <td>{e.lvalue}</td>
                        <td>{e.rvalue}</td>
                    </tr>
                ))
                :
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{value[0].ticker}</td>
                    <td><strong>NSE</strong></td>
                    <td>{value[0].close}</td>
                    <td>{value[0].volume}</td>
                    <td>{value[0].date}</td>
                    <td>{value[0].time}</td>
                    <td>{value[0].lvalue}</td>
                    <td>{value[0].rvalue}</td>
                </tr>
            
            }

            {/* {console.log(value[0].ticker)} */}
        </>
    )
}

export default ScannerTable
