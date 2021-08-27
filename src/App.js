import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Result from "./Result";

function App() {
  // todo: Make an empty array
  const [searchResults, setSearchResults] = useState([]);
  // todo: set instead of results.pagination.whatever
  // const [pagResults, setPagResults] = useState(null);
  const [searchName, setSearchName] = useState("");

  //Pagination
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    if (!loading) {
      return;
    }
    const getApi = async () => {
      const url = `https://api.github.com/search/users?q=${searchName}&page=${pageNum}`;
      const res = await axios.get(url);
      // todo: res.data.results
      setSearchResults(res.data);
      console.log(res.data);
      // todo: setPagResults: res.data.pagination
      setLoading(false);
    };
    getApi();
  }, [pageNum, searchName, loading]);

  const queryName = (e) => {
    setSearchName(e.target.value);
    setPageNum(1);
  };

  // handle "enter" keypress
  const handleKeypress = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
    }
  };

  const prevPage = () => {
    if (pageNum === 1) {
      return;
    }
    setPageNum(pageNum - 1);
    setLoading(true);
  };
  const nextPage = () => {
    setPageNum(pageNum + 1);
    setLoading(true);
  };

  return (
    <main>
      <div className="d-flex row mt-3 px-4 results-searchbar">
        <label className="d-flex px-0 mb-3 col-4">
          <input
            className="col text-center input-field"
            id="textInput"
            type="text"
            search="search"
            placeholder="Search GitHub"
            onChange={queryName}
            onKeyPress={(e) => handleKeypress(e)}
          />
          <input
            id="inputButton"
            className="btn border border-secondary"
            type="submit"
            value="search"
            onClick={() => setLoading(true)}
          />
        </label>
      </div>
      {searchResults.length > 0 ? (
        <div>
          <Pagination
            pageNum={pageNum}
            prevPage={prevPage}
            nextPage={nextPage}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
          <div className="row">
            {searchResults.items.map((person) => (
              <Result person={person} />
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </main>
  );
}

export default App;
