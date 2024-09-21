const Loading = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-4 border-[#c3002d] border-t-transparent rounded-full animate-spin`}
      >
      </div>
      <p>Einen Moment bitte.</p>
    </div>
  );
};

export default Loading;