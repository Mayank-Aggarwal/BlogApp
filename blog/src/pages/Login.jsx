import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./Login.css"
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleLogin = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/users/login', {email,password})
        .then(({data}) => {
            localStorage.setItem('data', JSON.stringify(data) );
            dispatch({ type: 'UPDATE_LOGIN_DATA', payload: data });
            navigate("/");
        })
        .catch(err => alert(err.message))
    }

    return (
        <Container>
            <Row>
                <Col md={7} className="d-flex align-items-center justify-content-center">
                    <Form className='login__form' onSubmit={handleLogin}>
                    <h1 className='text-center'> Login</h1>
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
                            Login
                        </Button>
                        <div className="py-4">
                            <p className='text-center'>Don't have an  account? <Link to="/Signup">Create Account</Link></p></div>
                    </Form>
                </Col>
                <Col md={5} className="login__bg--container">
                </Col>
            </Row>
        </Container>
    )
}

export default Login