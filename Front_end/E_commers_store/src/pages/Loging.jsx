import React from 'react'
import { useState } from 'react';

const Loging = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    console.log("Logging in with:", formData);
    alert("Login successful!");
  };

  return (
    <div className="LoginPage">
      
        <h2 className="Login_title">Login</h2>

        {error && <p className="Login_error">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="Email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="inpute_Box"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="Password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="inpute_Box"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="button"
          >
            Login
          </button>
        </form>

        <p className="Register_link">
          Don’t have an account?{" "}
          <a href="/register" className="Register_link_1">
            Register
          </a>
        </p>
      </div>
 
  );
  
}

export default Loging