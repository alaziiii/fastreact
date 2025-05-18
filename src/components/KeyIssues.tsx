import React, { useState, useEffect } from 'react';
import { Droplets, Truck, User, ArrowRight } from 'lucide-react';

interface IssueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  index: number;
  iconAnimClass: string;
}

const IssueCard: React.FC<IssueCardProps> = ({ 
  icon, 
  title, 
  description, 
  color, 
  gradientFrom, 
  gradientTo, 
  index,
  iconAnimClass
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 300);
    
    return () => clearTimeout(timer);
  }, [index]);

  // Create truncated description for collapsed state
  const shortDescription = description.split(' ').slice(0, 20).join(' ') + '...';
  
  return (
    <div 
      className={`flex flex-col h-full transform transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`p-5 rounded-t-lg relative overflow-hidden transition-all duration-500 ${
          isHovered ? 'shadow-lg' : 'shadow-md'
        }`}
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: `${Math.random() * 40 + 10}px`,
                height: `${Math.random() * 40 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 20}s`,
                animationDelay: `${Math.random() * 5}s`,
                animation: 'float infinite ease-in-out alternate',
              }}
            ></div>
          ))}
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className={`bg-white bg-opacity-20 p-3 rounded-full transform transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${iconAnimClass}`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      
      <div 
        className={`p-6 bg-white dark:bg-slate-800 shadow-md rounded-b-lg flex-grow border-t-0 border border-slate-200 dark:border-slate-700 transition-all duration-500 relative ${
          isHovered ? 'shadow-xl' : 'shadow'
        }`}
      >
        <p className="text-slate-600 dark:text-slate-300 transition-all duration-500">
          {expanded ? description : shortDescription}
        </p>
        
        <button 
          onClick={() => setExpanded(!expanded)}
          className={`mt-4 inline-flex items-center text-sm font-medium ${color.replace('bg-', 'text-')} hover:underline focus:outline-none transition-all duration-300`}
        >
          {expanded ? 'Weniger anzeigen' : 'Mehr erfahren'}
          <ArrowRight size={16} className={`ml-1 transform transition-all duration-300 ${expanded ? 'rotate-90' : ''}`} />
        </button>
        
        {/* Bottom highlight effect on hover */}
        <div 
          className={`absolute bottom-0 left-0 w-full h-1 transition-all duration-500 transform ${
            isHovered ? 'scale-x-100' : 'scale-x-0'
          }`}
          style={{
            background: `linear-gradient(90deg, transparent, ${gradientTo}, transparent)`,
          }}
        ></div>
      </div>
    </div>
  );
};

const KeyIssues: React.FC = () => {
  const [animationTriggered, setAnimationTriggered] = useState<boolean>(false);
  
  // Trigger section animation when it comes into view
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('key-issues');
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isVisible && !animationTriggered) {
        setAnimationTriggered(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animationTriggered]);

  // Create pulse animation for droplets icon
  const dropletsPulse = `animate-pulse`;
  
  // Create truck animation
  const truckMove = `animate-truck-move`;
  
  // Create user animation
  const userSpin = `animate-user-spin`;
  
  return (
    <section id="key-issues" className="py-20 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
        {/* Animated background grid pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="h-full w-full bg-grid-pattern"></div>
        </div>
        
        {/* Large circular gradients for background effect */}
        <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-400 dark:bg-blue-700 opacity-10 blur-3xl transform transition-all duration-1000 ${animationTriggered ? 'scale-100' : 'scale-0'}`}></div>
        <div className={`absolute -bottom-20 right-20 w-64 h-64 rounded-full bg-amber-300 dark:bg-amber-700 opacity-10 blur-3xl transform transition-all duration-1000 delay-300 ${animationTriggered ? 'scale-100' : 'scale-0'}`}></div>
        <div className={`absolute top-40 -right-20 w-80 h-80 rounded-full bg-red-300 dark:bg-red-700 opacity-10 blur-3xl transform transition-all duration-1000 delay-500 ${animationTriggered ? 'scale-100' : 'scale-0'}`}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`max-w-xl mx-auto text-center mb-16 transform transition-all duration-1000 ${animationTriggered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <div className="relative">
              <span className="bg-gradient-to-r from-blue-600 via-amber-500 to-red-600 text-transparent bg-clip-text text-sm font-bold tracking-wider uppercase">
                Umwelt & Soziales
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-amber-500 to-red-600"></div>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            <span className="relative">
              Zentrale Umwelt- & Soziale Probleme
              <div className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600/30 via-amber-500/30 to-red-600/30 transform transition-all duration-1000 delay-500 ${animationTriggered ? 'scale-x-100' : 'scale-x-0'}`}></div>
            </span>
          </h2>
          
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Das Geschäftsmodell von Fast-Fashion-Marken wie SHEIN basiert auf niedrigen Preisen und schneller Produktion – oft auf Kosten von Umwelt und Arbeitsbedingungen.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <IssueCard 
            icon={<Droplets size={24} />}
            title="Wasserverschmutzung"
            description="Die Modeindustrie zählt zu den größten Verursachern von Wasserverschmutzung weltweit. Besonders bei der Textilfärbung und -behandlung werden große Mengen Wasser verbraucht und verschmutzt. Für die Produktion einer einzigen Jeans können bis zu 7.500 Liter Wasser benötigt werden – ein beachtlicher Wert, der die Belastung für Umwelt und Wasserressourcen verdeutlicht."
            color="bg-blue-600"
            gradientFrom="#2563eb"
            gradientTo="#0284c7"
            index={0}
            iconAnimClass={dropletsPulse}
          />
          <IssueCard 
            icon={<Truck size={24} />}
            title="CO₂-Fußabdruck"
            description="Schnelle Lieferketten und der Einsatz von Luftfracht sorgen dafür, dass Fast Fashion einen hohen CO₂-Fußabdruck hinterlässt. SHEINs Direktversandmodell nutzt überwiegend den Luftweg, der deutlich umweltschädlicher ist als der Seetransport. Schätzungen zufolge verursacht der Lufttransport 20- bis 30-mal höhere Emissionen."
            color="bg-amber-600"
            gradientFrom="#d97706"
            gradientTo="#ca8a04"
            index={1}
            iconAnimClass={truckMove}
          />
          <IssueCard 
            icon={<User size={24} />}
            title="Arbeitsbedingungen"
            description="Auch beim Thema Arbeitsrechte steht SHEIN in der Kritik. Berichte zeigen, dass viele Beschäftigte unter schlechten Bedingungen arbeiten – mit extrem langen Arbeitszeiten, niedrigen Löhnen und ohne ausreichende Absicherung. Um die hohen Produktionszahlen zu erreichen, bleibt wenig Raum für faire Arbeitsverhältnisse."
            color="bg-red-600"
            gradientFrom="#dc2626"
            gradientTo="#b91c1c"
            index={2}
            iconAnimClass={userSpin}
          />
        </div>
      </div>
      
      {/* Inject CSS animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        .animate-truck-move {
          animation: truckMove 3s ease-in-out infinite;
        }
        
        @keyframes truckMove {
          0% { transform: translateX(0); }
          50% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }
        
        .animate-user-spin {
          animation: userSpin 6s ease-in-out infinite;
        }
        
        @keyframes userSpin {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(0deg); }
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(100,100,100,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100,100,100,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
};

export default KeyIssues;