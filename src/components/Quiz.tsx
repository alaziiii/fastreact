import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  limit
} from 'firebase/firestore';

// Define TypeScript interfaces
interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

interface LeaderboardEntry {
  name: string;
  score: number;
}

const quizData: QuizQuestion[] = [
  {
    question: 'Was ist eine der größten Umweltauswirkungen von Fast Fashion?',
    options: [
      'Förderung lokaler Handwerkskunst',
      'Hoher Wasserverbrauch und Verschmutzung',
      'Verbesserung der Stoffqualität',
      'Geringerer Transportaufwand'
    ],
    answer: 1
  },
  {
    question: 'Wie viele Liter Wasser werden durchschnittlich für die Produktion einer Jeans benötigt?',
    options: [
      '500 Liter',
      '1.500 Liter',
      '7.500 Liter',
      '10.000 Liter'
    ],
    answer: 2
  },
  {
    question: 'Warum ist der Lufttransport bei SHEIN besonders umweltschädlich?',
    options: [
      'Weil er teurer ist als der Seeweg',
      'Weil er 20- bis 30-mal mehr CO₂-Emissionen verursacht',
      'Weil er die Kleidung beschädigt',
      'Weil er lokale Märkte stört'
    ],
    answer: 1
  },
  {
    question: 'Wie oft werden Kleidungsstücke von SHEIN im Durchschnitt getragen, bevor sie aussortiert werden?',
    options: [
      '5–10 Mal',
      '15–20 Mal',
      '30–40 Mal',
      'Über 100 Mal'
    ],
    answer: 0
  },
  {
    question: 'Welche Aussage trifft auf die Arbeitsbedingungen in vielen SHEIN-Produktionsstätten zu?',
    options: [
      'Faire Löhne und geregelte Arbeitszeiten',
      'Lange Arbeitszeiten, niedrige Löhne und unsichere Bedingungen',
      'Heimarbeit mit flexiblen Arbeitszeiten',
      'Gute Sozialleistungen für alle'
    ],
    answer: 1
  },
  {
    question: 'Welche Materialien verursachen besonders große Umweltprobleme in der Modeindustrie?',
    options: [
      'Naturfasern wie Baumwolle',
      'Synthetische Fasern wie Polyester',
      'Wolle und Leinen',
      'Seide und Hanf'
    ],
    answer: 1
  },
  {
    question: 'Wie unterscheidet sich nachhaltige Mode von Fast Fashion?',
    options: [
      'Mehr Kollektionen, schnellere Lieferzeiten',
      'Langlebige Produkte, weniger Modelle, lokale Produktion',
      'Billigere Produktion, mehr Werbung',
      'Einsatz von synthetischen Stoffen'
    ],
    answer: 1
  },
  {
    question: 'Welche Aussage beschreibt ein zentrales Ziel nachhaltiger Modemarken?',
    options: [
      'Schnell wechselnde Trends bedienen',
      'Umweltschonende und faire Produktion fördern',
      'Produktion ins Ausland verlagern',
      'Möglichst viele neue Produkte pro Monat entwickeln'
    ],
    answer: 1
  },
  {
    question: 'Wie viele neue Styles bringt SHEIN laut Berichten pro Monat auf den Markt?',
    options: [
      '10.000',
      '50.000',
      '100.000',
      'Über 300.000'
    ],
    answer: 3
  },
  {
    question: 'Was ist eine direkte Folge der schlechten Qualitätsstandards bei Ultra-Fast Fashion?',
    options: [
      'Schnelles Wegwerfen der Kleidung',
      'Geringerer Energieverbrauch',
      'Höhere Recyclingquote',
      'Bessere Hautverträglichkeit'
    ],
    answer: 0
  },
  {
    question: 'Welche Transportmethode ist klimafreundlicher?',
    options: [
      'Seetransport',
      'Luftfracht',
      'Expressversand',
      'Einzelversand per Drohne'
    ],
    answer: 0
  },
  {
    question: 'Was macht nachhaltige Kleidung oft langlebiger?',
    options: [
      'Einsatz von synthetischen Stoffen',
      'Hochwertige Materialien und sorgfältige Verarbeitung',
      'Herstellung durch Maschinen',
      'Kurze Tragezyklen'
    ],
    answer: 1
  },
  {
    question: 'Was ist ein typisches Kennzeichen von Fast Fashion?',
    options: [
      'Saisonale Kollektionen',
      'Massenhafte Produktion in kurzer Zeit',
      'Fokus auf Qualität',
      'Begrenzte Stückzahlen'
    ],
    answer: 1
  },
  {
    question: 'Welcher Bereich ist NICHT primär von der Fast-Fashion-Kritik betroffen?',
    options: [
      'Umweltverschmutzung',
      'Arbeitsrechte',
      'Ressourcenverbrauch',
      'Designvielfalt'
    ],
    answer: 3
  },
  {
    question: 'Warum ist die Textilfärbung problematisch für die Umwelt?',
    options: [
      'Farben halten nicht lange',
      'Es entstehen giftige Abwässer',
      'Sie ist zu teuer',
      'Es braucht zu wenig Wasser'
    ],
    answer: 1
  }
];

// Background Grid Component
const BackgroundGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Large grid lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#4f6bfd33_1px,transparent_1px),linear-gradient(to_bottom,#4f6bfd33_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>
      
      {/* Small grid lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(to_right,#4f6bfd22_1px,transparent_1px),linear-gradient(to_bottom,#4f6bfd22_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
      </div>
      
      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-purple-500 opacity-10 blur-3xl animate-pulse delay-700"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-teal-500 opacity-10 blur-3xl animate-pulse delay-1000"></div>
      
      {/* Floating particles */}
      <div className="absolute h-full w-full overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-400 opacity-30"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Quiz: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [hasName, setHasName] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [quizDone, setQuizDone] = useState<boolean>(false);
  
  // Audio Refs für die Soundeffekte - Main fix - create audio objects only once
  const [correctSound] = useState(() => new Audio('/correct.mp3'));
  const [wrongSound] = useState(() => new Audio('/wrong.wav'));

  useEffect(() => {
    // Check if user already completed quiz
    const done = localStorage.getItem('quiz_done');
    if (done) {
      const savedName = localStorage.getItem('quiz_name') || 'Unbekannt';
      const savedScore = parseInt(localStorage.getItem('quiz_score') || '0', 10);

      setName(savedName);
      setScore(savedScore);
      setHasName(true);
      setQuizDone(true);
      setShowResult(true);

      fetchLeaderboard();
    }
    
    // Preload the sounds
    try {
      correctSound.load();
      wrongSound.load();
    } catch (err) {
      console.error("Error loading sound effects:", err);
    }
    
    // Cleanup-Funktion
    return () => {
      correctSound.pause();
      correctSound.currentTime = 0;
      wrongSound.pause();
      wrongSound.currentTime = 0;
    };
  }, [correctSound, wrongSound]);

  useEffect(() => {
    if (showResult && !submitted && !quizDone) {
      saveScore();
    }
  }, [showResult, submitted, quizDone]);

  const saveScore = async () => {
    // Prevent saving more than once or if already done
    if (submitted || quizDone) return;

    try {
      await addDoc(collection(db, 'leaderboard'), {
        name: name.trim() === '' ? 'Unbekannt' : name.trim(),
        score,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      // Store in localStorage to remember user has completed quiz
      localStorage.setItem('quiz_done', 'true');
      localStorage.setItem('quiz_name', name.trim() === '' ? 'Unbekannt' : name.trim());
      localStorage.setItem('quiz_score', score.toString());

      fetchLeaderboard();
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      const results: LeaderboardEntry[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        results.push({ name: data.name, score: data.score });
      });
      setLeaderboard(results);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const playSound = (isCorrect: boolean) => {
    // Reset and play the appropriate sound
    if (isCorrect) {
      correctSound.currentTime = 0;
      correctSound.play().catch(error => {
        console.error("Failed to play correct sound:", error);
      });
    } else {
      wrongSound.currentTime = 0;
      wrongSound.play().catch(error => {
        console.error("Failed to play wrong sound:", error);
      });
    }
  };

  const handleAnswer = (index: number) => {
    if (selected !== null) return;

    setSelected(index);
    
    // Check if the answer is correct
    const isCorrect = index === quizData[currentQuestion].answer;
    
    // Update score if correct
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Play the appropriate sound
    playSound(isCorrect);

    setTimeout(() => {
      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion(prev => prev + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const isCorrect = (optionIndex: number): boolean =>
    selected !== null && optionIndex === quizData[currentQuestion].answer;

  const isWrong = (optionIndex: number): boolean =>
    selected !== null && optionIndex === selected && selected !== quizData[currentQuestion].answer;

  if (!hasName) {
    return (
      <div id='realquiz' className="relative min-h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <BackgroundGrid />
        </div>
        <motion.div 
          className="relative z-10 bg-slate-800 bg-opacity-80 p-8 rounded-xl shadow-xl w-full max-w-md border border-slate-700 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">Quiz</h2>
          <h3 className="text-xl font-semibold mb-4">Gib deinen Namen ein</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            placeholder="Dein Name"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (name.trim() === '') {
                setName('Unbekannt');
              }
              setHasName(true);
            }}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium text-lg shadow-lg transition-all"
          >
            Quiz starten
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <section id='quiz'className="relative min-h-screen text-white flex items-center justify-center p-6">
      <div className="absolute inset-0">
        <BackgroundGrid />
      </div>
      <div className="relative z-10 w-full max-w-2xl">
        {!showResult ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800 bg-opacity-75 rounded-2xl p-8 shadow-xl border border-slate-700 backdrop-blur"
          >
            <div className="flex justify-between items-center mb-6">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-sm rounded-full px-4 py-1 bg-blue-600 text-white"
              >
                {name}
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-sm rounded-full px-4 py-1 bg-indigo-600 text-white"
              >
                Score: {score}
              </motion.div>
            </div>
            
            <div className="relative mb-8">
              <div className="w-full bg-slate-700 h-2 rounded-full">
                <motion.div 
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion) / quizData.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="mt-2 text-center text-sm text-blue-300">
                Frage {currentQuestion + 1} von {quizData.length}
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-6 text-blue-200">
              {quizData[currentQuestion].question}
            </h2>
            
            <div className="grid gap-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  whileHover={selected === null ? { scale: 1.02, x: 5 } : {}}
                  whileTap={selected === null ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`p-4 rounded-lg text-left transition-all border-2 font-medium relative overflow-hidden
                    ${
                      isCorrect(index)
                        ? 'bg-green-600 border-green-400 text-white'
                        : isWrong(index)
                        ? 'bg-red-600 border-red-400 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 border-slate-600 hover:border-blue-400'
                    }`}
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 border border-slate-600 text-sm">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                  
                  {isCorrect(index) && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                  
                  {isWrong(index) && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 bg-opacity-75 p-8 rounded-2xl shadow-xl text-center border border-slate-700 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-4xl font-bold"
            >
              {Math.round((score / quizData.length) * 100)}%
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300"
            >
              Quiz beendet!
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl mb-8"
            >
              <span className="font-semibold text-blue-300">{name}</span>, dein Score: <span className="font-bold text-blue-300">{score}</span> / {quizData.length}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-200">🏆 Leaderboard</h3>
              <div className="bg-slate-700 bg-opacity-50 rounded-xl p-4 mb-6">
                <ul className="text-left max-h-64 overflow-y-auto">
                  {leaderboard.map((entry, index) => (
                    <motion.li 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className={`mb-2 p-2 rounded flex justify-between items-center ${index === 0 ? 'bg-gradient-to-r from-yellow-500 to-amber-500 bg-opacity-20 text-white' : 
                        index === 1 ? 'bg-gradient-to-r from-slate-400 to-slate-500 bg-opacity-20' : 
                        index === 2 ? 'bg-gradient-to-r from-amber-700 to-amber-800 bg-opacity-20' : ''}`}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center mr-3 font-bold
                          ${index === 0 ? 'bg-yellow-500 text-yellow-900' : 
                            index === 1 ? 'bg-slate-400 text-slate-900' : 
                            index === 2 ? 'bg-amber-700 text-amber-100' : 'bg-blue-600'}`}>
                          {index + 1}
                        </div>
                        <span className="font-medium">{entry.name}</span>
                      </div>
                      <span className="text-blue-300 font-bold">{entry.score} Punkte</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-sm text-blue-200 mt-4 bg-blue-900 bg-opacity-20 p-3 rounded-lg inline-block"
              >
                Danke fürs Mitmachen! Du kannst das Quiz nicht erneut machen.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Quiz;