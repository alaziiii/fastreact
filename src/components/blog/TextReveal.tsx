import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TextRevealProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const TextReveal: React.FC<TextRevealProps> = ({ isOpen, children }) => {
  return (
    <div className="relative overflow-hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: "auto",
              transition: { 
                height: { 
                  duration: 0.5,
                  ease: [0.04, 0.62, 0.23, 0.98] 
                },
                opacity: { 
                  duration: 0.5, 
                  delay: 0.1 
                }
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: { 
                height: { 
                  duration: 0.3,
                  ease: [0.04, 0.62, 0.23, 0.98] 
                },
                opacity: { 
                  duration: 0.2 
                }
              }
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TextReveal;