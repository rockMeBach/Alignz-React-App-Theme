import React from 'react'
import './WorkpanelHeading.scss'
import 'bootstrap/dist/css/bootstrap.css';

const WorkpanelHeading = () => {
    return (
        <div className="scanner-workpanel-heading">
            
            <div className="scanner-workpanel-header" >
                
                <div className="scanner-name">
                    <strong>Scanner Name</strong>
                    <form id="navbar-search" className="navbar-form search-form">
                        <input
                        className="form-control"
                        placeholder="Scanner Name"
                        type="text"
                        />
                    </form>
                </div>

                <div className="scanner-description">
                    <strong>Description</strong>
                    <form id="navbar-search" className="navbar-form search-form">
                        <input
                        className="form-control"
                        placeholder="Description"
                        type="text"
                        />
                    </form>
                </div>

                <div className="scanner-header-options form">
                    
                    <div className="scanner-alert-button">
                        <input type="radio" id="alert-public" name="alert" value="Public" checked/>
                        <label for="alert-public">Public</label>
                    </div>
                    <div className="scanner-alert-button">
                        <input type="radio" id="alert-private" name="alert" value="Private" />
                        <label for="alert-private">Private</label>
                    </div>

                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="alert-switch" />
                        <label className="form-check-label" for="alert-switch">Alerts</label>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default WorkpanelHeading
