"use client";

import { PauseIcon, PlayIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useRef, useState } from "react";
import { AMBIENT_SONG } from "@/data/ambientSong";

const DEFAULT_VOLUME = 0.34;

export default function AmbientMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setAutoplayBlocked(false);
    } catch {
      setAutoplayBlocked(true);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = DEFAULT_VOLUME;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsMuted(audio.muted);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("volumechange", handleVolumeChange);
    void play();

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [play]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void play();
      return;
    }

    audio.pause();
  };

  const toggleMuted = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
  };

  const status = isPlaying ? AMBIENT_SONG.title : autoplayBlocked ? "点击播放" : "音乐暂停";

  return (
    <div className="fixed bottom-5 left-20 z-[70] sm:bottom-6 sm:left-24">
      <audio ref={audioRef} loop preload="auto" src={AMBIENT_SONG.src} />
      <div className="flex items-center gap-2 rounded-full border border-[#FFFDF8]/35 bg-[#102033]/78 py-1.5 pl-2 pr-3 text-[#FFFDF8] shadow-[0_10px_28px_rgba(16,32,51,0.22)] backdrop-blur-md">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "暂停背景音乐" : "播放背景音乐"}
          className="grid size-8 place-items-center rounded-full bg-[#C66A2B] text-[#FFFDF8] transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFDF8]"
        >
          {isPlaying ? <PauseIcon className="size-3.5" /> : <PlayIcon className="size-3.5 translate-x-px" />}
        </button>
        <div className="min-w-0 leading-none">
          <p className="font-mono text-[8px] tracking-[0.16em] text-[#E8B384]">TRAVEL RADIO</p>
          <p className="mt-1 max-w-24 truncate font-display text-sm font-normal tracking-[0.04em] text-[#FFFDF8]">{status}</p>
        </div>
        <button
          type="button"
          onClick={toggleMuted}
          aria-label={isMuted ? "恢复背景音乐声音" : "静音背景音乐"}
          className="ml-0.5 grid size-7 place-items-center rounded-full text-[#FFFDF8]/75 transition-colors hover:bg-[#FFFDF8]/12 hover:text-[#FFFDF8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFDF8]"
        >
          {isMuted ? <SpeakerXMarkIcon className="size-3.5" /> : <SpeakerWaveIcon className="size-3.5" />}
        </button>
      </div>
    </div>
  );
}
