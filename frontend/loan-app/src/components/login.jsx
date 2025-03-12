import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link} from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/login', { username: email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login Successful!');
    } catch (err) {
      setError('Invalid credentials');
    }
  };
  function handleSignupClick(){
    const navigate = useNavigate();
    navigate('/signup');
  }

  return (
    

    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <div className="bg-white p-6 rounded-lg shadow-lg w-96">

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
            sign in
          </button>
        </form>
        <Link to = "/signup">
          <h3 className="m-2 text-blue-500 text-center underline  " onClick= {handleSignupClick} >sign up</h3>
        </Link>
      </div>
    </div>
  );
};

export default Login;
