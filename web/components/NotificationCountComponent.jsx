"use client";
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/css/Header.module.css";
import Link from "next/link";

function NotificationCountComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown">
       <Link href='/helpdesk/notification'>
       <i className={`fas fa-bell ms-3 ${styles.iconColor}`}></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">    99+    <span className="visually-hidden">unread messages</span></span>
       </Link>
    </div>
  );
}

export default NotificationCountComponent;
