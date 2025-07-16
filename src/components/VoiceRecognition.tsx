
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface VoiceRecognitionProps {
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
  onResult: (transcript: string) => void;
}

const VoiceRecognition = ({ isListening, onStart, onStop, onResult }: VoiceRecognitionProps) => {
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        console.log('Voice recognition started');
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Send the final transcript to parent
        if (finalTranscript) {
          onResult(finalTranscript);
        } else if (interimTranscript) {
          // Show interim results in real-time
          onResult(interimTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Voice recognition error",
          description: "Please try again or check your microphone permissions.",
          variant: "destructive"
        });
        onStop();
      };

      recognition.onend = () => {
        onStop();
      };
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onResult, onStop, toast]);

  const toggleListening = () => {
    if (!isSupported) {
      toast({
        title: "Voice recognition not supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      onStop();
    } else {
      recognitionRef.current?.start();
      onStart();
    }
  };

  return (
    <Button
      onClick={toggleListening}
      variant="ghost"
      size="sm"
      className={cn(
        "h-8 w-8 p-0 transition-all duration-300",
        isListening 
          ? "text-red-400 hover:text-red-300 hover:bg-red-500/10 animate-pulse" 
          : "text-slate-400 hover:text-white hover:bg-white/10"
      )}
      disabled={!isSupported}
    >
      {isListening ? (
        <MicOff className="w-4 h-4" />
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </Button>
  );
};

export default VoiceRecognition;
