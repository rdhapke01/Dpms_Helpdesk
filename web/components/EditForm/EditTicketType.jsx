"use client";
import React, { useState } from "react";
import { Form, FloatingLabel, Button, Row, Col, Alert, Modal, Toast, } from "react-bootstrap";
import styles from "@/css/From-css/SignUpPage.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

function EditTicketType({ data }) {
  const userInfo = useSelector((state) => state.user.userData);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [ticketData, setTicketData] = useState({
    Id: data.id,
    Name: data.name || "",
    Status: data.status || "",
    Updated_By: userInfo?.id || 1,
  });

  const [validationErrors, setValidationErrors] = useState({});

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

  function putData() {
    // API endpoint URL
    const apiUrl = `${process.env.typeEndPoint}/${data.id}`;
    let body = ticketData;

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
        console.log("Success:", data);
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
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validation checks
  //   // const errors = {};
  //   // // Your validation logic here...

  //   // // If there are no validation errors, proceed with form submission
  //   // if (Object.keys(errors).length === 0) {
  //   //   console.log({ ticketData });
  //   putData();
  //   // } else {
  //   //   setValidationErrors(errors);
  //   // }
  // };

  return (
    <div className={styles.pagecontainer}>
      <Row className={styles.pContainer}>
        <div className={styles.title}>Edit Ticket</div>
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
                <Form.Control.Feedback type="invalid">
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
                <Form.Control.Feedback type="invalid">
                  {validationErrors.Status}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <Link href="/helpdesk/ticket_type">
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

export default EditTicketType;
