"use client";
import React from "react";
import styles from "@/css/Profile.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import profile from "@/public/Images/profile1.jpg";

const Profile = () => {
  const userInfo = useSelector((state) => state.user?.userData);
  const router = useRouter();

  // Redirect to login if userInfo is not available
  // Uncomment this block if needed
  // if (!userInfo) {
  //   router.replace('/login');
  //   return null; // Optionally return null or a loading indicator
  // }

  return (
    <div>
      <Image
        src={profile}
        alt="Profile Background"
        layout="responsive"
        className={styles.profileImage}
      />
      <div className={`row ${styles.profilerow}`}>
        <div className="col-12 col-md-12 col-lg-4 mb-4">
          <div className={`card py-4 ${styles.profileBorder}`}>
            <div className="text-center ">
              <div className={styles.profileCircle}>
                <i className="fas fa-user"></i>
              </div>
              <h4 className="bold">Rakshita Dhapke</h4>
              <p >Jr. Executive</p>
            </div>

            <hr  />
              <div className={styles.countBox}>
                <span className={styles.countLabel}>Ticket Closed</span>
                <span className={styles.countValue}>34</span> 
              </div>
              <hr  />
              <div className={styles.countBox}>
                <span className={styles.countLabel}>Ticket Active</span>
                <span className={styles.countValue1}>125</span> 
              </div>
              <hr  />
              <div className={styles.countBox}>
                <span className={styles.countLabel}>Ticket Raised</span>
                <span className={styles.countValue2}>89</span> 
                </div>
              
          </div>
         
        </div>
        <div className="col-12 col-md-12 col-lg-8 mb-8">
          <div className={`card py-2 ${styles.profileBorder}`}>
            <div className="row p-4">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="IdInput" className="form-label d-flex">
                    Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="IdInput"
                    placeholder=""
                    value={userInfo?.id ?? ""}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="FirstNameInput" className="form-label d-flex">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="FirstNameInput"
                    placeholder=""
                    value={userInfo?.first_name ?? ""}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="MiddleNameInput"
                    className="form-label d-flex"
                  >
                    Middle Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="MiddleNameInput"
                    placeholder=""
                    value={userInfo?.middle_name ?? ""}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="LastNameInput" className="form-label d-flex">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="LastNameInput"
                    placeholder=""
                    value={userInfo?.last_name ?? ""}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="UserNameInput" className="form-label d-flex">
                    User Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="UserNameInput"
                    placeholder=""
                    value={userInfo?.user_id ?? ""}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="EmailInput" className="form-label d-flex">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="EmailInput"
                    placeholder=""
                    value={userInfo?.email ?? ""}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ContactInput" className="form-label d-flex">
                    Contact Details
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ContactInput"
                    placeholder=""
                    value={userInfo?.mobile_number ?? ""}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="RoleInput" className="form-label d-flex">
                    Role
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="RoleInput"
                    placeholder=""
                    value={userInfo?.role ?? ""}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

