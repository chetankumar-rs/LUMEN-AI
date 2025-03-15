import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GeminiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm LUMEN, your loan assistant. How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState("");
  const [apiKey, setApiKey] = useState(localStorage.getItem("geminiApiKey") || "");
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickResponses = [
    "Tell me about loan eligibility",
    "What documents do I need?",
    "How long is the approval process?",
    "Interest rate information"
  ];

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("geminiApiKey", apiKey);
    }
  }, [apiKey]);

  // Auto scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle API key configuration
  const handleSaveApiKey = () => {
    setIsConfiguring(false);
  };

  // Get response from Gemini API
  const getGeminiResponse = async (userMessage) => {
    // If no API key is provided, fall back to predefined responses
    if (!apiKey) {
      return getFallbackResponse(userMessage);
    }

    try {
      setIsTyping(true);
      
      // This would be the actual Gemini API call
      // For demonstration purposes, we're using a timeout and fallback responses
      // You would replace this with actual Gemini API integration
      
      return new Promise((resolve) => {
        setTimeout(() => {
          setIsTyping(false);
          resolve(getFallbackResponse(userMessage));
        }, 1000 + Math.random() * 1000);
      });
      
      // Actual implementation would look something like:
      /*
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `You are a helpful loan assistant. Respond to: ${userMessage}` }
              ]
            }
          ]
        })
      });
      
      const data = await response.json();
      setIsTyping(false);
      
      if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return "I'm having trouble connecting right now. Please try again later.";
      }
      */
    } catch (error) {
      setIsTyping(false);
      console.error("Error contacting Gemini API:", error);
      return "I'm having trouble connecting to my brain. Please check your API key or try again later.";
    }
  };

  // Fallback responses when API key isn't provided or API call fails
  const getFallbackResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes("eligibility")) {
      return "Eligibility varies by loan type. Generally, we look at your credit score, income, employment history, and existing debt. Would you like to know specific requirements for a particular loan type?";
    } else if (lowerText.includes("document") || lowerText.includes("need")) {
      return "For most loans, you'll need ID proof, address proof, income verification (like pay stubs or tax returns), bank statements, and details about your existing loans. Home loans require property documents as well.";
    } else if (lowerText.includes("approval") || lowerText.includes("process") || lowerText.includes("long")) {
      return "Our approval process typically takes 2-5 business days for personal loans, 5-7 days for business loans, and 2-3 weeks for home loans. You can check your application status anytime in your account.";
    } else if (lowerText.includes("interest") || lowerText.includes("rate")) {
      return "Our current interest rates range from 7.99% to 15.99% for personal loans, 6.50% to 9.99% for home loans, 8.50% to 14.99% for education loans, and 9.99% to 16.99% for business loans, depending on your credit profile.";
    } else if (lowerText.includes("hello") || lowerText.includes("hi")) {
      return "Hello! I'm LUMEN, your loan assistant. How can I help you today?";
    } else if (lowerText.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (lowerText.includes("api") || lowerText.includes("key")) {
      return "You can configure your Gemini API key by clicking on the settings icon in the chat window. The API key allows me to provide more personalized and accurate responses.";
    } else {
      return "I'd be happy to help with that. For more specific information about our loan options, you can select your loan type and proceed with the application, or speak with one of our loan specialists by calling 1-800-LOAN-HELP.";
    }
  };

  // Send message and get response
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMessageId = Date.now();
    const userMessage = inputText;
    setMessages(prev => [...prev, { id: userMessageId, text: userMessage, isBot: false }]);
    setInputText("");
    
    // Get bot response
    const botResponse = await getGeminiResponse(userMessage);
    setMessages(prev => [
      ...prev, 
      { 
        id: userMessageId + 1, 
        text: botResponse, 
        isBot: true 
      }
    ]);
  };

  // Quick response handler
  const handleQuickResponse = async (response) => {
    const userMessageId = Date.now();
    setMessages(prev => [...prev, { id: userMessageId, text: response, isBot: false }]);
    
    // Get bot response
    const botResponse = await getGeminiResponse(response);
    setMessages(prev => [
      ...prev, 
      { 
        id: userMessageId + 1, 
        text: botResponse, 
        isBot: true 
      }
    ]);
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-40 overflow-hidden flex flex-col border border-gray-200"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h1 className="font-bold">LUMEN,your personal assistant</h1>
                  <p className="text-xs text-white/80"></p>
                </div>
              </div>
              <button 
                onClick={() => setIsConfiguring(!isConfiguring)}
                className="rounded-full p-2 hover:bg-white/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* Configuration Panel */}
            <AnimatePresence>
              {isConfiguring && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-gray-200 overflow-hidden"
                >
                  <div className="p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-700 mb-2">Gemini API Configuration</h4>
                    <div className="mb-3">
                      <label htmlFor="apiKey" className="block text-xs text-gray-500 mb-1">
                        API Key
                      </label>
                      <input
                        type="password"
                        id="apiKey"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your Gemini API key"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Get your API key from the{" "}
                        <a
                          href="https://ai.google.dev/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Google AI Studio
                        </a>
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleSaveApiKey}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message area */}
            <div className="flex-1 p-4 overflow-y-auto max-h-80">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mr-2 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M3 10h2m14 0h2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M12 6a6 6 0 100 12 6 6 0 000-12z" />
                        </svg>
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg text-sm max-w-xs sm:max-w-md ${
                        message.isBot
                          ? "bg-gray-200 text-gray-900"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mr-2 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="16" cy="12" r="1.5" />
                        <circle cx="8" cy="12" r="1.5" />
                      </svg>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-200 text-gray-900 text-sm max-w-xs sm:max-w-md">
                      Typing...
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick response buttons */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-wrap gap-2">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full hover:bg-blue-200 transition"
                  >
                    {response}
                  </button>
                ))}
              </div>
            </div>

            {/* Input field */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white flex">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GeminiChatbot;
