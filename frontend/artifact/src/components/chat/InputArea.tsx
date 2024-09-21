import { useRef, useState } from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';
import ImagePreview from './ImagePreview';

const InputArea = ({ inputText, setInputText, image, setImage, isLoading, handleSendMessage }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

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

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-4 border-t border-gray-300 bottom-0 left-0 right-0 bg-white fixed">
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
              onClick={triggerFileInput}
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
          {image ? (
            <ImagePreview image={image} setImage={setImage} />
          ) : (
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
  );
};

export default InputArea;