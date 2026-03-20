import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Trophy, Settings, ChevronLeft, Loader2, Sparkles } from 'lucide-react';
import { generateExercises, Exercise } from './services/gemini';
import { CATEGORIES, ALL_EXERCISES } from './data/exercises';
import { ListeningExercise, TranslationExercise, SentenceBuildingExercise } from './components/Exercises';
import { cn } from './lib/utils';

type AppState = 'home' | 'loading' | 'exercise' | 'result';

export default function App() {
  const [state, setState] = useState<AppState>('home');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(CATEGORIES[0].id);

  const startSession = async () => {
    setState('loading');
    const newExercises = await generateExercises(selectedCategoryId);
    setExercises(newExercises);
    setCurrentIndex(0);
    setScore(0);
    setState('exercise');
  };

  const handleNext = (isCorrect: boolean) => {
    if (isCorrect) setScore(s => s + 1);
    
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setState('result');
    }
  };

  const currentExercise = exercises[currentIndex];

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-stone-900 font-sans selection:bg-emerald-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-bottom border-stone-200 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-serif font-bold text-xl tracking-tight">SinoLearn</span>
        </div>
        
        {state === 'exercise' && (
          <div className="flex items-center gap-4">
            <div className="h-2 w-32 bg-stone-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono text-stone-400">{currentIndex + 1}/{exercises.length}</span>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button className="p-2 text-stone-400 hover:text-stone-900 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {state === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center gap-8 py-12"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600"
                >
                  <Sparkles className="w-16 h-16" />
                </motion.div>
                <div className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-bold">
                  Beta
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-serif italic font-light leading-tight">
                  Impara il Cinese,<br />un passo alla volta.
                </h1>
                <p className="text-stone-500 max-w-md mx-auto text-lg">
                  Esercizi personalizzati di ascolto, traduzione e costruzione di frasi potenziati dall'IA.
                </p>
              </div>

              <div className="flex flex-col gap-6 w-full max-w-md">
                <div className="grid grid-cols-1 gap-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                        selectedCategoryId === cat.id 
                          ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-md" 
                          : "bg-white border-stone-100 text-stone-600 hover:border-stone-200"
                      )}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <div className="flex-1">
                        <p className="font-bold">{cat.name}</p>
                        <p className="text-xs opacity-60">
                          {ALL_EXERCISES.filter(ex => ex.type === cat.type).length} esercizi disponibili
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={startSession}
                  className="w-full py-4 bg-stone-900 text-white rounded-2xl font-medium text-lg hover:bg-stone-800 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-stone-200"
                >
                  Inizia Sessione
                </button>
              </div>
            </motion.div>
          )}

          {state === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-4"
            >
              <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
              <p className="text-stone-500 font-serif italic">Preparando la tua lezione personalizzata...</p>
            </motion.div>
          )}

          {state === 'exercise' && currentExercise && (
            <motion.div
              key={`exercise-${currentIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden"
            >
              <div className="p-4 border-b border-stone-50 flex items-center gap-2">
                <button 
                  onClick={() => setState('home')}
                  className="p-2 hover:bg-stone-50 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs uppercase tracking-widest font-bold text-stone-400">
                  {currentExercise.type.replace('-', ' ')}
                </span>
              </div>

              {currentExercise.type === 'listening' && (
                <ListeningExercise exercise={currentExercise} onNext={handleNext} />
              )}
              {(currentExercise.type === 'zh-it' || currentExercise.type === 'it-zh') && (
                <TranslationExercise 
                  exercise={currentExercise} 
                  onNext={handleNext} 
                  direction={currentExercise.type as 'zh-it' | 'it-zh'} 
                />
              )}
              {currentExercise.type === 'sentence-building' && (
                <SentenceBuildingExercise exercise={currentExercise} onNext={handleNext} />
              )}
            </motion.div>
          )}

          {state === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center gap-8 py-12"
            >
              <div className="w-32 h-32 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600">
                <Trophy className="w-16 h-16" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-4xl font-serif italic">Lezione Completata!</h2>
                <p className="text-stone-500">Hai risposto correttamente a {score} su {exercises.length} esercizi.</p>
              </div>

              <div className="flex flex-col gap-3 w-full max-w-xs">
                <button
                  onClick={startSession}
                  className="w-full py-4 bg-stone-900 text-white rounded-2xl font-medium hover:bg-stone-800 transition-colors"
                >
                  Riprova
                </button>
                <button
                  onClick={() => setState('home')}
                  className="w-full py-4 bg-white border border-stone-200 text-stone-600 rounded-2xl font-medium hover:bg-stone-50 transition-colors"
                >
                  Torna alla Home
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Decoration */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 pointer-events-none opacity-20 flex justify-center">
        <div className="text-8xl font-serif italic text-stone-300 select-none">学习</div>
      </footer>
    </div>
  );
}
