import { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Register = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const parseRes = await response.json();
      console.log("parseRes", parseRes);

      localStorage.setItem("token", parseRes.jwtToken);
      setAuth(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-6">Signup</h2>
      <form onSubmit={onSubmitForm} className="w-full">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-600 text-sm font-medium"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="mt-1 p-2 w-full border rounded-md"
            value={formData?.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-600 text-sm font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="mt-1 p-2 w-full border rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-600 text-sm font-medium"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="mt-1 p-2 w-full border rounded-md"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"
        >
          Signup
        </button>
      </form>
      <div className="mt-4 text-gray-600 text-sm">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
