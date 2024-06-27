"use client";
import React, { useState } from "react";
import Image from "next/image";
import LoginPageImage from "@/public/Images/LoginImg.png";
import LogoImage from "@/public/Images/jjm_logo.svg"; // Import the logo image
import styles from "@/css/LoginPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setUserData } from "@/redux-toolkit/slices/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

import { useDispatch } from "react-redux";
function Login() {
  const dispatch = useDispatch();

  const [userCredentials, setUserCredentials] = useState({
    User_Id: "Mahesh",
    Password: "Mahesh@123",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      const response = await axios.post(
        process.env.loginUserEndPoint,
        JSON.stringify(userCredentials),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Allow cross-origin requests
          },
        }
      );
      let responeseData = response.data
      dispatch(
        setUserData({
          id: responeseData.id ?? 1,
          token: responeseData.accessToken ?? "",
          first_name: "Omkar Doke",
          email: "omakar.doke@ceinsys.com",
          user_id:"okdoke",
          mobile_number:9876543210,
          role:"Admin"
        })
      );
      // router.push("/helpdesk");
      router.replace("/helpdesk");
    } catch (error) {
      console.error("Error logging in:", error.message);
      // console.trace(error);
    }

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className={styles.containerFluid}>
      <div className={`${styles.loginForm} p-4 px-5 rounded text-center`}>
        <Image
          src={LogoImage}
          alt="Logo"
          width={100}
          height={100}
          className="mb-4"
        />
        <h5 className="d-flex text-dark">Welcome To The HelpDesk !!</h5>
        <p className={`${styles.loginText} d-flex `}>
          Please Fill The Below Form To Login..
        </p>
        <form
          noValidate
          validated={validated.toString()}
          onSubmit={handleSubmit}
        >
          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${styles.loginInput}`}
              id="user_id"
              name="User_Id"
              placeholder="User ID"
              value={userCredentials.User_Id}
              onChange={handleChange}
              required
            />
            <label htmlFor="user_id" className={styles.loginLable}>
              <FontAwesomeIcon icon={faUser} /> USER ID
            </label>
            {errors.User_Id && (
              <div className="text-danger">{errors.User_Id}</div>
            )}
            <div className="invalid-feedback">User Id required!</div>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${styles.loginInput}`}
              id="password"
              name="Password"
              placeholder="Password"
              value={userCredentials.Password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password" className={styles.loginLable}>
              <FontAwesomeIcon icon={faLock} /> PASSWORD
            </label>
            {errors.Password && (
              <div className="text-danger">{errors.Password}</div>
            )}
            <div className="invalid-feedback">Password required!</div>
          </div>

          <button
            type="submit"
            className={`${styles.loginBtn} btn btn-primary mt-3 w-100`}
          >
            LOGIN
          </button>
        </form>
        <div className="mt-3 text-center ">
          <Link href="#" className={styles.loginFrm}>
            Forgot password?
          </Link>
        </div>
      </div>

      <Image
        src={LoginPageImage}
        alt="Login Page"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

export default Login;
