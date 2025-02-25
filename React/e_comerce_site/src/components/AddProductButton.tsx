import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useProduct } from "../context/productContext";

interface Product {
  title: string;
  description: string;
  price: number;
  id: number;
  image: string;
  category: string;
}

const AddProductButton: React.FC = () => {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");

  const productContext = useProduct(); // Ensure context is used inside the component

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      title: productName,
      description: productDescription,
      price: parseFloat(price),
      id: Math.random(),
      image: "'https://i.pravatar.cc",
      category: "electronic",
    };
    //console.log(newProduct);
    productContext.addProduct(newProduct);
    handleClose();

    // Clear form fields after submission
    setProductName("");
    setProductDescription("");
    setPrice("");
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" type="submit" onClick={handleSubmit}>
                ✅ Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProductButton;
