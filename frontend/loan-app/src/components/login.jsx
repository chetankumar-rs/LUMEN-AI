import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";  
import { Toaster } from "react-hot-toast";  

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
 const [tog,setTog]=useState(true);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login Successful!"); // 🎉 Show success message
        setTog(false)
      setTimeout(() => {
        navigate('/'); // Redirect after a short delay
      }, 1500);
      
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
      toast.error("Invalid credentials"); // ❌ Show error message
    }
  };

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} /> {/* Add Toaster Component */}
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border rounded" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
         <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="submit">
          Login
        </button>
        </form>
      </div>
    </div>
  );
}
