import { useRef, useState } from "react";
import { Form, Container, Button, Alert, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

import "../css/App.css";

export default function Login() {

    const navigate = useNavigate();

    const emailField = useRef("");
    const passwordField = useRef("");

    const [errorResponse, setErrorResponse] = useState({
        isError: false,
        message: "",
    });

    const onLogin = async (e) => {
        e.preventDefault();

        try{
            const userToLoginPayload = {
                email: emailField.current.value,
                password: passwordField.current.value,
            };

            const loginRequest = await axios.post(
                "http://localhost:2000/auth/login",
                userToLoginPayload
            );

            const loginResponse = loginRequest.data;

            if(loginResponse.status) {
                localStorage.setItem("token", loginResponse.data.token);

                navigate("/");
            }
        } catch (err) {
            console.log(err);
            const response = err.response.data;

            setErrorResponse({
                isError: true,
                message: response.message,
            });
        }
    };

    const onLoginGoogleSuccess = async (credentialResponse) => {
        try {
            const userToLoginPayload = {
                google_credential: credentialResponse.credential,
        };
    
        const loginGoogleRequest = await axios.post(
            "http://localhost:2000/auth/login-google",
            userToLoginPayload
        );
    
        const loginGoogleResponse = loginGoogleRequest.data;
    
        if (loginGoogleResponse.status) {
            localStorage.setItem("token", loginGoogleResponse.data.token);
    
            navigate("/");
        }
        } catch (err) {
            console.log(err);
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
                        <a class="nav-link btn btn__cp text-dark" href="#"> Register </a>
                    </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* ----------------------- End Navbar ----------------------- */}


            {/* ----------------------- Login ----------------------- */}

            <div className="page-login" style={{backgroundImage:`url(../src/images/bg_1.png)`, height:`623px`, backgroundSize:`cover`}}>
                <Container>
                    <br/>
                    <div className="form-login">
                        <h1 className="form-title"> Welcome Back...</h1>
                        <p className="from-description text-muted">Please enter your email and your password</p>
                        <Form onSubmit={onLogin}>
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

                            <div className="my-3">
                                <GoogleOAuthProvider clientId="878652378412-rmjjckepnmtfqmn6b099tf95vsvmhuoh.apps.googleusercontent.com">
                                    <GoogleLogin
                                        onSuccess={onLoginGoogleSuccess}
                                        onError={() => {
                                            console.log("Login Failed ):");
                                        }}
                                    />
                                </GoogleOAuthProvider>
                            </div>

                            <p>
                                Belum punya akun? Silahkan <Link to="/register">Daftar</Link>
                            </p>

                            {errorResponse.isError && (
                                <Alert variant="danger">{errorResponse.message}</Alert>
                            )}

                            <Button className="w-100" type="submit">
                                Masuk
                            </Button>
                        </Form>
                    </div>
                </Container>
            </div>

            <div className="footer-login"></div>
            {/* ----------------------- End Login ----------------------- */}
        </div>
    );
}