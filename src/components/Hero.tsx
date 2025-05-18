import React, { useEffect, useRef, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}): [React.RefObject<HTMLElement>, boolean] => {
  const [isIntersecting, setIsIntersecting] = React.useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

// Text animation component using typed effect
interface TypedTextProps {
  text: string;
  delay?: number;
  speed?: number;
}

const TypedText: React.FC<TypedTextProps> = ({ text, delay = 0, speed = 50 }) => {
  const [displayText, setDisplayText] = React.useState<string>('');
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const [hasStarted, setHasStarted] = React.useState<boolean>(false);

  useEffect(() => {
    if (isIntersecting && !hasStarted) {
      setHasStarted(true);
      
      const startTimeout = setTimeout(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex: number) => {
            if (prevIndex >= text.length) {
              clearInterval(interval);
              return prevIndex;
            }
            return prevIndex + 1;
          });
        }, speed);
        
        return () => clearInterval(interval);
      }, delay);
      
      return () => clearTimeout(startTimeout);
    }
  }, [isIntersecting, text, delay, speed, hasStarted]);

  useEffect(() => {
    setDisplayText(text.substring(0, currentIndex));
  }, [currentIndex, text]);

  return <span ref={ref as React.RefObject<HTMLSpanElement>}>{displayText}</span>;
};

// Staggered fade-in animation for children elements
interface StaggeredFadeInProps {
  children: ReactNode;
  staggerDelay?: number;
}

const StaggeredFadeIn: React.FC<StaggeredFadeInProps> = ({ children, staggerDelay = 100 }) => {
  return React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    
    return React.cloneElement(child, {
      className: `${child.props.className || ''} opacity-0 animate-fadeIn`,
      style: { 
        ...(child.props.style || {}),
        animationDelay: `${index * staggerDelay}ms`,
        animationFillMode: 'forwards'
      }
    } as React.HTMLAttributes<HTMLElement>);
  });
};

// Enhanced scroll indicator with a smoother animation
const ScrollIndicator: React.FC = () => {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
      <span className="text-white text-sm mb-2 opacity-80">Scrollen Sie, um mehr zu entdecken</span>
      <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center relative overflow-hidden">
        <div className="absolute top-2 w-1 h-3 bg-white rounded-full animate-scrollDown"></div>
      </div>
    </div>
  );
};

// Main Hero component
const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Lazy load the iframe
  useEffect(() => {
    if (iframeRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && iframeRef.current) {
            iframeRef.current.src = "https://my.spline.design/earthdayandnightcopy-Ld5pB6lD4IBaq230SAgOMacr/?quality=low";
            observer.unobserve(iframeRef.current);
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(iframeRef.current);
      
      return () => {
        if (iframeRef.current) {
          observer.disconnect();
        }
      };
    }
  }, []);

  // Optimize globe loading
  const handleIframeLoad = (): void => {
    setIsLoaded(true);
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Loading state for the globe */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-800/80">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Optimized Spline 3D Background with lazy loading */}
      <div className="absolute inset-0 w-full h-full z-0">
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          allow="autoplay; fullscreen"
          loading="lazy"
          title="Earth Day and Night Spline"
          onLoad={handleIframeLoad}
        ></iframe>
      </div>

      {/* Gradient overlay for better text readability and visual effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-800/40 to-slate-900/30 z-10"></div>

      {/* Animated particles effect */}
      <div className="absolute inset-0 z-5 opacity-30">
        <div className="absolute h-2 w-2 bg-blue-400 rounded-full top-1/4 left-1/3 animate-floatSlow"></div>
        <div className="absolute h-3 w-3 bg-blue-300 rounded-full top-1/2 left-1/4 animate-floatMedium"></div>
        <div className="absolute h-1 w-1 bg-blue-200 rounded-full top-3/4 left-2/3 animate-floatFast"></div>
        <div className="absolute h-2 w-2 bg-indigo-400 rounded-full top-1/3 left-3/4 animate-floatSlow"></div>
        <div className="absolute h-2 w-2 bg-indigo-300 rounded-full top-2/3 left-1/5 animate-floatMedium"></div>
        
        {/* Adding more particles for richer effect */}
        <div className="absolute h-1 w-1 bg-purple-300 rounded-full top-1/6 left-2/3 animate-floatFast"></div>
        <div className="absolute h-2 w-2 bg-cyan-400 rounded-full top-3/5 left-1/6 animate-floatSlow animate-glow"></div>
        <div className="absolute h-3 w-3 bg-teal-300/50 rounded-full top-2/5 left-4/5 animate-floatMedium"></div>
        <div className="absolute h-2 w-2 bg-pink-400/40 rounded-full top-4/5 left-3/5 animate-floatSlow"></div>
      </div>

      {/* Main Content with animated entrance */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl animate-slideInFromLeft">
          <div className="overflow-hidden mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <div className="animate-slideInFromBottom" style={{ animationDelay: '400ms' }}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-500 inline-block transform transition-transform duration-300 hover:scale-95 filter hover:drop-shadow-lg">
                  Die wahren Kosten
                </span>
              </div>
              <div className="animate-slideInFromBottom" style={{ animationDelay: '600ms' }}>
                <span className="text-white inline-block animate-pulse-subtle">
                  von Fast Fashion:
                </span>
              </div>
              <div className="animate-slideInFromBottom relative" style={{ animationDelay: '800ms' }}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 inline-block transform hover:translate-x-2 transition-transform duration-500 relative">
                  SHEINs Umweltauswirkungen
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 transform scale-x-0 hover:scale-x-100 transition-transform duration-700 origin-left"></span>
                </span>
              </div>
            </h1>
          </div>
          
          <div className="overflow-hidden mb-8">
            <p className="text-xl text-gray-200 max-w-2xl animate-fadeIn opacity-0 leading-relaxed backdrop-blur-sm bg-slate-800/10 p-4 rounded-lg border-l-2 border-cyan-500" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
              Eine Untersuchung darüber, wie Ultra-Fast-Fashion-Marken die Branchenlandschaft verändern und dabei zu erheblichen Umwelt- und sozialen Herausforderungen beitragen.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <StaggeredFadeIn staggerDelay={200}>
              <button className="bg-white text-slate-900 px-8 py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300 hover:translate-y-1 hover:shadow-lg group" onClick={() => window.scrollTo({ top: document.getElementById('key-issues')?.offsetTop, behavior: 'smooth' })}>
                Mehr erfahren 
                <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-all duration-300 hover:translate-y-1 hover:shadow-lg hover:border-blue-400" onClick={() => window.scrollTo({ top: document.getElementById('industry')?.offsetTop, behavior: 'smooth' })}>
                Statistiken ansehen
              </button>
            </StaggeredFadeIn>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <ScrollIndicator />

      {/* Add a CSS block for custom animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInFromLeft {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInFromBottom {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          15% { transform: translateY(0); }
          25% { transform: translateY(0); }
          40% { transform: translateY(100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, -15px); }
        }
        
        @keyframes floatMedium {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        
        @keyframes floatFast {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, 10px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
        
        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.8s ease forwards;
        }
        
        .animate-slideInFromBottom {
          animation: slideInFromBottom 0.8s ease forwards;
        }
        
        .animate-scrollDown {
          animation: scrollDown 2s infinite;
        }
        
        .animate-floatSlow {
          animation: floatSlow 8s infinite ease-in-out;
        }
        
        .animate-floatMedium {
          animation: floatMedium 12s infinite ease-in-out;
        }
        
        .animate-floatFast {
          animation: floatFast 6s infinite ease-in-out;
        }
      `}</style>
      
      {/* Adding glowing effect keyframes and animations */}
      <style>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.7)); }
          50% { filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.9)); }
        }
        
        @keyframes float-text {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite ease-in-out;
        }
        
        .animate-glow {
          animation: glow 3s infinite ease-in-out;
        }
        
        .animate-float-text {
          animation: float-text 5s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;