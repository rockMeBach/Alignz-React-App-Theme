import React from 'react'
import './WorkpanelFilter.scss'
import ScannerConditions from '../ScannerConditions/ScannerConditions'

const WorkpanelFilter = () => {

    const dragStart = e => e.dataTransfer.setData('text/plain', e.target.id);

    return (

        <div className="scanner-filter-component">

            <div className="scanner-indicator-component">

                <form id="navbar-search" className="navbar-form search-form" >
                    <input
                        className="form-control scanner-indicator-search"
                        placeholder="Search"
                        type="text"
                    />
                    <button type="button" className="btn btn-default">
                        <i className="icon-magnifier"></i>
                    </button>
                </form>

                <hr />

                <div className="scanner-indicator-name" id="BBL" draggable='true' onDragStart={dragStart}>
                    Bollinger Bands Lover
                </div>
                <div className="scanner-indicator-name" draggable='true' onDragStart={dragStart}>
                    Bollinger Bands Lover
                </div>
                <div className="scanner-indicator-name" draggable='true' onDragStart={dragStart}>
                    Bollinger Bands Lover
                </div>
                <div className="scanner-indicator-name" draggable='true' onDragStart={dragStart}>
                    Bollinger Bands Lover
                </div>
                <div className="scanner-indicator-name" draggable='true' onDragStart={dragStart}>
                    Bollinger Bands Lover
                </div>
                <div className="scanner-indicator-name" draggable='true' onDragStart={dragStart}>
                    Bollinger Bands Lover
                </div>
                <div className="scanner-indicator-name" draggable='true' onDragStart={dragStart}>
                    Bollinger Bands Lover
                </div>

            </div>

            <div className="scanner-filter">
                <h5>Filter</h5>

                <div className="scanner-custom-filter">

                    <div className="scanner-time-and-lot-size">

                        <div className="scanner-time-input">
                            <h6>Start Time</h6>
                            <input 
                                className="form-control" 
                                id="scanner-start-time"
                                type="text" 
                                min="09:00" 
                                max="15:00" 
                                placeholder="HH:MM" 
                                onFocus={e => e.target.type = 'time'}
                                onBlur={e => e.target.type = 'text'}
                                required 
                            />
                        </div>

                        <div className="scanner-time-input">
                            <h6>End Time</h6>
                            <input 
                                className="form-control" 
                                id="scanner-end-time"
                                type="text" 
                                min="09:00" 
                                max="15:00" 
                                placeholder="HH:MM" 
                                onFocus={e => e.target.type = 'time'}
                                onBlur={e => e.target.type = 'text'}
                                required 
                            />
                        </div>

                        <div className="scanner-time-input">
                            <h6>FnO Lot Size</h6>
                            <select 
                                className="form-control scanner-fno-select" 
                                name="fno-lot-size" 
                                id="scanner-fno-lot-size"
                            >
                                <option value="FnO Lot Size">FnO Lot Size</option>
                            </select>
                        </div>

                    </div>

                    <div className="scanner-segments">
                        <span style={{width: '8rem', marginTop: '6px'}}>List of </span>

                        <select 
                            className="form-control scanner-segment-select" 
                            name="fno-lot-size" 
                            id="scanner-fno-lot-size"
                        >
                            <option value="FnO Lot Size">Segment</option>
                        </select>
                        
                        <select 
                            className="form-control scanner-segment-select" 
                            name="fno-lot-size" 
                            id="scanner-fno-lot-size"
                        >
                            <option value="FnO Lot Size">Segment 1(a)</option>
                        </select>
                        
                    </div>

                    <div className="scanner-satisfy">

                        <span style={{width: '6rem', marginTop: '10px'}}>which satisfy </span>

                        <div className="scanner-satisfy-not-satisfy">
                            <div className="scanner-alert-button">
                                <input type="radio" id="satisfy" name="satisfy" value="Satisfy" checked />
                                <label for="satisfy">Satisfy</label>
                            </div>

                            <div className="scanner-alert-button">
                                <input type="radio" id="not-satisfy" name="not_satisfy" value="Not Satisfy" />
                                <label for="not-satisfy">Not Satisfy</label>
                            </div>
                        </div>

                        <div className="scanner-satisfy-not-satisfy">
                            <div className="scanner-alert-button">
                                <input type="radio" id="all" name="all" value="all" checked />
                                <label for="all">All</label>
                            </div>

                            <div className="scanner-alert-button">
                                <input type="radio" id="not-all" name="not_all" value="Not All" />
                                <label for="not-all">Not All</label>
                            </div>
                        </div>

                    </div>

                    <hr />

                    <div className="scanner-conditions-component">
                        <ScannerConditions />
                    </div>

                </div>

            </div>

            <div className="scanner-filter-operation">
                <h5>Operations</h5>

                <div className="scanner-custom-filter">

                    <div className="scanner-math-operation">
                        
                        <h6 style={{marginBottom: '2rem'}}>Math Operation</h6>

                        <span className="scanner-math-operation-icons" id="+" draggable='true' onDragStart={dragStart}>
                            <strong>+</strong>
                        </span>
                        <span className="scanner-math-operation-icons"id="-"  draggable='true' onDragStart={dragStart}>
                            <strong>-</strong>
                        </span>
                        <span className="scanner-math-operation-icons" id="*" draggable='true' onDragStart={dragStart}>
                            <strong>*</strong>
                        </span>
                        
                    </div>
                    <div className="scanner-math-operation">

                        <h6 style={{marginBottom: '2rem'}}>Comparison</h6>

                        <div className="scanner-math-operation-icons" id=">" draggable='true' onDragStart={dragStart}>
                            <strong>&gt;</strong>
                        </div>

                        <div className="scanner-math-operation-icons" id="<" draggable='true' onDragStart={dragStart}>
                            <strong>&lt;</strong>
                        </div>
                        
                    </div>
                    <div className="scanner-math-operation">

                        <h6 style={{marginBottom: '2rem'}}>Binary Operation</h6>

                        <div className="scanner-binary-operation-icons" draggable='true' onDragStart={dragStart}>
                            <strong>OR</strong>
                        </div>

                        <div className="scanner-binary-operation-icons" draggable='true' onDragStart={dragStart}>
                            <strong>ADD</strong>
                        </div>

                        <div className="scanner-binary-operation-icons" draggable='true' onDragStart={dragStart}>
                            <strong>SUBSTRACT</strong>
                        </div>
                        
                    </div>

                </div>

            </div>

        </div>
    )
}

export default WorkpanelFilter
