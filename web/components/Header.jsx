import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/css/Header.module.css";
import logo from "@/public/Images/logo.png";
import Image from "next/image";
import Link from "next/link";
import LogOutComponent from "./LogOutComponent";
import NotificationCountComponent from "./NotificationCountComponent";

// Main Header component
function Header({ toggleSidebar }) {
  return (
    <div className="main-header">
      <div className="logo-header d-flex align-items-center">
        <Image className="sidebar-logo" src={logo} alt="DPMS LOGO" />
        <b style={{ fontWeight: "600", color: "#432790", fontSize: "15px" }}>
          &nbsp;DPMS HELPDESK
        </b>
      </div>
      <nav className={`navbar navbar-expand ${styles.header}`}>
        <button className="btn btn-link text-dark">
          <i className="fas fa-chevron-left"></i>
        </button>
        <div
          className={`container-fluid justify-content-end ${styles.navContainer}`}
        >
          <ul
            className={`navbar-nav d-flex flex-row align-items-center ${styles.navbarNav}`}
          >
            <li className="nav-item">
              <NotificationCountComponent />
            </li>
            <li className="nav-item">
              <Link href="/helpdesk/profile" className="nav-link">
              <i className={`fas fa-user ms-3 ${styles.iconColor}`} title="Profile"></i> 
              </Link>
            </li>
            <li className="nav-item">
              <LogOutComponent />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
