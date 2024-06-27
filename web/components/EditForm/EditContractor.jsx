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

function EditContractor({ data }) {
  const userInfo = useSelector((state) => state.user.userData);
  const [contractorData, setContractorData] = useState({
    Id: data.id,
    First_Name: data.first_Name || "",
    Last_Name: data.last_Name || "",
    Email: data.email || "",
    Company_Name: data.company_Name || "",
    Status: data.status || "",
    Establish_Date : data.establish_Date.split("T")[0] || "",
    Updated_By: userInfo?.id || 1,
  });
  const [validated, setValidated] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContractorData((prevData) => ({
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
          // API endpoint URL
          const apiUrl = `${process.env.contractorEndPoint}/${data.id}`;
          const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(contractorData),
          };

          const response = await fetch(apiUrl, options);

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
        <div className={styles.title}>Edit Contractor</div>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel controlId="First_Name" label="First Name">
                    <Form.Control
                      type="text"
                      name="First_Name"
                      value={contractorData.First_Name}
                      placeholder="First Name"
                      isInvalid={!!validationErrors.First_Name}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      First Name required!
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel controlId="Last_Name" label="Last Name">
                    <Form.Control
                      type="text"
                      name="Last_Name"
                      value={contractorData.Last_Name}
                      placeholder="Last Name"
                      isInvalid={!!validationErrors.Last_Name}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Last Name required!
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel controlId="Email" label="Email">
                    <Form.Control
                      type="email"
                      name="Email"
                      value={contractorData.Email}
                      placeholder="Email"
                      isInvalid={!!validationErrors.Email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Email required!
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel controlId="Company_Name" label="Company Name">
                    <Form.Control
                      type="text"
                      name="Company_Name"
                      value={contractorData.Company_Name}
                      placeholder="Company Name"
                      isInvalid={!!validationErrors.Company_Name}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Company required!
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  controlId="validationCustom02"
                  className={styles.validationMessage}
                >
                  <FloatingLabel
                    controlId="Establish_Date"
                    label="Establish Date"
                    className="mb-3"
                  >
                    <Form.Control
                      type="date"
                      name="Establish_Date"
                      value={contractorData.Establish_Date}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Display Date required !
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel controlId="Status" label="Status">
                    <Form.Select
                      name="Status"
                      value={contractorData.Status}
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
          </Row>
          <Link href="/helpdesk/contractor">
            <button type="button" className="btn btn-success btn-sm">
              Back
            </button>
          </Link> &nbsp;
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

export default EditContractor;
