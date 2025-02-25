import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomNavbar: React.FC = () => {
  const { state, logOut } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand href="#" className="fw-bold text-white">
          🛍️ <strong>E-Commerce Site</strong> | Welcome,{" "}
          <span className="text-warning"> {state.user?.userName} 🎉</span>
        </Navbar.Brand>

        {/* Search Form */}
        <Form
          className="d-flex mx-auto"
          style={{ width: "40%" }}
          onSubmit={handleSearch}
        >
          <FormControl
            type="search"
            placeholder="Search for products, brands and more"
            className="me-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="light" type="submit">
            Search
          </Button>
        </Form>

        <Nav>
          <Button
            variant="outline-light"
            className="me-2"
            onClick={() => navigate("/cartPage")}
          >
            Cart 🛒
          </Button>
          <Button
            variant="outline-light"
            className="me-2"
            onClick={() => navigate("/adminDashBoard")}
          >
            Home
          </Button>
          <Button variant="light" onClick={logOut}>
            Log Out
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
