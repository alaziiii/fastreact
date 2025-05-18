import React from "react";
import { motion } from "framer-motion";
import { Shirt, Recycle, GlassWater as WaterDrop, Factory, TrendingUp, PiggyBank } from "lucide-react";

interface IconBoxProps {
  icon: React.ReactNode;
  delay: number;
  x: number;
  y: number;
}

const IconBox: React.FC<IconBoxProps> = ({ icon, delay, x, y }) => {
  return (
    <motion.div
      className="absolute text-red-500/20 dark:text-red-400/20"
      style={{ top: `${y}%`, left: `${x}%` }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: { 
          delay, 
          duration: 0.8,
          ease: "easeOut"
        }
      }}
      whileHover={{ 
        scale: 1.2,
        rotate: 5,
        color: "rgba(239, 68, 68, 0.4)",
        transition: { duration: 0.3 }
      }}
    >
      {icon}
    </motion.div>
  );
};

export const BackgroundIcons: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <IconBox 
        icon={<Shirt size={42} />} 
        delay={0.2}
        x={85}
        y={15}
      />
      <IconBox 
        icon={<Recycle size={36} />} 
        delay={0.3}
        x={10}
        y={25}
      />
      <IconBox 
        icon={<WaterDrop size={32} />} 
        delay={0.4}
        x={75}
        y={60}
      />
      <IconBox 
        icon={<Factory size={38} />} 
        delay={0.5}
        x={15}
        y={75}
      />
      <IconBox 
        icon={<TrendingUp size={34} />} 
        delay={0.6}
        x={90}
        y={85}
      />
      <IconBox 
        icon={<PiggyBank size={30} />} 
        delay={0.7}
        x={5}
        y={50}
      />
    </div>
  );
};

export const HeaderDecoration: React.FC = () => {
  return (
    <motion.div 
      className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-red-500 rounded-full"
      initial={{ width: 0 }}
      animate={{ 
        width: 96, 
        transition: { 
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2
        } 
      }}
    />
  );
};