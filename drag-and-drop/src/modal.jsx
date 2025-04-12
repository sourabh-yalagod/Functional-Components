import React, { useRef } from 'react'

const Modal = ({ isOpen,handleModalClick}) => {
  
  if (!isOpen) { 
    return null
  }
  const modalRef = useRef(null)

  return (
    <div ref={modalRef} style={{position:"absolute",top:'1/2',right:"1/2",border:"1px solid black",padding:"25px"}}>Modal</div>
  )
}

export default Modal