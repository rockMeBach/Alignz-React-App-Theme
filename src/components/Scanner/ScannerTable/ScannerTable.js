import React, { useEffect } from 'react'

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
                value.map((e, i) => {
                    
                    let previousRow = i ? value[i - 1] : undefined;

                    //console.log("if", previousRow)
                    if(previousRow && previousRow.date === e.date) {

                        let pt = previousRow.time.split(':');
                        let ct  = e.time.split(':');


                        if(
                            (
                                Number(ct[0]) === Number(pt[0])
                                &&
                                Number(ct[1]) - Number(pt[1]) === 1
                            )
                            ||
                            (
                                Number(ct[0]) - Number(pt[0]) === 1
                                && 
                                Number(ct[1]) === 0
                                && 
                                Number(pt[1]) === 59
                            )
                        ) {
                            return <></>;
                        }

                    }
                
                    return (
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
                    )
                })
            
            }

            {/* {console.log(value[0].ticker)} */}
        </>
    )
}

export default ScannerTable
