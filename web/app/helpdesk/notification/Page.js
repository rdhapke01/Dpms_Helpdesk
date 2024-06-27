import React from "react";
import styles from "@/css/Notification.module.css";

const Notification = () => {
  return (
    <>
      <div className="container-fluid">
        <h4 className="page-title" style={{ color: '#432790' }}>
          Notifications
        </h4>
        <br />
        <div className="alert alert-primary alert-dismissible fade show d-flex justify-content-between" role="alert">
          <div>
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          </div>
          <div>
            <i className="fas fa-eye"></i>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>
        <div className="alert alert-primary alert-dismissible fade show d-flex justify-content-between" role="alert">
          <div>
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          </div>
          <div>
            <i className="fas fa-eye"></i>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>
        <div className="alert alert-primary alert-dismissible fade show d-flex justify-content-between" role="alert">
          <div>
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          </div>
          <div>

            <i className="fas fa-eye"></i>

            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </>

  );
};

export default Notification;
