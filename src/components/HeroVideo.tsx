"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ImageAsset } from "@/content/types";

type PlayerMessage = {
  event?: string;
  info?: number | { playerState?: number; currentTime?: number; duration?: number } | null;
};

const YT_ORIGIN = "https://www.youtube-nocookie.com";
const PLAYING = 1;
const ENDED = 0;

/** True when the visitor asked for less motion or less data. Server snapshot: true (poster only). */
function useQuietPreference(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => {
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches || Boolean(saveData);
    },
    () => true,
  );
}

/**
 * Decorative, muted YouTube background for the hero.
 *
 * - The poster renders first (and is the LCP image); the video fades in only
 *   once YouTube reports it is actually playing, so there is never a black
 *   frame or a flash of player chrome.
 * - Loops back to `start`, not 0, a moment before the end screen appears.
 * - Always offers a pause control (WCAG 2.2.2). Reduced motion or Data Saver
 *   means no autoplay; the visitor can still choose to play it.
 */
export function HeroVideo({
  youtubeId,
  start,
  title,
  poster,
}: {
  youtubeId: string;
  start: number;
  title: string;
  poster: ImageAsset;
}) {
  const quiet = useQuietPreference();
  const [choice, setChoice] = useState<"play" | "pause" | null>(null);
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const revealTimer = useRef<number | undefined>(undefined);

  // Mount when autoplay is welcome or the visitor pressed play; once mounted, pausing keeps it mounted.
  const mountVideo = choice !== null || !quiet;

  const command = (func: string, args: unknown[] = []) =>
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), YT_ORIGIN);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== YT_ORIGIN || e.source !== iframeRef.current?.contentWindow) return;
      let data: PlayerMessage;
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      const info = data.info;
      const state =
        data.event === "onStateChange" && typeof info === "number"
          ? info
          : typeof info === "object" && info
            ? info.playerState
            : undefined;

      // YouTube flashes a pause bezel when playback starts; reveal just after it clears.
      if (state === PLAYING && !revealTimer.current) {
        revealTimer.current = window.setTimeout(() => setPlaying(true), 3000);
      }
      if (state === ENDED) {
        command("seekTo", [start, true]);
        command("playVideo");
      }
      // Jump back just before the end so YouTube's end screen never shows.
      if (typeof info === "object" && info?.currentTime && info.duration && info.currentTime > info.duration - 0.6) {
        command("seekTo", [start, true]);
      }
    }
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(revealTimer.current);
    };
  }, [start]);

  const onIframeLoad = () => {
    // Ask the player to stream state events back to us.
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: youtubeId }), YT_ORIGIN);
    command("mute");
  };

  const togglePlayback = () => {
    if (playing && choice !== "pause") {
      command("pauseVideo");
      setChoice("pause");
    } else {
      setChoice("play");
      command("playVideo");
    }
  };

  const isActive = playing && choice !== "pause";

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    start: String(start),
    controls: "0",
    disablekb: "1",
    fs: "0",
    playsinline: "1",
    rel: "0",
    iv_load_policy: "3",
    enablejsapi: "1",
    ...(typeof window !== "undefined" ? { origin: window.location.origin } : {}),
  });

  return (
    <>
      <div aria-hidden className="absolute inset-0 overflow-hidden bg-iron [container-type:size]">
        {poster.src && (
          <Image
            src={poster.src}
            alt=""
            fill
            preload
            sizes="100vw"
            // The source frame is letterboxed; scaling crops the baked-in bars.
            className="scale-[1.32] object-cover"
          />
        )}
        {mountVideo && (
          <iframe
            ref={iframeRef}
            src={`${YT_ORIGIN}/embed/${youtubeId}?${params}`}
            title={`Background video: ${title}`}
            tabIndex={-1}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={onIframeLoad}
            className={`pointer-events-none absolute top-1/2 left-1/2 h-[max(56.25cqw,100cqh)] w-[max(100cqw,177.78cqh)] -translate-x-1/2 -translate-y-1/2 border-0 transition-[opacity,scale] duration-1000 ease-settle motion-reduce:transition-opacity ${
              playing ? "scale-[1.32] opacity-100" : "scale-[1.38] opacity-0 motion-reduce:scale-[1.32]"
            }`}
          />
        )}
      </div>

      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isActive ? "Pause background video" : "Play background video"}
        className="material-dark absolute right-4 bottom-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full text-marble transition-transform duration-100 active:scale-90 sm:right-6 sm:bottom-6 lg:right-10 lg:bottom-8"
      >
        <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
          {isActive ? <path d="M5 3h3.5v14H5zM11.5 3H15v14h-3.5z" /> : <path d="M6 3.5v13l11-6.5z" />}
        </svg>
      </button>
    </>
  );
}
