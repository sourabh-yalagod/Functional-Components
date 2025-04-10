import InfiniteScroll from './InfiniteScroll'
const App = () => { 
  const array=Array.from({length:100})
  return <div>
    <InfiniteScroll data={array} />
  </div>
}
export default App