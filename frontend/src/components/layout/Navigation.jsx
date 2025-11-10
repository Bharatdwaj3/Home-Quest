import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
const Navigation = () => {

     const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    try {
      const raw = localStorage.getItem("user");
      user = raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error("Corrupted user in localStorage", e);
      localStorage.removeItem("user");
    }
  }


  return (
    <>
       <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">HomeQuest</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/rooms">Rooms</Nav.Link>
            <Nav.Link href="/map">Map</Nav.Link>
          </Nav>
          <Nav>
  {token ? (
    // LOGGED IN: SHOW AVATAR + DROPDOWN LOGOUT
    <NavDropdown
      title={
        <div className="d-inline-flex align-items-center gap-2">
          <img
            src={user?.avatarUrl || "./download.jpg"}
            alt={user?.fullName || "User"}
            className="rounded-circle"
            style={{ width: 32, height: 32, objectFit: "cover" }}
          />
          <span className="d-none d-lg-inline fw-medium">
            {user?.fullName || "User"}
          </span>
        </div>
      }
      align="end"
    >
      <NavDropdown.Item
                  href={user?.accountType === 'owner' ? '/owner-dashboard' : '/tenant-dashboard'}
                >
                  My Profile
                </NavDropdown.Item>
      <NavDropdown.Item
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("userRole");
          window.location.href = "/login"; // redirect
        }}
      >
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  ) : (
    // NOT LOGGED IN
    <>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/signUp">SignIn</Nav.Link>
    </>
  )}
</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Navigation;
