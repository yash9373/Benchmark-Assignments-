import { Routes, Route } from "react-router-dom";
import SignInPage from "../pages/signInPage";
import Layout from "@/pages/layout";
import DashBoard from "@/pages/dashBoard";
import Home from "@/pages/home";
import User from "@/pages/user";
import Companies from "@/pages/companies";
import Posts from "@/pages/posts";
function Routs() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<DashBoard />} />{" "}
        <Route path="/dashboard" element={<DashBoard />} />{" "}
        <Route path="/user" element={<User />} />
        <Route path="/Componies" element={<Companies />} />
        <Route path="/posts" element={<Posts />} />
      </Route>
    </Routes>
  );
}

export default Routs;
