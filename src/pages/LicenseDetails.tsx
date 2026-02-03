import { useLocation, Link, useParams } from "wouter";
import { Parse, type ParsedLicense } from "aamva-parser";
import { useMemo } from "react";

const Field = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <div className="py-3 border-b border-gray-200 last:border-b-0">
    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
      {label}
    </div>
    <div className="text-base text-gray-900 break-words">
      {value?.toString() || "N/A"}
    </div>
  </div>
);

function LicenseDetails() {
  const [, navigate] = useLocation();
  const { barcode } = useParams<{ barcode: string }>();

  const license = useMemo<ParsedLicense | null>(() => {
    try {
      const license = Parse(barcode);
      return license;
    } catch (err) {
      console.error("Failed to parse license data:", err);
      setTimeout(() => navigate("/"), 0);
      return null;
    }
  }, [barcode, navigate]);

  if (!license) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading license data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            License Details
          </h1>
          <p className="text-gray-600">Scanned information from ID</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4 px-6">
          {Object.keys(license).map((key) => (
            <Field
              key={key}
              label={key}
              value={license[key as keyof ParsedLicense]?.toString()}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-8">
          <Link
            href="/scanner"
            className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-center"
          >
            Scan Another License
          </Link>
          <Link
            href="/"
            className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-center"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LicenseDetails;
