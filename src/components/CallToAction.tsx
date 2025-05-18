import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Play, Clock, Users, Globe, Sparkles } from "lucide-react";

const CallToAction: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
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

  const getAnimationClass = (delay: number) => {
    return isVisible ? 'animate-in' : '';
  };

  return (
    <section 
      id="cta" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Background gradient with animated pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>
        
        {/* Moving background elements */}
        <div className={`${isVisible ? 'animate-float-slow' : ''} absolute -top-32 -left-32 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-5xl opacity-20`}></div>
        <div className={`${isVisible ? 'animate-float-medium' : ''} absolute top-64 -right-32 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-5xl opacity-20`}></div>
        <div className={`${isVisible ? 'animate-float-fast' : ''} absolute -bottom-32 left-64 w-96 h-96 bg-slate-700 rounded-full mix-blend-multiply filter blur-5xl opacity-20`}></div>
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center relative z-10">
        {/* Decorative elements */}
        <div className={`absolute top-0 left-10 w-20 h-20 ${isVisible ? 'animate-spin-slow' : ''}`}>
          <div className="w-full h-full border-4 border-dashed border-red-400 opacity-30 rounded-full"></div>
        </div>
        <div className={`absolute bottom-20 right-10 w-32 h-32 ${isVisible ? 'animate-spin-slow-reverse' : ''}`}>
          <div className="w-full h-full border-4 border-dashed border-red-200 opacity-20 rounded-full"></div>
        </div>

        {/* Title with animated underline */}
        <div className="relative mb-12">
          <h2
            className={`text-4xl md:text-5xl font-extrabold text-white mb-4 text-center transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Schau dir ein Video zum Einfluss von Fast Fashion an
          </h2>
          <div 
            className={`h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent transition-all duration-1500 delay-300 ${
              isVisible ? 'w-64 opacity-100' : 'w-0 opacity-0'
            } mx-auto`}
          ></div>
        </div>

        {/* Video Container with glow effect */}
        <div
          className={`w-full max-w-4xl relative group transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } delay-200`}
        >
          {/* Glow behind video */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-800 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-20 h-20 bg-white bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play className="w-10 h-10 text-white fill-white" />
            </div>
          </div>
          
          {/* Video iframe with rounded corners and shadow */}
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none"></div>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/2jjQjIFJ_eg?si=0z9DFgJT2zN2Zlm3"
              title="Die dunkle Seite von Fast Fashion"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Info Box with glass morphism effect */}
        <div
          className={`mt-12 relative bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-3xl border border-white/20 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } delay-400`}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/5 rounded-2xl"></div>
          
          <div className="relative z-10">
            <p className="text-white text-lg mb-6 leading-relaxed">
              In diesem Video erklären wir die verheerenden Auswirkungen der Fast Fashion auf Umwelt und Gesellschaft. Erfahre, warum nachhaltige Mode wichtiger denn je ist und wie du mit bewussten Entscheidungen etwas bewirken kannst.
            </p>

            <ul className="mb-6 space-y-4 text-white/90">
              {[
                {
                  icon: <Globe className="w-5 h-5" />,
                  text: "Umweltzerstörung durch Wasserverbrauch und CO₂-Emissionen",
                  color: "bg-red-500"
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  text: "Schlechte Arbeitsbedingungen in der Produktion",
                  color: "bg-red-600"
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  text: "Die Rolle von Konsument:innen bei nachhaltigem Wandel",
                  color: "bg-red-700"
                },
                {
                  icon: <Sparkles className="w-5 h-5" />,
                  text: "Innovative Alternativen zur Fast Fashion",
                  color: "bg-red-800"
                },
              ].map((item, idx) => (
                <li 
                  key={idx} 
                  className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${600 + idx * 150}ms` }}
                >
                  <div className={`flex items-center justify-center w-10 h-10 ${item.color} rounded-full shadow-lg`}>
                    {item.icon}
                  </div>
                  <span className="flex-1">{item.text}</span>
                </li>
              ))}
            </ul>
            
            {/* CTA Button */}
            <div 
              className={`mt-8 flex justify-center transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
            
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 30px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, -15px); }
        }
        
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 12s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 8s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 15s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CallToAction;