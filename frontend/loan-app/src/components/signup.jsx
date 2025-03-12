import React, { useState } from 'react';
import axios from 'axios';


export default function Signup() {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [
        annualIncome,
        setAnnualIncome
    ] = useState('');
    const [
        loanAmount,
        setLoanAmount
    ] = useState('');
    const [
        loanDuration,
        setLoanDuration
    ] = useState('');
    const [
        loanType,
        setLoanType
    ] = useState('');
    const [
        occupation,
        setOccupation
    ] = useState('');
    const [
        companyName,
        setCompanyName
    ] = useState('');
    const [
        companyAddress,
        setCompanyAddress
    ] = useState('');
    const [
        companyPhone,
        setCompanyPhone
    ] = useState('');
    const [
        companyEmail,
        setCompanyEmail
    ] = useState('');
    const [
        companyWebsite,
        setCompanyWebsite
    ] = useState('');
    const [
        companyType,
        setCompanyType
    ] = useState('');
    const [
        companyAnnualIncome,
        setCompanyAnnualIncome
    ] = useState('');
    const [
        companyLoanAmount,
        setCompanyLoanAmount
    ] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/signup', {
                name,
                phone,
                address,
                dob,
                email,
                password,
                annualIncome,
                loanAmount,
                loanDuration,
                loanType,
                occupation,
                companyName,
                companyAddress,
                companyPhone,
                companyEmail,
                companyWebsite,
                companyType,
                companyAnnualIncome,
                companyLoanAmount
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
                            Phone   
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
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
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Annual Income
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={annualIncome}
                            onChange={(e) => setAnnualIncome(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Loan Amount
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Loan Duration
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={loanDuration}
                            onChange={(e) => setLoanDuration(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Loan Type
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={loanType}
                            onChange={(e) => setLoanType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Occupation
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Company Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Company Address
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={companyAddress}
                            onChange={(e) => setCompanyAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Company Phone
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={companyPhone}
                            onChange={(e) => setCompanyPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Company Email
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={companyEmail}
                            onChange={(e) => setCompanyEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Company Website
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={companyWebsite}
                            onChange={(e) => setCompanyWebsite(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Company Type
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={companyType}
                            onChange={(e) => setCompanyType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Company Annual Income
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={companyAnnualIncome}
                            onChange={(e) => setCompanyAnnualIncome(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Company Loan Amount
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={companyLoanAmount}
                            onChange={(e) => setCompanyLoanAmount(e.target.value)}
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

