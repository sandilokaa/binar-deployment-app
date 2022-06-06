import { useRef, useState, useEffect } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Update() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [ data, setData ] = useState([]);

    const titleField = useRef("");
    const descriptionField = useRef("");
    const [pictureField, setPictureField] = useState();

    const [errorResponse, setErrorResponse] = useState({
        isError: false,
        message: "",
    });

    const onUpdate = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");
            
            const userToUpdatePayload = new FormData();

            userToUpdatePayload.append("title", titleField.current.value);
            userToUpdatePayload.append("description", descriptionField.current.value);
            userToUpdatePayload.append("picture", pictureField);


            const updateRequest = await axios.put(
                `http://localhost:2000/post/update/${id}`,
                userToUpdatePayload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    },
                }
            );

            const updateResponse = updateRequest.data;

            if(updateResponse.status) navigate("/");
        } catch (err) {
            console.log(err);
            const response = err.response.data;

            setErrorResponse({
                isError: true,
                message: response.message,
            });
        }
    };
    
    const getPostById = async () => {
        try {

            const responsePosts = await axios.get(`http://localhost:2000/post/${id}`);

            const postData = await responsePosts.data.data.getdata;

            setData(postData);
            console.log(postData);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPostById();
    }, []);

    return (
        <Container className="my-5">
            <h1 className="mb-3">Edit Data</h1>
            <Form onSubmit={onUpdate}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        ref={titleField}
                        defaultValue={data.title}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        ref={descriptionField}
                        defaultValue={data.description}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => setPictureField(e.target.files[0])}
                    />
                </Form.Group>

                {errorResponse.isError && (
                    <Alert variant="danger">{errorResponse.message}</Alert>
                )}

                <Button className="w-100" type="submit">
                    Edit
                </Button>

                <Link to="/">
                    <Button className="w-100 mt-2" variant="danger">
                        Kembali
                    </Button>
                </Link>
            </Form>
        </Container>
    );
}