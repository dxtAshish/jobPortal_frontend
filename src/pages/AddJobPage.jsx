import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function AddJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    type: "",
    location: "",
    description: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.company.trim()) newErrors.company = "Company is required.";
    if (!formData.type) newErrors.type = "Job type is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.description.trim() || formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    navigate("/");
  };

  return (
    <div className="form-container">
      <h1>Add New Job</h1>
      <form className="job-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error">{errors.title}</p>}

        <input
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
        />
        {errors.company && <p className="error">{errors.company}</p>}

        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
        {errors.type && <p className="error">{errors.type}</p>}

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && <p className="error">{errors.location}</p>}

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}
