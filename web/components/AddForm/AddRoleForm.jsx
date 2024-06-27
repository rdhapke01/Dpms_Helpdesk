"use client";
import React, { useState, useEffect } from "react";
import styles from "@/css/From-css/RoleForm.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import { Row, Col, Modal, Button } from "react-bootstrap";
import Link from "next/link";
import { useSelector } from "react-redux";

function AddRoleForm() {
  const [validated, setValidated] = useState(false);
  const userInfo = useSelector((state) => state.user.userData);

  const [formData, setFormData] = useState({
    Name: "",
    Status: "Active",
    Created_By: userInfo?.id ?? 2,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      const apiUrl = `${process.env.roleEndPoint}`;

      // Request options
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
          Name: "",
          Status: "Active",
          Created_By: userInfo?.id ?? 2,
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className={styles.pagecontainer}>
      <Row className={styles.pContainer}>
        <div className={styles.title}>Role Form</div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Row>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="Name"
                    label="Role Name"
                    className="mb-3"
                    type="text"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    required
                  >
                    <Form.Control
                      type="text"
                      name="Name"
                      placeholder="Role Name"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Role Name required !
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
          </Row>
          <Link href="/helpdesk/role">
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

export default AddRoleForm;
