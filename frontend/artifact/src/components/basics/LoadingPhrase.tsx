import { useState, useEffect } from 'react';

const loadingPhrases = [
    "verbinde Neuronen",
    "wische Bier auf",
    "durchsuche Datenbank",
    "DROP FROM users;",
    "denke gründlich nach",
    "versende Flaschenpost"
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
    </div>
  );
};

export default LoadingAnimation;