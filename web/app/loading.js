import React from "react";
import styles from "@/css/LoadingComponent.module.css";

const loading = () => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles["loading-bar"]}></div>
    </div>
  );
};

export default loading;
