import { useEffect, useEffectEvent, useRef, useState } from "react";

const DEFAULT_CONSTRAINTS: MediaTrackConstraints = {
  width: { min: 640, ideal: 1280 },
  height: { min: 480, ideal: 720 },
  facingMode: {
    ideal: "environment",
  },
  advanced: [{ width: 1920, height: 1280 }, { aspectRatio: 1.333 }],
};

export function useCamera(
  constraints: MediaTrackConstraints = DEFAULT_CONSTRAINTS,
) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string>("");

  const startStream = useEffectEvent(() => {
    const video = videoRef.current!;

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: constraints,
      })
      .then((newStream) => {
        video.srcObject = newStream;
        video.play();
        setIsStreaming(true);
      })
      .catch((err) => {
        console.error("Failed to load camera:", err);
        setError("Failed to access camera. Please grant camera permissions.");
      });
  });

  useEffect(() => {
    if (isStreaming) return;

    startStream();
  }, [isStreaming]);

  return { videoRef, error };
}
