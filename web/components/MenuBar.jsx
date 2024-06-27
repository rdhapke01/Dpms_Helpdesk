"use client";
import React, { useState } from "react";

import styles from "@/css/MenuBar.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { useSelector } from "react-redux";

const MenuBar = () => {
  const userInfo = useSelector((state) => state.user.userData);
  // const role = userInfo?.role || "User";
  const [isMasterDataOpen, setIsMasterDataOpen] = useState(false);
  const [isEmployeeModuleOpen, setIsEmployeeModuleOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSupportTicketOpen, setIsSupportTicketOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const toggleMasterData = () => {
    setIsMasterDataOpen(!isMasterDataOpen);
  };
  const toggleEmployeeModule = () => {
    setIsEmployeeModuleOpen(!isEmployeeModuleOpen);
  };

  const toggleAdmin = () => {
    setIsAdminOpen(!isAdminOpen);
  };
  const toggleSupportTicket = () => {
    setIsSupportTicketOpen(!isSupportTicketOpen);
  };
  const toggleReport = () => {
    setIsReportOpen(!isReportOpen);
  };

  return (

    <ul className="nav">
      <li className="nav-item active">
        <Link href={"/helpdesk"} aria-expanded="false">
          <span>Dashboard</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          href="#"
          onClick={toggleMasterData}
          aria-expanded={isMasterDataOpen}
        >
          <span>Master Data</span>

          <i
            className={`fas ${isMasterDataOpen ? "fa-minus" : "fa-plus"
              } ${styles.sideBaricon}`}
          ></i>
        </Link>
        {isMasterDataOpen && (
          <div>
            <ul className="submenu">
              <li className="nav-item">
                <Link className={`${styles.submenuStyle}`} href="/helpdesk/issue">
                  Issue
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${styles.submenuStyle}`}
                  href="/helpdesk/contractor"
                >
                  Contractor
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${styles.submenuStyle}`}
                  href="/helpdesk/ticket_type"
                >
                  Ticket Type
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`${styles.submenuStyle}`} href="/helpdesk/status">
                  Status
                </Link>
              </li>

              <li>
                <Link className={`${styles.submenuStyle}`} href="/helpdesk/role">
                  Role
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${styles.submenuStyle}`}
                  href="/helpdesk/designation"
                >
                  Designation
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`${styles.submenuStyle}`} href="/helpdesk/priority">
                  Priority
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`${styles.submenuStyle}`} href="/helpdesk/escalation_matrix">
                  Escalation Matrix
                </Link>
              </li>
            </ul>
          </div>
        )}
      </li>

      {/* <li className="nav-item">
        <Link
          href="#"
          onClick={toggleAdmin}
          aria-expanded={isAdminOpen}
        >
          <span>Admin</span>
          <i
            className={`fas ${isAdminOpen ? "fa-minus" : "fa-plus"
              } ${styles.sideBaricon}`}
          ></i>
        </Link>
        {isAdminOpen && (
          <div>
            <ul className="submenu">
              <li className="nav-item">
                <Link className={`${styles.submenuStyle}`} href="/helpdesk/all_user">
                  All User
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${styles.submenuStyle}`}
                  href="/helpdesk/pending_user"
                >
                  Pending User
                </Link>
              </li>
            </ul>
          </div>
        )}
      </li> */}
      <li className="nav-item">
        <div className="SidebarHover">
          <Link
            href="#"
            onClick={toggleSupportTicket}
            aria-expanded={isSupportTicketOpen}
          >
            <span>Support Ticket</span>
            <i
              className={`fas ${isSupportTicketOpen ? "fa-minus" : "fa-plus"
                } ${styles.sideBaricon}`}
            ></i>
          </Link>
        </div>
        {isSupportTicketOpen && (
          <div>
            <ul className="submenu">
              <li className="nav-item">
                <Link
                  className={`${styles.submenuStyle}`}
                  href="/helpdesk/support_ticket"
                >
                  Support Ticket
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${styles.submenuStyle}`}
                  href="/helpdesk/support_ticket/my_tickets"
                >
                  My Support Ticket
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${styles.submenuStyle}`}
                  href="/helpdesk/support_ticket/pending_tickets"
                >
                  Pending Support Ticket
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${styles.submenuStyle}`}
                  href="/helpdesk/support_ticket/company_tickets"
                >
                  Company Ticket
                </Link>
              </li>
            </ul>
          </div>
        )}
      </li>
    </ul>

  );
};

export default MenuBar;
