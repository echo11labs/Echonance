"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechPhase = "idle" | "listening";

interface SpeechRecognitionAlternativeLike {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternativeLike;
  [index: number]: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionResultListLike {
  length: number;
  item(index: number): SpeechRecognitionResultLike;
  [index: number]: SpeechRecognitionResultLike;
}

interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultListLike;
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onaudiostart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onsoundstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onspeechstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onspeechend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onsoundend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onaudioend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onresult:
    | ((
        this: SpeechRecognitionInstance,
        ev: SpeechRecognitionEventLike,
      ) => void)
    | null;
  onerror:
    | ((
        this: SpeechRecognitionInstance,
        ev: SpeechRecognitionErrorEventLike,
      ) => void)
    | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

interface WindowWithSpeech extends Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

export default function useSpeechToText({
  onTranscript,
  onAudioLevel,
  onAudioBlob,
}: {
  onTranscript: (text: string) => void;
  onAudioLevel?: (level: number) => void;
  onAudioBlob?: (blob: Blob) => void;
}) {
  const [phase, setPhase] = useState<SpeechPhase>("idle");
  const [error, setError] = useState("");
  const [isVoiceDetected, setIsVoiceDetected] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const isExplicitStop = useRef(false);
  const onTranscriptRef = useRef(onTranscript);
  onTranscriptRef.current = onTranscript;
  const onAudioLevelRef = useRef(onAudioLevel);
  onAudioLevelRef.current = onAudioLevel;
  const onAudioBlobRef = useRef(onAudioBlob);
  onAudioBlobRef.current = onAudioBlob;

  const baseTextRef = useRef("");
  const accumulatedFinalRef = useRef("");
  const latestFullTextRef = useRef("");
  const hasReceivedResult = useRef(false);

  // Audio analysis & recording refs
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const cleanupAudio = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {
        // ignore
      }
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      for (const t of streamRef.current.getTracks()) t.stop();
      streamRef.current = null;
    }
    setAudioLevel(0);
    onAudioLevelRef.current?.(0);
  }, []);

  useEffect(() => {
    return () => {
      isExplicitStop.current = true;
      cleanupAudio();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
        recognitionRef.current = null;
      }
    };
  }, [cleanupAudio]);

  function stop() {
    isExplicitStop.current = true;

    // Immediately commit whatever was transcribed
    if (latestFullTextRef.current) {
      onTranscriptRef.current(latestFullTextRef.current);
    }

    // Stop MediaRecorder and emit recorded blob
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }

    cleanupAudio();
    setPhase("idle");
    setIsVoiceDetected(false);
  }

  async function start(initialText: string = "") {
    setError("");
    baseTextRef.current = initialText.trim();
    accumulatedFinalRef.current = "";
    latestFullTextRef.current = initialText.trim();
    isExplicitStop.current = false;
    hasReceivedResult.current = false;
    setIsVoiceDetected(false);

    // 1. Request microphone access for real-time audio analysis and recording
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      if (isExplicitStop.current) {
        for (const t of stream.getTracks()) t.stop();
        return;
      }

      streamRef.current = stream;

      // Initialize MediaRecorder to preserve voice note
      try {
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        audioChunksRef.current = [];
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          if (audioChunksRef.current.length > 0) {
            const blob = new Blob(audioChunksRef.current, {
              type: "audio/webm",
            });
            onAudioBlobRef.current?.(blob);
          }
        };
        recorder.start(250);
      } catch (recErr) {
        console.warn("[Voice] MediaRecorder note:", recErr);
      }

      // Initialize Web Audio API Analyser for real-time voice levels
      const AudioCtx =
        window.AudioContext ||
        (
          window as unknown as {
            webkitAudioContext: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.75;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const monitorAudio = () => {
          if (isExplicitStop.current) return;
          analyser.getByteFrequencyData(dataArray);

          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i] ?? 0;
          }
          const avg = sum / dataArray.length;
          const level = Math.min(100, Math.round((avg / 255) * 140));

          setAudioLevel(level);
          onAudioLevelRef.current?.(level);

          if (level > 10) {
            setIsVoiceDetected(true);
          }

          animFrameRef.current = requestAnimationFrame(monitorAudio);
        };

        monitorAudio();
      }
    } catch (micErr) {
      console.warn("[Voice] Mic permission notice:", micErr);
      setError(
        "Microphone access needed. Please permit microphone in browser.",
      );
    }

    // 2. Initialize Web Speech API for English speech-to-text
    const win =
      typeof window !== "undefined"
        ? (window as unknown as WindowWithSpeech)
        : null;
    const SpeechRecognition =
      win?.SpeechRecognition || win?.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setPhase("listening");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent,
      );
      recognition.continuous = !isSafari;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setPhase("listening");
        setError("");
      };

      recognition.onsoundstart = () => {
        setIsVoiceDetected(true);
      };

      recognition.onspeechstart = () => {
        setIsVoiceDetected(true);
      };

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        hasReceivedResult.current = true;
        setIsVoiceDetected(true);
        let interimText = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (!item) continue;
          const text = item[0]?.transcript ?? "";
          if (item.isFinal) {
            accumulatedFinalRef.current += `${text} `;
          } else {
            interimText += text;
          }
        }

        const fullSpoken =
          `${accumulatedFinalRef.current}${interimText}`.trim();
        if (fullSpoken) {
          const combined = baseTextRef.current
            ? `${baseTextRef.current} ${fullSpoken}`
            : fullSpoken;
          latestFullTextRef.current = combined;
          onTranscriptRef.current(combined);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
        if (isExplicitStop.current) return;
        if (
          event.error === "not-allowed" ||
          event.error === "service-not-allowed"
        ) {
          setError("Microphone permission was denied.");
          stop();
        }
      };

      recognition.onend = () => {
        if (!isExplicitStop.current) {
          try {
            recognition.start();
          } catch {
            // ignore
          }
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
      setPhase("listening");
    } catch (recErr) {
      console.warn("[Voice] SpeechRecognition start notice:", recErr);
      setPhase("listening");
    }
  }

  function toggle(initialText: string = "") {
    if (phase === "listening") {
      stop();
    } else {
      start(initialText);
    }
  }

  return {
    phase,
    error,
    isVoiceDetected,
    audioLevel,
    start,
    stop,
    toggle,
  };
}
