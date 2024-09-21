import { useState, useEffect, useRef } from 'react';
import { Send, Loader, User } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const newMessage = { text: inputText, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('https://gpt.hansehart.de/api/ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const aiMessage = { text: data.result_text, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'Sorry, there was an error processing your request.', sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message) => {
    if (message.sender === 'user') {
      return <div className="bg-[#70001a] text-white p-2 rounded-lg">{message.text}</div>;
    } else {
      const employees = message.text.split('\n\n').filter(emp => emp.trim() !== '');
      return (
        <div className="bg-gray-200 text-gray-800 p-2 rounded-lg">
          <p className="font-bold mb-2">Die folgenden Mitarbeiter können dir behilflich sein:</p>
          {employees.map((emp, index) => {
            const [name, role, ...description] = emp.split('\n');
            return (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex items-center mb-1">
                  <User className="mr-2 text-[#70001a]" size={20} />
                  <span className="font-semibold">{name}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{role}</p>
                <p className="text-sm">{description.join(' ').trim()}</p>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="bg-[#70001a] text-white p-4">
        <h1 className="text-2xl font-bold">Chat with CompanyCompass</h1>
      </div>
      <div className="flex-grow overflow-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            {renderMessage(message)}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-300">
        <div className="flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message here..."
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#70001a]"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#70001a] text-white p-2 rounded-r-lg hover:bg-[#90001f] focus:outline-none focus:ring-2 focus:ring-[#70001a]"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin" /> : <Send />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;