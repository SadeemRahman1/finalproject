import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdmin } from "../Services/admin";

const AdminSignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const adminUser = await getAdmin();
      const matchedAdmin = adminUser.find(
        (admin) =>
          admin.email === formData.email &&
          admin.password === formData.password
      );
      if (matchedAdmin) {
        localStorage.setItem("admin", JSON.stringify(matchedAdmin));
        setFormData({
          email: "",
          password: "",
        })
        setErrors({});
        navigate("/admindashboard");
      } else {
        setErrors({ general: "Invalid email or password" });
      }
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again later." });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-50"
      style={{
        backgroundImage: `url(/src/assets/background_image.png)`, // Adjust path as needed
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Slight overlay for transparency
      }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl divide-y divide-neutral-200">
        <div className="text-center pb-6">
          <img
            src="src/assets/NCBA&E.png"
            alt="NCBA&E Logo"
            className="mx-auto h-20 w-20" // Fixed size
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            Sign In to NCBA&E
          </h2>
        </div>
        <form id="signupForm" className="w-full pt-6" onSubmit={handleSubmit}>
          {errors.general && (
            <p className="text-red-500 text-xs mb-4">{errors.general}</p>
          )}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end items-center">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignIn;
