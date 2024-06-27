"use client";
import { setUserData } from "@/redux-toolkit/slices/userSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "@/css/Header.module.css";

function LogOutComponent() {
  const dispatch = useDispatch();
  const router = useRouter();

  function CleareData() {
    dispatch(setUserData(null));
    router.replace("/login");
  }


//Add Bootstrap modal take confirmatoin 
  

  return (
    <>
      <a
        type="button"
        className={`nav-link ${styles.iconColor}`}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={CleareData}
      >
        <i className="fas fa-sign-out-alt ms-3" title="Logout"></i>
      </a>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogOutComponent;
