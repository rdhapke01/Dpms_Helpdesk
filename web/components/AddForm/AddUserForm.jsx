"use client";
import React, { useState } from "react";
import styles from "@/css/From-css/SignUpPage.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Row, Col, Modal, Button, Toast, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import Link from "next/link";

function AddUserForm({ contractorOptions, designationOptions, roleOptions }) {
  const userInfo = useSelector((state) => state.user?.userData);
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    User_Id: "",
    Password: "",
    Mobile_Number: "",
    Role: "4",
    Contractor_Id: "",
    Designation_Id: "",
    Status: "Active",
    Created_By: userInfo?.id || 1,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formData),
      };
     
      const response = await fetch(process.env.designationEndPoint, options);

      if (!response.ok) {
        let errorMessage;

        if (response.headers.get("content-type").includes("application/json")) {
          const responseBody = await response.json();
          errorMessage = responseBody.message || "Unknown error";
        } else {
          errorMessage = await response.text();
        }

        throw new Error(errorMessage);
      }

      setShowSuccessModal(true);
      setFormData({
        First_Name: "",
        Last_Name: "",
        Email: "",
        User_Id: "",
        Password: "",
        Mobile_Number: "",
        Role: "4",
        Contractor_Id: "",
        Designation_Id: "",
        Status: "Active",
        Created_By: userInfo?.id || 1,
      });

      // Reset validated state
      setValidated(false);
      setErrorMessage(null);
      setValidationErrors({});
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(error.message);
      setShowErrorToast(true);

      // Reset validated state
      setValidated(false);
      setValidationErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pagecontainer}>
      <Row className={styles.pContainer}>
        <div className={styles.title}>Add User</div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="pb-3">
            <Col>
              <FloatingLabel controlId="First_Name" label="First Name">
                <Form.Control
                  type="text"
                  name="First_Name"
                  value={formData.First_Name}
                  placeholder="First Name"
                  onChange={handleChange}
                  required
                  isInvalid={validated && !formData.First_Name}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.validationMessage}
                >
                  {validated && !formData.First_Name && "First Name required!"}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel controlId="Last_Name" label="Last Name">
                <Form.Control
                  type="text"
                  name="Last_Name"
                  value={formData.Last_Name}
                  placeholder="Last Name"
                  onChange={handleChange}
                  required
                  isInvalid={validated && !formData.Last_Name}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.validationMessage}
                >
                  {validated && !formData.Last_Name && "Last Name required!"}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel controlId="Email" label="Email">
                <Form.Control
                  type="email"
                  name="Email"
                  value={formData.Email}
                  placeholder="Email"
                  onChange={handleChange}
                  required
                  isInvalid={validated && !formData.Email}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.validationMessage}
                >
                  {validated && !formData.Email && "Email required!"}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="pb-3">
            <Col>
              <FloatingLabel controlId="User_Id" label="User Id">
                <Form.Control
                  type="text"
                  name="User_Id"
                  value={formData.User_Id}
                  placeholder="User Id"
                  onChange={handleChange}
                  required
                  isInvalid={validated && !formData.User_Id}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.validationMessage}
                >
                  {validated && !formData.User_Id && "User Id required!"}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel controlId="Password" label="Password">
                <Form.Control
                  type="password"
                  name="Password"
                  value={formData.Password}
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  isInvalid={validated && !formData.Password}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.validationMessage}
                >
                  {validated && !formData.Password && "Password required!"}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel controlId="Mobile_Number" label="Mobile Number">
                <Form.Control
                  type="text"
                  name="Mobile_Number"
                  value={formData.Mobile_Number}
                  placeholder="Mobile Number"
                  onChange={handleChange}
                  required
                  maxLength={10}
                  isInvalid={validated && !formData.Mobile_Number}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.validationMessage}
                >
                  {validated &&
                    !formData.Mobile_Number &&
                    "Mobile Number required!"}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="pb-3">
            <Col>
              <FloatingLabel controlId="Role" label="Role">
                <Form.Select
                  name="Role"
                  value={formData.Role}
                  onChange={handleChange}
                  required
                  isInvalid={validated && !formData.Role}
                >
                  <option value="">Select Role</option>

                  {roleOptions &&
                    roleOptions.map((role) => {
                      return <option value={role.id}>{role.name}</option>;
                    })}
                </Form.Select>
                <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      {validated &&
                        !formData.Role &&
                        "Role required!"}
                    </Form.Control.Feedback>
            
              </FloatingLabel>
      
            </Col>

            {formData.Role === "4" && (
              <>
                <Col>
                  <FloatingLabel controlId="Contractor_Id" label="Contractor">
                    <Form.Select
                      name="Contractor_Id"
                      value={formData.Contractor_Id}
                      onChange={handleChange}
                      required
                      isInvalid={validated && !formData.Contractor_Id}
                    >
                      <option value="">Select Contractor</option>
                      {contractorOptions &&
                        contractorOptions.map((contractor) => {
                          return (
                            <option value={contractor.id}>
                              {contractor.name}
                            </option>
                          );
                        })}
                      {/* Add contractor options */}
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      {validated &&
                        !formData.Contractor_Id &&
                        "Contractor required!"}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col>
                  <FloatingLabel controlId="Designation_Id" label="Designation">
                    <Form.Select
                      name="Designation_Id"
                      value={formData.Designation_Id}
                      onChange={handleChange}
                      required
                      isInvalid={validated && !formData.Designation_Id}
                    >
                      <option value="">Select Designation</option>
                      {designationOptions &&
                        designationOptions.map((designation) => {
                          return (
                            <option value={designation.id}>
                              {designation.name}
                            </option>
                          );
                        })}
                      {/* Add designation options */}
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      {validated &&
                        !formData.Designation_Id &&
                        "Designation required!"}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </>
            )}
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
        <Modal.Body>Data added successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" size="sm" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddUserForm;
