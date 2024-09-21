import { User, Mail } from 'lucide-react';
import LoadingPhrase from "../basics/LoadingPhrase";

const Message = ({ message }) => {
  const isUser = message.sender === "user";

  const renderEmployeeInfo = (text) => {
    const employees = text.split('\n\n');
    return employees.map((employee, index) => {
      const lines = employee.split('\n');
      const name = lines[0];
      const emailLine = lines.find(line => line.startsWith('Mail:'));
      const email = emailLine ? emailLine.split(': ')[1] : '';

      return (
        <div key={index} className="mb-2">
          <div>{name}</div>
          {email && (
            <a 
              href={`mailto:${email}`} 
              className="text-blue-500 hover:underline flex items-center"
            >
              <Mail size={14} className="mr-1" />
              {email}
            </a>
          )}
          {lines.slice(1).map((line, lineIndex) => (
            <div key={lineIndex}>{line}</div>
          ))}
        </div>
      );
    });
  };

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
              {isUser ? (
                <pre className="whitespace-pre-wrap font-sans">
                  {message.text}
                </pre>
              ) : (
                renderEmployeeInfo(message.text)
              )}
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