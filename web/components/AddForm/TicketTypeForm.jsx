"use client";
import React, { useState, useEffect } from "react";
import styles from "@/css/From-css/TicketTypeForm.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Row, Col, Modal, Button, Toast } from "react-bootstrap";
import { useSelector } from "react-redux";
import Link from "next/link";

function Page() {
  const userInfo = useSelector((state) => state.user?.userData);
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    Name: "",
    Status: "Active",
    Created_By: userInfo?.id || 1,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleSubmit = async (event) => {
    console.log("clicked");
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

          const response = await fetch(process.env.typeEndPoint, options);

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

  useEffect(() => {
    // Close the success modal after 3 seconds
    if (showSuccessModal) {
      const timeoutId = setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showSuccessModal]);

  return (
    <div className={styles.pagecontainer}>
      <Row className={styles.pContainer}>
        <div className={styles.title}>Ticket Type Form</div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="Name">
                <FloatingLabel
                  controlId="Name"
                  label="Ticket Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="Name"
                    placeholder="Ticket Name"
                    value={formData.Name}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid" className={styles.validationMessage}>
                    {validated && "Ticket Name required!"}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Link href="/helpdesk/ticket_type">
            <button type="button" className="btn btn-success btn-sm">
              Back
            </button>
          </Link>
            &nbsp;
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
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
          <Button variant="danger" size="sm"  onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Page;
