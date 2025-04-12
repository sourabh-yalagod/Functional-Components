import React, { useState } from 'react'

const App = () => {
  const [steps,setSteps]=useState(1)
  const data = [
    {id:1,title:'Order placed',description:'order placed successfully'},
    {id:2,title:'Verify Order',description:'order verified successfully'},
    {id:3,title:'Processing',description:'order processing'},
    {id:4,title:'Payment',description:'Please proceed with payment'},
    {id:5,title:'Successful',description:'Order shipped successfully'}
  ]
  return (
   <div>
  <ul className="stepper-container">
        {data.map((step, index) => {
          return <div className="stepper-step" key={step.id}>
            <div
              style={{ background: steps == index+1 ? "blue" : "" }}
              className={steps >index ? "stepper-circle-active" : "stepper-circle"}>
              {index + 1}
              {index+1 !== data.length && <div className={steps>index+1?"stepper-line-active":`stepper-line`}/>}
            </div>
            <div className="stepper-title">{step.title}</div>
          </div>
        })}
      </ul>
      <div style={{display:"flex",alignItems:'center',justifyContent:"space-around"}}>
        <button onClick={() => {
          setSteps(prev => {
            if (prev <= data.length) return prev + 1
            return prev
          })
        }}>Next</button>
        
        {steps >= 1 && <button onClick={() => {
          setSteps(prev => {
            if (prev > 1) return prev - 1
            return prev
          })
        }}>Back</button>}
      </div>
</div>

  )
}

export default App