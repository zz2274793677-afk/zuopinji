"use client";

import type { CSSProperties } from "react";
import { useEffect, useId, useRef, useState } from "react";

type PortfolioVideoPlayerProps = {
  durationLabel: string;
  label: string;
  poster: string;
  src: string;
};

const PLAY_EVENT = "portfolio-video-play";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

export default function PortfolioVideoPlayer({ durationLabel, label, poster, src }: PortfolioVideoPlayerProps) {
  const playerId = useId();
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const resumeAfterSeekRef = useRef(false);
  const seekingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      setDuration(video.duration);
      setCurrentTime(video.currentTime);
      updateBuffer();
    }

    const pauseWhenAnotherStarts = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail !== playerId && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    };
    const syncFullscreen = () => setFullscreen(document.fullscreenElement === playerRef.current);
    window.addEventListener(PLAY_EVENT, pauseWhenAnotherStarts);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => {
      window.removeEventListener(PLAY_EVENT, pauseWhenAnotherStarts);
      document.removeEventListener("fullscreenchange", syncFullscreen);
    };
  }, [playerId]);

  const updateBuffer = () => {
    const video = videoRef.current;
    if (!video || !video.duration || video.buffered.length === 0) return;
    let furthest = 0;
    for (let index = 0; index < video.buffered.length; index += 1) {
      furthest = Math.max(furthest, video.buffered.end(index));
    }
    setBuffered(Math.min(100, (furthest / video.duration) * 100));
  };

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: playerId }));
      try {
        await video.play();
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  const seekTo = (value: number) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const safeValue = Math.min(duration, Math.max(0, value));
    video.currentTime = safeValue;
    setCurrentTime(safeValue);
  };

  const startSeeking = () => {
    const video = videoRef.current;
    if (!video) return;
    resumeAfterSeekRef.current = !video.paused;
    seekingRef.current = true;
    setSeeking(true);
    if (!video.paused) video.pause();
  };

  const finishSeeking = async () => {
    const video = videoRef.current;
    if (!video || !seekingRef.current) return;
    seekingRef.current = false;
    setSeeking(false);
    if (resumeAfterSeekRef.current) {
      window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: playerId }));
      try {
        await video.play();
      } catch {
        setPlaying(false);
      }
    }
    resumeAfterSeekRef.current = false;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
  };

  const changeVolume = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = value;
    video.muted = value === 0;
    setVolume(value);
    setMuted(value === 0);
  };

  const toggleFullscreen = async () => {
    if (!playerRef.current) return;
    if (document.fullscreenElement === playerRef.current) {
      await document.exitFullscreen();
    } else {
      await playerRef.current.requestFullscreen();
    }
  };

  const progress = duration ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <article className={`portfolio-player ${playing ? "is-playing" : ""}`} ref={playerRef}>
      <div className="portfolio-player__viewport">
        <video
          ref={videoRef}
          playsInline
          preload="metadata"
          poster={poster}
          onClick={togglePlayback}
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration);
            updateBuffer();
          }}
          onCanPlay={(event) => {
            if (!duration && Number.isFinite(event.currentTarget.duration)) {
              setDuration(event.currentTarget.duration);
            }
            updateBuffer();
          }}
          onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
          onTimeUpdate={(event) => {
            if (!seekingRef.current) setCurrentTime(event.currentTarget.currentTime);
          }}
          onProgress={updateBuffer}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          aria-label={label}
        >
          <source src={src} type="video/mp4" />
          当前浏览器无法播放此视频。
        </video>
        <button className="portfolio-player__center" type="button" onClick={togglePlayback} aria-label={playing ? "暂停视频" : "播放视频"}>
          {playing ? "PAUSE" : "PLAY"}
        </button>
      </div>

      <div className="portfolio-player__controls">
        <div className="portfolio-player__meta">
          <h3>{label}</h3>
          <span>{duration ? formatTime(duration) : durationLabel}</span>
        </div>

        <div className="video-progress" style={{ "--played": `${progress}%`, "--buffered": `${buffered}%` } as CSSProperties}>
          <span className="video-progress__buffered" />
          <span className="video-progress__played" />
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.01"
            value={Math.min(currentTime, duration || 0)}
            disabled={!duration}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              startSeeking();
            }}
            onPointerUp={finishSeeking}
            onPointerCancel={finishSeeking}
            onLostPointerCapture={finishSeeking}
            onChange={(event) => seekTo(Number(event.currentTarget.value))}
            onKeyDown={(event) => {
              if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key) && !seeking) startSeeking();
            }}
            onKeyUp={finishSeeking}
            aria-label={`${label}播放进度`}
          />
        </div>

        <div className="portfolio-player__actions">
          <button type="button" onClick={togglePlayback}>{playing ? "PAUSE" : "PLAY"}</button>
          <span className="portfolio-player__time">{formatTime(currentTime)} / {duration ? formatTime(duration) : durationLabel}</span>
          <div className="portfolio-player__volume">
            <button type="button" onClick={toggleMute}>{muted ? "MUTED" : "VOLUME"}</button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={(event) => changeVolume(Number(event.currentTarget.value))}
              aria-label={`${label}音量`}
            />
          </div>
          <button type="button" onClick={toggleFullscreen}>{fullscreen ? "EXIT FULL" : "FULLSCREEN"}</button>
        </div>
      </div>
    </article>
  );
}
