import React, { useState, useEffect, useRef } from 'react';
import fastfashionImage from '../images/ultra-fast-fashion-shein-w-ekaterina-alfa27-220127-1280x720-1.jpg';

const ImageSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Animation to trigger when the section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Auto cycle through paragraph highlights
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveHighlight(prev => (prev >= 2 ? 0 : prev + 1));
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isVisible]);
  
  // Key points to highlight
  const highlights = [
    { key: "problem", color: "bg-red-500" },
    { key: "shein", color: "bg-purple-500" },
    { key: "summary", color: "bg-amber-500" }
  ];
  
  return (
    <section 
      id="ImageSection" 
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Animated gradient blobs */}
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full bg-red-200 dark:bg-red-900/30 opacity-30 blur-3xl transform transition-all duration-1500 delay-300 ${isVisible ? "scale-100" : "scale-0"}`}></div>
        <div className={`absolute bottom-0 left-0 w-72 h-72 rounded-full bg-purple-200 dark:bg-purple-900/30 opacity-30 blur-3xl transform transition-all duration-1500 delay-500 ${isVisible ? "scale-100" : "scale-0"}`}></div>
        
        {/* Fabric pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "24px 24px"
          }}></div>
        </div>
        
        {/* Animated noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-texture"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Text content with animations */}
        <div className={`md:w-1/2 transform transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
          <div className="relative inline-block mb-2">
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Fast Fashion</span>
            <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-500 transition-all duration-1000 ${isVisible ? "w-full" : "w-0"}`}></div>
          </div>
          
          <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            <span className={`inline-block transform transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Was ist Fast Fashion und
            </span> 
            <br />
            <span className={`inline-block transform transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Was hat SHEIN damit zu tun?
            </span>
          </h2>
          
          <div 
            className={`relative p-5 mb-6 rounded-lg border-l-4 cursor-pointer transform transition-all duration-500 ${activeHighlight === 0 ? "border-red-500 bg-red-50 dark:bg-red-900/10 translate-x-2" : "border-gray-200 dark:border-gray-700 bg-transparent"}`}
            onMouseEnter={() => setActiveHighlight(0)}
          >
            <p className={`text-gray-700 dark:text-gray-300 leading-relaxed transform transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Fast Fashion bedeutet, dass Modeunternehmen <strong className="text-red-600 dark:text-red-400">schnell und billig</strong> Kleidung produzieren, um aktuelle Trends sofort in Massen anzubieten – oft mit negativen Folgen. Die Kleidung ist meist von schlechter Qualität, wird schnell weggeworfen und belastet die Umwelt durch Chemikalien und Müll. Zudem arbeiten viele Hersteller unter schlechten Bedingungen mit niedrigen Löhnen.
            </p>
            
            {/* Animated indicator for active paragraph */}
            <div className={`absolute top-0 right-0 w-3 h-3 rounded-full transform transition-all duration-300 ${activeHighlight === 0 ? "scale-100 bg-red-500" : "scale-0 bg-transparent"}`}></div>
          </div>
          
          <div 
            className={`relative p-5 mb-6 rounded-lg border-l-4 cursor-pointer transform transition-all duration-500 ${activeHighlight === 1 ? "border-purple-500 bg-purple-50 dark:bg-purple-900/10 translate-x-2" : "border-gray-200 dark:border-gray-700 bg-transparent"}`}
            onMouseEnter={() => setActiveHighlight(1)}
          >
            <p className={`text-gray-700 dark:text-gray-300 leading-relaxed transform transition-all duration-500 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <strong className="text-purple-600 dark:text-purple-400">SHEIN ist ein extremes Beispiel</strong> dafür: Das Online-Unternehmen bringt täglich tausende neue Designs heraus, produziert extrem günstig und fördert damit Überkonsum. Kritiker werfen SHEIN vor, Arbeiter auszubeuten und durch billige Materialien die Umwelt zu schädigen.
            </p>
            
            {/* Animated indicator for active paragraph */}
            <div className={`absolute top-0 right-0 w-3 h-3 rounded-full transform transition-all duration-300 ${activeHighlight === 1 ? "scale-100 bg-purple-500" : "scale-0 bg-transparent"}`}></div>
          </div>
          
          <div 
            className={`relative p-5 rounded-lg border-l-4 cursor-pointer transform transition-all duration-500 ${activeHighlight === 2 ? "border-amber-500 bg-amber-50 dark:bg-amber-900/10 translate-x-2" : "border-gray-200 dark:border-gray-700 bg-transparent"}`}
            onMouseEnter={() => setActiveHighlight(2)}
          >
            <p className={`text-gray-700 dark:text-gray-300 leading-relaxed transform transition-all duration-500 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Kurz: <strong className="text-amber-600 dark:text-amber-400">SHEIN verkörpert viele Probleme</strong> der Fast-Fashion-Branche – schnelle, billige Mode auf Kosten von Menschen und Planet.
            </p>
            
            {/* Animated indicator for active paragraph */}
            <div className={`absolute top-0 right-0 w-3 h-3 rounded-full transform transition-all duration-300 ${activeHighlight === 2 ? "scale-100 bg-amber-500" : "scale-0 bg-transparent"}`}></div>
          </div>
        </div>
        
        {/* Image with animations */}
        <div className={`md:w-1/2 transform transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
          <div className="relative">
            {/* Main image with animated border */}
            <div className={`absolute inset-0 rounded-2xl border-2 border-red-400/50 transform transition-all duration-700 delay-600 ${isVisible ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} style={{ transform: "rotate(-2deg)" }}></div>
            
            <div className={`absolute inset-0 rounded-2xl border-2 border-purple-400/50 transform transition-all duration-700 delay-800 ${isVisible ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} style={{ transform: "rotate(1deg)" }}></div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src={fastfashionImage}
                alt="Impact of Fast Fashion"
                className="w-full object-cover max-h-[450px] transform transition-all duration-10000 ease-in-out hover:scale-105"
              />
              
              {/* Image overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
              
              {/* Caption */}
              <div className={`absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 transform transition-all duration-700 ${isVisible ? "translate-y-0" : "translate-y-full"}`}>
                <p className="text-white text-sm">
                  SHEIN verkörpert das Ultra-Fast-Fashion Modell mit seinen extremen Produktionstempi und niedrigen Preisen.
                </p>
              </div>
              
              {/* Animated highlight dots */}
              {highlights.map((highlight, index) => (
                <div 
                  key={highlight.key}
                  className={`absolute w-4 h-4 rounded-full ${highlight.color} transform transition-all duration-300 ${activeHighlight === index ? "scale-125 opacity-100" : "scale-100 opacity-70"}`}
                  style={{ 
                    top: `${20 + index * 25}%`, 
                    right: "8%",
                    boxShadow: activeHighlight === index ? "0 0 15px 5px rgba(255,255,255,0.3)" : "none"
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add animated shape divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform rotate-180">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.61,111.31,221.79,94.57S293.53,66.39,321.39,56.44Z" className="shape-fill fill-white dark:fill-gray-900 opacity-50"></path>
        </svg>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        .noise-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          animation: noise 8s steps(10) infinite;
        }
        
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
      `}</style>
    </section>
  );
};

export default ImageSection;