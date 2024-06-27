"use client";
import React, { useState, useEffect } from "react";
import styles from "@/css/From-css/PriorityForm.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Row, Col, Modal, Button, Toast } from "react-bootstrap";
import { useSelector } from "react-redux";
import Link from "next/link";

function Page() {
  const userInfo = useSelector((state) => state.user?.userData);
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    Name: "",
    Status: "Active",
    // Response_Time: "",
    // Resolution_Time: "",
    Created_By: userInfo?.id || 1,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      if (!isSubmitting) {
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

          // return
          const response = await fetch(process.env.priorityEndPoint, options);

          if (!response.ok) {
            let errorMessage;

            if (
              response.headers.get("content-type").includes("application/json")
            ) {
              const responseBody = await response.json();
              errorMessage = responseBody.message || "Unknown error";
            } else {
              errorMessage = await response.text();
            }
            throw new Error(errorMessage);
          }

          setShowSuccessModal(true);
          setFormData({
            Name: "",
            Status: "Active",
            Response_Time: "",
            Resolution_Time: "",
            Created_By: userInfo?.id || 1,
          });

          // Reset validated state
          setValidated(false);
          setErrorMessage(null);
        } catch (error) {
          console.error("Error:", error.message);
          setErrorMessage(error.message);
          setShowErrorToast(true);

          // Reset validated state
          setValidated(false);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.pagecontainer}>
      <Row className={styles.pContainer}>
        <div className={styles.title}>Priority Form</div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="Name">
                <FloatingLabel
                  controlId="Name"
                  label="Priority Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="Name"
                    placeholder="Priority Name"
                    value={formData.Name}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className={styles.validationMessage}
                  >
                    {validated && "Priority Name required!"}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
            {/* <Col>
              <Form.Group controlId="Response_Time">
                <FloatingLabel
                  label="Response Time (in hours)"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    name="Response_Time"
                    placeholder="Response Time"
                    value={formData.Response_Time}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className={styles.validationMessage}
                  >
                    {validated && "Response Time required!"}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="Resolution_Time">
                <FloatingLabel
                  label="Resolution Time (in hours)"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    name="Resolution_Time"
                    placeholder="Resolution Time"
                    value={formData.Resolution_Time}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className={styles.validationMessage}
                  >
                    {validated && "Resolution Time required!"}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col> */}
          </Row>
          <Link href="/helpdesk/priority">
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
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
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

export default Page;
