import React from 'react'
import styles from '@/css/Footer.module.css'

function Footer() {
  return (
    <footer className={`footer d-flex justify-content-between  ${styles.footer}`}>
      <div>
        <span className={styles.footerText}>&copy; 2024 Your Website. All rights reserved.</span>
      </div>
      <div className={styles.footerText}>
        Designed and Developed by
        <a
          href="https://www.ceinsys.com/"
          target="_blank"
          className="ms-1  "
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Ceinsys Tech Ltd."
          data-bs-custom-class="tooltip"
          style={{ color: '#432790', fontWeight: 500, textDecoration: 'none',fontSize:'13' }}
        >
          Ceinsys Tech Ltd.
        </a>
      </div>
    </footer>
  )
}

export default Footer;
