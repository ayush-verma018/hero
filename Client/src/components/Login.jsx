import { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({
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
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("response", response);
      // const parseRes = await response.json();
      // console.log("parseRes", parseRes);
      // localStorage.setItem("token", parseRes.jwtToken);

      setAuth(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-xl flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form onSubmit={onSubmitForm} className="w-full">
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
            placeholder="email"
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
            placeholder="password"
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
          Login
        </button>
      </form>
      <div className="mt-4 text-gray-600 text-sm">
        <p>
          Create new Account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            SignUp here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
