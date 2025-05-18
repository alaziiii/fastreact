import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ReadMoreButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const ReadMoreButton: React.FC<ReadMoreButtonProps> = ({ isOpen, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:from-red-700 hover:to-red-600 active:scale-95 transition-colors focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-700 overflow-hidden"
      whileTap={{ scale: 0.95 }}
      aria-controls="fast-fashion-text"
      aria-expanded={isOpen}
    >
      <motion.span
        initial={{ y: 0 }}
        animate={{ y: isOpen ? -30 : 0 }}
        exit={{ y: 30 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
  
        <ChevronDown className="inline ml-1" size={18} />
      </motion.span>
      
      <motion.span
        initial={{ y: 30 }}
        animate={{ y: isOpen ? 0 : 30 }}
        exit={{ y: -30 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >

        <ChevronUp className="inline ml-1" size={18} />
      </motion.span>
      
      <span className="opacity-0">
        {isOpen ? "Weniger anzeigen" : "Weiterlesen"}
      </span>
    </motion.button>
  );
};

export default ReadMoreButton;