import React, { useState } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const SignInPage = () => {
  const [error, setError] = useState("");
  const { logIn } = useAuth();
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const handleLogIn = async () => {
    try {
      await logIn(userName, userPass);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <Card.Body>
          <h2 className="text-center">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={userPass}
                onChange={(e) => setUserPass(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="w-100" onClick={handleLogIn}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignInPage;
