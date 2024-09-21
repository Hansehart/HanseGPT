import { useState } from 'react';
import { User, Mail, Phone, ChevronDown } from "lucide-react";
import LoadingPhrase from "../components/basics/LoadingPhrase";

const Message = ({ message, onLoadMore }) => {
  const [expanded, setExpanded] = useState(false);
  const isUser = message.sender === "user";

  const renderEmployeeInfo = (text) => {
    const employees = text.split("\n\n");
    return employees.map((employee, index) => {
      const lines = employee.split("\n");
      const name = lines[0];
      const emailLine = lines.find((line) => line.startsWith("Mail:"));
      const phoneLine = lines.find((line) => line.startsWith("Telefon:"));
      const email = emailLine ? emailLine.split(": ")[1] : "";
      const phone = phoneLine ? phoneLine.split(": ")[1] : "";
      return (
        <div key={index} className="mb-4">
          <div className="font-bold text-lg">{name}</div>
          {lines.slice(1).map(
            (line, lineIndex) =>
              !line.startsWith("Mail:") &&
              !line.startsWith("Telefon:") && (
                <div key={lineIndex} className="text-sm">
                  {line}
                </div>
              )
          )}
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
                  {renderEmployeeInfo(expanded ? message.text : message.text.split("\n\n").slice(0, 3).join("\n\n"))}
                  {!expanded && message.text.split("\n\n").length > 3 && (
                    <button
                      onClick={() => setExpanded(true)}
                      className="text-blue-500 hover:underline flex items-center mt-2"
                    >
                      <ChevronDown size={14} className="mr-1" />
                      Weitere anzeigen
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
      {!isUser && !message.loading && (
        <button
          onClick={onLoadMore}
          className="ml-2 px-3 py-1 bg-[#c3002d] text-white rounded hover:bg-[#90001f]"
        >
          Weitere
        </button>
      )}
    </div>
  );
};

export default Message;