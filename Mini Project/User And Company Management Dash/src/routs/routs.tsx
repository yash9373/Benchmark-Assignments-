import { Routes, Route } from "react-router-dom";
import SignInPage from "../pages/signInPage";
import Layout from "@/pages/layout";
import DashBoard from "@/pages/dashBoard";
import Home from "@/pages/home";
import User from "@/pages/user";
import Companies from "@/pages/companies";
import Posts from "@/pages/posts";
import AddCompanies from "@/componets/addComp";
import AddPost from "@/componets/addPost";
import AddUser from "@/componets/addUser";
function Routs() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<DashBoard />} />{" "}
        <Route path="/dashboard" element={<DashBoard />} />{" "}
        <Route path="/user" element={<User />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/addComp" element={<AddCompanies />} />
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/addUser" element={<AddUser />} />
      </Route>
    </Routes>
  );
}

export default Routs;
