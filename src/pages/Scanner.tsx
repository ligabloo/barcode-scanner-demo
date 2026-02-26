import { useCallback, useRef } from "react";
import { useLocation, Link } from "wouter";
import { useBarcodeScanner } from "../hooks/useBarcodeScanner";

function Scanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, navigate] = useLocation();

  const barcodeScannerCallback = useCallback(
    (barcode: string) => {
      navigate(`/license-details/${barcode}`);
    },
    [navigate],
  );

  useBarcodeScanner(videoRef, barcodeScannerCallback);

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
        <div className="w-full max-w-4xl">
          {/* Scanner Frame */}
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
            <video
              id="stream"
              autoPlay
              ref={videoRef}
              className="w-full h-auto"
            />

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
                  className="h-6 w-6 text-green-500 mr-2 shrink-0"
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
                <span>Position the PDF417 barcode within the green frame</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-2 shrink-0"
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
                  className="h-6 w-6 text-green-500 mr-2 shrink-0"
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
      </div>
    </div>
  );
}

export default Scanner;
