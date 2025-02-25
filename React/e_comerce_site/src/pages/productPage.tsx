import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

const fetchProduct = async (id: string | undefined) => {
  if (!id) throw new Error("Invalid product ID");
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data;
};

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["product", id], queryFn: () => fetchProduct(id) });

  if (isLoading) return <h1 className="text-center my-5">Loading...</h1>;
  if (isError)
    return (
      <h1 className="text-center my-5 text-danger">
        Error fetching product details
      </h1>
    );

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4">
            <Row>
              {/* Left Side - Product Image */}
              <Col md={5} className="text-center">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                  className="img-fluid p-3"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
              </Col>

              {/* Right Side - Product Info */}
              <Col md={7}>
                <Card.Body>
                  <Card.Title className="fw-bold text-primary fs-3">
                    {product.title}
                  </Card.Title>
                  <Card.Subtitle className="text-muted mb-3">
                    {product.category.toUpperCase()}
                  </Card.Subtitle>
                  <Card.Text className="fs-5 text-success fw-bold">
                    💲 {product.price.toFixed(2)}
                  </Card.Text>
                  <Card.Text className="text-muted">
                    {product.description}
                  </Card.Text>
                  <Card.Text className="fw-bold">
                    ⭐ {product.rating?.rate} / 5 ({product.rating?.count}{" "}
                    Reviews)
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
