import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate(); 

  // Cập nhật dữ liệu từ các input
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Kiểm tra form trước khi gửi
  const validateForm = () => {
    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      toast.error("All fields are required!");
      return false;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }

    return true;
  };

  // Xử lý khi người dùng nhấn đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Dừng nếu form không hợp lệ

    try {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const dataApi = await dataResponse.json();
      console.log(dataApi); // Xem phản hồi API trong console để debug

      if (dataApi.success) {
        toast.success(dataApi.message || "Sign up successful!");
        navigate("/login");
      } else {
        throw new Error(dataApi.message || "Failed to sign up.");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred during sign up.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-black">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              placeholder="Enter your name"
              className="mt-1 block w-full px-4 py-2 border border-black rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-black rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleOnChange}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-black rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} className="text-black" /> : <Eye size={20} className="text-black" />}
            </div>
          </div>

          <div className="mb-6 relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm your password"
              className="mt-1 block w-full px-4 py-2 border border-black rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <EyeOff size={20} className="text-black" /> : <Eye size={20} className="text-black" />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-800"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-black">
            Already have an account? <Link to="/login" className="text-black hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
