import React, { useState, useEffect } from 'react';

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

// Educational tips for each question
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
  const [language, setLanguage] = useState("English");
  const [animateScore, setAnimateScore] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: "Hello! I'm LUMEN, your Loan Understanding & Management Expert Navigator. How can I help you today?", sender: "ai" }
  ]);
  const [userMessage, setUserMessage] = useState("");

  // Select an option
  const selectOption = (option) => {
    const updatedAnswers = { ...answers };
    updatedAnswers[currentStep] = option;
    setAnswers(updatedAnswers);
  };

  // Navigate between questions
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
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setSubmitted(false);
    setShowWelcome(true);
    setAnimateScore(0);
  };

  // Calculation functions
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

  const score = calculateScore();
  const eligibleAmount = calculateEligibleAmount();
  
  // Calculate risk level
  const getRiskLevel = (score) => {
    if (score >= 85) return { level: "Low Risk", color: "text-green-600", description: "Excellent profile with strong eligibility for competitive rates." };
    if (score >= 65) return { level: "Moderate Risk", color: "text-yellow-600", description: "Good profile with reasonable eligibility for standard loan products." };
    if (score >= 40) return { level: "High Risk", color: "text-orange-600", description: "Several factors affecting eligibility. Consider improving your financial profile." };
    return { level: "Very High Risk", color: "text-red-600", description: "Significant challenges for loan approval. Focus on improving credit and financial situation." };
  };
  
  const riskLevel = getRiskLevel(score);

  // Get suggested interest rate
  const getInterestRate = (score) => {
    if (score >= 85) return "5.75%";
    if (score >= 65) return "8.25%";
    if (score >= 40) return "12.5%";
    return "18.75%";
  };

  const suggestedRate = getInterestRate(score);

  // Check if current question is answered
  const isCurrentQuestionAnswered = answers[currentStep] !== undefined;

  // Chat functionality
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: userMessage, sender: "user" }
    ]);

    // Simulate AI response after 1 second
    setTimeout(() => {
        let aiResponse = "I'm here to help with your loan questions. Could you be more specific about what you'd like to know?";
        
        const lowerMsg = userMessage.toLowerCase();
        if (lowerMsg.includes("eligibility") || lowerMsg.includes("qualify")) {
            aiResponse = "Loan eligibility typically depends on your income, credit score, existing debt, and employment stability. Would you like me to explain any of these factors in more detail?";
        } else if (lowerMsg.includes("interest") || lowerMsg.includes("rate")) {
            aiResponse = "Interest rates vary based on your credit score, loan type, and current market conditions. Higher credit scores generally qualify for lower interest rates.";
        } else if (lowerMsg.includes("document") || lowerMsg.includes("paperwork")) {
            aiResponse = "Common loan documents include proof of identity, proof of income (pay stubs, tax returns), bank statements, and information about your assets and debts. The specific requirements vary by lender.";
        } else if (lowerMsg.includes("credit score") || lowerMsg.includes("credit history")) {
            aiResponse = "Your credit score is a crucial factor in loan approval. Scores above 700 typically qualify for the best rates. You can improve your score by paying bills on time, reducing debt, and correcting errors on your credit report.";
        }

        setChatMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
    }, 1000);

    setUserMessage(""); // ✅ Clears the input after sending the message
};



  // Animation for score on results page
  useEffect(() => {
    if (submitted) {
      const timer = setInterval(() => {
        setAnimateScore(prev => {
          if (prev < score) return prev + 1;
          clearInterval(timer);
          return score;
        });
      }, 20);
      return () => clearInterval(timer);
    }
  }, [submitted, score]);

  // Welcome screen component
  const WelcomeScreen = () => (
    <div className="text-center py-6 space-y-6">
      <div className="text-5xl mb-2">💡</div>
      <h1 className="text-3xl font-bold text-blue-800">Welcome to LUMEN</h1>
      <p className="text-xl text-blue-600 font-medium">Loan Understanding & Management Expert Navigator</p>
      <p className="text-gray-600 max-w-md mx-auto">Let's check your loan eligibility and provide personalized financial guidance to help you make informed decisions.</p>
      
      <div className="flex justify-center space-x-4 mt-6">
        <div className="p-4 bg-blue-50 rounded-lg text-center w-32">
          <div className="text-2xl mb-2">📊</div>
          <div className="text-sm font-medium">Loan Eligibility</div>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg text-center w-32">
          <div className="text-2xl mb-2">📝</div>
          <div className="text-sm font-medium">Application Guidance</div>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg text-center w-32">
          <div className="text-2xl mb-2">🎓</div>
          <div className="text-sm font-medium">Financial Education</div>
        </div>
      </div>
      
      <div className="mt-6">
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="mr-4 px-3 py-2 border rounded text-sm"
        >
          <option value="English">English</option>
          <option value="Spanish">Español</option>
          <option value="French">Français</option>
          <option value="Hindi">हिन्दी</option>
        </select>
        
        <button 
          onClick={() => setShowWelcome(false)} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Start Assessment
        </button>
      </div>
    </div>
  );

  // Chat widget component
  const ChatWidget = () => (
    <div className={`fixed bottom-6 right-6 z-10 ${showChat ? 'w-80 h-96' : 'w-auto h-auto'}`}>
      {showChat ? (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-full border border-gray-200">
          <div className="bg-blue-700 text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-xl mr-2">💬</div>
              <div>LUMEN Assistant</div>
            </div>
            <button 
              onClick={() => setShowChat(false)}
              className="text-white hover:bg-blue-800 rounded-full h-6 w-6 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-grow p-3 overflow-y-auto bg-gray-50">
            {chatMessages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`mb-3 max-w-xs ${msg.sender === 'user' ? 'ml-auto' : ''}`}
              >
                <div 
                  className={`p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleChatSubmit} className="border-t border-gray-200 p-3 bg-white">
            <div className="flex">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Ask about loans, eligibility..."
                className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setShowChat(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
        >
          <div className="text-xl">💬</div>
        </button>
      )}
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-b from-blue-50 to-white min-h-screen relative">
      {/* LUMEN Header */}
      <div className="flex items-center justify-center mb-6">
        <div className="text-4xl mr-2">💡</div>
        <h1 className="text-2xl font-bold text-blue-800">LUMEN</h1>
      </div>
      
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {showWelcome ? (
          <WelcomeScreen />
        ) : (
          <>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
              <h2 className="text-2xl text-center font-bold">Loan Eligibility Checker</h2>
            </div>
            <div className="p-6">
              {!submitted ? (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Question {currentStep + 1} of {questions.length}</span>
                      <span>{Math.round((currentStep / questions.length) * 100)}% Complete</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${(currentStep / questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="py-4 border-b border-gray-100">
                    <div className="flex items-center mb-6">
                      <div className="text-3xl mr-3">{questions[currentStep].icon}</div>
                      <h3 className="text-xl font-medium">{questions[currentStep].question}</h3>
                      
                      <button 
                        onClick={() => setShowTip(!showTip)}
                        className="ml-auto text-blue-500 hover:text-blue-700 flex items-center text-sm"
                      >
                        <span className="mr-1">💡</span> Tip
                      </button>
                    </div>
                    
                    {showTip && (
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r">
                        <p className="text-blue-800">{financialTips[currentStep]}</p>
                      </div>
                    )}
                    
                    <div className="grid gap-3">
                      {questions[currentStep].options.map((option) => (
                        <div 
                          key={option}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            answers[currentStep] === option 
                              ? 'bg-blue-600 text-white border-blue-700 shadow-md transform -translate-y-1' 
                              : 'bg-white hover:bg-blue-50 border-gray-300 hover:shadow'
                          }`}
                          onClick={() => selectOption(option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    {currentStep > 0 && (
                      <button 
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center"
                        onClick={handlePrevious}
                      >
                        <span className="mr-1">←</span> Previous
                      </button>
                    )}
                    
                    <div className="ml-auto">
                      {currentStep < questions.length - 1 ? (
                        <button 
                          className={`px-6 py-2 rounded-lg flex items-center ${
                            isCurrentQuestionAnswered 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          onClick={handleNext}
                          disabled={!isCurrentQuestionAnswered}
                        >
                          Next <span className="ml-1">→</span>
                        </button>
                      ) : (
                        <button
                          className={`px-6 py-2 rounded-lg ${
                            isCurrentQuestionAnswered 
                              ? 'bg-green-600 text-white hover:bg-green-700' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          onClick={handleSubmit}
                          disabled={!isCurrentQuestionAnswered}
                        >
                          Check Eligibility
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-4">
                  <h2 className="text-2xl font-bold mb-6 text-center">Your Loan Eligibility Results</h2>
                  
                  <div className="text-center mb-8">
                    <div className="inline-block rounded-full bg-blue-100 p-6 mb-2">
                      <div className="text-4xl font-bold text-blue-700">${eligibleAmount.toLocaleString()}</div>
                      <div className="text-sm text-blue-600">Eligible Loan Amount</div>
                    </div>
                    
                    <div className="text-sm text-gray-600 max-w-md mx-auto">
                      This is an estimated amount based on your profile. Actual loan offers may vary.
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-6 mb-6">
                    <div className="flex justify-between mb-2 items-center">
                      <span className="font-medium">Your Score:</span>
                      <span className="text-2xl font-bold text-blue-700">{animateScore}/100</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${animateScore}%` }}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Risk Assessment</div>
                        <div className={`font-bold text-lg ${riskLevel.color}`}>{riskLevel.level}</div>
                        <p className="text-sm text-gray-600 mt-2">{riskLevel.description}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Suggested Interest Rate</div>
                        <div className="font-bold text-lg text-blue-600">{suggestedRate}</div>
                        <p className="text-sm text-gray-600 mt-2">
                          This is an estimated rate. Actual rates depend on lender evaluation and market conditions.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="font-medium text-blue-800 mb-4">Your Profile Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                      <div className="flex justify-between pr-4">
                        <span className="text-gray-600">Employment:</span>
                        <span className="font-medium">{answers[0] || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between pr-4">
                        <span className="text-gray-600">Monthly Income:</span>
                        <span className="font-medium">{answers[1] || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between pr-4">
                        <span className="text-gray-600">Credit Score:</span>
                        <span className="font-medium">{answers[2] || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between pr-4">
                        <span className="text-gray-600">Loan Type:</span>
                        <span className="font-medium">{answers[3] || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between pr-4">
                        <span className="text-gray-600">Loan Purpose:</span>
                        <span className="font-medium">{answers[8] || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between pr-4">
                        <span className="text-gray-600">Repayment Term:</span>
                        <span className="font-medium">{answers[9] || "Not provided"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h3 className="font-medium text-green-800 mb-3 flex items-center">
                      <span className="mr-2">🎓</span> Financial Education Tips
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex">
                        <span className="mr-2 text-green-600">•</span>
                        <span>Consider improving your credit score to qualify for better interest rates.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2 text-green-600">•</span>
                        <span>Make sure your monthly loan payment doesn't exceed 30% of your monthly income.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2 text-green-600">•</span>
                        <span>Compare loan offers from multiple lenders to find the best terms.</span>
                      </li>
                      <li className="flex">
                        <span className="mr-2 text-green-600">•</span>
                        <span>Read all loan terms carefully before signing, paying attention to fees and penalties.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-600 text-white rounded-lg p-6 mb-6">
                    <h3 className="font-medium mb-3 flex items-center">
                      <span className="mr-2">💬</span> Need Help?
                    </h3>
                    <p className="mb-4">Chat with our LUMEN assistant for personalized guidance on your loan options and application process.</p>
                    <button 
                      onClick={() => {
                        setShowChat(true);
                        setChatMessages([
                          ...chatMessages,
                          { 
                            text: `Based on your profile, you're eligible for a loan of up to $${eligibleAmount.toLocaleString()}. Would you like help with the next steps in the application process?`, 
                            sender: "ai" 
                          }
                        ]);
                      }} 
                      className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
                    >
                      Start Chat
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-50 border-t p-4 flex justify-between items-center">
              {submitted ? (
                <button 
                  onClick={handleReset} 
                  className="w-full p-3 border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-50 font-medium"
                >
                  Start New Assessment
                </button>
              ) : (
                <div className="text-sm text-gray-500 italic w-full text-center">
                  Your information is kept private and secure.
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
      {/* Chat widget */}
      <ChatWidget />
      
      {/* Language selector in fixed position */}
      {!showWelcome && !submitted && (
        <div className="fixed top-4 right-4">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="px-2 py-1 border rounded text-sm bg-white shadow-sm"
          >
            <option value="English">English</option>
            <option value="Spanish">Español</option>
            <option value="French">Français</option>
            <option value="Hindi">हिन्दी</option>
          </select>
        </div>
      )}
    </div>
  );
}