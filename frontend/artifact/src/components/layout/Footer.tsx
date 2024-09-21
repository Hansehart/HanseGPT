import React from "react";
import { Link } from "react-router-dom";
import { Bot } from "lucide-react";

const Footer: React.FC = () => {
  const links = [
    { display: "AGB", route: "/gtc" },
    { display: "Datenschutz", route: "/privacy" },
    { display: "Impressum", route: "/imprint" },
    { display: "Lizenz", route: "/license" },
  ];

  return (
    <footer className="text-white py-8 bg-black/80 sticky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex">
              <Bot className="h-8 w-8 text-[#c3002d] mr-2" />
              <h2 className="text-2xl font-bold text-white">RossConnect</h2>
            </div>
            <p className="text-sm mt-2 text-white">
              © 2024 HanseGPT. Alle Rechte vorbehalten.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end">
            {links.map((item) => (
              <Link
                key={item.display}
                to={item.route}
                className="mx-2 my-1 relative group text-white hover:text-white"
              >
                <span className="inline-block transition-all duration-300 ease-bounce hover:translate-y-[-4px] hover:scale-110 origin-bottom">
                  {item.display}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
