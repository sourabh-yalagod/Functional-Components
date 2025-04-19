import { createContext, useState} from "react";
import {data } from './data'
export const FileContext = createContext(null)


export const FileContextWrapper = ({ children }) => {

    const [node , setNode] = useState(data)
    const deleteNode = (id) => {
        const updatedNode = { ...node }
        const parentId = updatedNode[id]?.parentId
        if (updatedNode?.parentId) {
            updatedNode[parentId].children = updatedNode[parentId]?.children?.filter(item => item != id) || []  
        }
        updatedNode[id]?.children?.forEach((deleteParet) => { 
            delete updatedNode[deleteParet]
        })
        delete updatedNode[id]
        setNode(updatedNode)  
    }
    const addNewNode = (parentId, value) => { 
        console.log(parentId, value);
        
        const updatedNode = { ...node }
        const newNode = {
            id: Date.now(),
            name: value.trim(),
            type: 'file',
            parentId,
            children:[]
        }
        updatedNode[newNode.id] = newNode
        updatedNode[parentId].children?.unshift(newNode.id)
        setNode(updatedNode)  
    }
    const nodeRename = (newName,id) => { 
        const updatedNode = { ...node }
        updatedNode[id].name=newName
        setNode(updatedNode)  
    }
    console.log(node);
    return <FileContext.Provider value={{node,deleteNode,addNewNode,nodeRename}}>
        { children}
    </FileContext.Provider>   
}