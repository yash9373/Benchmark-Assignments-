import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useProduct } from "../context/productContext";

const Products: React.FC = () => {
  const { products, deleteProduct } = useProduct();

  return (
    <Container className="mt-4">
      <Row>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
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
                    variant="danger"
                    onClick={() => deleteProduct(product.id)}
                  >
                    🗑 Delete
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
