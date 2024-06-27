"use client";
import React, { useState } from "react";
import styles from "@/css/ShowTable.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NoDataFound from "./NoDataFound";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "@fortawesome/fontawesome-free/css/all.min.css";

const TableComponent = function ({
  title,
  tableData,
  canAdd = false,
  canExport = true,
  addUrl,
  showColumnName,
  viewUrl,
  showAction = false,
  deleteUrl,
}) {
  if (!tableData || tableData?.length == 0) {
    return <NoDataFound addUrl={addUrl} />;
  }
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [TableData, setTableData] = useState(tableData);
  const [disableDelete, setDisableDelete] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(
    "Are you sure, you want to delete record!"
  );
  const handleClose = () => {
    setShow(false);
    setDeleteMessage("Are you sure, you want to delete record!");
    setSelectedItem(null);
    setDisableDelete(false);
  };

  const handleShow = (item) => {
    setSelectedItem(item);
    setShow(true);
  };
  // console.log({deleteUrl});
  const deleteHandler = async () => {
    if (deleteUrl) {
      try {
        const response = await fetch(`${deleteUrl}/${selectedItem?.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error in deleting reord.");
        }
        // User successfully deleted
        setDeleteMessage(
          `Record with id ${selectedItem.id} deleted successfully.`
        );
        const updatedTableData = tableData?.filter(
          (item) => item.id !== selectedItem.id
        );
        setTableData(updatedTableData);
      } catch (error) {
        // Handle any errors that occur during the fetch call
        console.error("Error deleting record:", error.message);
        setDeleteMessage(error.message);
      }
      setDisableDelete(true);
    }
  };

  const keys = Object.keys(TableData[0]);
  const filteredKeys = keys.filter((key) => showColumnName.includes(key));

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key) => {
    if (sortConfig.key === key) {
      // If the same column is clicked again, reverse the sorting direction
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      // Otherwise, set the sorting column to the clicked column and default to ascending
      setSortConfig({ key, direction: "asc" });
    }
  };

  const sortedData = () => {
    const sortableData = [...TableData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableData;
  };

  const columns = filteredKeys.map((col) =>
    col.replaceAll(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase())
  );



  function exportToCSV(data, filename) {
    const csvData = [];

    // Extract column headers
    const headers = Object.keys(data[0]);
    csvData.push(headers.join(","));

    // Extract data rows
    data.forEach((item) => {
      const values = headers.map((header) => {
        return item[header];
      });
      csvData.push(values.join(","));
    });

    // Convert CSV data to a Blob
    const csvContent = csvData.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a link element to download the CSV file
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);

    // Simulate a click on the link to trigger the download
    link.click();

    // Remove the link from the DOM
    document.body.removeChild(link);
  }

  return (
    <div className='card'>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation !!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{deleteMessage}</Modal.Body>
        <Modal.Footer>
        <Button variant="danger" size="sm" onClick={handleClose}>
    Close
</Button>
          <Button
            variant="danger"
            size="sm"
            disabled={disableDelete}
            onClick={() => { deleteHandler(), handleClose() }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="card-header">
        <div className={styles["header-left"]}>
          <h3>{title}</h3>
        </div>
        <div className={styles["header-right"]}>
          {canExport && (
            <button
              className='btn btn-success btn-sm'
              onClick={() => {
                exportToCSV(
                  TableData,
                  `${title}_${new Date().toLocaleDateString()}`
                );
              }}
            >
              <i className="fa-solid fa-file-export"></i> Export
            </button>
          )}&nbsp;
          {canAdd && (
            <Link href={addUrl}>
              <button className="btn btn-primary btn-sm">
                <i className="fa-solid fa-plus"></i> Add New
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className={styles["card-body"]}>
        <div className={styles["table-container"]}>
          <table className='table table-bordered'>
            <thead>
              <tr>
                {columns.map((key, index) => (
                  <th
                    key={index}
                    className={styles["card-th"]}
                    onClick={() => handleSort(keys[index])}
                  >
                    <span>{key}</span>
                    {sortConfig.key === keys[index] && (
                      <span className={styles["sort-arrow"]}>
                        {sortConfig.direction === "asc" ? " ▲" : " ▼"}
                      </span>
                    )}
                  </th>
                ))}
                {showAction && <th className={styles["card-th"]}>Action</th>}
              </tr>
            </thead>
            <tbody>
              {sortedData().map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {filteredKeys.map((key, cellIndex) => (
                    <td key={cellIndex} className={styles["card-td"]}>
                      {item[key]}
                    </td>
                  ))}
                  {showAction && (
                    <td className={styles["card-td"]}>
                      <Link
                        className={styles["view-button"]}
                        href={`${viewUrl}/${item.id}`}
                      >
                        <i className={`fas fa-eye`}></i>
                      </Link>
                      &nbsp;&nbsp;
                      <Link
                        className={styles["view-button"]}
                        href="#"
                        onClick={() => handleShow(item)}
                      >
                        <i
                          className={`fas fa-trash`}
                          style={{ color: "#ef0bob" }}
                        />
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
