import React, { useState } from "react";
import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import ReadMoreButton from "./ReadMoreButton";
import { BackgroundIcons, HeaderDecoration } from "./DecorativeElements";
import { getTeaser, getFullContent } from "./BlogText";

const BlogPost: React.FC = () => {
  const [showFullText, setShowFullText] = useState(false);
  
  const toggleText = () => {
    setShowFullText(prev => !prev);
  };

  return (
    <section className="py-16 relative bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-6 overflow-hidden">
      <BackgroundIcons />
      
      <motion.div 
        className="max-w-4xl mx-auto relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12 relative">
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold text-red-600 mb-8 relative inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.1, duration: 0.6 }
            }}
          >
            Fast Fashion: <span className="underline decoration-red-400 decoration-4 underline-offset-4">Die versteckte Umweltkrise</span>
            <HeaderDecoration />
          </motion.h1>
          
          <motion.div 
            className="h-0.5 w-0 bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"
            animate={{ width: "50%" }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </div>

        <motion.div
          className="relative rounded-xl bg-white dark:bg-slate-900 p-8 md:p-10 text-left shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.2, duration: 0.6 }
          }}
        >
          <motion.div
            className="absolute inset-0 bg-red-50/20 dark:bg-red-900/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          
          <motion.div 
            className="relative z-10"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.p 
              className="mb-6 text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-200 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {getTeaser()}
            </motion.p>
            
            <TextReveal isOpen={showFullText}>
              <div
                id="fast-fashion-text"
                className="prose prose-lg dark:prose-invert max-w-none"
                style={{ whiteSpace: "pre-line" }}
              >
                {getFullContent()}
              </div>
            </TextReveal>
            
            {!showFullText && (
              <motion.div
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none"
                animate={{ 
                  opacity: [0, 1],
                  transition: { delay: 0.2, duration: 0.6 }
                }}
                aria-hidden="true"
              />
            )}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 0.6, duration: 0.8 }
          }}
        >
          <ReadMoreButton isOpen={showFullText} onClick={toggleText} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BlogPost;