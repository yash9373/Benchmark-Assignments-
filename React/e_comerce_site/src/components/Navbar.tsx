import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProductButton from "./AddProductButton";
import { ProductProvider } from "../context/productContext";

const CustomNavbar: React.FC = () => {
  const { state, logOut } = useAuth();

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand href="#" className="fw-bold text-white">
          🛍️ <strong>E-Commerce Site</strong> | Welcome,{" "}
          <span className="text-warning"> {state.user?.userName} 🎉</span>
        </Navbar.Brand>

        <Form className="d-flex mx-auto" style={{ width: "40%" }}>
          <FormControl
            type="search"
            placeholder="Search for products, brands and more"
            className="me-2"
          />
          <Button variant="light">Search</Button>
        </Form>

        <Nav>
          {/* <Button variant="light" className="me-2">
            Login
          </Button> */}
          <ProductProvider>
            <AddProductButton />
          </ProductProvider>

          {"           |   |"}
          <Button variant="outline-light" className="me-2">
            Cart 🛒
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
