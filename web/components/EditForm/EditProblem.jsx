"use client";
import React, { useState } from "react";
import {
  Form,
  FloatingLabel,
  Button,
  Row,
  Col,
  Modal,
  Toast,
} from "react-bootstrap";
import styles from "@/css/EditPage.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

function EditPriority({ data }) {
  const userInfo = useSelector((state) => state.user?.userData);
  const [problemData, setProblemData] = useState({
    Id: data.id,
    Name: data.name || "",
    Status: data.status || "",
    Updated_By: userInfo?.id || 1,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  function putData(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    // API endpoint URL
    const apiUrl = `${process.env.issueEndPoint}/${data.id}`;
    let body = problemData;

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
        setProblemData({});

        // Reset validated state
        setValidated(false);
        setErrorMessage(null);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setErrorMessage(error.message);
        setShowErrorToast(true);

        // Reset validated state
        setValidated(false);
      });
  }

  const [showErrorToast, setShowErrorToast] = useState(false);

  return (
    <div className={styles.pagecontainer}>
      <Row className={styles.pContainer}>
        <div className={styles.title}>Edit Issue</div>
        <Form noValidate validated={validated} onSubmit={putData}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="validationCustom02">
                <FloatingLabel
                  controlId="Problem_Name"
                  label="Problem Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="Name"
                    value={problemData.Name}
                    placeholder="Problem Name"
                    isInvalid={!!validationErrors.Name}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className={styles.validationMessage}
                  >
                    Problem Name required!
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="validationCustom02">
                <FloatingLabel
                  controlId="Status"
                  label="Status"
                  className="mb-3"
                >
                  <Form.Select
                    name="Status"
                    value={problemData.Status}
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
                    Status required!
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Link href="/helpdesk/issue">
            <button type="button" className="btn btn-success btn-sm">
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

export default EditPriority;
