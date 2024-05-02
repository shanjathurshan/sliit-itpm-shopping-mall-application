import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import jsPDF from "jspdf";

function ViewUsers() {
  const [values, setValues] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    function getUsers() {
      axios
        .get("http://localhost:8080/user/")
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getUsers();
  }, []);

  const deleteUsers = (id) => {
    axios.delete(`http://localhost:8080/user/delete/${id}`);
    alert("User Profile deleted.");
    window.location.reload();
  };

  const updateUserDetails = (val) => {
    setValues(val);
    handleShow();
  };

  const generatePDFReport = (user) => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set properties of the PDF document
    doc.setProperties({
      title: "User Report",
      author: "Your Company",
    });

    // Set up the header of the PDF
    doc.setFontSize(18);
    doc.text("User Report", 105, 10, { align: "center" });

    // Generate the content of the PDF for the single user
    let content = `User Details:\n`;
    content += `ID: ${user._id}\n`;
    content += `Name: ${user.name}\n`;
    content += `UserRole: ${user.role}\n`;
    content += `Email: ${user.email}\n`;
    content += `Contact Number: ${user.contactNumber}\n`;
    content += `Address: ${user.address}\n`;
    content += `Password: ${user.password}\n\n`;

    // Add the content to the PDF
    doc.setFontSize(12);
    doc.text(content, 10, 20);

    // Save the PDF
    doc.save(`user_report_${user._id}.pdf`);
  };

  function sendData(e) {
    e.preventDefault();

    const updatedValues = {
      id: values._id,
      name: name || values.name,
      role: role || values.role,
      email: email || values.email,
      contactNumber: contactNumber || values.contactNumber,
      address: address || values.address,
      password: password || values.password,
    };

    axios
      .put(
        `http://localhost:8080/user/update/${updatedValues.id}`,
        updatedValues
      )
      .then(() => {
        alert("User Details Updated");
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  return (
    <div>
      <h1>All Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Password</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {users.map((val, key) => (
            <tr key={key}>
              <td>{val._id}</td>
              <td>{val.name}</td>
              <td>{val.role}</td>
              <td>{val.email}</td>
              <td>{val.contactNumber}</td>
              <td>{val.address}</td>
              <td>{val.password}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => updateUserDetails(val)}
                >
                  Update
                </Button>
              </td>
              <td>
                <Button className="danger" onClick={() => deleteUsers(val._id)}>
                  Delete
                </Button>
              </td>
              <td>
                <Button
                  className="success"
                  onClick={() => generatePDFReport(val)}
                >
                  Download Report
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={sendData}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={values.name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>User Role</Form.Label>
              <Form.Control
                as="select"
                defaultValue={values.role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                defaultValue={values.email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="contactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                defaultValue={values.contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                defaultValue={values.address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                defaultValue={values.password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Edit details
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ViewUsers;
