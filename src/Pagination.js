import React, { useState, useEffect } from "react";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faChevronRight, faChevronLeft);

const Pagination = ({
  pageNum,
  prevPage,
  nextPage,
  searchResults,
  setSearchResults,
}) => {
  console.log(searchResults);

  return (
    <div className="row mt-3 mb-3">
      {/* If the page we are on is the only page in the results, do not show prev page numbers, otherwise do */}
      <div className="col">
        {searchResults.pagination.currentPage ===
          searchResults.pagination.totalPages &&
        searchResults.pagination.currentPage > 1 ? (
          <div className="row">
            <div className="col">
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={prevPage}
                className="text-muted fa-icon"
                size="2x"
              />
            </div>
            <div className="col text-muted fa-icon">
              <h6>{searchResults.pagination.previousPage}</h6>
            </div>
            <div className="col">
              <h5 className="highlight-page">
                {searchResults.pagination.currentPage}
              </h5>
            </div>
          </div>
        ) : (
          <div className="row mb-3">
            {searchResults.pagination.currentPage > 1 ? (
              <div className="col d-flex justify-content-start">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  onClick={prevPage}
                  className="text-muted fa-icon"
                  size="2x"
                />
              </div>
            ) : (
              <div></div>
            )}
            {searchResults.pagination.previousPage === 0 ? (
              <div></div>
            ) : (
              <div className="col text-center text-muted fa-icon">
                <h6>{searchResults.pagination.previousPage}</h6>
              </div>
            )}
            <div className="col text-center">
              <div className="d-flex justify-content-center">
                <h5 className="highlight-page">
                  {searchResults.pagination.currentPage}
                </h5>
              </div>
            </div>
            {searchResults.pagination.totalPages ===
            searchResults.pagination.currentPage ? (
              <div></div>
            ) : (
              <div className="col text-center text-muted fa-icon">
                <h6>{searchResults.pagination.nextPage}</h6>
              </div>
            )}
            {searchResults.pagination.totalPages ===
              searchResults.pagination.currentPage &&
            searchResults.pagination.currentPage === 1 ? (
              <div></div>
            ) : (
              <div className="col d-flex justify-content-end">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  onClick={nextPage}
                  className="text-muted fa-icon"
                  size="2x"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
