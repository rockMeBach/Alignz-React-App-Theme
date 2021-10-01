import { textAlign } from '@mui/system'
import React from 'react'

const ScannerDraggableComponent = ({ id }) => {
    return (
        <div 
            className="scanner-indicator-name" 
            id={id}
            style={{
                textAlign: 'center',
                margin: '1rem'
            }}
        >
            {id.toUpperCase()}
        </div>
    )
}

export default ScannerDraggableComponent
