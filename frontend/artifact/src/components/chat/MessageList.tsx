import Message from './Message';

const MessageList = ({ messages, messagesEndRef, onGenerateMore }) => {
  return (
    <div className="flex-grow overflow-auto p-4 pt-20 pb-24">
      <h2 className="text-xl font-bold mb-4 text-[#c3002d]">Chat</h2>
      {messages.map((message, index) => (
        <Message 
          key={index} 
          message={message} 
          onGenerateMore={onGenerateMore}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;