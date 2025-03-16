import { useState, useRef, useEffect } from "react";

export default function ChatBot({ msg }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en-IN");
  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);

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
       console.log(data.text)
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
          originalText=translationData.translated_text;
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
    
    audioRef.current.play()
      .then(() => setIsSpeaking(true))
      .catch(err => console.error("Audio play error:", err));
    
    audioRef.current.onended = () => {
      setIsSpeaking(false);
      setCurrentPlayingIndex(null);
    };
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      <button onClick={() => setIsOpen(!isOpen)} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
        {isOpen ? "Close" : "Chat"}
      </button>
      {isOpen && (
        <div className="bg-white w-96 p-4 shadow-2xl rounded-2xl mt-4">
          <div className="mb-4">
            <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="border p-2 w-full rounded-md">
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          <div className="h-60 overflow-y-auto p-2 bg-gray-100 rounded-lg">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 my-1 rounded-lg ${msg.role === "assistant" ? "bg-blue-100 text-left" : "bg-green-100 text-right"}`}>
                <p>{msg.content}</p>
                {msg.speechData && (
                  <button onClick={() => playAudio(msg.speechData, index)} className="mt-1 text-sm text-blue-500 hover:underline">Listen</button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="mt-4 flex">
            <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Type your message..." className="border p-2 flex-1 rounded-l-md" />
            <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded-r-md">Send</button>
          </form>
          <audio ref={audioRef} style={{ display: 'none' }} />
        </div>
      )}
    </div>
  );
}
