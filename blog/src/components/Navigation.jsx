import React from 'react'
import {Nav, NavDropdown, Navbar, Container} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import {LinkContainer} from "react-router-bootstrap"
import logo from "../images/logo.png"
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch()
  let navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.setItem('data', null);
    dispatch({ type: 'DELETE_LOGIN_DATA'})
    navigate("/");
  }

return (
<Navbar bg="danger" expand="lg">
  <Container>
    <LinkContainer to='/'>
      <Navbar.Brand><img src={logo} style={{width:60}} alt='' /></Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <LinkContainer to="/">
          <Nav.Link className="text-white">Home</Nav.Link>
        </LinkContainer>
        <NavDropdown title="category" style={{color: "white"}}>
          <NavDropdown.Item>
            <LinkContainer to="/economy">
              <Nav.Link>Economy</Nav.Link>
            </LinkContainer>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <LinkContainer to="/sports">
              <Nav.Link>Sports</Nav.Link>
            </LinkContainer>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <LinkContainer to="/politics">
              <Nav.Link>Politics</Nav.Link>
            </LinkContainer>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <LinkContainer to="/movies">
              <Nav.Link>Movies</Nav.Link>
            </LinkContainer>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <LinkContainer to="/history">
              <Nav.Link>History</Nav.Link>
            </LinkContainer>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <LinkContainer to="/science">
              <Nav.Link>Science</Nav.Link>
            </LinkContainer>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <LinkContainer to="/others">
              <Nav.Link>Others</Nav.Link>
            </LinkContainer>
          </NavDropdown.Item>
        </NavDropdown>
        {!user.isLoggedIn && <LinkContainer to="/login">
          <Nav.Link className='bttn btn-primary text-white'>Login</Nav.Link>
        </LinkContainer>}
        {user.isLoggedIn && <NavDropdown title={user.email} style={{color: "white"}}>
          <NavDropdown.Item>
            <LinkContainer to="/blogForm">
              <Nav.Link>Post New Blog</Nav.Link>
            </LinkContainer>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <LinkContainer to="/oldblog">
              <Nav.Link>Old Blog</Nav.Link>
            </LinkContainer>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>
            <LinkContainer to="/">
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </LinkContainer>
          </NavDropdown.Item>
        </NavDropdown>}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
)
}

export default Navigation