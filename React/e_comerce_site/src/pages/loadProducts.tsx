import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const AuthContext = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search")?.toLowerCase() || "";

    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [location.search, products]);

  const addProduct = async (
    title: string,
    description: string,
    price: string
  ) => {
    try {
      const newProduct = {
        title,
        description,
        price: parseFloat(price),
        id: Math.random(),
        image: "https://i.pravatar.cc",
        category: "electronic",
      };

      await axios.post("https://fakestoreapi.com/products", newProduct);
      setProducts((prev) => [...prev, newProduct]);
      setFilteredProducts((prev) => [...prev, newProduct]);
      handleClose();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setFilteredProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="mt-4">
      {AuthContext.state.user?.role === "admin" && (
        <Button variant="success" className="mb-3" onClick={handleShow}>
          ✚ Add Product
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addProduct(productName, productDescription, price);
            }}
          >
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
              <Button variant="success" type="submit">
                ✅ Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Row>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    {product.description.substring(0, 50)}...
                  </Card.Text>
                  <h5>💰 ${product.price}</h5>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/productPage/${product.id}`)}
                  >
                    View
                  </Button>{" "}
                  {AuthContext.state.user?.role === "admin" && (
                    <Button
                      variant="danger"
                      onClick={() => deleteProduct(product.id)}
                    >
                      ⚔ Delete
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    onClick={() => AuthContext.addToCart(product)}
                  >
                    🛒 Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Products;
