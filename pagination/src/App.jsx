import React, { useEffect, useReducer, useRef, useState } from 'react'

const App = () => {
  const [data, setData] = useState([])
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const cacheRef = useRef({})
  const fetchProducts = async () => {
    try {
      if (cacheRef.current[currentPage]) { 
        setProducts(cacheRef.current[currentPage])
        return
      }
      const response = await fetch('https://dummyjson.com/products?limit=500')
      const json = await response.json()
      setData(json.products)
      setProducts(json.products.slice(0,10))
      setTotalPage(Math.ceil(json.limit/10)) 
      cacheRef.current[currentPage]=json.products.slice(0,10)
    } catch (error) {
      console.log(error); 
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  useEffect(() => { 
    setProducts(data.slice((currentPage) * 10, (currentPage) * 10 + 10))
    

  },[currentPage])

  const handleProduct = (number) => {
    setCurrentPage(number)
  }
  const handleRightward = () => { 
    setCurrentPage((prev) => { 
      if (prev == totalPage) {
        return prev
      } 
      return prev+1
    })
  }
  const handleLeftward = () => { 
    setCurrentPage((prev) => { 
      if (prev == 0) {
        return prev
      } 
      return prev-1
    })
  }
  return (
    <div className="container">
      <h1 className="title">Product Listings</h1>
      <div className="products">
        {products?.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <p>{product.title}</p>
            </div>
          ))
        ) : (
          <div className="no-products">No Products</div>
        )}
      </div>

      <div className="pagination">
        <button className="nav-button" onClick={handleLeftward} disabled={currentPage === 0}>
          ⬅
        </button>

       {...Array.from({length: 20}).keys().map((number) => (
        <button
          key={number}
          onClick={() => handleProduct(number)}
          className={`page-button ${number === currentPage ? 'active' : ''}`}
        >
          {number}
        </button>
        ))}

        <button
          className="nav-button"
          onClick={handleRightward}
          disabled={currentPage === totalPage - 1}
        >
          ➡
        </button>
      </div>
    </div>
  )
}

export default App