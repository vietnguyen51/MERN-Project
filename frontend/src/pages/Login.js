import React, { useContext, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate()
  const { fetchUserDetails} = useContext(Context)

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gọi API để xử lý đăng nhập
    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const dataApi = await dataResponse.json();

    console.log("data login", data); // Giữ lại log của dữ liệu đăng nhập

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/'); // Điều hướng về trang chủ sau khi đăng nhập thành công
      fetchUserDetails()
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  // Hàm chuyển đổi hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-black">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              name='email'
              value={data.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-black rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              value={data.password}
              onChange={handleOnChange}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-black rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
              required
            />
            {/* Biểu tượng con mắt để bật/tắt mật khẩu */}
            <div
              className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} className="text-black" /> : <Eye size={20} className="text-black" />}
            </div>
          </div>

          {/* Forgot password link */}
          <div className="mb-4 flex justify-between items-center">
            <Link to="/forgot-password" className="text-sm text-black hover:underline">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-800"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-black">
            Don't have an account? <Link to="/sign-up" className="text-black hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
