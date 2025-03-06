import React from "react";
import SignInForm from "../componets/signInForm"; // Corrected the typo in import

export default function SignInPage() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #010C18, #411E08)", // Corrected syntax
        minHeight: "100vh", // Ensures full page height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SignInForm />
    </div>
  );
}
