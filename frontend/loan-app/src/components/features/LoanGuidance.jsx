import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const InputField = ({ label, name, value, onChange, ...rest }) => (
    <div>
        <label className="block text-gray-700 font-semibold mb-1">{label}</label>
        <input type="number" name={name} value={value} onChange={onChange} className="w-full p-2 border rounded" {...rest} />
    </div>
);

const SelectField = ({ label, name, value, onChange }) => (
    <div>
        <label className="block text-gray-700 font-semibold mb-1">{label}</label>
        <select name={name} value={value} onChange={onChange} className="w-full p-2 border rounded">
            <option value="">Select</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Car Loan">Car Loan</option>
            <option value="Personal Loan">Personal Loan</option>
        </select>
    </div>
);

const Button = ({ onClick, text, color }) => (
    <button onClick={onClick} className={`bg-${color}-500 text-white p-2 rounded w-full`}>{text}</button>
);

const AlertBox = ({ message }) => (
    <div className="mt-4 p-3 bg-gray-100 border-l-4 border-gray-600 text-gray-800 rounded">
        {message}
    </div>
);

// 🔹 AI Response Formatting Component
const AIResponseBox = ({ response }) => {
    if (!response) return null;

    const formattedResponse = response.split("**").map((item, index, arr) => {
        if (index % 2 === 1) {
            return (
                <li key={index}>
                    <strong>{item}:</strong> {arr[index + 1]}
                </li>
            );
        }
        return null;
    }).filter(Boolean);

    return (
        <div className="mt-4 p-3 bg-gray-100 border-l-4 border-gray-600 text-gray-800 rounded">
            <ul className="list-disc pl-4">{formattedResponse}</ul>
        </div>
    );
};




const LoanGuidance = () => {
    const [userInput, setUserInput] = useState({
        income: '',
        creditScore: '',
        loanAmount: '',
        loanPurpose: ''
    });
    const [messages, setMessages] = useState([]);
    const[loading,setLoading]=useState(true);
    const [recommendation, setRecommendation] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setUserInput({ income: '', creditScore: '', loanAmount: '', loanPurpose: '' });
        setRecommendation('');
        setError('');
    };
     
    const generateAIResponse = async () => {
        setLoading(true);
        const API_KEY = "AIzaSyCa9EL6KJcV1LK7RA6hRKdnvGSt_CxK-Mo";
        const genAI = new GoogleGenerativeAI(API_KEY);

        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const result = await model.generateContent([`Loan details: ${JSON.stringify(userInput)}`]);
    
            const responseText = result?.response?.text() || "AI did not return a response.";
            console.log(responseText);
    
            // 🔹 Format AI Response into Points
            const formattedResponse = responseText.split("**").map((item, index, arr) => {
                if (index % 2 === 1) {
                    return `<strong>${item}:</strong> ${arr[index + 1]}`;
                }
                return null;
            }).filter(Boolean).join("<br/>");
    
            setMessages(prev => [...prev, { role: 'assistant', content: formattedResponse }]);
            setRecommendation(responseText);  // Store in LoanGuidance
        } catch (error) {
            console.error('AI Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ Error fetching AI response. Please check your API key and network connection." }]);
        }
        setLoading(false);
    };
   


    return (
        <div>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">AI Loan Guidance System</h2>
                {error && <p className="text-red-600 font-semibold text-center">{error}</p>}
                <div className="space-y-4">
                    <InputField label="Monthly Income ($)" name="income" value={userInput.income} onChange={handleInputChange} min="0" />
                    <InputField label="Credit Score (300-850)" name="creditScore" value={userInput.creditScore} onChange={handleInputChange} min="300" max="850" />
                    <InputField label="Desired Loan Amount ($)" name="loanAmount" value={userInput.loanAmount} onChange={handleInputChange} min="0" />
                    <SelectField label="Loan Purpose" name="loanPurpose" value={userInput.loanPurpose} onChange={handleInputChange} />
                </div>
                <div className="flex justify-between gap-4 mt-6">
                    <Button onClick={generateAIResponse} text="Get Loan Guidance" color="blue" />
                    <Button onClick={resetForm} text="Reset" color="green" />
                </div>
                <AIResponseBox response={recommendation} />
            </div>
            <ChatBot userInput={userInput} setRecommendation={setRecommendation} />
        </div>
    );
};

const ChatBot = ({ userInput, setRecommendation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_KEY = "AIzaSyCa9EL6KJcV1LK7RA6hRKdnvGSt_CxK-Mo";
    const genAI = new GoogleGenerativeAI(API_KEY);

    const generateAIResponse = async () => {
        setLoading(true);
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const result = await model.generateContent([`Loan details: ${JSON.stringify(userInput)}`]);

            const responseText = result?.response?.text() || "AI did not return a response.";
            console.log(responseText);

            // 🔹 Format AI Response into Points
            const formattedResponse = responseText.split("**").map((item, index, arr) => {
                if (index % 2 === 1) {
                    return `<strong>${item}:</strong> ${arr[index + 1]}`;
                }
                return null;
            }).filter(Boolean).join("<br/>");

            setMessages(prev => [...prev, { role: 'assistant', content: formattedResponse }]);
            setRecommendation(responseText);  // Store in LoanGuidance
        } catch (error) {
            console.error('AI Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ Error fetching AI response. Please check your API key and network connection." }]);
        }
        setLoading(false);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-700">💬</button>
            {isOpen && (
                <div className="bg-white p-4 shadow-lg rounded-md w-120 absolute bottom-12 right-0">
                    <div className="h-40 overflow-y-auto border p-2 rounded bg-gray-100">
                        {messages.map((msg, index) => (
                            <p key={index} className={`p-2 rounded ${msg.role === 'assistant' ? 'bg-blue-200' : 'bg-gray-200'}`} dangerouslySetInnerHTML={{ __html: msg.content }}></p>
                        ))}
                    </div>
                    <button onClick={generateAIResponse} className="bg-green-500 text-white p-2 rounded mt-2 w-full disabled:opacity-50" disabled={loading}>{loading ? "Fetching..." : "Ask AI"}</button>
                </div>
            )}
        </div>
    );
};

export default LoanGuidance;
