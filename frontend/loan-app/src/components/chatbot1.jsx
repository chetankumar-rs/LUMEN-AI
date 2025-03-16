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
  const [isGenerating, setIsGenerating] = useState(false);
  const [controller, setController] = useState(null);
  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const languages = [
    { code: "en-IN", name: "English", flag: "🇬🇧" },
    { code: "hi-IN", name: "Hindi", flag: "🇮🇳" },
    { code: "ta-IN", name: "Tamil", flag: "🇮🇳" },
    { code: "te-IN", name: "Telugu", flag: "🇮🇳" },
    { code: "kn-IN", name: "Kannada", flag: "🇮🇳" },
    { code: "ml-IN", name: "Malayalam", flag: "🇮🇳" }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [isOpen]);

  const stopGeneration = () => {
    if (controller) {
      controller.abort();
      setController(null);
      setIsGenerating(false);
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!prompt.trim()) return;
    
    // Add user message immediately for better UX
    setMessages(prev => [...prev, { role: "user", content: prompt }]);
    
    setLoading(true);
    setIsGenerating(true);
    
    // Create AbortController for the fetch request
    const abortController = new AbortController();
    setController(abortController);
    
    try {
      const response = await fetch("http://localhost:6013/api/generate/g", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        signal: abortController.signal
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
            }),
            signal: abortController.signal
          });
          
          const translationData = await translationResponse.json();
          originalText = translationData.translated_text;
          translatedText = translationData.translated_text;
          if (translationData.translated_text.speech) translatedSpeechData = translationData.translated_text.speech;
        } catch (translationError) {
          if (translationError.name !== 'AbortError') {
            console.error("Translation Error:", translationError);
          }
        }
      }
      
      const newMessage = { role: "assistant", content: translatedText, speechData: translatedSpeechData };
      
      setMessages(prev => [...prev.filter(m => m.role !== "typing"), newMessage]);
      setPrompt("");
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Chatbot Error:", error);
        setMessages(prev => [...prev.filter(m => m.role !== "typing"), { role: "assistant", content: "⚠️ Error fetching response" }]);
      }
    }
    
    setLoading(false);
    setIsGenerating(false);
    setController(null);
  };

  const playAudio = (speechData, index) => {
    if (!speechData) return;
    
    // Stop any currently playing audio
    if (audioRef.current && audioRef.current.playing) {
      audioRef.current.pause();
    }
    
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
    
    // Visual feedback
    setPrompt("Listening...");

    recognition.onresult = (event) => {
      setPrompt(event.results[0][0].transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setPrompt("");
    };
    
    recognition.onend = () => {
      if (prompt === "Listening...") setPrompt("");
    };
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      <motion.button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
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
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white w-96 shadow-2xl rounded-2xl mt-4 overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white flex justify-between items-center">
              <h3 className="font-medium">AI Assistant</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={clearChat} 
                  className="p-1 hover:bg-blue-600 rounded-full transition-colors"
                  title="Clear chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Language selector */}
            <div className="p-3 border-b">
              <div className="relative">
                <select 
                  value={selectedLanguage} 
                  onChange={(e) => setSelectedLanguage(e.target.value)} 
                  className="appearance-none w-full bg-gray-50 border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="h-72 overflow-y-auto p-4 bg-gray-50">
              <AnimatePresence initial={false}>
                {messages.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-gray-500 text-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p className="text-sm">Send a message to start chatting</p>
                  </motion.div>
                ) : (
                  messages.map((msg, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-3 flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      <div 
                        className={`relative max-w-3/4 px-4 py-2 rounded-lg shadow-sm ${
                          msg.role === "assistant" 
                            ? "bg-white border border-gray-200 text-gray-800" 
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        {msg.speechData && (
                          <button 
                            onClick={() => playAudio(msg.speechData, index)}
                            className={`mt-1 flex items-center text-xs ${
                              msg.role === "assistant" ? "text-blue-500 hover:text-blue-700" : "text-blue-100 hover:text-white"
                            }`}
                          >
                            {currentPlayingIndex === index ? (
                              <>
                                <span className="mr-1">Playing</span>
                                <span className="flex space-x-1">
                                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: "0ms" }}></span>
                                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></span>
                                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: "600ms" }}></span>
                                </span>
                              </>
                            ) : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828" />
                                </svg>
                                <span>Listen</span>
                              </>
                            )}
                          </button>
                        )}
                                                <div 
                          className={`absolute w-2 h-2 ${
                            msg.role === "assistant" 
                              ? "bg-white bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 border border-gray-200" 
                              : "bg-blue-500 bottom-0 right-0 transform translate-x-1/2 translate-y-1/2"
                          } rounded-full`}
                        ></div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Box */}
            <div className="border-t p-3 flex items-center space-x-2">
              <button 
                onClick={handleSpeechToText} 
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                title="Voice Input"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7m-4-4h8M19 11a7 7 0 10-14 0v1a7 7 0 1014 0v-1z" />
                </svg>
              </button>
              <input 
                ref={inputRef}
                type="text" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..." 
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button 
                onClick={sendMessage} 
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V10z" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <audio ref={audioRef} />
    </div>
  );
}
