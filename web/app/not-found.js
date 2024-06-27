
import React from 'react';
import styles from '@/css/PageNotFound.module.css';
// import Image from 'next/image'; 
// import NotFoundImage from '@/public/Images/images_404.png'; 
import Link from 'next/link';

const PageNotFound = ({ homeUrl }) => {
  return (
    <div className={styles["not-found-container"]}>
      <div className={styles["not-found-content"]}>
        <div className={styles["image-container"]}>
          {/* <Image
            src={NotFoundImage}
            alt="Page Not Found"
          /> */}
        </div>
        <h2 className={styles["not-found-text"]}>Oops! Page Not Found</h2>
        <p className={styles["error-message"]}>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link href="/helpdesk">
          <button className={styles["home-button"]}>Go to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;

