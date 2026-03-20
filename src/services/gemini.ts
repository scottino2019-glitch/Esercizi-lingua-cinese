import { Exercise, CATEGORIES, ALL_EXERCISES } from "../data/exercises";

export type { Exercise };

export async function generateExercises(categoryId: string = 'ascolto'): Promise<Exercise[]> {
  // Simulate a small delay for "loading" feel
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  const filtered = ALL_EXERCISES.filter(ex => ex.type === category.type);
  
  // Shuffle and return
  return [...filtered].sort(() => Math.random() - 0.5);
}

export async function textToSpeech(text: string): Promise<string | null> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn("Speech synthesis not supported");
      resolve(null);
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    
    // Some browsers need a voice to be explicitly set for zh-CN
    const voices = window.speechSynthesis.getVoices();
    const chineseVoice = voices.find(v => v.lang.includes('zh') || v.lang.includes('CN'));
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }
    
    utterance.onend = () => resolve("played");
    utterance.onerror = (e) => {
      console.error("Speech synthesis error", e);
      resolve(null);
    };
    
    window.speechSynthesis.speak(utterance);
  });
}
