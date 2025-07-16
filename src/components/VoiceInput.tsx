
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceInputProps {
  onResult: (text: string) => void;
  isListening: boolean;
  onListeningChange: (listening: boolean) => void;
}

const VoiceInput = ({ onResult, isListening, onListeningChange }: VoiceInputProps) => {
  const [recognition, setRecognition] = useState<any>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        onListeningChange(true);
      };

      recognitionInstance.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        
        onResult(transcript);
      };

      recognitionInstance.onend = () => {
        onListeningChange(false);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        onListeningChange(false);
      };

      setRecognition(recognitionInstance);
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, [onResult, onListeningChange]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  if (!isSupported) {
    return null; // Hide button if not supported
  }

  return (
    <Button
      onClick={toggleListening}
      variant="ghost"
      size="icon"
      className={cn(
        "text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300",
        isListening && "text-red-400 bg-red-500/20 animate-pulse"
      )}
    >
      {isListening ? (
        <MicOff className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </Button>
  );
};

export default VoiceInput;
