import { User, Mail, Phone, Plus } from "lucide-react";
import LoadingPhrase from "../basics/LoadingPhrase";

const Message = ({ message, onGenerateMore }) => {
  const isUser = message.sender === "user";

  const renderEmployeeInfo = (text) => {
    const employees = text.split("\n\n").filter(emp => emp.trim() !== "");
    
    return employees.map((employee, index) => {
      const lines = employee.split("\n");
      const [name, role] = lines[0].split(", ");
      const emailLine = lines.find((line) => line.startsWith("Mail:"));
      const phoneLine = lines.find((line) => line.startsWith("Telefon:"));
      const email = emailLine ? emailLine.split(": ")[1] : "";
      const phone = phoneLine ? phoneLine.split(": ")[1] : "";
      const description = lines.slice(3).join("\n");

      return (
        <div key={index} className="mb-4 p-2 bg-white rounded shadow">
          <div className="font-bold text-lg">{name}</div>
          <div className="text-sm text-gray-600 mb-1">{role}</div>
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-blue-500 hover:underline flex items-center mb-1"
            >
              <Mail size={14} className="mr-1" />
              {email}
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-blue-500 hover:underline flex items-center mb-1"
            >
              <Phone size={14} className="mr-1" />
              {phone}
            </a>
          )}
          <div className="text-sm mt-1">{description}</div>
        </div>
      );
    });
  };

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } items-start mb-4`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#c3002d] flex-shrink-0 mr-2 flex items-center justify-center">
          <User className="text-white" size={16} />
        </div>
      )}
      <div
        className={`flex flex-col ${
          isUser ? "items-end" : "items-start"
        } max-w-[70%]`}
      >
        {message.loading ? (
          <LoadingPhrase />
        ) : (
          <>
            <div
              className={`p-2 rounded-lg ${
                isUser ? "bg-[#c3002d] text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {isUser ? (
                <pre className="whitespace-pre-wrap font-sans">
                  {message.text}
                </pre>
              ) : (
                <>
                  {renderEmployeeInfo(message.text)}
                  {message.hasMore && (
                    <button
                      onClick={onGenerateMore}
                      className="mt-2 flex items-center text-[#c3002d] hover:underline"
                    >
                      <Plus size={14} className="mr-1" />
                      Generate More
                    </button>
                  )}
                </>
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