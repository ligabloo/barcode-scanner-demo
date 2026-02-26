import React, { useEffect } from "react";
import { useMediaManager } from "@classytic/react-stream";

export function useBarcodeScanner(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  callback: (barcode: string) => void,
) {
  const { cameraStream, setCameraEnabled } = useMediaManager({
    autoInitialize: true,
    videoConstraints: {
      width: 1280,
      height: 720,
      facingMode: "environment",
    },
    audioConstraints: false,
  });

  useEffect(() => {
    if (!cameraStream) return;

    const video = videoRef.current!;

    const startScan = async () => {
      const { BrowserPDF417Reader } = await import("@zxing/browser");

      const reader = new BrowserPDF417Reader();

      const result = await reader.decodeOnceFromVideoElement(video);
      const barcode = encodeURIComponent(result.getText());
      callback(barcode);
    };

    video.srcObject = cameraStream;
    video.play();
    video.addEventListener("playing", startScan);

    return () => {
      video.removeEventListener("playing", startScan);

      video.srcObject = null;
      cameraStream.getTracks().forEach((track) => track.stop());
    };
  }, [cameraStream, setCameraEnabled, callback, videoRef]);
}
