import React from 'react';
interface ImageTitleSectionProps {
    Title: string;
  }
  
  const ImageTitleSection: React.FC<ImageTitleSectionProps> = ({ Title }) => {
    return (
        <div className='flex flex-col items-center justify-center'>
      <div className="flex items-center justify-center mb-4">
        <img
          src="/asp.net.png"
          alt="ASP.NET Logo"
          className="hover:scale-105 duration-300"
          style={{ width: '80px', height: '80px' }}
        />
        <div className="flex items-center p-2">
          <h1>+</h1>
        </div>
        <img
          src="/react.png"
          alt="React Logo"
          className="hover:scale-105 duration-300"
          style={{ width: '80px', height: '80px' }}
        />
        </div>
        <div className="p-2">
          <h1 className="text-bold text-lg m-2 text-[color:var(--primaryColor)]">{Title}</h1>
        </div>
      </div>
    );
  };
  
  export default ImageTitleSection;