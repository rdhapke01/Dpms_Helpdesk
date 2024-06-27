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

function EditStatus({ data }) {
  const userInfo = useSelector((state) => state.user.userData);

  const [statusData, setStatusData] = useState({
    Id: data.id,
    Status_Name: data.status_Name || "",
    Status: data.status || "",
    Updated_By: userInfo?.id || 1,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStatusData((prevData) => ({
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
    const apiUrl = `${process.env.statusEndPoint}/${data.id}`;
    let body = statusData;

    // Request options
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
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
        setShowSuccessModal(true);
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
      putData();
    }
  };

  return (
    <div className={styles.pagecontainer}>
      <Row className={styles.pContainer}>
        <div className={styles.title}>Edit Status</div>
        <Form onSubmit={handleSubmit}>
          <Row className="pb-3">
            <Col>
              <FloatingLabel controlId="Status_Name" label="Status Name">
                <Form.Control
                  type="text"
                  name="Status_Name"
                  value={statusData.Status_Name}
                  placeholder="Status Name"
                  isInvalid={!!validationErrors.Status_Name}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.validationMessage}
                >
                  {validationErrors.Status_Name}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <Link href="/helpdesk/status">
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

export default EditStatus;
