import { useRef, useState } from "react";
import { Form, Container, Button, Alert, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../css/App.css";

export default function Register() {

    const navigate = useNavigate();

    const nameField = useRef("");
    const emailField = useRef("");
    const roleField = useRef("");
    const passwordField = useRef("");

    const [errorResponse, setErrorResponse] = useState({
        isError: false,
        message: "",
    });

    const onRegister = async (e) => {
        e.preventDefault();

        try{
            const userToRegisterPayload = {
                name: nameField.current.value,
                email: emailField.current.value,
                role: roleField.current.value,
                password: passwordField.current.value,
            };

            const registerRequest = await axios.post(
                "https://binarsandi-instagram-api.herokuapp.com/auth/register",
                userToRegisterPayload
            );

            const registerResponse = registerRequest.data;

            if(registerResponse.status) navigate("/login");
        } catch (err) {
            console.log(err);
            const response = err.response.data;

            setErrorResponse({
                isError: true,
                message: response.message,
            });
        }
    };

    return (

        <div className="App">

            {/* ----------------------- Navbar ----------------------- */}

            <Navbar className="navbar" expand="lg">
                <Container>
                    <Navbar.Brand className="navbar-brand" href="#home">
                        <img src="../src/images/logo_rb.png" alt="Gambar Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link className="nav-item text-white" href="#home">Home</Nav.Link>
                        <Nav.Link className="nav-item text-white" href="#link">Product</Nav.Link>
                        <Nav.Link className="nav-item text-white" href="#link">Location</Nav.Link>
                        <Nav.Link className="nav-item text-white" href="#link">Service</Nav.Link>
                        <Nav.Link className="nav-item text-white" href="#link">About</Nav.Link>
                    </Nav>
                    <Form className="d-flex project__class">
                        <a className="nav-link btn btn__cp text-dark" href="#"> Login </a>
                    </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* ----------------------- End Navbar ----------------------- */}
            
            {/* ----------------------- Register ----------------------- */}
            <div className="page-register" style={{backgroundImage:`url(../src/images/bg_1.png)`, height:`623px`, backgroundSize:`cover`}}>
                <Container>
                    <br />
                    <div className="form-register">
                        <h1 className="form-title">Let's join now</h1>
                        <p className="from-description text-muted">Please fill out the form below</p>
                        <Form onSubmit={onRegister}>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Select ref={roleField}>
                                    <option>Pilih Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control
                                    type="text"
                                    ref={nameField}
                                    placeholder="Masukkan nama"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    ref={emailField}
                                    placeholder="Masukkan Email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    ref={passwordField}
                                    placeholder="Masukkan Password"
                                />
                            </Form.Group>

                            <p>
                                Sudah punya akun? Silahkan <Link to="/login">Login</Link>
                            </p>

                            {errorResponse.isError && (
                                <Alert variant="danger">{errorResponse.message}</Alert>
                            )}

                            <Button className="w-100" type="submit">
                                Daftar
                            </Button>
                        </Form>
                    </div>
                </Container>
            </div>

            <div className="footer-register"></div>
            {/* ----------------------- End Register ----------------------- */}
        </div>
    );
}