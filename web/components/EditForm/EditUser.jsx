"use client";
import React, { useState } from "react";
import {
  Form,
  FloatingLabel,
  Button,
  Row,
  Col,
  Alert,
  Modal,
  Toast,
} from "react-bootstrap";
import styles from "@/css/EditPage.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

function EditUser({ contractorOptions, designationOptions, data, roleData }) {
  const userInfo = useSelector((state) => state.user.userData);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [userData, setUserData] = useState({
    Id: data.id,
    First_Name: data.first_Name || "",
    Last_Name: data.last_Name || "",
    Email: data.email || "",
    User_Id: data.user_Id || "",
    Mobile_Number: data.mobile_Number || "",
    Contractor_Id: data.contractor_Id || "",
    Designation_Id: data.designation_Id || "",
    Status: data.status || "",
    Role_Id: data.role_Id || "",
    Updated_By: userInfo?.id || 1,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  function putData() {
    // API endpoint URL
    const apiUrl = `${process.env.addUserEndPoint}/${data.id}`;
    let body = userData;
    if (body.Role_Id != 4) {
      body.Designation_Id = 0;
      body.Contractor_Id = 0;
    }
    // Request options
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
    };
    setShowSuccessModal(true);
    // Sending POST request
    fetch(apiUrl, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response;
      })
      .then((data) => {
        console.log("Success:", data);
        // Handle success response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
  }
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      // Request options
      putData();
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validation checks
  //   // const errors = {};
  //   // // Your validation logic here...

  //   // // If there are no validation errors, proceed with form submission
  //   // if (Object.keys(errors).length === 0) {
  //   //   console.log({ userData });
  //   putData();
  //   // } else {
  //   //   setValidationErrors(errors);
  //   // }
  // };

  return (
    <div className={styles.pagecontainer}>
      <Row className={styles.pContainer}>
        <div className={styles.title}>Edit User</div>
        <Form onSubmit={handleSubmit}>
          <Row className="pb-3">
            <Col>
              <FloatingLabel controlId="First_Name" label="First Name">
                <Form.Control
                  type="text"
                  name="First_Name"
                  value={userData.First_Name}
                  placeholder="First Name"
                  isInvalid={!!validationErrors.First_Name}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.validationMessage}
                >
                  {validationErrors.First_Name}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="Last_Name" label="Last Name">
                <Form.Control
                  type="text"
                  name="Last_Name"
                  value={userData.Last_Name}
                  placeholder="Last Name"
                  isInvalid={!!validationErrors.Last_Name}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.validationMessage}
                >
                  {validationErrors.Last_Name}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="pb-3">
            <Col>
              <FloatingLabel controlId="Email" label="Email">
                <Form.Control
                  type="email"
                  name="Email"
                  value={userData.Email}
                  placeholder="Email"
                  isInvalid={!!validationErrors.Email}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.validationMessage}
                >
                  {validationErrors.Email}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="User_Id" label="User Id">
                <Form.Control
                  type="text"
                  name="User_Id"
                  value={userData.User_Id}
                  placeholder="User Id"
                  isInvalid={!!validationErrors.User_Id}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.validationMessage}
                >
                  {validationErrors.User_Id}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="pb-3">
            <Col>
              <FloatingLabel controlId="Mobile_Number" label="Mobile Number">
                <Form.Control
                  type="text"
                  name="Mobile_Number"
                  value={userData.Mobile_Number}
                  placeholder="Mobile Number"
                  isInvalid={!!validationErrors.Mobile_Number}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.validationMessage}
                >
                  {validationErrors.Mobile_Number}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="Role_Id" label="Role">
                <Form.Select
                  name="Role_Id"
                  value={userData.Role_Id}
                  onChange={handleChange}
                  isInvalid={!!validationErrors.Role_Id}
                  required
                >
                  <option value="">Select Role</option>
                  {roleData.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.validationMessage}
                >
                  {validationErrors.Role_Id}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          {userData.Role_Id == 4 && (
            <Row className="pb-3">
              <Col>
                <FloatingLabel controlId="Contractor_Id" label="Contractor">
                  <Form.Select
                    name="Contractor_Id"
                    value={userData.Contractor_Id}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.Contractor_Id}
                    required
                  >
                    <option value="">Select Contractor</option>
                    {contractorOptions.map((contractor) => (
                      <option key={contractor.id} value={contractor.id}>
                        {contractor.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback
                    type="invalid"
                    className={styles.validationMessage}
                  >
                    {validationErrors.Contractor_Id}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="Designation_Id" label="Designation">
                  <Form.Select
                    name="Designation_Id"
                    value={userData.Designation_Id}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.Designation_Id}
                    required
                  >
                    <option value="">Select Designation</option>
                    {designationOptions.map((designation) => (
                      <option key={designation.id} value={designation.id}>
                        {designation.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback
                    type="invalid"
                    className={styles.validationMessage}
                  >
                    {validationErrors.Designation_Id}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
          )}
          <Row className="pb-3">
            <Col>
              <FloatingLabel controlId="Status" label="Status">
                <Form.Select
                  name="Status"
                  value={userData.Status}
                  onChange={handleChange}
                  isInvalid={!!validationErrors.Status}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Accept">Accept</option>
                  <option value="Reject">Reject</option>
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                </Form.Select>
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.validationMessage}
                >
                  {validationErrors.Status}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <Link href="/helpdesk/all_user">
            <button type="back" className="btn btn-success btn-sm">
              Back
            </button>
          </Link>
          &nbsp;
          <button type="submit" className="btn btn-primary btn-sm">
            Submit
          </button>
        </Form>
      </Row>
      <Toast
        onClose={() => setShowErrorToast(false)}
        show={showErrorToast}
        delay={5000}
        autohide
        style={{
          position: "fixed",
          top: "50px",
          left: "59%",
          transform: "translateX(-50%)",
          backgroundColor: "#f8d7da",
          color: "#721c24",
        }}
        className="text-center"
      >
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>
      <Modal
        centered
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data updated successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" size="sm" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditUser;
