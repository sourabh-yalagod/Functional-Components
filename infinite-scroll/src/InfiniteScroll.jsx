import React, { useEffect, useRef, useState } from 'react'

const InfiniteScroll = ({ data }) => {
    const [limit, setLimit] = useState(10)
    const [visualData, setVisalDate] = useState(data.slice(0, 10))
    const lastElementRef = useRef(null)
    
    const setNewData = async (time) => { 
        console.log('loading');
        await new Promise(resolve => setTimeout(resolve, time))
        console.log('loaded');
        
    }
    useEffect(() => {
        const observer = new IntersectionObserver((params) => { 
            if (params[0].isIntersecting) { 
                setLimit(prev => prev + 10)
                setVisalDate(data.slice(0,limit))
            }
        },{threshold:1})
        if (lastElementRef?.current) { 
            observer.observe(lastElementRef.current)
        }
        return () => {
            if (lastElementRef?.current) { 
                observer.unobserve(lastElementRef.current)
            } 
            observer.disconnect()
        }
    }, [limit])
    
  return (
      <div className="page">
      <h1 className="heading">Infinite Scroll Page</h1>
      <div className="container">
          { 
              visualData?.map((item, index) => { 
                  const isLastElement = index===visualData.length-1
                  return <div ref={isLastElement?lastElementRef:null} className="card" style={{height:150,width:400,background:"black",color:"white"}} key={index}>Item : { index}</div>
              })
          }
    </div>
    </div>
  )
}

export default InfiniteScroll