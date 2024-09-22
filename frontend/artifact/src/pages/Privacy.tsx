import React from 'react';
import { ExternalLink, Shield } from 'lucide-react';

const PrivacyItem = ({ title, content, link }) => (
  <div className="mb-8 md:mb-10">
    <h3 className="text-lg md:text-xl font-semibold text-[#c3002d] mb-2">{title}</h3>
    <p className="mb-2 text-sm md:text-base">{content}</p>
    {link && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#c3002d] hover:underline inline-flex items-center text-sm md:text-base"
      >
        Mehr Informationen
        <ExternalLink size={14} className="ml-1" />
      </a>
    )}
  </div>
);

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-12 md:h-16 bg-[#c3002d]"></div>
      <div className="flex-grow container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-[#c3002d] mb-6 md:mb-8 flex items-center">
          <Shield className="mr-2" size={24} />
          Datenschutzerklärung
        </h1>
        <p className="mb-6 md:mb-8 text-sm md:text-base">
          Diese Datenschutzerklärung informiert Sie darüber, wie wir Ihre Daten verarbeiten und an OpenAI übermitteln.
        </p>
        <div className="space-y-6 md:space-y-8">
          <PrivacyItem
            title="Datenübermittlung an OpenAI"
            content="Wir nutzen die Dienste von OpenAI, um bestimmte Funktionen unserer Anwendung zu ermöglichen. Dabei werden Ihre Eingaben und Interaktionen an die Server von OpenAI übermittelt."
            link="https://openai.com/security"
          />
          <PrivacyItem
            title="Art der übermittelten Daten"
            content="Die an OpenAI übermittelten Daten können Texteingaben, Kontextinformationen und andere von Ihnen bereitgestellte Inhalte umfassen."
            link=""
          />
          <PrivacyItem
            title="Zweck der Datenverarbeitung"
            content="Die Datenübermittlung dient dazu, Ihnen KI-gestützte Antworten und Funktionen bereitzustellen und die Qualität unseres Services zu verbessern."
            link="https://openai.com/policies/terms-of-use"
          />
          <PrivacyItem
            title="Datenschutzrichtlinien von OpenAI"
            content="OpenAI verarbeitet Ihre Daten gemäß deren eigenen Datenschutzrichtlinien. Wir empfehlen Ihnen, sich mit diesen vertraut zu machen."
            link="https://openai.com/policies/privacy-policy"
          />
          <PrivacyItem
            title="Ihre Rechte"
            content="Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Bei Fragen wenden Sie sich bitte an uns."
            link=""
          />
          <PrivacyItem
            title="Sicherheitsmaßnahmen"
            content="Wir setzen technische und organisatorische Maßnahmen ein, um Ihre Daten zu schützen. "
            link=""
          />
        </div>
      </div>
    </div>
  );
};

export default Privacy;