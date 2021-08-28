import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Pagination from "./Pagination";
import Result from "./Result";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "./img/github-logo.png";

library.add(faChevronRight, faChevronLeft);
function App() {
  // todo: Make an empty array
  const [searchResults, setSearchResults] = useState(undefined);
  // todo: set instead of results.pagination.whatever
  // const [pagResults, setPagResults] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchResultFollowers, setSearchResultFollowers] = useState("");
  const [searchResultStarred, setSearchResultStarred] = useState("");
  //Pagination
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const getFollowers = async () => {
    const url = `https://api.github.com/users/${searchName}/followers`;
    const res = await axios.get(url);
    setSearchResultFollowers(res.data.length);
    setLoading(false);
  };

  const getStarred = async () => {
    const url = `https://api.github.com/users/${searchName}/starred`;
    const res = await axios.get(url);
    setSearchResultStarred(res.data.length);
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      return;
    }
    const getApi = async () => {
      const url = `https://api.github.com/search/users?q=${searchName}&page=${pageNum}`;
      const res = await axios.get(url);
      // todo: res.data.results
      setSearchResults(res.data);
      // todo: setPagResults: res.data.pagination
      setLoading(false);
    };
    getApi();
    getFollowers();
    getStarred();
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
    <main className="mt-5">
      <div className="container">
        <div className="col">
          <img src={logo} className="logo" alt="GitHub Logo" />
          <div className="row">
            <h1>GitHub User Search API</h1>
          </div>
          <div className="row">
            <span>by Ryan Booth</span>
          </div>
        </div>
        <div className="search-container">
          <div className="d-flex row mt-3 px-4 results-searchbar">
            <label className="d-flex px-0 mb-3">
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
        </div>
      </div>
      <div className="container">
        <div className="row">
          {searchResults ? (
            <div className="result col justify-content-center mb-3">
              {searchResults.items.length === 0 ? (
                <div>No Results</div>
              ) : (
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
                      <Result
                        person={person}
                        followers={searchResultFollowers}
                        starred={searchResultStarred}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
