// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "./Auth.css";

// const Register = () => {
//   const BASE_URL = "http://localhost:4000";

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [serverError, setServerError] = useState("");

//   const [isSuccess, setIsSuccess] = useState(false);

//   const navigate = useNavigate();

//   // Handler for input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

   
//     if (name === "email" && serverError) {
//       setServerError("");
//     }

//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   // Handler for form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSuccess(false); // reset success if any

//     try {
//       const response = await fetch(`${BASE_URL}/user/register`, {
//         method: "POST",
//         body: JSON.stringify(formData),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await response.json();

//       if (data.error) {
//         // Show error below the email field (e.g., "Email already exists")
//         setServerError(data.error);
//       } else {
//         // Registration success
//         setIsSuccess(true);
//         setTimeout(() => {
//           navigate("/");
//         }, 2000);
//       }
//     } catch (error) {
//       // In case fetch fails
//       console.error("Error:", error);
//       setServerError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="heading">Register</h2>
//       <form className="form" onSubmit={handleSubmit}>
//         {/* Name */}
//         <div className="form-group">
//           <label htmlFor="name" className="label">
//             Name
//           </label>
//           <input
//             className="input"
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter your name"
//             required
//           />
//         </div>

//         {/* Email */}
//         <div className="form-group">
//           <label htmlFor="email" className="label">
//             Email
//           </label>
//           <input
//             // If there's a serverError, add an extra class to highlight border
//             className={`input ${serverError ? "input-error" : ""}`}
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             required
//           />
//           {/* Absolutely-positioned error message below email field */}
//           {serverError && <span className="error-msg">{serverError}</span>}
//         </div>

//         {/* Password */}
//         <div className="form-group">
//           <label htmlFor="password" className="label">
//             Password
//           </label>
//           <input
//             className="input"
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className={`submit-button ${isSuccess ? "success" : ""}`}
//         >
//           {isSuccess ? "Registration Successful" : "Register"}
//         </button>
//       </form>

//       {/* Link to the login page */}
//       <p className="link-text">
//         Already have an account? <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const BASE_URL = "http://localhost:4000";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email" && serverError) {
      setServerError("");
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.error) {
        setServerError(data.error);
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-heading">Create Your Account</h2>
          <p className="auth-subheading">Join us today!</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              className="form-input"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              className={`form-input ${serverError ? "input-error" : ""}`}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            {serverError && (
              <div className="error-message animate-shake">{serverError}</div>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
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
          </div>

          <button
            type="submit"
            className={`submit-btn ${isSuccess ? "success" : ""} ${
              isSubmitting ? "submitting" : ""
            }`}
            disabled={isSubmitting || isSuccess}
          >
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : isSuccess ? (
              <>
                <span className="success-icon">✓</span> Registration Successful
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-link-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;