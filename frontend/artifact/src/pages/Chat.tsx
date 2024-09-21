import { useState, useEffect, useRef } from "react";
import { Send, Loader, User, Image as ImageIcon } from "lucide-react";

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
        const newHeight = Math.min(200, 300 / aspectRatio); // Max height of 200px, max width of 300px
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
    setMessages((prev) => [...prev, newMessage]);
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
      const aiMessage = { text: data.result_text, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        text: "Sorry, there was an error processing your request.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMessage]);
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
    if (message.sender === "user") {
      return (
        <div className="flex flex-col items-end">
          <p className="bg-[#c3002d] text-white p-2 rounded-lg max-w-[80%]">
            {message.text}
          </p>
          {message.image && (
            <img 
              src={URL.createObjectURL(message.image)} 
              alt="User uploaded" 
              className="mt-2 max-w-[80%] rounded-lg"
            />
          )}
        </div>
      );
    } else {
      const employees = message.text
        .split("\n\n")
        .filter((emp) => emp.trim() !== "");
      return (
        <div className="bg-gray-200 text-gray-800 p-2 rounded-lg max-w-[80%]">
          {employees.map((emp, index) => {
            const [name, role, ...description] = emp.split("\n");
            return (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex items-center mb-1">
                  <User className="mr-2 text-[#c3002d] flex-shrink-0" size={16} />
                  <span className="font-semibold text-sm">{name}</span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{role}</p>
                <p className="text-xs">{description.join(" ").trim()}</p>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-[90vw] mx-auto">
      <div className="h-16 bg-[#c3002d] fixed top-0 left-0 right-0 z-10"></div>
      <div className="flex-grow overflow-auto p-4 pt-20 pb-24">
        <h2 className="text-xl font-bold mb-4 text-[#c3002d]">Chat</h2>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === "user" ? "flex justify-end" : "flex justify-start"
            }`}
          >
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
                {isLoading ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
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
                Drag & Drop Bild
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