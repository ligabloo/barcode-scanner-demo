import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "wouter";

import { readBarcodes } from "zxing-wasm/reader";

const DEFAULT_CONSTRAINTS: MediaTrackConstraints = {
  width: { min: 640, ideal: 1280 },
  height: { min: 480, ideal: 720 },
  facingMode: {
    ideal: "environment",
  },
  advanced: [{ width: 1920, height: 1280 }, { aspectRatio: 1.333 }],
};

function Scanner() {
  const [, navigate] = useLocation();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<OffscreenCanvas>(new OffscreenCanvas(0, 0));

  const [error, setError] = useState<string>("");

  useEffect(() => {
    const canvas = canvasRef.current!;
    const video = videoRef.current!;

    const captureBarcode = async () => {
      const width = video?.videoWidth;
      const height = video?.videoHeight;

      if (!width || !height) {
        setTimeout(captureBarcode, 50);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 50));

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
      }) as OffscreenCanvasRenderingContext2D;

      ctx.drawImage(video, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);

      const barcodes = await readBarcodes(imageData, {
        formats: ["PDF417"],
        tryHarder: true,
        tryRotate: true,
        textMode: "Plain",
      }).catch((e) => console.log("Error parsing barcode", e));

      console.log(barcodes);

      if (!barcodes || !barcodes.length) {
        setTimeout(captureBarcode, 50);
        return;
      }

      const encodedBarcode = encodeURIComponent(barcodes[0].text);
      navigate(`/license-details/${encodedBarcode}`);
    };

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: DEFAULT_CONSTRAINTS,
      })
      .then((stream) => {
        video.addEventListener("play", captureBarcode);
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("Failed to load camera:", err);
        setError("Failed to access camera. Please grant camera permissions.");
      });

    return () => {
      video.removeEventListener("play", captureBarcode);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-indigo-600 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">PDF417 Scanner</h1>
          <Link
            href="/"
            className="text-white hover:text-indigo-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {error ? (
          <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-900 mb-2">
              Camera Access Required
            </h2>
            <p className="text-red-700 mb-4">{error}</p>
            <Link
              href="/"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Go Back
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            {/* Scanner Frame */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              <video autoPlay ref={videoRef} className="w-full h-auto" />

              {/* Scanning Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 border-4 border-indigo-500 opacity-50 rounded-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-1/3 border-2 border-green-400">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400"></div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Instructions:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Position the PDF417 barcode within the green frame
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Hold the device steady and ensure good lighting</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>The barcode will be scanned automatically</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Scanner;
