import { useLocation, Link } from "wouter";
import { type ParsedLicense } from "aamva-parser";
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

interface ExtendedLicense extends ParsedLicense {
  sex?: string;
  issuingCountry?: string;
  jurisdiction?: string;
  documentDiscriminator?: string;
  vehicleClass?: string;
}

function LicenseDetails() {
  const [, setLocation] = useLocation();

  const license = useMemo<ExtendedLicense | null>(() => {
    const storedLicense = sessionStorage.getItem("scannedLicense");
    if (storedLicense) {
      try {
        return JSON.parse(storedLicense);
      } catch (err) {
        console.error("Failed to parse license data:", err);
        setTimeout(() => setLocation("/"), 0);
        return null;
      }
    } else {
      setTimeout(() => setLocation("/"), 0);
      return null;
    }
  }, [setLocation]);

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

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

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

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              Personal Information
            </h2>
          </div>
          <div className="px-6">
            <Field label="First Name" value={license.firstName} />
            <Field label="Last Name" value={license.lastName} />
            <Field label="Middle Name" value={license.middleName} />
            <Field
              label="Date of Birth"
              value={formatDate(license.dateOfBirth)}
            />
            <Field label="Gender" value={license.sex} />
            <Field label="Eye Color" value={license.eyeColor} />
            <Field label="Hair Color" value={license.hairColor} />
            <Field label="Height" value={license.height} />
            <Field label="Weight" value={license.weight} />
          </div>
        </div>

        {/* License Information */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              License Information
            </h2>
          </div>
          <div className="px-6">
            <Field label="License Number" value={license.driversLicenseId} />
            <Field label="Issue Date" value={formatDate(license.issueDate)} />
            <Field
              label="Expiration Date"
              value={formatDate(license.expirationDate)}
            />
            <Field label="Issuing Country" value={license.issuingCountry} />
            <Field label="Jurisdiction" value={license.jurisdiction} />
            <Field
              label="Document Discriminator"
              value={license.documentDiscriminator}
            />
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Address</h2>
          </div>
          <div className="px-6">
            <Field label="Street Address" value={license.streetAddress} />
            <Field label="City" value={license.city} />
            <Field label="State" value={license.state} />
            <Field label="Postal Code" value={license.postalCode} />
          </div>
        </div>

        {/* Vehicle Class (if available) */}
        {license.vehicleClass && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
            <div className="bg-indigo-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">
                Vehicle Class
              </h2>
            </div>
            <div className="px-6">
              <Field label="Class" value={license.vehicleClass} />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-8">
          <Link href="/scanner">
            <a className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-center">
              Scan Another License
            </a>
          </Link>
          <Link href="/">
            <a className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-center">
              Go Home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LicenseDetails;
