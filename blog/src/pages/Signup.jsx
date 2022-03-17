import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./Signup.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    let navigate = useNavigate();

    const handleSignup= (e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/users/register', {email,password})
        .then(res => {console.log(res.data)
        navigate("/");})
        .catch(err => console.log(err))
    }

    return (
        <Container>
            <Row>
                <Col md={7} className="d-flex align-items-center justify-content-center">
                    <Form className='signup__form' onSubmit={handleSignup}>
                    <h1 className='text-center'> Create Account</h1>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e) => setemail(e.target.value)}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} required onChange={(e) => setpassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create Account
                        </Button>
                        <div className="py-4">
                            <p className='text-center'>Already have an  account? <Link to="/Login">Login</Link></p></div>
                    </Form>
                </Col>
                <Col md={5} className="signup__bg--container">
                </Col>
            </Row>
        </Container>
    )
}

export default Signup