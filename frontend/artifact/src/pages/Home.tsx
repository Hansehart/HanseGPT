import React from 'react';
import teamwork from "../assets/videos/business-teamwork.mp4";
import { MessageSquare, Users, Zap, Clock, BarChart, Shield, Star } from 'lucide-react';

const Hero = () => (
  <section className="relative h-screen overflow-hidden">
    <video 
      className="absolute top-0 left-0 w-full h-full object-cover filter blur-sm"
      autoPlay 
      loop 
      muted 
      playsInline
    >
      <source src={teamwork} type="video/mp4" />
      Ihr Browser unterstützt das Video-Tag nicht.
    </video>
    <div className="absolute inset-0 bg-[#90001f] bg-opacity-70"></div>
    <div className="relative z-10 container mx-auto h-full flex items-center px-4 max-w-[90%]">
      <div className="text-white max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Navigieren Sie Ihren Arbeitsplatz mit Leichtigkeit</h2>
        <p className="text-xl mb-8">CompanyCompass: Der KI-gestützte Chatbot, der Ihre Mitarbeiter sofort mit den richtigen Personen und Ressourcen verbindet.</p>
        <a href="#demo" className="bg-white text-[#90001f] hover:bg-gray-200 font-bold py-3 px-8 rounded-full inline-flex items-center">
          Demo ausprobieren <MessageSquare className="ml-2" />
        </a>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-20 bg-white">
    <div className="container mx-auto px-4 max-w-[90%]">
      <h2 className="text-3xl font-bold text-center mb-12 text-[#90001f]">Warum CompanyCompass wählen?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Users className="w-12 h-12 text-[#90001f]" />, title: "Sofortige Mitarbeiterverbindungen" },
          { icon: <Zap className="w-12 h-12 text-[#90001f]" />, title: "KI-gestützte Unterstützung" },
          { icon: <Clock className="w-12 h-12 text-[#90001f]" />, title: "24/7 Verfügbarkeit" },
        ].map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center border border-[#90001f]">
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#90001f]">{feature.title}</h3>
            <p className="text-gray-700">Optimieren Sie Ihre Arbeitsplatzkommunikation und steigern Sie die Produktivität mit unseren innovativen Funktionen.</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-[#90001f] text-white">
    <div className="container mx-auto px-4 max-w-[90%]">
      <h2 className="text-3xl font-bold text-center mb-12">Wie CompanyCompass funktioniert</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { icon: <MessageSquare className="w-12 h-12" />, title: "Frage stellen", description: "Mitarbeiter geben einfach ihre Anfrage in die Chatbot-Oberfläche ein." },
          { icon: <Zap className="w-12 h-12" />, title: "KI-Verarbeitung", description: "Unsere KI analysiert die Anfrage und identifiziert die relevanteste Abteilung oder Person." },
          { icon: <Users className="w-12 h-12" />, title: "Verbinden", description: "CompanyCompass stellt Kontaktinformationen bereit oder verbindet den Mitarbeiter direkt mit der richtigen Person." },
          { icon: <BarChart className="w-12 h-12" />, title: "Einblicke", description: "Manager erhalten Analysen zu häufigen Anfragen und Mitarbeiterbedürfnissen für kontinuierliche Verbesserungen." },
        ].map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-white rounded-full p-6 mb-4">
              {React.cloneElement(step.icon, { className: "w-12 h-12 text-[#90001f]" })}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-20 bg-white text-[#90001f]">
    <div className="container mx-auto px-4 max-w-[90%]">
      <h2 className="text-3xl font-bold text-center mb-12">Was unsere Kunden sagen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { name: "Sarah L., HR-Direktorin", text: "CompanyCompass hat unsere interne Kommunikation revolutioniert. Es ist, als hätte jeder Mitarbeiter einen persönlichen Assistenten!", rating: 5 },
          { name: "Michael R., CEO", text: "Die Effizienzsteigerungen, die wir seit der Implementierung von CompanyCompass gesehen haben, sind bemerkenswert. Es ist ein Gamechanger für große Organisationen.", rating: 5 },
        ].map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border-2 border-[#90001f]">
            <div className="flex mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#90001f] fill-current" />
              ))}
            </div>
            <p className="mb-4">"{testimonial.text}"</p>
            <p className="font-semibold">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PricingCard = ({ title, price, features }) => (
  <div className="bg-white rounded-lg shadow-md p-8 flex flex-col border border-[#90001f]">
    <h3 className="text-2xl font-bold mb-4 text-[#90001f]">{title}</h3>
    <p className="text-4xl font-bold mb-6 text-[#90001f]">{price}<span className="text-sm font-normal">/Monat</span></p>
    <ul className="mb-8 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center mb-2 text-gray-700">
          <Shield className="w-5 h-5 text-[#90001f] mr-2" /> {feature}
        </li>
      ))}
    </ul>
    <button className="bg-[#90001f] hover:bg-[#70001a] text-white font-bold py-2 px-4 rounded">
      Jetzt starten
    </button>
  </div>
);

const Pricing = () => (
  <section id="pricing" className="py-20 bg-white">
    <div className="container mx-auto px-4 max-w-[90%]">
      <h2 className="text-3xl font-bold text-center mb-12 text-[#90001f]">Wählen Sie Ihren Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard
          title="Starter"
          price="499 €"
          features={["Bis zu 100 Mitarbeiter", "Grundlegende KI-Unterstützung", "E-Mail-Support"]}
        />
        <PricingCard
          title="Professional"
          price="999 €"
          features={["Bis zu 500 Mitarbeiter", "Erweiterte KI-Funktionen", "24/7 Support", "Individuelle Integrationen"]}
        />
        <PricingCard
          title="Enterprise"
          price="Kontaktieren Sie uns"
          features={["Unbegrenzte Mitarbeiter", "Volle KI-Fähigkeiten", "Dedizierter Account Manager", "On-Premise-Option"]}
        />
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="bg-[#90001f] text-white py-20">
    <div className="container mx-auto px-4 max-w-[90%] text-center">
      <h2 className="text-3xl font-bold mb-4">Bereit, Ihren Arbeitsplatz zu transformieren?</h2>
      <p className="text-xl mb-8">Schließen Sie sich führenden Unternehmen an und stärken Sie Ihre Mitarbeiter mit CompanyCompass noch heute!</p>
      <button className="bg-white text-[#90001f] font-bold py-3 px-8 rounded-full hover:bg-gray-200">
        Demo anfordern
      </button>
    </div>
  </section>
);

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTASection />
      </main>
    </div>
  );
};

export default App;