import React from "react"

export const Loader = ({ message = "Loading..." }) => {
    return (
      <div className="loader-container">
        <div className="loader">
          <FontAwesomeIcon icon={faCat} className="cat-icon" size="3x" />
          <FontAwesomeIcon icon={faDog} className="dog-icon" size="3x" />
          <p style={{ backgroundColor: "white" }}>{message}</p>
        </div>
      </div>
    )
  }

  export default Loader;