export const BarcodeAbbreviations = {
  FIRST_NAME: "DAC",
  FIRST_NAME_DCT: "DCT",
  MIDDLE_NAME: "DAD",
  FAMILY_NAME: "DCS",
  ADDRESS_STREET: "DAG",
  ADDRESS_STREET_2: "DAH",
  ADDRESS_STATE: "DAJ",
  ADDRESS_CITY: "DAI",
  ADDRESS_ZIP: "DAK",
  LICENSE_NUMBER: "DAQ",
  COUNTRY: "DCG",
  DATE_OF_BIRTH: "DBB",
  ISSUE_DATE: "DBD",
  EXPIRATION_DATE: "DBA",
} as const;

export const BarcodeCountryCodesValues = {
  US: "US",
  CA: "CA",
} as const;

export type BarcodeCountryType = keyof typeof BarcodeCountryCodesValues;

export type ParsedBarcodeType = {
  firstName?: string;
  lastName?: string;
  addressCity?: string;
  addressState?: string;
  addressStreet?: string;
  addressStreet2?: string;
  addressZip?: string;
  birthDate?: string;
  expirationDate?: string;
  issueDate?: string;
  issuingCountry: string;
  licenseNumber: string;
};
