"use client";
import React, { useState } from "react";
import styles from "@/css/From-css/TicketFrom.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Row, Col, Modal, Button, Toast } from "react-bootstrap";
import { useSelector } from "react-redux";
import Link from "next/link";

function TicketForm({
  problemOptions = null,
  priorityOptions = null,
  userOptions = null,
  typeOptions = null,
  statusOptions = null,
}) {
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userInfo = useSelector((state) => state.user?.userData);
  const [formData, setFormData] = useState({
    Region_Id: "",
    Circle_Id: "",
    Division_Id: "",
    Scheme_Id: "",
    Problem_Id: "",
    Description: "",
    Caller_Id: "",
    Requester_Email: "",
    Requester_Mobile: "",
    Subject: "",
    Type_Id: "",
    Priority_Id: "",
    Status_Id: "Active",
    Assigned_To_User: "",
    Created_By: userInfo?.id || 1,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    if (isSubmitting) return;

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

      const response = await fetch(process.env.ticketEndPoint, options);

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
      setFormData({
        Problem_Id: "",
        Description: "",
        Caller_Id: "",
        Requester_Email: "",
        Requester_Mobile: "",
        Subject: "",
        Type_Id: "",
        Priority_Id: "",
        Status_Id: "Created",
        Assigned_To_User: "",
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
        <div className={styles.title}>Ticket Form</div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Row>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="regionId"
                    label="Select Region"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Select Region"
                      name="Region_Id"
                      value={formData.Region_Id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Region</option>
                      <option value="Nagpur">Nagpur</option>
                      <option value="Pune">Pune</option>
                      <option value="Kokan">Kokan</option>

                      {/* {problemOptions &&
                        problemOptions.map((problem) => (
                          <option key={problem.id} value={problem.id}>
                            {problem.name}
                          </option>
                        ))} */}
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Please select Region..!
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="circleId"
                    label="Select Circle"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Select Circle"
                      name="Circle_Id"
                      value={formData.Circle_Id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Circle</option>
                      <option value="Nagpur">Nagpur</option>
                      <option value="Pune">Pune</option>
                      <option value="Kokan">Kokan</option>
                      {/* {userOptions.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))} */}
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Please select Circle !
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="divisionId"
                    label="Select Division"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Select Division"
                      name="Division_Id"
                      value={formData.Division_Id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Division</option>
                      <option value="Nagpur">Nagpur</option>
                      <option value="Pune">Pune</option>
                      <option value="Kokan">Kokan</option>
                      {/* {userOptions.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))} */}
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Please select Division !
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="schemeId"
                    label="Select Scheme"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Select Scheme"
                      name="Scheme_Id"
                      value={formData.Division_Id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Scheme</option>
                      <option value="Nagpur">Nagpur</option>
                      <option value="Pune">Pune</option>
                      <option value="Kokan">Kokan</option>
                      {/* {userOptions.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))} */}
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Please select Division !
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="problemId"
                    label="Select Problem"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Select Problem"
                      name="Problem_Id"
                      value={formData.Problem_Id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Issue</option>
                      {problemOptions &&
                        problemOptions.map((problem) => (
                          <option key={problem.id} value={problem.id}>
                            {problem.name}
                          </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Please select Issue..!
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="statusId"
                    label="Select Status"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Select Status"
                      name="Status_Id"
                      value={formData.Status_Id}
                      onChange={handleChange}
                      required
                    >
                      <option value="Active">Active</option>

                      {statusOptions &&
                        statusOptions.map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.status_Name}
                          </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Status required !
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="typeId"
                    label="Select Type"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Select Type"
                      name="Type_Id"
                      value={formData.Type_Id}
                      onChange={handleChange}
                      required
                    >
                      <option value="0">Select Type</option>

                      {typeOptions &&
                        typeOptions.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Type Id required !
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="priorityId"
                    label="Select Priority"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Select Priority"
                      name="Priority_Id"
                      value={formData.Priority_Id}
                      onChange={handleChange}
                      required
                    >
                      <option value="0">Select Priority</option>

                      {priorityOptions &&
                        priorityOptions.map((priority) => (
                          <option key={priority.id} value={priority.id}>
                            {priority.name}
                          </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Priority Id required !
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="assignedToUser"
                    label="Assign To"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Assign To"
                      name="Assigned_To_User"
                      value={formData.Assigned_To_User}
                      onChange={handleChange}
                      required
                    >
                      <option value="0">Assign To</option>

                      {userOptions &&
                        userOptions.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Assigned To User required !
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="Subject"
                    label="Subject"
                    className="mb-3"
                  >
                    <Form.Control
                      placeholder="Subject"
                      // style={{ height: "50px" }}
                      name="Subject"
                      value={formData.Subject}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Subject required !
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="Description"
                    label="Description"
                    className="mb-3"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Description"
                      style={{ height: "100px" }}
                      name="Description"
                      value={formData.Description}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Description required !
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
          </Row>
          <Link href="/helpdesk/support_ticket">
            <button type="back" className="btn btn-success btn-sm">
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
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowSuccessModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TicketForm;

{
  /*  <Row>
              <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="Requester_Mobile"
                    label="Requester Mobile"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="Requester Mobile"
                      maxLength={10}
                      name="Requester_Mobile"
                      value={formData.Requester_Mobile}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Requester Mobile Number required!
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>  */
}
{
  /* <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="callerId"
                    label="Select Caller"
                    className="mb-3"
                  >
                    <Form.Select
                      aria-label="Select Caller"
                      name="Caller_Id"
                      value={formData.Caller_Id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Caller</option>

                      {userOptions.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Please select caller !
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
               <Col>
                <Form.Group controlId="validationCustom02">
                  <FloatingLabel
                    controlId="email"
                    label="Email"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="Requester_Email"
                      value={formData.Requester_Email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.validationMessage}
                    >
                      Email required !
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col> */
}
