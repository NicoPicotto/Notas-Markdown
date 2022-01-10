import React from 'react'

const Status = ({statusCode}) => {
    return (
        <div className="statusCodeContainer">
            {(statusCode === 0) ? "" : ""}
            {(statusCode === 1) ? "Guardando..." : ""}
            {(statusCode === 2) ? "¡Guardado!" : ""}
        </div>
    )
}

export default Status
