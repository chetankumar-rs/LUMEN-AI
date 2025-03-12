import React, { useState } from 'react';
import axios from 'axios';


export default function Signup() {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/signup', {
                name,
                email,
                password,
                
            });
            alert('Signup Successful!');
        } catch (err) {
            setError('Invalid credentials');
        }
    }
     

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="submit">
                        sign up
                    </button>
                </form>
            </div>
        </div>
    );
}

