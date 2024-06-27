"use client";
import React, { useState, useEffect } from "react";
import styles from "@/css/From-css/StatusForm.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Row, Col, Modal, Button, Toast } from "react-bootstrap";
import { useSelector } from "react-redux";
import Link from "next/link";

function EditEscalationMatricxForm({ ticketTypeData, priorityData, data }) {
  const userInfo = useSelector((state) => state.user?.userData);
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    Id:data.id,
    Ticket_Type: data.ticket_Type,
    Priority: data.priority,
    Response_Time: data.response_Time,
    Resolution_Time: data.resolution_Time,
    Status: "Active",
    Updated_By: userInfo?.id || 1,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

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
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(formData),
          };

          const apiUrl = `${process.env.escalationMatrixEndPoint}/${data.id}`;
        //   return
          const response = await fetch(apiUrl, options);

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
            Ticket_Type: "",
            Priority: "",
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
        <div className={styles.title}>Escalation Matrix</div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <FloatingLabel controlId="Ticket_Type" label="Ticket Type">
                <Form.Select
                  name="Ticket_Type"
                  value={formData.Ticket_Type}
                  onChange={handleChange}
                  required
                  defaultValue=""
                >
                  <option value="">Select Ticket Type</option>

                  {ticketTypeData &&
                    ticketTypeData.map((type) => (
                      <option key={type.id} value={+type.id}>
                        {type.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {validated && "Please select Ticket Type"}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="Priority" label="Priority">
                <Form.Select
                  name="Priority"
                  value={formData.Priority}
                  onChange={handleChange}
                  required
                  defaultValue=""
                >
                  <option value="">Select Priority</option>

                  {priorityData &&
                    priorityData.map((priority) => (
                      <option key={priority.id} value={+priority.id}>
                        {priority.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {validated && "Please select Priority"}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
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
            </Col>
          </Row>
          <Link href="/helpdesk/escalation_matrix">
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

export default EditEscalationMatricxForm;
