import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBot({ msg }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en-IN");
  const [typing, setTyping] = useState(false);
  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const languages = [
    { code: "en-IN", name: "English" },
    { code: "hi-IN", name: "Hindi" },
    { code: "ta-IN", name: "Tamil" },
    { code: "te-IN", name: "Telugu" },
    { code: "kn-IN", name: "Kannada" },
    { code: "ml-IN", name: "Malayalam" }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Add a typing animation effect for bot messages
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant") {
      setTyping(true);
      const timer = setTimeout(() => {
        setTyping(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:6013/api/generate/g", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      
      const data = await response.json();
      let originalText = data.text;
      console.log(data.text);
      let translatedText = originalText;
      let translatedSpeechData = data.speech;
      
      if (selectedLanguage !== "en-IN") {
        try {
          const translationResponse = await fetch("http://localhost:6013/api/generate/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              input: originalText,
              source_language_code: "en-IN",
              target_language_code: selectedLanguage
            })
          });
          
          const translationData = await translationResponse.json();
          originalText = translationData.translated_text;
          translatedText = translationData.translated_text;
          if (translationData.translated_text.speech) translatedSpeechData = translationData.translated_text.speech;
        } catch (translationError) {
          console.error("Translation Error:", translationError);
        }
      }
      
      const newMessage = { role: "assistant", content: translatedText, speechData: translatedSpeechData };
      
      setMessages(prev => [...prev, { role: "user", content: prompt }, newMessage]);
      setPrompt("");
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Error fetching response" }]);
    }
    
    setLoading(false);
  };

  const playAudio = (speechData, index) => {
    if (!speechData) return;
    let audioBase64 = speechData.audios?.[0]?.audio_base64 || speechData.audios?.[0] || null;
    if (!audioBase64) return;
    
    const audioSrc = `data:audio/wav;base64,${audioBase64}`;
    audioRef.current.src = audioSrc;
    audioRef.current.load();
    
    setCurrentPlayingIndex(index);
    
    audioRef.current.play()
      .then(() => setIsSpeaking(true))
      .catch(err => console.error("Audio play error:", err));
    
    audioRef.current.onended = () => {
      setIsSpeaking(false);
      setCurrentPlayingIndex(null);
    };
  };

  const handleSpeechToText = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = selectedLanguage;
    recognition.start();

    recognition.onresult = (event) => {
      setPrompt(event.results[0][0].transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      <motion.button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
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
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-96 p-4 shadow-2xl rounded-2xl mt-4 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg text-gray-800">AI Assistant</h3>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearChat}
                  className="text-gray-500 hover:text-red-500"
                  title="Clear chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </motion.button>
              </div>
            </div>
            
            <div className="mb-4">
              <select 
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value)} 
                className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
            
            <div 
              ref={chatContainerRef}
              className="h-72 overflow-y-auto p-2 bg-gray-50 rounded-lg shadow-inner border border-gray-200"
            >
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  <p>Start a conversation...</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-3 my-2 rounded-lg max-w-[85%] shadow-sm ${
                      msg.role === "assistant" 
                        ? "bg-blue-100 text-left ml-0 mr-auto rounded-bl-none" 
                        : "bg-green-100 text-right ml-auto mr-0 rounded-br-none"
                    }`}
                  >
                    <p className="text-gray-800 text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                    {msg.role === "assistant" && msg.speechData && (
                      <button 
                        onClick={() => playAudio(msg.speechData, index)} 
                        className="mt-1 text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                        disabled={isSpeaking && currentPlayingIndex !== index}
                      >
                        {currentPlayingIndex === index ? (
                          <>
                            <span className="animate-pulse">●</span> Playing...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                            </svg>
                            Listen
                          </>
                        )}
                      </button>
                    )}
                  </motion.div>
                ))
              )}
              {typing && (
                <div className="p-3 my-2 bg-blue-100 rounded-lg max-w-[85%] ml-0 mr-auto rounded-bl-none shadow-sm">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form 
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }} 
              className="mt-4 flex gap-1"
            >
              <input 
                type="text" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Type your message..." 
                className="border p-2 flex-1 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <motion.button 
                type="button" 
                onClick={handleSpeechToText} 
                className="bg-gray-600 text-white p-2 hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </motion.button>
              <motion.button 
                type="submit" 
                disabled={loading} 
                className={`${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white p-2 rounded-r-md transition-colors flex items-center justify-center min-w-[40px]`}
                whileHover={loading ? {} : { scale: 1.05 }}
                whileTap={loading ? {} : { scale: 0.95 }}
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </motion.button>
            </form>
            <audio ref={audioRef} style={{ display: 'none' }} controls />
            <div className="mt-2 text-xs text-gray-500 text-center">
              Powered by AI · {selectedLanguage.split('-')[0].toUpperCase()}
            </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
