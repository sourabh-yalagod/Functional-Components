import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const cacheRef = useRef({});
  const searchItemRef = useRef([]);
  const inputRef = useRef(null);
  const fetchResults = async () => {
    try {
      if (cacheRef.current[query]) {
        setResults(cacheRef.current[query]);
        console.log("from cache");

        return;
      }
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}`
      );
      const data = await response.json();
      setResults(data?.products);
      if (query) {
        cacheRef.current[query] = data?.products;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let timer = setTimeout(fetchResults, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    console.log(currentIndex, results.length);

    const keyHandler = (e) => {
      if (e.key === "ArrowDown") {
        if (currentIndex === -1) {
          setCurrentIndex(0);
        } else if (currentIndex === results.length - 1) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      }

      if (e.key === "ArrowUp") {
        if (currentIndex === -1 || currentIndex === 0) {
          setCurrentIndex(results.length - 1);
        } else {
          setCurrentIndex((prev) => prev - 1);
        }
      }
    };
    if (searchItemRef.current[currentIndex]?.textContent) {
      inputRef.current.value = searchItemRef.current[currentIndex]?.textContent;
      searchItemRef.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
    window.addEventListener("keyup", keyHandler);

    return () => {
      window.removeEventListener("keyup", keyHandler); // ✅ Remove same reference
    };
  }, [currentIndex, searchItemRef]);

  return (
    <div className="container" onClick={() => setShowSearchResult(true)}>
      <input
        placeholder="search...."
        ref={inputRef}
        autoFocus={true}
        onFocus={() => setShowSearchResult(true)}
        // onBlur={() => setShowSearchResult(false)}
        type="text"
        onChange={(e) => setQuery(e.target.value)}
      />
      {showSearchResult && (
        <ul className="search-container">
          {results.length > 0 ? (
            results?.map((result, index) => {
              return (
                <li
                  onClick={() => (inputRef.current.value = result.title)}
                  style={{ background: currentIndex == index ? "gray" : "" }}
                  className={`search-item ${
                    currentIndex === index ? "search-item-active" : ""
                  }`}
                  key={result.id}
                  ref={(el) => (searchItemRef.current[index] = el)}
                >
                  {result.title}
                </li>
              );
            })
          ) : (
            <div>No Elements</div>
          )}
        </ul>
      )}
    </div>
  );
};

export default App;
