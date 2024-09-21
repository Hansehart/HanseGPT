import { ExternalLink } from 'lucide-react';

const LicenseItem = ({ name, licenseType, link }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-[#c3002d] mb-2">{name}</h3>
    <p className="mb-1">Lizenz: {licenseType}</p>
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-[#c3002d] hover:underline inline-flex items-center"
    >
      Lizenzdetails
      <ExternalLink size={16} className="ml-1" />
    </a>
  </div>
);

const License = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-16 bg-[#c3002d]"></div>
      
      <div className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-[#c3002d] mb-8">Lizenzen</h1>
        
        <p className="mb-6">
          Die Seiten enthält Lizenzinformationen für Produkte, die verwendet wurden.    
        </p>
        
        <LicenseItem 
          name="Lucide React"
          licenseType="ISC License"
          link="https://github.com/lucide-icons/lucide/blob/main/LICENSE"
        />
        
        <LicenseItem 
          name="React"
          licenseType="MIT License"
          link="https://github.com/facebook/react/blob/main/LICENSE"
        />
        
        <LicenseItem 
          name="Framer Motion"
          licenseType="MIT License"
          link="https://github.com/framer/motion/blob/main/LICENSE.md"
        />
        
        <LicenseItem 
          name="Tailwind CSS"
          licenseType="MIT License"
          link="https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE"
        />
      </div>
    </div>
  );
};

export default License;