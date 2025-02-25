import React from "react";
import { useAuth } from "../context/AuthContext";
import context from "react-bootstrap/esm/AccordionContext";

const singInPage = () => {
  const [userName, setUserName] = React.useState("");
  const [userpass, setUserPass] = React.useState("");
  const [error, setError] = React.useState("");
  const { logIn } = useAuth();

  const hanldelogIn = async () => {
    try {
      await logIn(userName, userpass);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={userpass}
        onChange={(e) => setUserPass(e.target.value)}
      />
      <button onClick={hanldelogIn}>Login</button>
    </div>
  );
};
export default singInPage;
