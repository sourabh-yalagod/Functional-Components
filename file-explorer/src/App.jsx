import React, { useContext, useState } from 'react'
import { FileContext } from './context'

const App = ({id=1}) => {
  const { node, deleteNode, addNewNode,nodeRename } = useContext(FileContext)
  const [isEdit, setIsEdit] = useState({})
  const [edit, setEdit] = useState('')
  const [newNode, setNewNode] = useState({})
  const [newFile,setNewFile]=useState('')
  if (!node[id]) return
  function handleInput(index,setHandler) { 
    setHandler((prev) => { 
      return {...prev,[index]:!prev[index]}
    })
  }
  return (
    <div style={{ paddingInline: 20, padding: 10 }}>
      <div style={{display:"flex",gap:20}}>

      { 
        node[id].name
      }
        { 
          newNode[id] ? <>
             <input onChange={(e)=>setNewFile(e.target.value)} type="text" /> 
                <span onClick={() => {
                  addNewNode(id,newFile)
                  setNewNode((prev) => { 
                    return {...prev,[id]:!prev[id]}
                  })
                }}>Done</span>
              <span onClick={()=>setNewNode((prev) => { 
                  return {...prev,[id]:!prev[id]}
                })}>Cancel</span>
          </>
            :
        <span onClick={() => {
          handleInput(id,setNewNode)
        }} style={{ cursor: "pointer" }}>+</span>
        }
        
        <span onClick={() => deleteNode(id?.id || id)} style={{ cursor: "pointer" }}>-</span>
        
        {isEdit[id] ?
          <>
            <input onChange={(e)=>setEdit(e.target.value)} defaultValue={node[id].name} type="text" /> 
            <span onClick={() => {
              nodeRename(edit, id)
              setIsEdit((prev) => { 
                return {...prev,[id]:!prev[id]}
              })
            }}>Done</span>
            <span onClick={()=>setIsEdit((prev) => { 
                return {...prev,[id]:!prev[id]}
              })}>Cancel</span>
          </>:
            <span onClick={() => handleInput(id,setIsEdit)} style={{ cursor: "pointer" }}>edit</span>  
         }
      </div>
      { 
        node[id]?.children?.map((item, index) => { 
          return <App key={index} id={item} />
        })
      }
    </div>
  )
}

export default App