"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import styles from "@/css/HelpdeskLayout.module.css";

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const userData = useSelector((state) => state.user.userData);
  const router = useRouter();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  // useEffect(() => {
  //   // console.log(userData);
  //   if (!userData) {
  //     router.replace("/login");
  //   }
  // }, [userData]);

  return (
    <>
      <div className="wrappper">
        <Header toggleSidebar={toggleSidebar} />
        <div className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
          <SideBar />
        </div>
        <div className="main-panel">
          <div className="content">
            <div className={`${styles.layout} container-fluid mt-5`}>
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
