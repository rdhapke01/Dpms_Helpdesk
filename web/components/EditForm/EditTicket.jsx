"use client";
import React, { useState } from "react";
import { Form, FloatingLabel, Button, Row, Col, Toast, Modal } from "react-bootstrap";
import styles from "@/css/EditPage.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

function EditTicket({
  problemOptions = [],
  priorityOptions = [],
  userOptions = [],
  typeOptions = [],
  statusOptions = [],
}) {
  const userInfo = useSelector((state) => state.user.userData);
  const [validated, setValidated] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [ticketData, setTicketData] = useState({
    Name: "",
    Status: "",
    Updated_By: userInfo?.id || 1,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

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
            body: JSON.stringify(ticketData),
          };

          const response = await fetch(process.env.contractorEndPoint, options);

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
          setTicketData({
            Name: "",
            Status: "",
            Updated_By: userInfo?.id || 1,
          });
          setValidated(false);
          setErrorMessage(null);
        } catch (error) {
          console.error("Error:", error);
          setErrorMessage(error.message);
          setShowErrorToast(true);
          setValidated(false);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  return (
    <div className={styles.pagecontainer}>
      <Row className={styles.pContainer}>
        <div className={styles.title}>Edit Ticket Type</div>
        <Form onSubmit={handleSubmit}>
          <Row className="pb-3">
            <Col>
              <FloatingLabel controlId="Name" label="Ticket Name">
                <Form.Control
                  type="text"
                  name="Name"
                  value={ticketData.Name}
                  placeholder="Ticket Name"
                  isInvalid={!!validationErrors.Name}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid" className={styles.validationMessage}>
                  {validationErrors.Name}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="pb-3">
            <Col>
              <FloatingLabel controlId="Status" label="Status">
                <Form.Select
                  name="Status"
                  value={ticketData.Status}
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
                <Form.Control.Feedback type="invalid" className={styles.validationMessage}>
                  {validationErrors.Status}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <Link href="/helpdesk/support_ticket">
          
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
          <Button variant="danger" size="sm" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditTicket;
