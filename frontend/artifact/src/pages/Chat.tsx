import { useState, useEffect, useRef } from "react";
import { Send, User, Image as ImageIcon } from "lucide-react";

// LoadingAnimation Component
const loadingPhrases = [
  "verbinde Neuronen",
  "wische Bier auf",
  "durchsuche Datenbank",
  "DROP * FROM users;",
  "denke gründlich nach",
];

const LoadingAnimation = () => {
  const [currentPhrase, setCurrentPhrase] = useState(loadingPhrases[0]);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhrase(prevPhrase => {
        const currentIndex = loadingPhrases.indexOf(prevPhrase);
        const nextIndex = (currentIndex + 1) % loadingPhrases.length;
        return loadingPhrases[nextIndex];
      });
    }, 2000);

    const dotInterval = setInterval(() => {
      setDots(prevDots => prevDots.length < 3 ? prevDots + '.' : '');
    }, 500);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-20 bg-gray-100 rounded-lg p-4">
      <div className="text-lg font-semibold text-[#c3002d] mb-2">
        {currentPhrase}{dots}
      </div>
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-[#c3002d] rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

// ChatInterface Component
const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState(null);
  const [imageHeight, setImageHeight] = useState(0);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        text: "Moin bei RossConnect. Wenn suchst Du oder welches Problem liegt vor?",
        sender: "ai",
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (image && imageRef.current) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const newHeight = Math.min(200, 300 / aspectRatio);
        setImageHeight(newHeight);
      };
      img.src = URL.createObjectURL(image);
    } else {
      setImageHeight(0);
    }
  }, [image]);

  const handleSendMessage = async () => {
    if (inputText.trim() === "" && !image) return;

    const newMessage = { text: inputText, sender: "user", image: image };
    setMessages((prev) => [...prev, newMessage, { sender: "ai", loading: true }]);
    setInputText("");
    setImage(null);
    setIsLoading(true);

    try {
      const response = await fetch("https://gpt.hansehart.de/api/ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_text: inputText }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: data.result_text, sender: "ai" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: "Sorry, there was an error processing your request.", sender: "ai" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please upload an image file.");
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const renderMessage = (message) => {
    const isUser = message.sender === "user";
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start mb-4`}>
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-[#c3002d] flex-shrink-0 mr-2 flex items-center justify-center">
            <User className="text-white" size={16} />
          </div>
        )}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
          {message.loading ? (
            <LoadingAnimation />
          ) : (
            <>
              <div className={`p-2 rounded-lg ${isUser ? 'bg-[#c3002d] text-white' : 'bg-gray-200 text-gray-800'}`}>
                {message.text}
              </div>
              {message.image && (
                <img 
                  src={URL.createObjectURL(message.image)} 
                  alt="User uploaded" 
                  className="mt-2 max-w-full rounded-lg"
                />
              )}
            </>
          )}
        </div>
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 ml-2 flex items-center justify-center">
            <User className="text-gray-600" size={16} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-[90vw] mx-auto">
      <div className="h-16 bg-[#c3002d] fixed top-0 left-0 right-0 z-10"></div>
      <div className="flex-grow overflow-auto p-4 pt-20 pb-24">
        <h2 className="text-xl font-bold mb-4 text-[#c3002d]">Chat</h2>
        {messages.map((message, index) => (
          <div key={index}>
            {renderMessage(message)}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-300 bottom-0 left-0 right-0 bg-white">
        <div className="flex flex-col items-center max-w-[90vw] mx-auto">
          <div 
            className={`w-full border-2 rounded-lg flex flex-col overflow-hidden ${dragActive ? 'border-[#c3002d]' : 'border-gray-300'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex items-center p-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Hier deine Frage"
                className="flex-grow focus:outline-none text-sm"
                disabled={isLoading}
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="ml-2 text-gray-400 hover:text-[#c3002d] focus:outline-none"
              >
                <ImageIcon size={20} />
              </button>
              <button
                onClick={handleSendMessage}
                className="ml-2 text-[#c3002d] hover:text-[#90001f] focus:outline-none"
                disabled={isLoading}
              >
                <Send size={20} />
              </button>
            </div>
            {image && (
              <div className="relative w-full" style={{ height: `${imageHeight}px` }}>
                <img 
                  ref={imageRef}
                  src={URL.createObjectURL(image)} 
                  alt="Uploaded" 
                  className="w-full h-full object-contain"
                />
                <button 
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  onClick={removeImage}
                >
                  X
                </button>
              </div>
            )}
            {!image && (
              <div className="w-full h-10 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                Drag & Drop Bild oder klicken
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;