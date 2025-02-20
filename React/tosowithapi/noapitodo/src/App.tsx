import { useEffect, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Post {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data: Post[] = await response.json();
        setPosts(data.slice(0, 15)); // Limit to 15
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const addPost = async () => {
    if (!newTitle.trim()) return;

    const newPost: Omit<Post, "id"> = {
      userId: 1,
      title: newTitle,
      completed: false,
    };

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        }
      );

      const data: Post = await response.json();
      setPosts((prevPosts) => [data, ...prevPosts]); // Update UI
      setNewTitle("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <Container fluid>
      <h1>Fake Posts App</h1>
      <br />
      <Row>
        <Col md={6}>
          <Accordion>
            {posts.map((post) => (
              <Accordion.Item eventKey={`${post.id}`} key={post.id}>
                <Accordion.Header>
                  Post {post.id}: {post.title}
                </Accordion.Header>
                <Accordion.Body>
                  <strong>Completed:</strong> {post.completed ? "✅" : "❌"}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>

        <Col md={6}>
          <h2>Add New Post</h2>
          <br />
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter a new post"
          />
          <button onClick={addPost}>Add Post</button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
