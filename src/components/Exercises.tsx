import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, CheckCircle2, XCircle, ArrowRight, Loader2, RefreshCcw } from 'lucide-react';
import { Exercise, textToSpeech } from '../services/gemini';
import { cn } from '../lib/utils';

interface ExerciseCardProps {
  exercise: Exercise;
  onNext: (isCorrect: boolean) => void;
}

export const ListeningExercise: React.FC<ExerciseCardProps> = ({ exercise, onNext }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState(false);

  useEffect(() => {
    handlePlay();
  }, [exercise]);

  const handlePlay = async () => {
    if (loadingAudio) return;
    setLoadingAudio(true);
    // The browser TTS plays immediately in our new implementation
    await textToSpeech(exercise.chinese);
    setLoadingAudio(false);
  };

  const handleCheck = (option: string) => {
    if (isCorrect !== null) return;
    setSelected(option);
    const correct = option === exercise.chinese;
    setIsCorrect(correct);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <h2 className="text-2xl font-serif italic text-stone-700">Ascolta e scegli la parola corretta</h2>
      
      <button
        onClick={handlePlay}
        disabled={loadingAudio}
        className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-200 transition-colors shadow-lg"
      >
        {loadingAudio ? <Loader2 className="w-10 h-10 animate-spin" /> : <Volume2 className="w-10 h-10" />}
      </button>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {exercise.options?.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleCheck(option)}
            className={cn(
              "p-6 text-2xl rounded-2xl border-2 transition-all duration-200",
              selected === option 
                ? (option === exercise.chinese ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "bg-red-50 border-red-500 text-red-700")
                : "bg-white border-stone-200 hover:border-stone-400 text-stone-800"
            )}
          >
            {option}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <div className={cn("flex items-center gap-2 font-medium", isCorrect ? "text-emerald-600" : "text-red-600")}>
              {isCorrect ? <CheckCircle2 /> : <XCircle />}
              {isCorrect ? "Corretto!" : `Sbagliato. Era: ${exercise.chinese}`}
            </div>
            <p className="text-stone-500">{exercise.pinyin} - {exercise.italian}</p>
            <button
              onClick={() => onNext(isCorrect)}
              className="mt-4 px-8 py-3 bg-stone-900 text-white rounded-full flex items-center gap-2 hover:bg-stone-800 transition-colors"
            >
              Continua <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const TranslationExercise: React.FC<ExerciseCardProps & { direction: 'zh-it' | 'it-zh' }> = ({ exercise, onNext, direction }) => {
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleCheck = () => {
    const target = direction === 'zh-it' ? exercise.italian : exercise.chinese;
    const correct = input.toLowerCase().trim() === target.toLowerCase().trim();
    setIsCorrect(correct);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-serif italic text-stone-700">
        {direction === 'zh-it' ? 'Traduci in Italiano' : 'Traduci in Cinese'}
      </h2>

      <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 w-full text-center">
        <p className="text-3xl font-medium text-stone-900 mb-2">
          {direction === 'zh-it' ? exercise.chinese : exercise.italian}
        </p>
        {direction === 'zh-it' && <p className="text-stone-500 font-mono">{exercise.pinyin}</p>}
      </div>

      <div className="w-full flex flex-col gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scrivi qui la traduzione..."
          className="w-full p-4 text-xl rounded-2xl border-2 border-stone-200 focus:border-emerald-500 outline-none transition-colors"
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          disabled={isCorrect !== null}
        />
        
        {isCorrect === null ? (
          <button
            onClick={handleCheck}
            disabled={!input.trim()}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            Controlla
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "p-6 rounded-2xl flex flex-col gap-2",
              isCorrect ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
            )}
          >
            <div className="flex items-center gap-2 font-bold">
              {isCorrect ? <CheckCircle2 /> : <XCircle />}
              {isCorrect ? "Ottimo lavoro!" : "Non proprio..."}
            </div>
            {!isCorrect && (
              <p>La risposta corretta è: <span className="font-bold">{direction === 'zh-it' ? exercise.italian : exercise.chinese}</span></p>
            )}
            <button
              onClick={() => onNext(isCorrect)}
              className="mt-4 px-8 py-3 bg-stone-900 text-white rounded-full flex items-center gap-2 hover:bg-stone-800 transition-colors self-center"
            >
              Continua <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface Tile {
  id: string;
  word: string;
}

export const SentenceBuildingExercise: React.FC<ExerciseCardProps> = ({ exercise, onNext }) => {
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  const [availableTiles, setAvailableTiles] = useState<Tile[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (exercise.scrambled) {
      setAvailableTiles(exercise.scrambled.map((word, idx) => ({
        id: `${word}-${idx}`,
        word
      })));
      setSelectedTiles([]);
      setIsCorrect(null);
    }
  }, [exercise]);

  const toggleTile = (tile: Tile, isSelected: boolean) => {
    if (isCorrect !== null) return;
    if (isSelected) {
      setSelectedTiles(prev => prev.filter(t => t.id !== tile.id));
      setAvailableTiles(prev => [...prev, tile]);
    } else {
      setSelectedTiles(prev => [...prev, tile]);
      setAvailableTiles(prev => prev.filter(t => t.id !== tile.id));
    }
  };

  const handleCheck = () => {
    const built = selectedTiles.map(t => t.word).join('');
    setIsCorrect(built === exercise.chinese);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-serif italic text-stone-700">Costruisci la frase</h2>
      
      <div className="text-center mb-4">
        <p className="text-xl text-stone-600 italic">"{exercise.italian}"</p>
      </div>

      <div className="w-full min-h-[100px] p-4 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-300 flex flex-wrap gap-2 items-center justify-center">
        {selectedTiles.map((tile) => (
          <motion.button
            layoutId={`tile-${tile.id}`}
            key={`selected-${tile.id}`}
            onClick={() => toggleTile(tile, true)}
            className="px-4 py-2 bg-white border border-stone-200 rounded-xl shadow-sm text-xl"
          >
            {tile.word}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {availableTiles.map((tile) => (
          <motion.button
            layoutId={`tile-${tile.id}`}
            key={`available-${tile.id}`}
            onClick={() => toggleTile(tile, false)}
            className="px-4 py-2 bg-stone-100 border border-stone-200 rounded-xl hover:bg-stone-200 transition-colors text-xl"
          >
            {tile.word}
          </motion.button>
        ))}
      </div>

      <div className="w-full flex flex-col gap-4">
        {isCorrect === null ? (
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (exercise.scrambled) {
                  setAvailableTiles(exercise.scrambled.map((word, idx) => ({
                    id: `${word}-${idx}`,
                    word
                  })));
                  setSelectedTiles([]);
                }
              }}
              className="p-4 bg-stone-100 text-stone-600 rounded-2xl hover:bg-stone-200 transition-colors"
            >
              <RefreshCcw className="w-6 h-6" />
            </button>
            <button
              onClick={handleCheck}
              disabled={selectedTiles.length === 0}
              className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              Controlla
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "p-6 rounded-2xl flex flex-col gap-2",
              isCorrect ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
            )}
          >
            <div className="flex items-center gap-2 font-bold">
              {isCorrect ? <CheckCircle2 /> : <XCircle />}
              {isCorrect ? "Perfetto!" : "Quasi..."}
            </div>
            <p className="text-lg">{exercise.chinese}</p>
            <p className="text-stone-500 font-mono">{exercise.pinyin}</p>
            <button
              onClick={() => onNext(isCorrect)}
              className="mt-4 px-8 py-3 bg-stone-900 text-white rounded-full flex items-center gap-2 hover:bg-stone-800 transition-colors self-center"
            >
              Continua <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
