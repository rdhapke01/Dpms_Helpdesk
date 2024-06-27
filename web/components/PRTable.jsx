'use client'
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "@/Utils/ProductService";
import styles from "@/css/PRTable.module.css";
export default function PRTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getProductsMini().then((data) => setProducts(data));
  }, []);

  return (
    <div className={styles["card"]}>
      <DataTable
        value={products}
        removableSort
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field="code"
          header="Code"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="name"
          header="Name"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="category"
          header="Category"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="quantity"
          header="Quantity"
          sortable
          style={{ width: "25%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
