"use client";
import React, { useState } from "react";
import styles from "@/css/AddProblem.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Row, Col, Modal, Button, Toast } from "react-bootstrap";
import { useSelector } from "react-redux";
import Link from "next/link";

function Page() {
  const userInfo = useSelector((state) => state.user?.userData);
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    Name: "",
    Status: "Active",
    Created_By: userInfo?.id || 1,
  });


  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (formData.Name === "") {
      setValidated(true);
    } else {
      if (!isSubmitting) {
        setIsSubmitting(true);

        try {
          const apiUrl = `${process.env.issueEndPoint}`;
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
            setValidated(false);
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          } else {
            setShowSuccessModal(true);
            setFormData({
              Name: "",
              Status: "Active",
              Created_By: userInfo?.id || 1,
            });
          }
          setValidated(false);
        } catch (error) {
          console.error("Error:", error);
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
        <div className={styles.title}>Add Issue</div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Row>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="Name"
                    label="Issue Name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Issue Name"
                      className="form-control"
                      name="Name"
                      value={formData.Name}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Issue Name required!
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
          </Row>
          <Link href="/helpdesk/issue">
            <button className="btn btn-success btn-sm">
              Back
            </button>
          </Link>
          &nbsp;
          <button
            type="submit"
            className='btn btn-primary btn-sm'
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </Row>


      <Modal
        centered
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
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
