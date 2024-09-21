import { useState, useEffect, useRef } from "react";
import MessageList from "../components/chat/MessageList";
import InputArea from "../components/chat/InputArea";

const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]);
      } else {
        reject(new Error("Failed to convert image to base64"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [excludeIds, setExcludeIds] = useState([]);
  const [lastQuery, setLastQuery] = useState("");
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setMessages([
      {
        text: "Moin bei RossConnect. Wobei brauchst Du Hilfe?",
        sender: "ai",
      },
    ]);
    
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isInitialLoad) {
      scrollToBottom();
    } else {
      setIsInitialLoad(false);
    }
  }, [messages, isInitialLoad]);

  const handleSendMessage = async (text = inputText, generateMore = false) => {
    let queryText = typeof text === 'string' ? text.trim() : '';
    
    if (!generateMore && queryText === "" && !image) return;

    if (!generateMore) {
      const newMessage = { text: queryText, sender: "user", image: image };
      setMessages((prev) => [...prev, newMessage]);
      setLastQuery(queryText);
      setExcludeIds([]); // Reset exclude IDs for new query
    } else {
      const generateMoreMessage = { text: "Give me more results", sender: "user" };
      setMessages((prev) => [...prev, generateMoreMessage]);
      queryText = lastQuery; // Use the last query for "Generate More"
    }

    setMessages((prev) => [...prev, { sender: "ai", loading: true }]);
    setInputText("");
    setIsLoading(true);

    try {
      let requestBody = {
        input_text: queryText,
        input_image: "",
        exclude_ids: excludeIds,
      };

      if (image) {
        try {
          const base64Image = await convertImageToBase64(image);
          requestBody.input_image = base64Image;
        } catch (error) {
          console.error("Error converting image to base64:", error);
        }
      }

      const response = await fetch("https://gpt.hansehart.de/api/ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { 
          text: data.result_text, 
          sender: "ai", 
          personalIds: data.personal_ids,
          hasMore: data.personal_ids.length > 0
        },
      ]);
      setExcludeIds((prev) => [...prev, ...data.personal_ids]);

    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          text: "Sorry, der Praktikant hat den falschen Stecker gezogen!",
          sender: "ai",
        },
      ]);
    } finally {
      setIsLoading(false);
      setImage(null);
    }
  };

  const handleGenerateMore = () => {
    handleSendMessage(lastQuery, true);
  };

  return (
    <>
      <div className="h-16 bg-[#c3002d] absolute top-0 left-0 right-0 z-10"></div>
      <div className="flex flex-col h-screen bg-white max-w-[90vw] mx-auto">
        <div ref={chatContainerRef} className="flex-grow overflow-auto">
          <MessageList 
            messages={messages} 
            messagesEndRef={messagesEndRef} 
            onGenerateMore={handleGenerateMore}
          />
        </div>
        <InputArea
          inputText={inputText}
          setInputText={setInputText}
          image={image}
          setImage={setImage}
          isLoading={isLoading}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </>
  );
};

export default ChatInterface;