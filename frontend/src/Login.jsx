// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "./Auth.css";

// const Login = () => {
//   const BASE_URL = "http://localhost:4000";

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [serverError, setServerError] = useState("");

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (serverError) {
//       setServerError("");
//     }

//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: "POST",
//         body: JSON.stringify(formData),
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });

//       const data = await response.json();
//       if (data.error) {
//         // If there's an error, set the serverError message
//         setServerError(data.error);
//       } else {
//         // On success, navigate to home or any other protected route
//         navigate("/storage");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setServerError("Something went wrong. Please try again.");
//     }
//   };

//   // If there's an error, we'll add "input-error" class to both fields
//   const hasError = Boolean(serverError);

//   return (
//     <div className="container">
//       <h2 className="heading">Login</h2>
//       <form className="form" onSubmit={handleSubmit}>
//         {/* Email */}
//         <div className="form-group">
//           <label htmlFor="email" className="label">
//             Email
//           </label>
//           <input
//             className={`input ${hasError ? "input-error" : ""}`}
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             required
//           />
//         </div>

//         {/* Password */}
//         <div className="form-group">
//           <label htmlFor="password" className="label">
//             Password
//           </label>
//           <input
//             className={`input ${hasError ? "input-error" : ""}`}
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//             required
//           />
//           {/* Absolutely-positioned error message below password field */}
//           {serverError && <span className="error-msg">{serverError}</span>}
//         </div>

//         <button type="submit" className="submit-button">
//           Login
//         </button>
//       </form>

//       {/* Link to the register page */}
//       <p className="link-text">
//         Don't have an account? <Link to="/register">Register</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const BASE_URL = "http://localhost:4000";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (serverError) {
      setServerError("");
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (data.error) {
        setServerError(data.error);
      } else {
        navigate("/storage");
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasError = Boolean(serverError);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-heading">Welcome Back</h2>
          <p className="auth-subheading">Sign in to continue to your account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Email */}
          <div className={`form-group ${hasError ? "has-error" : ""}`}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              className="form-input"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className={`form-group ${hasError ? "has-error" : ""}`}>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            {serverError && (
              <span className="error-message">{serverError}</span>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? <span className="button-loader"></span> : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-link-text">
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;