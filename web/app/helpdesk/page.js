import React from "react";
import styles from "@/css/HelpdeskPage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CaseReportChart from "@/components/CartComponents/CaseReportChart";
import CategoryMonthlyReport from "@/components/CartComponents/CaseMonthlyReport";
import MonthlyPriorityWiseReport from "@/components/CartComponents/MonthlyPriorityReport";
import PriorityWiseReport from "@/components/CartComponents/PriorityWiseReport";
import Image from "next/image";
import Escalate from "@/public/Images/Escalate.png";
import Raised from "@/public/Images/Raised.png";
import Active from "@/public/Images/Active.png";
import Closed from "@/public/Images/Closed.png";

function page() {
 
  return (
    <>
      <div className="container-fluid">
        <h4 className="page-title" style={{ color:"#432790"}}>
          Dashboard
        </h4>
        <div className="row">
          {/* Card 1 */}
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <div
              className="card card-stats card-danger p-2"
                           style={{background: "#ff646d"}}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <div className="icon-big text-center  d-flex align-items-center justify-content-center">
                      <Image
                        src={Escalate}
                        alt="Small Icon"
                        width={55}
                        height={55}
                        className={styles.cardIcon}
                      />
                      {/* <i className={`${styles.cardIcon} fas fa-users`}></i> */}
                    </div>
                  </div>
                  <div className="col-7 d-flex align-items-center">
                    <div className="numbers">
                      <p className="card-category mb-0">Escalated</p>
                      <h4 className="card-title">576</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <div
              className="card card-stats card-warning p-2"
              style={{ background: "#fbad4c" }}
              
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <div className="icon-big text-center  d-flex align-items-center justify-content-center">
                      <Image
                        src={Active}
                        alt="Active"
                        width={55}
                        height={55}
                        className={styles.cardIcon}
                      />
                      {/* <i className={`${styles.cardIcon} fas fa-users`}></i> */}
                    </div>
                  </div>
                  <div className="col-7 d-flex align-items-center">
                    <div className="numbers">
                      <p className="card-category mb-0">Active</p>
                      <h4 className="card-title">1,303</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <div
              className="card card-stats card-primary p-2"
              style={{ backgroundColor: "#1D62F0" }}
              
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <div className="icon-big text-center  d-flex align-items-center justify-content-center">
                      <Image
                        src={Raised}
                        alt="Raised"
                        width={55}
                        height={55}
                        className={styles.cardIcon}
                      />
                      {/* <i className={`${styles.cardIcon} fas fa-users`}></i> */}
                    </div>
                  </div>
                  <div className="col-7 d-flex align-items-center">
                    <div className="numbers">
                      <p className="card-category mb-0">Raised</p>
                      <h4 className="card-title">1,294</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="card card-stats card-success p-2" style={{ background: '#59d05d' }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <div className="icon-big text-center  d-flex align-items-center justify-content-center">
                      <Image
                        src={Closed}
                        alt="Closed"
                        width={55}
                        height={55}
                        className={styles.cardIcon}
                      />
                      {/* <i className={`${styles.cardIcon} fas fa-users`}></i> */}
                    </div>
                  </div>
                  <div className="col-7 d-flex align-items-center">
                    <div className="numbers">
                      <p className="card-category mb-0">Closed</p>
                      <h4 className="card-title">1,345</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
            <div className="card card-stats">
              <div className="card-body">
                {/* <CaseReportChart /> */}
                <MonthlyPriorityWiseReport />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
            <div className="card card-stats">
              <div className="card-body">
                <MonthlyPriorityWiseReport />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
