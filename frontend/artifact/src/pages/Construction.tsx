import { Cog, Hammer, Wrench } from "lucide-react";
import Button from "../components/basics/Button";

const UnderConstruction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-2xl max-w-2xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6 animate-[pulse_2s_ease-in-out_infinite]">
          Under Construction
        </h1>
        <div className="flex justify-center space-x-4 mb-6">
          <Cog className="w-12 h-12 text-white animate-[spin_3s_linear_infinite]" />
          <Hammer className="w-12 h-12 text-white animate-[bounce_1s_ease-in-out_infinite]" />
          <Wrench className="w-12 h-12 text-white animate-[spin_3s_linear_infinite]" />
        </div>
        <p className="text-xl text-white text-center">
          Diese Seite wird aktuell gewartet. Wir bitten um Geduld!
        </p>
        <div className="flex justify-center">
          <Button
            tag="Kontakt"
            action="/contact"
            tooltipText="Wegen einer hohen Anzahl an Anfragen werden zurzeit keine Weiteren aufgenommen. Vielen Dank für ihr Verständnis!"
            variant="warning"
          />
        </div>
        <p className="text-lg text-white text-center">
          Abschluss der Maßnahme: Q4/24
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;
