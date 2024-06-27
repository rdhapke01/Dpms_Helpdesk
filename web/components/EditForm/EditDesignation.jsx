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

function EditDesignation({ data }) {
  const userInfo = useSelector((state) => state.user.userData);

  const [designationData, setDesignationData] = useState({
    Id: data.id,
    Designation_Name: data.designation_Name || "",
    Status: data.status || "",
    Updated_By: userInfo?.id || 1,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDesignationData((prevData) => ({
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
    const apiUrl = `${process.env.designationEndPoint}/${data.id}`;
    let body = designationData;

    // Request options
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
    };

    // Sending PUT request
    fetch(apiUrl, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response;
      })
      .then((data) => {
        setShowSuccessModal(true);
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
      putData()
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const form = e.currentTarget;

  //   if (form.checkValidity() === false) {
  //     setValidated(true);
  //   } else {
  //     putData(); // Call putData function if form is valid
  //   }
  // };

  return (
    <div className={styles.pagecontainer}>
      <Row className={styles.pContainer}>
        <div className={styles.title}>Edit Designation</div>

        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="validationCustom02">
                <FloatingLabel
                  controlId="Designation_Name"
                  label="Designation Name"
                >
                  <Form.Control
                    type="text"
                    placeholder="Designation Name"
                    name="Designation_Name"
                    value={designationData.Designation_Name}
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className={styles.validationMessage}
                  >
                    Designation Name required !
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="validationCustom02">
                <FloatingLabel controlId="Status" label="Status">
                  <Form.Select
                    name="Status"
                    value={designationData.Status}
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
              </Form.Group>
            </Col>
          </Row>
          <Link href="/helpdesk/designation">
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

export default EditDesignation;
