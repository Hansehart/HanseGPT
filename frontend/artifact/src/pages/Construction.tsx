import { motion } from 'framer-motion';
import { Cog } from 'lucide-react';

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Red bar at the top */}
      <div className="h-16 bg-[#70001a]"></div>
      
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-8"
          >
            <Cog size={80} className="text-[#70001a]" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-[#70001a] mb-4">Wartung</h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-xl text-gray-700 mb-8 max-w-md mx-auto"
          >
            Diese Website wird zurzeit bearbeitet und steht Ihnen bald wieder zur Verfügung.
          </motion.p>
          
        </motion.div>
      </div>
    </div>
  );
};

export default MaintenancePage;