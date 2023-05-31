
import React from "react"



const FileLoader = ({ isOpen, currentIndex, totalChunks, className }) => {
    const percent = Math.floor((currentIndex / totalChunks) * 100)
  
    if (!isOpen) {
      return null
    }
  
    const progressStyle = {
      width: `${percent}%`,
      background: "linear-gradient(135deg, #ff9f43, #ff7b52)",
    }
  
    return (
      <div className={`file-loader-modal ${className}`}>
        <div className="file-loader-container">
          <h3>your file is being uploaded to icp please hold tight</h3>
          <div className="file-loader-progress">
            <div className="file-loader-progress-bar" style={progressStyle}></div>
          </div>
          <div className="file-loader-progress-text">{percent}%</div>
        </div>
      </div>
    )
  }



  export default FileLoader;