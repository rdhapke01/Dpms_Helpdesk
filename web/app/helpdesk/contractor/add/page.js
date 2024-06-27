"use client";
import React, { useState } from "react";
import styles from "@/css/From-css/ContractList.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Row, Col, Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Link from "next/link";

function Page() {
  const userInfo = useSelector((state) => state.user?.userData);
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    Status: "Active",
    First_Name: "",
    Last_Name: "",
    Company_Name: "",
    Email: "",
    Establish_Date: "",
    Created_By: userInfo?.id || 1,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      if (!isSubmitting) {
        setIsSubmitting(true);

        try {
          const apiUrl = `${process.env.contractorEndPoint}`;
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(formData),
          };

          const response = await fetch(apiUrl, options).catch((error) => {
            console.error("Error:", error);
            // Handle error
            setValidated(false);
          });

          if (!response.ok) {
            console.log(await response.json());
            throw new Error("Network response was not ok");
          } else {
            setShowSuccessModal(true);
            setFormData({
              Status: "Active",
              First_Name: "",
              Last_Name: "",
              Company_Name: "",
              Email: "",
              Establish_Date: "",
              Created_By: userInfo?.id || 1,
            });
          }

          // Reset validated state
          setValidated(false);
        } catch (error) {
          console.error("Error:", error.message);

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
        <div className={styles.title}>Add Contractor</div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="First_Name">
                <FloatingLabel label="First Name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="First_Name"
                    value={formData.First_Name}
                    onChange={handleChange}
                    required
                  />
                  {validated && (
                    <Form.Control.Feedback type="invalid" className={styles.validationMessage}>
                      First Name required!
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="Last_Name">
                <FloatingLabel label="Last Name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="Last_Name"
                    value={formData.Last_Name}
                    onChange={handleChange}
                    required
                  />
                  {validated && (
                    <Form.Control.Feedback type="invalid" className={styles.validationMessage}>
                      Last Name required!
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="Email">
                <FloatingLabel label="Email" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    required
                  />
                  {validated && (
                    <Form.Control.Feedback type="invalid" className={styles.validationMessage}>
                      Email required!
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="Company_Name">
                <FloatingLabel label="Company Name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Company Name"
                    name="Company_Name"
                    value={formData.Company_Name}
                    onChange={handleChange}
                    required
                  />
                  {validated && (
                    <Form.Control.Feedback type="invalid" className={styles.validationMessage}>
                      Company Name required!
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="Establish_Date">
                <FloatingLabel label="Establish Date" className="mb-3">
                  <Form.Control
                    type="date"
                    name="Establish_Date"
                    value={formData.Establish_Date}
                    onChange={handleChange}
                    required
                  />
                  {validated && (
                    <Form.Control.Feedback type="invalid" className={styles.validationMessage}>
                      Establish Date required!
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <Link href="/helpdesk/contractor">
            <button type="button" className="btn btn-success btn-sm">
              Back
            </button>
          </Link>
          &nbsp;
          <button type="submit" className="btn btn-primary btn-sm" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </Row>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
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
