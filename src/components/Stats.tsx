import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Timer, Factory, ShoppingBag } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  iconColor: string;
  index: number;
  isInView: boolean;
}

// Animation helper for counting up numbers
const useCountUp = (end: string, duration: number = 2000, isInView: boolean): number => {
  const [count, setCount] = useState<number>(0);
  
  useEffect(() => {
    // Reset count when not in view to ensure it plays again
    if (!isInView) {
      setCount(0);
      return;
    }
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number): void => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      if (typeof end === 'string' && end.includes('+')) {
        const numericValue = parseInt(end.replace(/\D/g, ''));
        setCount(Math.floor(progress * numericValue));
      } else if (typeof end === 'string' && end.includes('-')) {
        const [min, max] = end.split('-').map(num => parseInt(num));
        setCount(Math.floor(progress * min));
      } else if (typeof end === 'string' && end.includes('Mio')) {
        const numericValue = parseInt(end.replace(/\D/g, ''));
        setCount(Math.floor(progress * numericValue));
      } else if (typeof end === 'string' && end.includes('Mrd')) {
        const numericValue = parseInt(end.replace(/\D/g, ''));
        setCount(Math.floor(progress * numericValue));
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    if (isInView) {
      window.requestAnimationFrame(step);
    }
    
    return () => {};
  }, [end, duration, isInView]);
  
  return count;
};

// Format the animated count based on the original format
const formatCount = (count: number, originalValue: string): string => {
  if (originalValue.includes('+')) {
    return `${count}+`;
  } else if (originalValue.includes('-')) {
    const [min, max] = originalValue.split('-');
    return `${count}-${max}`;
  } else if (originalValue.includes('Mio')) {
    return `${count} Mio.`;
  } else if (originalValue.includes('Mrd')) {
    return `${count} Mrd. €`;
  }
  return count.toString();
};

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, description, iconColor, index, isInView }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const count = useCountUp(value, 2000, isInView);
  
  useEffect(() => {
    if (!isInView) {
      setIsVisible(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    
    return () => clearTimeout(timer);
  }, [index, isInView]);
  
  return (
    <div 
      className={`relative overflow-hidden rounded-xl backdrop-blur-md bg-white/10 p-6 shadow-xl transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-md"></div>
      
      <div className="relative z-10">
        <div className={`flex items-center mb-4`}>
          <div className={`p-3 rounded-full ${iconColor} bg-opacity-20 mr-4`}>
            {icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              {formatCount(count, value)}
            </h3>
            <p className="text-white font-medium">
              {label}
            </p>
          </div>
        </div>
        <p className="text-gray-200 text-sm">
          {description}
        </p>
      </div>
      
      <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-r from-white/5 to-transparent blur-xl"></div>
    </div>
  );
};

const Stats: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when the section visibility changes
        setIsInView(entry.isIntersecting);
      },
      {
        // Trigger when at least 15% of the element is visible
        threshold: 0.15
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <div ref={sectionRef} className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 p-8 flex flex-col items-center justify-center overflow-hidden">
      {/* Blurry acrylic background with animated gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block">
            SHEIN in Zahlen
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Das Geschäftsmodell und der ökologische Fußabdruck des Fast-Fashion-Giganten zeigen das wahre Ausmaß der Auswirkungen der Branche.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard 
            icon={<Sparkles className="w-6 h-6 text-yellow-400" />} 
            iconColor="bg-yellow-400" 
            value="10.000+" 
            label="Neue Styles täglich" 
            description="SHEIN bringt täglich über 10.000 neue Styles heraus, verglichen mit ~50-100 bei traditionellen Einzelhändlern."
            index={0}
            isInView={isInView}
          />
          
          <StatCard 
            icon={<Timer className="w-6 h-6 text-blue-400" />} 
            iconColor="bg-blue-400" 
            value="3-7 Tage" 
            label="Produktionszeit" 
            description="Vom Design bis zur Produktion in weniger als einer Woche, verglichen mit Monaten bei traditionellen Modemarken."
            index={1}
            isInView={isInView}
          />
          
          <StatCard 
            icon={<Factory className="w-6 h-6 text-white" />} 
            iconColor="bg-white" 
            value="16 Mio" 
            label="Jährliche CO2-Emissionen" 
            description="Geschätzte jährliche Kohlenstoffemissionen aus SHEINs Betrieb und Lieferkette."
            index={2}
            isInView={isInView}
          />
          
          <StatCard 
            icon={<ShoppingBag className="w-6 h-6 text-red-500" />} 
            iconColor="bg-red-500" 
            value="30 Mrd" 
            label="Jahresumsatz (2023)" 
            description="Damit ist es eines der wertvollsten Fast-Fashion-Unternehmen weltweit."
            index={3}
            isInView={isInView}
          />
        </div>
      </div>
      
      {/* Add some floating particles for ambient effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-20 animate-float"
            style={{
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Stats;