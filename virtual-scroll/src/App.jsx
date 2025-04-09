import VirtualList from "./VirtualList"

const App = () => {
  const list = Array.from({ length: 20000 }, (_, index)=>({id:index,title:`Title - ${index}`}))
  return (
    <div>
      <VirtualLiclearst list={list} height={200} width={150} listHeight={20}/>
    </div>
  )
}

export default App