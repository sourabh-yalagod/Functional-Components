import React, { useRef, useState } from 'react'
import Modal from './modal'

const App = () => {
  const dataSet = {
    continer1: [
      {id:1,title:"container -1 && Title -1 "},
      {id:2,title:"container -1 && Title -2 "},
      {id:3,title:"container -1 && Title -3 "},
    ],
    continer2: [
      {id:4,title:"container -2 && Title -1 "},
      {id:5,title:"container -2 && Title -2 "},
      {id:6,title:"container -2 && Title -3 "},
    ],
    continer3: [
      {id:7,title:"container -3 && Title -1 "},
      {id:8,title:"container -3 && Title -2 "},
      {id:9,title:"container -3 && Title -3 "},
    ],
  }

  const [data, setDate] = useState(dataSet)
  const targetedTime=useRef()
  const sourseContainer=useRef()
  const handleDragStart = (e, draggbleItem, draggbleItemContainer) => {
    sourseContainer.current=draggbleItemContainer
    targetedTime.current=draggbleItem
    e.target.style.opacity='0.5'
   }
  const handleDragEnd = (e) => {
    e.target.style.opacity='1'
  }
  
  const handleDragOver = (e) => {
    e.preventDefault()
   }
  const handleOnDrop = (container) => { 
    const draggbleItemContainer = sourseContainer.current
    const draggbleItem = targetedTime.current
    setDate((prev) => { 
      let newData = { ...prev }
      newData[draggbleItemContainer] = newData[draggbleItemContainer].filter(e => e != draggbleItem)
      newData[container] = [...newData[container], draggbleItem]
      return newData
    })
  }

  const [open, setOpen] = useState(false)
  window.document.addEventListener('click', (e) => { 
    if (e.target === buttonRef.current) {
      setOpen(true)
    }else { 
      setOpen(false)
    }
    console.log(modalRef.current);
    
    if(e.target === modalRef.current) { 
      setOpen(false)
    }
    
    
  })
  const buttonRef=useRef(null)
  const modalRef = useRef(null)
  console.log(window.document);
  
  return (
    <div>
    <div>{
      Object.keys(data).map((container, index) => { 
        return <div
          onDragOver={handleDragOver}
          onDrop={()=>handleOnDrop(container)}
          key={index} className='container'>
          { 
            data[container]?.map(item => (
              <div draggable
                onDragStart={(e)=>handleDragStart(e,item,container)}
                onDragEnd={handleDragEnd}
                className='item' key={item.id}>{item.title}</div>
            ))
          }
        </div>
      })
    
      }
        
      </div>
      <button ref={buttonRef} onClick={()=>setOpen(true)}>Open</button>
        {open && <Modal modalRef={modalRef} isOpen={open}/>}
      </div>
  )
}

export default App