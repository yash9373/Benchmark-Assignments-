import React, { useState } from "react";
import "./App.css";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  gender: string;
  subject: string;
  resume: File | null;
  imageUrl: string;
  about: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    gender: "",
    subject: "",
    resume: null,
    imageUrl: "",
    about: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const key in formData) {
      if (key !== "resume" && !formData[key as keyof FormData]) {
        alert("All fields are mandatory!");
        return;
      }
    }

    const { resume, ...dataToShow } = formData;
    alert(
      `Form Submitted Successfully!\n\n${JSON.stringify(dataToShow, null, 2)}`
    );
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      gender: "",
      subject: "",
      resume: null,
      imageUrl: "",
      about: "",
    });
  };

  return (
    <div className="form-container">
      <h2>React Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Contact Number:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
            required
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
            required
          />{" "}
          Female
        </div>

        <div className="form-field">
          <label>Subject:</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Select a subject</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </div>

        <div className="form-field">
          <label>Upload Resume:</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>About Yourself:</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
