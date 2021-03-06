import { Button, Alert, Container, Card, Row, Col, Modal, Navbar, Nav } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";

import "../css/App.css";

function Home() {

  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [postToDelete, setPostToDelete] = useState();


  // Modal 
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (e, data) => {
    e.preventDefault();
    setPostToDelete(data);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setPostToDelete(null);
    setShowModal(false);
  }


  // Response 
  const [successResponse, setSuccessResponse] = useState({
    isSuccess: false,
    message: "",
  });

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check status user login
        // 1. Get token from localStorage
        const token = localStorage.getItem("token");

        // 2. Check token validity from API
        const currentUserRequest = await axios.get(
          `${process.env.REACT_APP_INSTAGRAM_BE_API}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const currentUserResponse = currentUserRequest.data;


        if (currentUserResponse.status) {
          // Set user data to redux state
          dispatch(
            addUser({
              user: currentUserResponse.data.user,
              token: token,
            })
          );

          setUser(currentUserResponse.data.user);
        }

      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    fetchData();
    posts();
    setIsRefresh(false);
  }, [isRefresh]);

  const logout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setUser({});
  }

  const posts = async () => {
    try {
      const getPostsData = await axios.get(
        `${process.env.REACT_APP_INSTAGRAM_BE_API}/posts`
      );

      const payloadData = await getPostsData.data.data.get_all_posts_data;

      setData(payloadData);
    } catch (err) {
      console.log(err);
    }
  }

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const deletedPost = await axios.delete(
        `${process.env.REACT_APP_INSTAGRAM_BE_API}/post/delete/${postToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const successResponse = deletedPost.data.message;

      setSuccessResponse({
        isSuccess: true,
        message: successResponse,
      });

      setShowModal(false);

      setPostToDelete(null);

      setIsRefresh(true);

    } catch (err) {
      console.log(err);
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });

      setShowModal(false);

      setPostToDelete(null);
    }
  }


  return isLoggedIn ? (
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
            <Nav className="d-flex project__class">
              <a className=" btn btn__cp text-dark" href="#Name"> Hi, {user.name} </a>
              <a type="button" onClick={(e) => logout(e)} className="btn btn__logout text-white" href="#Logout">Logout</a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ----------------------- End Navbar ----------------------- */}



      {/* ----------------------- First Content ----------------------- */}

      <div className="first-content" style={{ backgroundImage: `url(../src/images/bg_1.png)`, height: `623px`, backgroundSize: `cover` }}>
        <Container>
          <Row>
            <Col lg={12} className="col__caption__ms">
              <h1>Get Ready For Battle In Ecle</h1>
            </Col>
            <Col lg={12} className="col__about">
              <a href="#About">About Ecle</a>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ----------------------- End First Content ----------------------- */}


      {/* ----------------------- Second Content ----------------------- */}

      <div className="second-content">
        <Container>
          <Row>
            <Col lg={3} className="col__behind">
              <h1>Behind The Ecle Project</h1>
            </Col>
            <Col lg={9} className="col__behind__2">
              <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt perferendis magni molestiae tempore accusantium nobis
                recusandae soluta velit minus perspiciatis illum modi aliquid, rem repellat optio ut possimus dicta sequi. Tempore accusantium nobis
                recusandae soluta velit minus perspiciatis illum modi aliquid, rem repellat optio ut possimus dicta sequi.
              </p>
            </Col>
          </Row>

          <Row>
            <Col lg={3}>
              <Card className="card">
                <Card.Body>
                  <div className="icon__op">
                    <i className="bi bi-currency-exchange"></i>
                  </div>
                  <Card.Title>
                    <h4 className="card-title">Product quality</h4>
                  </Card.Title>
                  <Card.Text>
                    <p className="card-text">The Passage Experienced A Surge In Popularity During The 1960s When Laterest Used</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="card">
                <Card.Body>
                  <div className="icon__op">
                    <i className="bi bi-clipboard2-pulse-fill"></i>
                  </div>
                  <Card.Title>
                    <h4 className="card-title">Creating sketch</h4>
                  </Card.Title>
                  <Card.Text>
                    <p className="card-text">The Passage Experienced A Surge In Popularity During The 1960s When Laterest Used</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="card">
                <Card.Body>
                  <div className="icon__op">
                    <i className="bi bi-chat-dots"></i>
                  </div>
                  <Card.Title>
                    <h4 className="card-title">Free consultation</h4>
                  </Card.Title>
                  <Card.Text>
                    <p className="card-text">The Passage Experienced A Surge In Popularity During The 1960s When Laterest Used</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="card">
                <Card.Body>
                  <div className="icon__op">
                    <i className="bi bi-watch"></i>
                  </div>
                  <Card.Title>
                    <h4 className="card-title">24 hours</h4>
                  </Card.Title>
                  <Card.Text>
                    <p className="card-text">The Passage Experienced A Surge In Popularity During The 1960s When Laterest Used</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ----------------------- End Second Content ----------------------- */}

      <div className="show-image">
        <Container>

          <h1>Our Products</h1>

          {successResponse.isSuccess && (
            <Alert variant="success" onClose={() => setSuccessResponse(true)} dismissible>{successResponse.message}</Alert>
          )}

          {errorResponse.isError && (
            <Alert variant="danger" onClose={() => setErrorResponse(true)} dismissible>{errorResponse.message}</Alert>
          )}

          {/* <Link to="/createdata">
              <Button className="my-3" variant="success"> Create Post</Button>
            </Link> */}

          <Row>
            {data.map((data) => (
              <Col lg={3} key={data.id} className="mb-5">
                <div class="gallery-image">
                  <img src={`${process.env.REACT_APP_INSTAGRAM_BE_API}/public/files/${data.picture}`} alt="Gambar" height="240px" />
                  <a href="#href">
                    <div class="img-overlay">
                      <div class="img-description">
                        <h3>{data.title}</h3>
                        <h5>{data.description}</h5>
                      </div>
                      <Row>
                        <Col md={3}>
                          <Link to={`/update/${data.id}`}>
                            <Button variant="primary">Edit</Button>
                          </Link>
                        </Col>
                        <Col md={9}>
                          <Button className="ms-3" variant="danger" onClick={(e) => handleShowModal(e, data)}>Delete</Button>
                        </Col>
                      </Row>
                    </div>
                  </a>
                </div>
              </Col>
            ))}
          </Row>

          {/* ----------------------- Modal ----------------------- */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>Yakin ga nih?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="danger" onClick={(e) => onDelete(e)}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {/* ----------------------- End Modal ----------------------- */}

        </Container>
      </div>

      <div className="create-project">
        <Container>
          <Row>
            <Col lg={6} className="col__caption__cp">
              <h1>Great NFT Marketplace Since 2021</h1>
              <p className="lorem__1 text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              <p className="lorem__2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, earum nostrum inventore tempora esse ea odio voluptatibus asperiores pariatur obcaecati.</p>
              <div className="btn__expand">
                <Link to="/createdata">
                  <a type="button" href="#view" className="btn btn__viewmore">Create Product</a>
                </Link>
                <a href="#compare" className="btn btn__compare"> / Compare Product</a>
              </div>
            </Col>
            <Col lg={6} className="col__image__cp">
              <img src="../src/images/hww__1.png" alt="Image2"/>
            </Col>
          </Row>
        </Container>
      </div>
    </div >
  ) : (
    <Navigate to="/login" replace />
  );
}

export default Home;
