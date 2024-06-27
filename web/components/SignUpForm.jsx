"use client";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/css/SignUpPage.module.css";
import LoginPageImage from "@/public/Images/Login.png";
import Image from "next/image";
import { Password } from "primereact/password";
import Link from "next/link";
// import styles from "@/css/LoginPage.module.css";

function SignUpForm({ contractorOptions, designationOptions }) {
  const [userData, setUserData] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    User_Id: "",
    Password: "",
    Mobile_Number: "",
    Contractor: "",
    Designation: "",
    Status: "Pending",
  });

  const [validationErrors, setValidationErrors] = useState({});

  function postData() {
    // API endpoint URL
    const apiUrl = `${process.env.signUpUserEndPoint}`;

    // Request options
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(userData),
    };
    // Sending POST request
    fetch(apiUrl, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response;
      })
      .then((data) => {
      alert("User is added in the system")
        router.push("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    User_Id: "",
    Password: "",
    Mobile_Number: "",
    Contractor: "",
    Designation: "",
    Status: "Pending",
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else{
     // postData()
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container fluid>
      <Row>
        <Col md={6} className="p-0 position-relative">
          <div className={`${styles.SignUpForm}  p-4 rounded`}>
            {/* Login form content */}
            <h3 className="text-center text-white">Register User</h3>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="validationCustom02">
                    <FloatingLabel
                      controlId="First_Name"
                      label="First Name"
                      className="mb-3"
                      type="text"
                      name="First_Name"
                      value={formData.First_Name}
                      onChange={handleChange}
                      required
                    >
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid"className={styles.validationMessage}>
                        First Name required !
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="validationCustom02">
                    <FloatingLabel
                      controlId="Last_Name"
                      label="Last Name"
                      className="mb-3"
                      type="text"
                      name="Last_Name"
                      value={formData.Last_Name}
                      onChange={handleChange}
                      required
                    >
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid"className={styles.validationMessage}>
                        Last Name required !
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="validationCustom02">
                    <FloatingLabel
                      controlId="Email_Name"
                      label="Email "
                      className="mb-3"
                      type="email"
                      name="Email_Name"
                      value={formData.Email_Name}
                      onChange={handleChange}
                      required
                    >
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid"className={styles.validationMessage}>
                        Email required !
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="validationCustom02">
                    <FloatingLabel
                      controlId="User_ID"
                      label="User Id "
                      className="mb-3"
                      type="text"
                      name="User_ID"
                      value={formData.User_ID}
                      onChange={handleChange}
                      required
                    >
                      <Form.Control
                        type="text"
                        placeholder="User Id"
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid"className={styles.validationMessage}>
                        User Id required !
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="validationCustom02">
                    <FloatingLabel
                      controlId="password"
                      label="password "
                      className="mb-3"
                      type="password"
                      name="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    >
                      <Form.Control
                        type="password"
                        placeholder="password"
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid"className={styles.validationMessage}>
                        password required !
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="validationCustom02">
                    <FloatingLabel
                      controlId="Mobile_Number"
                      label="Mobile Number "
                      className="mb-3"
                      type="text"
                      name="Mobile_Number"
                      value={formData.Mobile_Number}
                      onChange={handleChange}
                      required
                    >
                      <Form.Control
                        type="text"
                        placeholder="Mobile Number"
                        className="form-control"
                        maxLength={10}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid"className={styles.validationMessage}>
                        Mobile Number required !
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="validationCustom02">
                    <FloatingLabel
                      controlId="Contractor"
                      label="Contractor"
                      className="mb-3"
                      name="Contractor"
                      value={formData.Contractor}
                      onChange={handleChange}
                      required
                    >
                      <Form.Select
                        aria-label="Select Contractor"
                        defaultValue=""
                      >
                        <option value={0}>Select Contractor</option>

                        {contractorOptions.map((option) => (
                          <option key={option.id} value={option.id}>
                            {`${option.name}`}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid"className={styles.validationMessage}>
                        Contractor required !
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="validationCustom02">
                    <FloatingLabel
                      controlId="Designation"
                      label="Designation"
                      className="mb-3"
                      name="Designation"
                      value={formData.Designation}
                      onChange={handleChange}
                      required
                    >
                      <Form.Select
                        aria-label="Select Designation"
                        defaultValue=""
                      >
                        <option value={0}>Select Designation</option>
                        {designationOptions.map((option) => (
                          <option key={option.id} value={option.id}>
                            {`${option.name}`}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid"className={styles.validationMessage}>
                        Designation required !
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-center">
                <Button type="submit" className={styles.buttonRegister}>
                  Register
                </Button>
              </div>
              <div className="mt-1 text-center ">
              <Link href="/login" className={styles.loginFrm}>
                Login
              </Link>
            </div>
            </Form>
          </div>
        </Col>
        <Col md={6} className="p-0 overflow-hidden bg">
          <Image
            src={LoginPageImage}
            alt="Login Page"
            layout="fill"
            objectFit="cover"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpForm;
