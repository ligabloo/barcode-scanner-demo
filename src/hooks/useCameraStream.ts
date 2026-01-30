import { useEffect, useEffectEvent, useRef, useState } from "react";

const DEFAULT_CONSTRAINTS: MediaTrackConstraints = {
  width: { min: 640, ideal: 1280 },
  height: { min: 480, ideal: 720 },
  facingMode: {
    ideal: "environment",
  },
  advanced: [{ width: 1920, height: 1280 }, { aspectRatio: 1.333 }],
};

export function useCameraStream(
  constraints: MediaTrackConstraints = DEFAULT_CONSTRAINTS,
) {
  const [stream, setStream] = useState<MediaStream>();
  const [error, setError] = useState<string>("");

  const startStream = useEffectEvent(() => {});

  useEffect(() => {
    console.log(stream);
    if (stream) return;

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: constraints,
      })
      .then((newStream) => {
        setStream(newStream);
      })
      .catch((err) => {
        console.error("Failed to load camera:", err);
        setError("Failed to access camera. Please grant camera permissions.");
      });

    startStream();
  }, [constraints, stream]);

  return { stream, error };
}
