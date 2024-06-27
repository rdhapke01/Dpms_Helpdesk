import React from 'react';
import styles from '@/css/NoDataFound.module.css';
import Image from 'next/image'; 
import NoDataImage from '@/public/Images/images_2.png'; 
import Link from 'next/link';

const NoDataFound = ({ addUrl }) => {
  return (
    <div className={styles["no-data-found-container"]}>
      <Link href={addUrl}>
        <button className={styles["add-data-button"]}>Add Data</button>
      </Link>
      <div className={styles["no-data-found-content"]}>
        <Image
          src={NoDataImage}
          alt="No Data Found"
        />
        <h2>No Data Found</h2>
      </div>
    </div>
  );
}

export default NoDataFound;
