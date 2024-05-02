import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Form, Col } from 'react-bootstrap';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ProfilePage() {

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [values, setValues] = useState({});
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // Fetch user details when the component mounts
        const getUserDetails = async () => {
            const user = JSON.parse(localStorage.getItem('userData'));
            setDetails(user);
            const id = user.user._id;
            try {
                const res = await axios.get(`http://localhost:8080/user/get/${id}`);
                setDetails(res.data.user);
            } catch (err) {
                alert(err.message);
            }
        };
        getUserDetails();
    }, []);

    const updateUserDetails = (val) => {
        setValues(val);
        handleShow();
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
            password: password || values.password
        };

        axios.put(`http://localhost:8080/user/update/${updatedValues.id}`, updatedValues)
            .then(() => {
                alert("User Details Updated");
                handleClose();
                window.location.reload();
            }).catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    const downloadProfileAsPDF = () => {
        const profileCard = document.getElementById("profile-card");
        const profileImage = document.getElementById("profile-image").src;
    
        html2canvas(profileCard).then((canvas) => {
            const pdf = new jsPDF("p", "mm", "a4");
            
            // Add heading
            pdf.setFontSize(24); // Increased font size for the heading
            pdf.text('Profile Details', 10, 10);
    
            // Add profile image
            pdf.addImage(profileImage, 'JPEG', 10, 20, 50, 50); // Adjust position and size as needed
    
            // Add user details to PDF
            const profileDetails = `
                User Name: ${details.name}
                Role: ${details.role}
                Email: ${details.email}
                Contact Number: ${details.contactNumber}
                Address: ${details.address}
                Password: ${details.password}
            `;
            pdf.setFontSize(12); // Reset font size for details
            pdf.text(profileDetails, 10, 80);
        
            pdf.save("profile-details.pdf");
        });
    };
    

    return (
        <Container>
            <h2 className="mt-4">Profile Details</h2>
            <Col>
                <Card id="profile-card" className="mt-4" style={{ width: '30rem', position: 'relative', left: '300px', top: '100px' }}>
                    <Card.Body>
                        <div
                            style={{
                                position: 'relative',
                                top: '-40px', // Adjust vertical position as needed
                                left: '50%',
                                transform: 'translateX(-50%)',
                                cursor: 'pointer',
                                border: '2px solid #6c757d',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                height: '200px',
                                width: '200px'
                            }}
                            onClick={() => console.log("Add image clicked")}
                        >
                            <img
                            id="profile-image"
                                src={'./man.jpg'}
                                alt="Person"
                                style={{
                                    width: '100%', // Ensure the image covers the entire circle
                                    height: '100%', // Ensure the image covers the entire circle
                                    objectFit: 'contain', // Ensure the entire image fits inside the circle without stretching
                                    borderRadius: '50%'
                                }}
                            />
                        </div>
                        <Card.Title>User Name: {details.name}</Card.Title>
                        <Card.Text>
                            <strong>Role:</strong> {details.role}
                        </Card.Text>
                        <Card.Text>
                            <strong>Email:</strong> {details.email}
                        </Card.Text>
                        <Card.Text>
                            <strong>Contact Number:</strong> {details.contactNumber}
                        </Card.Text>
                        <Card.Text>
                            <strong>Address:</strong> {details.address}
                        </Card.Text>
                        <Card.Text>
                            <strong>Password:</strong> {details.password}
                        </Card.Text>
                        <Button variant="primary" onClick={() => updateUserDetails(details)}>Update</Button>
                        <Button variant="secondary" onClick={downloadProfileAsPDF}>Download PDF</Button>
                    </Card.Body>
                </Card>
                <Modal show={show} onHide={handleClose} className="getfunc">
                    <Modal.Header closeButton>
                        <Modal.Title>Update Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={sendData}>
                            <Form.Group controlId="name">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" defaultValue={values.name} onChange={(e) => setName(e.target.value)} required />
                            </Form.Group>
                            <Form.Group controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text" defaultValue={values.role} onChange={(e) => setRole(e.target.value)} required />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" defaultValue={values.email} onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>
                            <Form.Group controlId="contactNumber">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="text" defaultValue={values.contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                            </Form.Group>
                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" defaultValue={values.address} onChange={(e) => setAddress(e.target.value)} required />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" defaultValue={values.password} onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            <Button className="finalpay" type="submit">Edit details</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>
        </Container>
    );
}

export default ProfilePage;
