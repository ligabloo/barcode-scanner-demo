import { Link } from "wouter";

function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Barcode Scanner Demo
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome to the PDF417 barcode scanner application. Scan driver's
          licenses and ID cards with ease.
        </p>
        <Link
          href="/scanner"
          className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Start Scanner
        </Link>
      </div>
    </div>
  );
}

export default Home;
