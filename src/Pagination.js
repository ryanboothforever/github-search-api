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
        {searchResults.total_count > 30 && pageNum > 1 ? (
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
              <h6>{pageNum - 1}</h6>
            </div>
            <div className="col d-flex justify-content-center">
              <h5 className="highlight-page">{pageNum}</h5>
            </div>
            <div className="col d-flex justify-content-end">
              <h5>{pageNum + 1}</h5>
            </div>
            <div className="col d-flex justify-content-end">
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={nextPage}
                className="text-muted fa-icon"
                size="2x"
              />
            </div>
          </div>
        ) : (
          <div className="row mb-3">
            {pageNum > 1 ? (
              <div className="col d-flex justify-content-start">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  onClick={prevPage}
                  className="text-muted fa-icon"
                  size="2x"
                />
                <div className="col text-muted fa-icon">
                  <h6>{pageNum - 1}</h6>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {pageNum - 1 === 0 ? (
              <div></div>
            ) : (
              <div className="col text-center text-muted fa-icon">
                <h6>{pageNum - 1}</h6>
              </div>
            )}
            <div className="col text-center">
              <div className="d-flex justify-content-center">
                <h5 className="highlight-page">{pageNum}</h5>
              </div>
            </div>
            {searchResults.total_count / 30 < 1 ? (
              <div></div>
            ) : (
              <div className="col text-center text-muted fa-icon">
                <h6>{pageNum + 1}</h6>
              </div>
            )}
            {searchResults.total_count <= 30 ? (
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
