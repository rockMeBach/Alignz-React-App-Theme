import React from 'react'
import './WorkpanelFilter.scss'

const WorkpanelFilter = () => {
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

                <div className="scanner-indicator-name">
                    Bollinger Bands Lover
                </div>
                <div className="scanner-indicator-name">
                    Bollinger Bands Lover
                </div>
                <div className="scanner-indicator-name">
                    Bollinger Bands Lover
                </div>
                <div className="scanner-indicator-name">
                    Bollinger Bands Lover
                </div>
                <div className="scanner-indicator-name">
                    Bollinger Bands Lover
                </div>
                <div className="scanner-indicator-name">
                    Bollinger Bands Lover
                </div>
                <div className="scanner-indicator-name">
                    Bollinger Bands Lover
                </div>

            </div>

            <div className="scanner-filter">
                <h5>Filter</h5>

                <div className="scanner-custom-filter">

                </div>

            </div>

            <div className="scanner-filter-operation">
                <h5>Operations</h5>

                <div className="scanner-custom-filter">

                    <div className="scanner-math-operation">
                        
                        <h6 style={{marginBottom: '2rem'}}>Math Operation</h6>

                        <span className="scanner-math-operation-icons" style={{marginLeft: '0'}}>
                            <strong>+</strong>
                        </span>
                        <span className="scanner-math-operation-icons">
                            <strong>-</strong>
                        </span>
                        <span className="scanner-math-operation-icons" style={{marginRight: '0'}}>
                            <strong>*</strong>
                        </span>
                        
                    </div>
                    <div className="scanner-math-operation">

                        <h6 style={{marginBottom: '2rem'}}>Comparison</h6>

                        <span className="scanner-math-operation-icons" style={{marginLeft: '0'}}>
                            <strong>&gt;</strong>
                        </span>
                        <span className="scanner-math-operation-icons" style={{marginRight: '0'}}>
                            <strong>&lt;</strong>
                        </span>
                        
                    </div>
                    <div className="scanner-math-operation">

                        <h6 style={{marginBottom: '2rem'}}>Binary Operation</h6>

                        <span className="scanner-binary-operation-icons" style={{marginLeft: '0'}}>
                            <strong>OR</strong>
                        </span>
                        <span className="scanner-binary-operation-icons">
                            <strong>ADD</strong>
                        </span>
                        <br />
                        <span className="scanner-binary-operation-icons" style={{marginLeft: '0', marginTop: '10px'}}>
                            <strong>SUBSTRACT</strong>
                        </span>
                        
                    </div>

                </div>

            </div>

        </div>
    )
}

export default WorkpanelFilter
