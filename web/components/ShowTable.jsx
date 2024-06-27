"use client";
import React, { useState } from "react";
import styles from "@/css/ShowTable.module.css";
const ShowTable = ({ title, data = [], itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const sortedData = () => {
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  const handleChangeSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        ...sortConfig,
        direction:
          sortConfig.direction === "ascending" ? "descending" : "ascending",
      });
    } else {
      setSortConfig({ key, direction: "ascending" });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData().slice(startIndex, endIndex);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <table className="card-table">
          <thead>
            <tr>
              <th
                className="card-th"
                onClick={() => handleChangeSort("columnName")}
              >
                Column Name{" "}
                {sortConfig.key === "columnName" &&
                  (sortConfig.direction === "ascending" ? "▲" : "▼")}
              </th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {paginatedData().map((item, index) => (
              <tr key={index}>
                <td className="card-td">{item.columnName}</td>
                {/* Render other columns accordingly */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentPage * itemsPerPage >= data.length}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShowTable;
