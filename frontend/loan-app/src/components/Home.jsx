import { useNavigate } from "react-router-dom";
import { useState, useEffect ,useRef} from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <Footer />
      <ChatBot/>
    </div>
  );
}

function ChatBot() {
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
      const response = await fetch("http://localhost:5005/api/generate/g", {
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
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
        💬
      </button>
      {isOpen && (
        <div className="bg-white p-4 shadow-lg rounded-md w-80 absolute bottom-12 right-0">
          <div className="h-60 overflow-y-auto border p-2 rounded bg-gray-100 space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded ${msg.role === "assistant" ? "bg-blue-200" : "bg-gray-200"}`}>
                <p>{msg.content}</p>
                {msg.role === "assistant" && msg.speechData && (
                  <button 
                    onClick={() => playAudio(msg.speechData, index)} 
                    disabled={isSpeaking}
                    className="mt-1 bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
                  >
                    {isSpeaking && currentPlayingIndex === index ? "Playing..." : "🔊 Listen"}
                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              className="w-full border rounded p-2"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask me something..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} className="bg-green-500 text-white p-2 rounded ml-2" disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
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
    </div>
  );
}



function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 w-full z-50 flex justify-between items-center p-4 transition-all duration-300 ease-in-out ${scrolled ? "bg-white text-blue-700 shadow-lg" : "bg-gradient-to-r from-blue-600 to-purple-700 text-white"}`}>
      {/* Left Side: LUMEN Logo */}
      <div className="flex items-center space-x-2">
        <div className="text-3xl font-extrabold tracking-wide animate-pulse cursor-pointer" onClick={() => navigate("/")}>
          LUMEN
        </div>
       
      </div>
      
      {/* Middle: Navigation */}
      <div className="hidden md:flex  transform translate-x-4 space-x-6">
        <button className="text-blue-600 bg-white border rounded-full px-4 py-2 font-semibold hover:scale-110 transition-transform duration-200 hover:text-white hover:bg-gradient-to-r from-blue-600 to-purple-700" onClick={() => document.getElementById("features").scrollIntoView({ behavior: 'smooth' })}>
          Features
        </button>
        <button className="text-blue-600 bg-white px-4 py-2  border rounded-full font-semibold hover:scale-110 transition-transform duration-200 hover:text-white hover:bg-gradient-to-r from-blue-600 to-purple-700" onClick={() =>  navigate('/LoanCheckerfirst')}>
          Loan Checker
        </button>
        <button className="text-blue-600 bg-white px-4 py-2   border rounded-full font-semibold hover:scale-110 transition-transform duration-200 hover:text-white hover:bg-gradient-to-r from-blue-600 to-purple-700" onClick={() =>  navigate('/LoanGuidance')}>
         Loan Guidance
        </button>
        <button className="text-blue-600 bg-white px-4 py-2   border rounded-full font-semibold hover:scale-110 transition-transform duration-200 hover:text-white hover:bg-gradient-to-r from-blue-600 to-purple-700" onClick={() => document.getElementById("about").scrollIntoView({ behavior: 'smooth' })}>
          About
        </button>
      </div>
      
      {/* Right Side: Authentication Buttons */}
      <div className="flex space-x-2 md:space-x-4">
        <button
          className="bg-white text-blue-600 px-3 md:px-5 py-1 md:py-2 rounded-full font-semibold shadow-md hover:bg-gradient-to-r from-blue-600 to-purple-700 hover:text-white hover:scale-110 transition-transform duration-200"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
        <button
          className="bg-white text-blue-600 px-3 md:px-5 py-1 md:py-2 rounded-full font-semibold shadow-md hover:bg-gradient-to-r from-blue-600 to-purple-700 hover:text-white hover:scale-110 transition-transform duration-200"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

function Outlet() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-700 text-white"
    >
      <h1 className="text-5xl font-extrabold mb-4">Welcome to Lumen</h1>
      <p className="text-lg mb-6">Your personalized financial assistant</p>
      <motion.button 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
        className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg text-lg font-semibold"
      >
        Get Started
      </motion.button>
    </motion.div>
  );
}







function HeroSection() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-24 mt-16">
      {/* Left Text Content */}
      <div className="max-w-xl mb-10 md:mb-0">
     
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4">
        Loan Understanding <span className="text-purple-600"> & Management Expert Navigator</span>
        </h1><br/>
        <span className="hidden md:inline text-lg  font-bold">Simplify Your  Financial Journey </span>
        <p className="text-lg text-gray-700 mb-8">
          LUMEN helps you navigate loan options, check eligibility, and make informed financial decisions with 
          AI-powered guidance in your preferred language.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            onClick={() => navigate("/LoanChecker")}

          >
            Check Eligibility Now
          </button>
          <button
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors duration-300"
            onClick={() => document.getElementById("features").scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More
          </button>
        </div>
      </div>
      
      {/* Right Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center shadow-xl">
          <div className="absolute inset-0 rounded-full bg-white opacity-30 animate-pulse"></div>
          <span className="text-6xl font-extrabold text-blue-800">LUMEN</span>
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Loan Eligibility Support",
      description: "Our AI assistant asks relevant questions to assess your financial profile and determine eligibility for various loans, providing customized recommendations.",
      icon: "💰"
    },
    {
      title: "Loan Application Guidance",
      description: "Get step-by-step instructions on applying for loans, including document requirements and filing procedures.",
      icon: "📝"
    },
    {
      title: "Financial Literacy Support",
      description: "Learn about credit scores, responsible borrowing, and savings strategies with personalized guidance to improve financial wellness.",
      icon: "📚"
    },
    {
      title: "Multilingual Accessibility",
      description: "Communicate in your preferred language with both voice and text-based interaction options for maximum inclusivity.",
      icon: "🌐"
    }
  ];
  
  return (
    <div id="features" className="px-8 md:px-16 py-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-4">LUMEN Features</h2>
      <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
        Discover how our AI-powered platform can revolutionize your financial decision-making process.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-blue-700 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div id="about" className=" px-8 md:px-16 py-16 bg-white">
      <h2 className="text-3xl transform -translate-y-5 md:text-4xl font-bold text-center   text-blue-800 mb-4">About LUMEN</h2>
      
      <div className="max-w-4xl mx-auto">
        <div className=" flex flex-col gap-8 items-center">
          <div className=" w-full md:w-1/2 order-2 md:order-1">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              LUMEN (Loan Understanding & Management Expert Navigator) revolutionizes financial accessibility through AI-driven navigation. 
              Our solution tackles the primary deficit in financial literacy by allowing users to navigate loan eligibility, 
              select best-fit financial products, and complete tedious applications—all through a user-friendly AI assistant.
            </p>
            
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Our Impact</h3>
            <p className="text-gray-600">
              LUMEN is the future of financial inclusion—where AI bridges knowledge gaps and empowers individuals to take control of their financial journey. 
              By demystifying financial literacy and loan processes, we're opening doors to economic opportunity for underserved communities.
            </p>
          </div>
          
          
        </div>
      </div>
    </div>
  );
}
function Footer() {
    return (
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white px-8 md:px-16 py-12">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">LUMEN</h3>
            <p className="text-blue-200 max-w-md">
              Loan Understanding & Management Expert Navigator - Simplifying your financial journey through AI-powered guidance.
            </p>
          </div>
  
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-4">Product</h4>
              <ul className="space-y-2">
                <li className="text-blue-200 hover:text-white transition-colors cursor-pointer">Features</li>
                <li className="text-blue-200 hover:text-white transition-colors cursor-pointer">Loan Checker</li>
                <li className="text-blue-200 hover:text-white transition-colors cursor-pointer">About</li>
              </ul>
            </div>
  
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li className="text-blue-200 hover:text-white transition-colors cursor-pointer">Team</li>
                <li className="text-blue-200 hover:text-white transition-colors cursor-pointer">Careers</li>
                <li className="text-blue-200 hover:text-white transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
  
            <div>
              <h4 className="font-semibold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li className="text-blue-200 hover:text-white transition-colors cursor-pointer">Help Center</li>
                <li className="text-blue-200 hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                <li className="text-blue-200 hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>
  
        <div className="border-t border-blue-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} LUMEN. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    );
  }
  