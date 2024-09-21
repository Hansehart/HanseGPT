import { User } from 'lucide-react';
import LoadingPhrase from "../basics/LoadingPhrase";

const Message = ({ message }) => {
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
          <LoadingPhrase />
        ) : (
          <>
            <div className={`p-2 rounded-lg ${isUser ? 'bg-[#c3002d] text-white' : 'bg-gray-200 text-gray-800'}`}>
              <pre className="whitespace-pre-wrap font-sans">
                {message.text}
              </pre>
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

export default Message;