import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// CSS for the fadeIn animation
const fadeInAnimation = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Map the link names to the section IDs you want to scroll to
  const links = [
    { name: 'Startseite', id: 'hero' },
    { name: 'Statistiken', id: 'industry' },
    { name: 'Kernprobleme', id: 'key-issues' },
    { name: 'Quiz', id: 'realquiz' },
    { name: 'Aktiv werden', id: 'aktiv-werden', isButton: true }
  ];

  // Scroll smoothly to the section when link is clicked
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false); // close menu on mobile after click
    
    // Special handling for "Aktiv werden" button
    if (id === 'aktiv-werden') {
      window.location.href = 'https://www.bmuv.de/themen/nachhaltigkeit/konsum-und-produkte/produktbereiche/mode-und-textilien';
      return;
    }
    
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Add the animation styles to the document */}
      <style dangerouslySetInnerHTML={{ __html: fadeInAnimation }} />
      
      <nav
     className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[80%] md:w-[55%] max-w-3.5xl z-50 transition-all duration-500 
rounded-3xl px-4 py-3 backdrop-blur-lg bg-gradient-to-br 
${isScrolled ? 'from-slate-800/80 to-slate-900/80 shadow-[0_4px_30px_rgba(255,255,255,0.1)] shadow-xl border border-white/10' : 'from-slate-700/50 to-slate-800/60 border border-white/10'}
`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between md:justify-center">
          {/* Desktop menu */}
          <div className="hidden md:flex items-center justify-center space-x-6 w-full">
            {links.map(({ name, id, isButton }) => (
              isButton ? (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="bg-gray-300 text-slate-900 px-4 py-2 rounded-lg font-semibold 
                    transition-all duration-300 hover:bg-white hover:shadow-lg 
                    hover:scale-105 active:scale-95"
                >
                  {name}
                </button>
              ) : (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-gray-300 font-medium cursor-pointer bg-transparent border-none
                    transition-all duration-300 hover:text-white relative
                    after:content-[''] after:absolute after:w-0 after:h-0.5 
                    after:bg-white after:bottom-[-4px] after:left-0
                    hover:after:w-full after:transition-all after:duration-300"
                >
                  {name}
                </button>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden w-full flex justify-end">
            <button
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none p-2 
                transition-transform duration-300 hover:rotate-180"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 bg-slate-900/90 rounded-xl shadow-lg px-4 py-4 
          animate-fadeIn transition-all duration-300">
          {links.map(({ name, id, isButton }) => (
            isButton ? (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="block w-full mt-3 bg-gray-300 text-slate-900 py-2 px-4 
                  text-center rounded-md font-semibold 
                  transition-all duration-300 hover:bg-white hover:shadow-md active:scale-95"
              >
                {name}
              </button>
            ) : (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="block w-full text-left text-gray-300 py-3 hover:text-white 
                  transition-all duration-300 hover:pl-2 font-medium bg-transparent border-none"
              >
                {name}
              </button>
            )
          ))}
        </div>
      )}
      
      {/* Mobile menu animation is handled with Tailwind classes */}
          </nav>
    </>
  );
};

export default Navbar;