import { useEffect, useRef, useState } from 'react';

const ImagePreview = ({ image, setImage }) => {
  const [imageHeight, setImageHeight] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    if (image && imageRef.current) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const newHeight = Math.min(200, 300 / aspectRatio);
        setImageHeight(newHeight);
      };
      img.src = URL.createObjectURL(image);
    }
  }, [image]);

  const removeImage = () => {
    setImage(null);
  };

  return (
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
  );
};

export default ImagePreview;