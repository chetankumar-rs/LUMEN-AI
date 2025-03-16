import { useState,useRef,useEffect } from "react";

 
export default function ChatBot({msg}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:6005/api/generate/g", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      
      const data = await response.json();
      
      // Log the full response for debugging
      console.log("API Response:", data);
      
      const formattedResponse = formatResponse(data.text);
      
      // Add the speech data to the message
      const newMessage = { 
        role: "assistant", 
        content: formattedResponse,
        speechData: data.speech  // This contains the entire speech response object
      };
      
      setMessages(prev => [...prev, { role: "user", content: prompt }, newMessage]);
      setPrompt("");
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Error fetching response" }]);
    }
    
    setLoading(false);
  };

  // Function to Format AI Response (Splitting "**" to Bold Key Points)
  const formatResponse = (response) => {
    return response.split("**").map((item, index) => (
      index % 2 === 1 ? <strong key={index}>{item}</strong> : <span key={index}>{item}</span>
    ));
  };

  // Function to play speech for a message
  const playAudio = (speechData) => {
    try {
      console.log("Speech data received:", JSON.stringify(speechData).substring(0, 200) + "...");
      
      // Basic validation
      if (!speechData) {
        console.error("Speech data is null or undefined");
        return;
      }
  
      // Extract audio data - handle different possible structures
      let audioBase64 = null;
      
      if (speechData.audios && Array.isArray(speechData.audios)) {
        console.log("Found audios array with length:", speechData.audios.length);
        
        if (speechData.audios.length > 0) {
          const audioData = speechData.audios[0];
          console.log("First audio item type:", typeof audioData);
          
          if (typeof audioData === 'string') {
            audioBase64 = audioData;
            console.log("Found string audio data");
          } else if (audioData && typeof audioData === 'object') {
            console.log("Audio data object keys:", Object.keys(audioData));
            audioBase64 = audioData.audio_base64 || audioData.audio || null;
            
            if (audioBase64) {
              console.log("Found audio data in object property");
            }
          }
        } else {
          console.log("Audios array is empty");
          // If speech API call failed or returned empty, inform the user
          // You could add UI feedback here
          return;
        }
      } else if (typeof speechData === 'string') {
        audioBase64 = speechData;
        console.log("Speech data is directly a string");
      } else if (speechData.speech && speechData.speech.audios) {
        // Handle nested structure if response wasn't properly extracted
        console.log("Found nested speech.audios structure");
        return playAudio(speechData.speech);
      }
  
      // Final validation
      if (!audioBase64) {
        console.error("Could not extract valid audio data from response");
        return;
      }
  
      // Safety check: ensure it looks like base64
      if (!/^[A-Za-z0-9+/=]+$/.test(audioBase64)) {
        console.error("Invalid base64 data detected");
        return;
      }
  
      console.log("Audio base64 data length:", audioBase64.length);
      
      // Create audio element if ref doesn't exist yet
      if (!audioRef.current) {
        console.error("Audio reference is not available");
        return;
      }
  
      // Set up audio source and play
      const audioSrc = `data:audio/wav;base64,${audioBase64}`;
      audioRef.current.src = audioSrc;
      audioRef.current.load();
      
      // Set up event handlers
      audioRef.current.onloadeddata = () => {
        console.log("Audio loaded, duration:", audioRef.current.duration);
        
        audioRef.current
          .play()
          .then(() => {
            setIsSpeaking(true);
            console.log("Audio playing successfully");
          })
          .catch((err) => {
            console.error("Audio play error:", err);
            setIsSpeaking(false);
          });
      };
      
      audioRef.current.onended = () => {
        console.log("Audio playback complete");
        setIsSpeaking(false);
      };
      
      audioRef.current.onerror = (e) => {
        console.error("Audio loading error:", e.target.error);
        setIsSpeaking(false);
      };
    } catch (error) {
      console.error("Unexpected error in playAudio:", error);
      setIsSpeaking(false);
    }
  };

  // Handle audio events
  const handleAudioEnded = () => {
    setIsSpeaking(false);
    setCurrentPlayingIndex(null);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {/* Chat toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'rotate-90 transform' : ''}`}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>
      
      {/* Chat panel */}
      {isOpen && (
        <div 
          className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 absolute bottom-16 right-0 overflow-hidden transition-all duration-300 transform"
          style={{
            animation: 'fadeInUp 0.3s ease-out',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="font-medium">Chat Assistant</h3>
            </div>
            <div className="flex space-x-2">
              <button className="hover:bg-blue-600 p-1 rounded transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Messages area */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-3">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <p className="text-center">Start a conversation!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
                    style={{
                      animation: 'fadeIn 0.3s ease-out',
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div 
                      className={`max-w-3/4 rounded-2xl p-3 ${
                        msg.role === "assistant" 
                          ? "bg-white border border-gray-200 rounded-tl-none text-gray-800" 
                          : "bg-blue-500 text-white rounded-tr-none"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      
                      {msg.role === "assistant" && msg.speechData && (
                        <button
                          onClick={() => playAudio(msg.speechData, index)}
                          disabled={isSpeaking}
                          className={`mt-2 ${
                            isSpeaking && currentPlayingIndex === index 
                              ? "bg-blue-100 text-blue-600 border border-blue-200" 
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                          } text-xs px-3 py-1 rounded-full transition-all duration-200 flex items-center space-x-1`}
                        >
                          {isSpeaking && currentPlayingIndex === index ? (
                            <>
                              <span className="flex space-x-1 items-center">
                                <span className="w-1.5 h-3 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0s'}}></span>
                                <span className="w-1.5 h-4 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
                                <span className="w-1.5 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
                                <span className="ml-1">Playing</span>
                              </span>
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                              </svg>
                              <span className="ml-1">Listen</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {/* Input area */}
          <div className="p-4 border-t">
            <form 
              className="flex items-center space-x-2"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your message..."
                disabled={loading}
              />
              <button 
                type="submit"
                className={`${
                  loading || !prompt.trim() 
                    ? "bg-gray-300 cursor-not-allowed" 
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200`} 
                disabled={loading || !prompt.trim()}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                )}
              </button>
            </form>
          </div>
          
          <audio
            ref={audioRef}
            onEnded={handleAudioEnded}
            onError={(e) => {
              console.error("Audio error:", e);
              setIsSpeaking(false);
              setCurrentPlayingIndex(null);
            }}
            style={{ display: 'none' }}
          />
        </div>
      )}
      
      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}