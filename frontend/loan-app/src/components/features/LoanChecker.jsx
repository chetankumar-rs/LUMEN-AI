import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const questions = [
  {
    question: "What is your employment status?",
    options: ["Employed", "Self-Employed", "Unemployed", "Student"],
    correct: "Employed",
    weight: 15,
    icon: "👔"
  },
  {
    question: "What is your approximate monthly income?",
    options: ["Less than $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "More than $10,000"],
    correct: "$5,000 - $10,000",
    weight: 20,
    icon: "💰"
  },
  {
    question: "What is your credit score range?",
    options: ["Below 500", "500-650", "650-750", "Above 750"],
    correct: "650-750",
    weight: 20,
    icon: "📊"
  },
  {
    question: "What type of loan are you applying for?",
    options: ["Personal Loan", "Home Loan", "Car Loan", "Business Loan"],
    correct: "Personal Loan",
    weight: 5,
    icon: "📝"
  },
  {
    question: "What is the loan amount you need?",
    options: ["Less than $10,000", "$10,000 - $50,000", "$50,000 - $100,000", "More than $100,000"],
    correct: "$10,000 - $50,000",
    weight: 5,
    icon: "💵"
  },
  {
    question: "Do you have any existing loans?",
    options: ["Yes", "No"],
    correct: "No",
    weight: 10,
    icon: "🔄"
  },
  {
    question: "What is your age group?",
    options: ["18-25", "26-35", "36-50", "Above 50"],
    correct: "26-35",
    weight: 5,
    icon: "🧑"
  },
  {
    question: "Do you have any collateral for the loan?",
    options: ["Yes", "No"],
    correct: "Yes",
    weight: 10,
    icon: "🏠"
  },
  {
    question: "What is the purpose of the loan?",
    options: ["Education", "Business", "Home Improvement", "Medical Expenses"],
    correct: "Business",
    weight: 5,
    icon: "🎯"
  },
  {
    question: "How long do you plan to repay the loan?",
    options: ["Less than 1 year", "1-3 years", "3-5 years", "More than 5 years"],
    correct: "3-5 years",
    weight: 5,
    icon: "⏱️"
  },
];

const financialTips = {
  0: "Stable employment improves your loan eligibility. Lenders typically look for at least 6 months with your current employer.",
  1: "Lenders typically want to see that your monthly loan payment won't exceed 30-40% of your monthly income.",
  2: "Your credit score is crucial for loan approval. Scores above 700 typically qualify for the best interest rates.",
  3: "Different loan types have different requirements. Personal loans typically have higher interest rates but fewer restrictions.",
  4: "Request only what you need. Larger loans mean higher payments and potentially stricter eligibility requirements.",
  5: "Multiple existing loans can impact your debt-to-income ratio, potentially reducing your eligibility for new loans.",
  6: "Age can influence loan terms. Younger borrowers may face higher rates due to limited credit history.",
  7: "Collateral can significantly improve loan terms and approval chances by reducing the lender's risk.",
  8: "Lenders evaluate loan purpose to assess risk. Business loans may require additional documentation.",
  9: "Longer repayment terms mean lower monthly payments but more interest paid over the life of the loan."
};

export default function EnhancedLoanChecker() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [animateScore, setAnimateScore] = useState(0);
  const [userLoanData, setUserLoanData] = useState(null);
  const API_KEY = "AIzaSyCa9EL6KJcV1LK7RA6hRKdnvGSt_CxK-Mo";

  const selectOption = (option) => {
    const updatedAnswers = { ...answers };
    updatedAnswers[currentStep] = option;
    setAnswers(updatedAnswers);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowTip(false);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowTip(false);
    }
  };

  const handleSubmit = () => {
    const loanData = {
      score: calculateScore(),
      eligibleAmount: calculateEligibleAmount(),
      riskLevel: getRiskLevel(calculateScore()),
      suggestedRate: getInterestRate(calculateScore()),
      answers: { ...answers }
    };
    setUserLoanData(loanData);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setSubmitted(false);
    setShowWelcome(true);
    setAnimateScore(0);
    setUserLoanData(null);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        score += q.weight;
      } else if (answers[index]) {
        const optionIndex = q.options.indexOf(answers[index]);
        const correctIndex = q.options.indexOf(q.correct);
        const diff = Math.abs(optionIndex - correctIndex);

        if (diff === 1) score += q.weight * 0.5;
        else if (diff === 2) score += q.weight * 0.25;
      }
    });
    return score;
  };

  const calculateEligibleAmount = () => {
    const score = calculateScore();
    const baseAmount = 50000;
    const percentage = score / 100;
    const eligibleAmount = Math.round(baseAmount * percentage / 1000) * 1000;
    return eligibleAmount;
  };

  const getRiskLevel = (score) => {
    if (score >= 85) return { level: "Low Risk", color: "text-green-600", description: "Excellent profile with strong eligibility for competitive rates." };
    if (score >= 65) return { level: "Moderate Risk", color: "text-yellow-600", description: "Good profile with reasonable eligibility for standard loan products." };
    if (score >= 40) return { level: "High Risk", color: "text-orange-600", description: "Several factors affecting eligibility. Consider improving your financial profile." };
    return { level: "Very High Risk", color: "text-red-600", description: "Significant challenges for loan approval. Focus on improving credit and financial situation." };
  };

  const getInterestRate = (score) => {
    if (score >= 85) return "5.75%";
    if (score >= 65) return "8.25%";
    if (score >= 40) return "12.5%";
    return "18.75%";
  };

  const isCurrentQuestionAnswered = answers[currentStep] !== undefined;

  useEffect(() => {
    if (submitted) {
      const timer = setInterval(() => {
        setAnimateScore(prev => {
          if (prev < calculateScore()) return prev + 1;
          clearInterval(timer);
          return calculateScore();
        });
      }, 20);
      return () => clearInterval(timer);
    }
  }, [submitted]);

  const ChatWidget = () => {
    const [showChat, setShowChat] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([
      { sender: 'bot', text: 'Hi there! I\'m LUMEN, your Loan Understanding & Management Expert Navigator. How can I help you today?' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const genAI = new GoogleGenerativeAI(API_KEY);

    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [chatMessages]);

    useEffect(() => {
      if (submitted && userLoanData) {
        const welcomeMessage = `Based on your profile, you're eligible for a loan of up to $${userLoanData.eligibleAmount.toLocaleString()} with a ${userLoanData.riskLevel.level} profile. How can I help you with your application?`;
        setChatMessages([
          { sender: 'bot', text: 'Hi there! I\'m LUMEN, your Loan Understanding & Management Expert Navigator.' },
          { sender: 'bot', text: welcomeMessage }
        ]);
      }
    }, [submitted, userLoanData]);

    const handleChatSubmit = async (e) => {
      e.preventDefault();
      if (!userMessage.trim()) return;

      setChatMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
      const currentMessage = userMessage;
      setUserMessage('');
      setIsTyping(true);

      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        let prompt = `You are LUMEN, a friendly loan advisor. Respond to this question in plain conversational text (not markdown): ${currentMessage}`;

        if (userLoanData) {
          prompt += `\n\nUser's loan profile information:
          - Eligibility Score: ${userLoanData.score}/100
          - Eligible Loan Amount: $${userLoanData.eligibleAmount}
          - Risk Level: ${userLoanData.riskLevel.level}
          - Suggested Interest Rate: ${userLoanData.suggestedRate}
          - Employment Status: ${userLoanData.answers[0] || "Not provided"}
          - Monthly Income: ${userLoanData.answers[1] || "Not provided"}
          - Credit Score: ${userLoanData.answers[2] || "Not provided"}
          - Loan Type: ${userLoanData.answers[3] || "Not provided"}
          - Loan Amount: ${userLoanData.answers[4] || "Not provided"}
          - Existing Loans: ${userLoanData.answers[5] || "Not provided"}
          - Age Group: ${userLoanData.answers[6] || "Not provided"}
          - Has Collateral: ${userLoanData.answers[7] || "Not provided"}
          - Loan Purpose: ${userLoanData.answers[8] || "Not provided"}
          - Repayment Term: ${userLoanData.answers[9] || "Not provided"}`;
        }

        const result = await model.generateContent(prompt);
        let botResponse = result?.response?.text() || "I'm having trouble processing your request. Please try again.";
        botResponse = botResponse.replace(/```[\s\S]*?```/g, '');
        botResponse = botResponse.replace(/\*\*/g, '');
        botResponse = botResponse.replace(/\*/g, '');
        botResponse = botResponse.replace(/#+ /g, '');

        setTimeout(() => {
          setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
          setIsTyping(false);
        }, 700);
      } catch (error) {
        console.error('Chat error:', error);
        setTimeout(() => {
          setChatMessages((prev) => [...prev, { sender: 'bot', text: "I'm having trouble connecting. Please try again later." }]);
          setIsTyping(false);
        }, 700);
      }
    };

    return (
      <div className="fixed bottom-6 right-6 z-50">
        {showChat ? (
          <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-96 w-80 sm:w-96 border border-gray-200">
            <div className="bg-blue-700 text-white p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="text-xl mr-2">💡</div>
                <div>LUMEN Assistant</div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-white hover:bg-blue-800 rounded-full h-6 w-6 flex items-center justify-center"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            <div className="flex-grow p-3 overflow-y-auto bg-gray-50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`mb-3 ${msg.sender === 'user' ? 'ml-auto' : 'mr-auto'} max-w-3/4`}>
                  <div className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-200 rounded-bl-none shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="mb-3 mr-auto">
                  <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3 shadow-sm flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleChatSubmit} className="border-t border-gray-200 p-3 bg-white">
              <div className="flex">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  ➤
                </button>
              </div>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setShowChat(true)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open chat"
          >
            💬
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
    {showWelcome && (
      <div className="bg-gradient-to-r from-blue-100 to-indigo-50 rounded-xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl max-w-3xl mx-auto border border-blue-200">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-left mb-6 md:mb-0 md:pr-8">
            <div className="inline-block p-3 bg-blue-600 text-white rounded-full mb-4 shadow-md transform transition-transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-3 text-blue-800">Discover Your Loan Potential</h1>
            <p className="text-gray-700 mb-4">Our intelligent assessment tool analyzes your financial profile to provide personalized recommendations and maximize your approval chances.</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-gray-700">
                <div className="mr-2 text-green-500">✓</div>
                <span className="text-sm">Quick 2-minute assessment</span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="mr-2 text-green-500">✓</div>
                <span className="text-sm">Personalized results</span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="mr-2 text-green-500">✓</div>
                <span className="text-sm">Expert AI assistance</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-blue-50 rounded-full mb-2">
                <span className="text-2xl">🚀</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Ready to Begin?</h2>
              <p className="text-gray-600 text-sm mb-4">Complete our quick assessment to receive your personalized loan eligibility score.</p>
            </div>
            
            <button
              onClick={() => setShowWelcome(false)}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium transition-all transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            >
              Start My Assessment
            </button>
            
            <div className="mt-4 text-center text-xs text-gray-500">
              No credit check required • 100% secure • Free analysis
            </div>
          </div>
        </div>
      </div>
    )}

{!showWelcome && !submitted && (
  <div className="bg-gradient-to-b from-white to-blue-50 rounded-xl shadow-lg p-8 border border-blue-100 max-w-3xl mx-auto">
    {/* Progress bar */}
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Your Progress</span>
        <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
          style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
    </div>
    
    {/* Question section with animation */}
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 mb-6 transition-all transform hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 text-blue-800 rounded-full p-2 mr-3 text-xl">
          {questions[currentStep].icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          {questions[currentStep].question}
        </h3>
      </div>
      
      <div className="space-y-3 mb-4">
        {questions[currentStep].options.map((option, index) => (
          <button
            key={index}
            onClick={() => selectOption(option)}
            className={`w-full text-left px-6 py-4 rounded-lg transition-all transform hover:translate-x-1 ${
              answers[currentStep] === option
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 mr-3 rounded-full flex items-center justify-center border ${
                answers[currentStep] === option
                  ? 'bg-white border-white'
                  : 'border-gray-400'
              }`}>
                {answers[currentStep] === option && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>
      
      {/* Financial tip section with animation */}
      <div className="mt-6">
        <button
          onClick={() => setShowTip(!showTip)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span className="mr-2">💡</span>
          <span>{showTip ? 'Hide Financial Tip' : 'Show Financial Tip'}</span>
          <span className="ml-2">{showTip ? '▲' : '▼'}</span>
        </button>
        
        {showTip && (
          <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-md animate-fadeIn text-blue-800">
            {financialTips[currentStep]}
          </div>
        )}
      </div>
    </div>
    
    {/* Navigation controls */}
    <div className="flex justify-between items-center">
      <button
        onClick={handlePrevious}
        disabled={currentStep === 0}
        className={`px-6 py-3 rounded-lg flex items-center transition-transform transform ${
          currentStep === 0
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gray-600 text-white hover:bg-gray-700 hover:scale-105'
        }`}
      >
        <span className="mr-2">←</span>
        <span>Previous</span>
      </button>
      
      <div className="text-center bg-blue-100 px-4 py-2 rounded-full text-blue-800 font-medium">
        Question {currentStep + 1} of {questions.length}
      </div>
      
      {currentStep === questions.length - 1 ? (
        <button
          onClick={handleSubmit}
          disabled={!isCurrentQuestionAnswered}
          className={`px-6 py-3 rounded-lg flex items-center transition-transform ${
            isCurrentQuestionAnswered
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>Submit</span>
          <span className="ml-2">✓</span>
        </button>
      ) : (
        <button
          onClick={() => isCurrentQuestionAnswered && setCurrentStep(currentStep + 1)}
          disabled={!isCurrentQuestionAnswered}
          className={`px-6 py-3 rounded-lg flex items-center transition-transform ${
            isCurrentQuestionAnswered
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          <span className="ml-2">→</span>
        </button>
      )}
          </div>

          {showTip && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-yellow-800">
              {financialTips[currentStep]}
            </div>
          )}
        </div>
      )}

{submitted && (
  <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-xl p-8 border border-blue-100 max-w-3xl mx-auto">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center bg-blue-600 text-white rounded-full p-4 mb-4 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold mb-2 text-blue-800">Your Loan Assessment</h2>
      <p className="text-gray-600 mb-8">Based on your profile, we've analyzed your loan eligibility</p>
    </div>
    
    {/* Animated score meter */}
    <div className="mb-10">
      <p className="text-center text-lg font-medium text-gray-700 mb-3">Your Eligibility Score</p>
      <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div 
          className="h-full transition-all duration-1000 ease-out rounded-full"
          style={{ 
            width: `${animateScore}%`,
            background: `linear-gradient(90deg, 
              ${animateScore < 40 ? '#EF4444' : animateScore < 65 ? '#F59E0B' : animateScore < 85 ? '#10B981' : '#2563EB'} 0%, 
              ${animateScore < 40 ? '#F87171' : animateScore < 65 ? '#FBBF24' : animateScore < 85 ? '#34D399' : '#3B82F6'} 100%)`
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white font-bold text-lg shadow-inner">
          {animateScore}/100
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>Poor</span>
        <span>Fair</span>
        <span>Good</span>
        <span>Excellent</span>
      </div>
    </div>
    
    {/* Results cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Risk Level Card */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 transform transition-all hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
            userLoanData?.riskLevel.level === "Low Risk" ? "bg-green-100" :
            userLoanData?.riskLevel.level === "Moderate Risk" ? "bg-yellow-100" :
            userLoanData?.riskLevel.level === "High Risk" ? "bg-orange-100" : "bg-red-100"
          }`}>
            <span className="text-2xl">
              {userLoanData?.riskLevel.level === "Low Risk" ? "✓" :
               userLoanData?.riskLevel.level === "Moderate Risk" ? "⚠️" :
               userLoanData?.riskLevel.level === "High Risk" ? "⚠️" : "⛔"}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Risk Assessment</h3>
            <p className={`text-xl font-bold ${userLoanData?.riskLevel.color}`}>
              {userLoanData?.riskLevel.level}
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-sm">{userLoanData?.riskLevel.description}</p>
      </div>
      
      {/* Amount Card */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 transform transition-all hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <span className="text-2xl">💰</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Eligible Amount</h3>
            <p className="text-xl font-bold text-blue-600">
              ${userLoanData?.eligibleAmount.toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-sm">Maximum loan amount based on your profile</p>
      </div>
      
      {/* Interest Rate Card */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 transform transition-all hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
            <span className="text-2xl">📊</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Interest Rate</h3>
            <p className="text-xl font-bold text-purple-600">
              {userLoanData?.suggestedRate}
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-sm">Estimated annual percentage rate</p>
      </div>
      
      {/* Recommendation Card */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 transform transition-all hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
            <span className="text-2xl">💡</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Next Steps</h3>
            <p className="text-lg font-medium text-green-600">
              Chat with LUMEN
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-sm">Get personalized advice to improve your eligibility</p>
      </div>
    </div>
    
    {/* Action buttons */}
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
      <button 
        onClick={() => setShowChat(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
      >
        <span className="mr-2">💬</span>
        Chat with LUMEN
      </button>
      
      <button 
        onClick={handleReset} 
        className="px-6 py-3 bg-gray-600 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all transform hover:scale-105 shadow-md"
      >
        <span className="mr-2">🔄</span>
        Start Over
      </button>
    </div>
    
    {/* Share results */}
    <div className="mt-8 text-center">
      <p className="text-gray-500 text-sm mb-2">Share your results</p>
      <div className="flex justify-center space-x-4">
        <button className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">f</button>
        <button className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500">t</button>
        <button className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700">w</button>
        <button className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700">✉</button>
      </div>
    </div>
  </div>
)}

      <ChatWidget />
    </div>
  );
}