import { useRef, useState, useEffect } from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';
import ImagePreview from './ImagePreview';

const InputArea = ({ inputText, setInputText, image, setImage, isLoading, handleSendMessage }) => {
  const [dragActive, setDragActive] = useState(false);
  const [showDragDrop, setShowDragDrop] = useState(true);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setShowDragDrop(window.innerWidth > 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const onSendMessage = () => {
    if (inputText.trim() || image) {
      handleSendMessage();
      setInputText('');
      setImage(null);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleTextareaChange = (e) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="p-2 sm:p-4 border-t border-gray-300 bottom-0 left-0 right-0 bg-white sticky">
      <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
        <div
          className={`w-full border-2 rounded-lg flex flex-col overflow-hidden ${
            dragActive ? 'border-[#c3002d]' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex items-start sm:items-center p-2">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={handleTextareaChange}
              onKeyPress={handleKeyPress}
              placeholder="Hier deine Frage"
              className="flex-grow focus:outline-none text-sm sm:text-base p-2 min-h-[40px] max-h-[200px] resize-none"
              disabled={isLoading}
            />
            <div className="flex flex-col sm:flex-row items-center ml-2">
              <button
                onClick={triggerFileInput}
                className="mb-2 sm:mb-0 text-gray-400 hover:text-[#c3002d] focus:outline-none touch-manipulation p-2 sm:p-1"
              >
                <ImageIcon className="w-6 h-6 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={onSendMessage}
                className="text-[#c3002d] hover:text-[#90001f] focus:outline-none touch-manipulation p-2 sm:p-1"
                disabled={isLoading || (!inputText.trim() && !image)}
              >
                <Send className="w-6 h-6 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
          {image ? (
            <ImagePreview image={image} setImage={setImage} />
          ) : (
            showDragDrop && (
              <div className="w-full h-10 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                Drag & Drop Bild
              </div>
            )
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