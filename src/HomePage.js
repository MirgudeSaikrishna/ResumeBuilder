import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f8ff",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    fontSize: "3rem",
    color: "#007BFF",
    marginBottom: "20px",
  };

  const paragraphStyle = {
    fontSize: "1.2rem",
    color: "#555",
    maxWidth: "600px",
    marginBottom: "30px",
  };

  const buttonStyle = {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "15px 30px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to the Resume Builder</h1>
      <p style={paragraphStyle}>
        Create a professional resume quickly and easily with our intuitive
        resume builder. Add your skills, experience, and personal information,
        and download your resume in PDF format!
        |Feedbacks are welcomed|
      </p>
      <button onClick={() => navigate("/resume-builder")} style={buttonStyle}>
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
