import React,{useRef,useEffect} from "react"

const Modal = ({ isOpen, message, onClose }) => {
    const modalRef = useRef(null)
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose(false)
        }
      }
  
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside)
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [isOpen, onClose])
  
    if (!isOpen) {
      return null
    }
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-container">
          <div ref={modalRef} className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Modal Title</h2>
              <button className="modal-close" onClick={() => onClose(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="modal-close-icon"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => onClose(false)} className="modal-button">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }


  export default Modal;