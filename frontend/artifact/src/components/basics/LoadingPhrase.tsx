import { useState, useEffect } from 'react';

const loadingPhrases = [
  "Wishing the table...",
  "Thinking on it...",
  "Bouncing balls...",
  "Shuffling thoughts...",
  "Brewing ideas...",
  "Connecting neurons...",
  "Decoding mysteries...",
  "Untangling logic...",
  "Polishing answers...",
  "Juggling concepts..."
];

const LoadingAnimation = () => {
  const [currentPhrase, setCurrentPhrase] = useState(loadingPhrases[0]);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhrase(prevPhrase => {
        const currentIndex = loadingPhrases.indexOf(prevPhrase);
        const nextIndex = (currentIndex + 1) % loadingPhrases.length;
        return loadingPhrases[nextIndex];
      });
    }, 2000);

    const dotInterval = setInterval(() => {
      setDots(prevDots => prevDots.length < 3 ? prevDots + '.' : '');
    }, 500);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-20 bg-gray-100 rounded-lg p-4">
      <div className="text-lg font-semibold text-[#c3002d] mb-2">
        {currentPhrase}{dots}
      </div>
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-[#c3002d] rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingAnimation;