import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const InputField = ({ label, name, value, onChange, ...rest }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">{label}</label>
        <input
            id={name}
            type="number"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            {...rest}
        />
    </div>
);

const SelectField = ({ label, name, value, onChange }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">{label}</label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
        >
            <option value="">Select a loan type</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Car Loan">Car Loan</option>
            <option value="Personal Loan">Personal Loan</option>
        </select>
    </div>
);

const Button = ({ onClick, text, color, disabled = false }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-${color}-600 hover:bg-${color}-700 text-white py-3 px-6 rounded-lg font-medium transition-colors w-full flex items-center justify-center ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {text}
    </button>
);

const AIResponseBox = ({ response, loading }) => {
    if (loading) {
        return (
            <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-lg animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
        );
    }
    
    if (!response) return null;

    return (
        <div className="mt-6 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Loan Analysis Results</h3>
            <p className="text-gray-700 whitespace-pre-line">{response}</p>
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
    const [loading, setLoading] = useState(false);
    const [recommendation, setRecommendation] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const resetForm = () => {
        setUserInput({ income: '', creditScore: '', loanAmount: '', loanPurpose: '' });
        setRecommendation('');
        setError('');
    };
     
    const validateForm = () => {
        if (!userInput.income || !userInput.creditScore || !userInput.loanAmount || !userInput.loanPurpose) {
            setError('Please fill in all fields to get loan guidance');
            return false;
        }
        
        if (userInput.creditScore < 300 || userInput.creditScore > 850) {
            setError('Credit score must be between 300 and 850');
            return false;
        }
        
        return true;
    };
    
    const generateAIResponse = async () => {
        if (!validateForm()) return;
        
        setLoading(true);
        const API_KEY = "AIzaSyCa9EL6KJcV1LK7RA6hRKdnvGSt_CxK-Mo";
        const genAI = new GoogleGenerativeAI(API_KEY);

        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const result = await model.generateContent([`Loan details: ${JSON.stringify(userInput)}`]);
    
            const responseText = result?.response?.text() || "AI did not return a response.";
            setRecommendation(responseText);
        } catch (error) {
            console.error('AI Error:', error);
            setError('Unable to get AI guidance at this time. Please try again later.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="max-w-md w-full bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="bg-blue-700 p-6">
                    <h2 className="text-2xl font-bold text-white text-center">AI Loan Guidance System</h2>
                    <p className="text-blue-100 text-center mt-1">Get personalized loan recommendations</p>
                </div>
                
                <div className="p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                            <p className="font-medium">⚠️ {error}</p>
                        </div>
                    )}
                    
                    <InputField 
                        label="Monthly Income ($)" 
                        name="income" 
                        value={userInput.income} 
                        onChange={handleInputChange} 
                        min="0" 
                        placeholder="e.g. 5000"
                    />
                    
                    <InputField 
                        label="Credit Score (300-850)" 
                        name="creditScore" 
                        value={userInput.creditScore} 
                        onChange={handleInputChange} 
                        min="300" 
                        max="850" 
                        placeholder="e.g. 720"
                    />
                    
                    <InputField 
                        label="Desired Loan Amount ($)" 
                        name="loanAmount" 
                        value={userInput.loanAmount} 
                        onChange={handleInputChange} 
                        min="0" 
                        placeholder="e.g. 25000"
                    />
                    
                    <SelectField 
                        label="Loan Purpose" 
                        name="loanPurpose" 
                        value={userInput.loanPurpose} 
                        onChange={handleInputChange} 
                    />
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <Button 
                            onClick={generateAIResponse} 
                            text={loading ? "Processing..." : "Get Guidance"} 
                            color="blue" 
                            disabled={loading}
                        />
                        <Button 
                            onClick={resetForm} 
                            text="Reset Form" 
                            color="gray" 
                            disabled={loading}
                        />
                    </div>
                    
                    <AIResponseBox response={recommendation} loading={loading} />
                </div>
            </div>
            
            <ChatBotWidget userInput={userInput} setRecommendation={setRecommendation} />
        </div>
    );
};

const ChatBotWidget = ({ userInput, setRecommendation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi there! Need help with your loan application? I can answer your questions.' }
    ]);
    const [loading, setLoading] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const messagesEndRef = React.useRef(null);

    const API_KEY = "AIzaSyCa9EL6KJcV1LK7RA6hRKdnvGSt_CxK-Mo";
    const genAI = new GoogleGenerativeAI(API_KEY);

    React.useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!userMessage.trim()) return;
        
        // Add user message to chat
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        const sentMessage = userMessage;
        setUserMessage('');
        setLoading(true);
        
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            // Include both the user's question and their loan details for context
            const result = await model.generateContent([
                `User question: ${sentMessage}`,
                `User loan details: ${JSON.stringify(userInput)}`
            ]);

            const responseText = result?.response?.text() || "I'm sorry, I couldn't generate a response. Please try again.";
            
            setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
            
            // Update the main recommendation if this is a guidance request
            if (sentMessage.toLowerCase().includes('recommend') || 
                sentMessage.toLowerCase().includes('guidance') || 
                sentMessage.toLowerCase().includes('advice')) {
                setRecommendation(responseText);
            }
        } catch (error) {
            console.error('AI Error:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: "I'm having trouble connecting right now. Please try again in a moment." 
            }]);
        }
        
        setLoading(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat toggle button */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`${isOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} p-4 rounded-full shadow-lg transition-colors flex items-center justify-center text-white`}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? '✕' : '💬'}
            </button>
            
            {isOpen && (
                <div className="bg-white rounded-xl shadow-2xl w-80 sm:w-96 absolute bottom-16 right-0 overflow-hidden flex flex-col">
                    {/* Chat header */}
                    <div className="bg-blue-700 p-4 text-white">
                        <h3 className="font-medium">Loan Assistant</h3>
                        <p className="text-sm text-blue-100">Ask questions about your loan options</p>
                    </div>
                    
                    {/* Messages area */}
                    <div className="h-72 overflow-y-auto p-4 flex flex-col space-y-3 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`p-3 rounded-lg max-w-3/4 ${msg.role === 'assistant' 
                                    ? 'bg-blue-100 text-gray-800 self-start rounded-bl-none' 
                                    : 'bg-blue-600 text-white self-end rounded-br-none'}`}
                            >
                                {msg.content}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                        
                        {loading && (
                            <div className="bg-blue-100 text-gray-800 p-3 rounded-lg self-start rounded-bl-none flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                            </div>
                        )}
                    </div>
                    
                    {/* Input area */}
                    <div className="p-3 border-t border-gray-200 flex">
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type your question here..."
                            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button 
                            onClick={sendMessage}
                            disabled={loading || !userMessage.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-lg disabled:opacity-50"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoanGuidance;