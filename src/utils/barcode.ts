import dayjs from "dayjs";
import {
  BarcodeAbbreviations,
  BarcodeCountryCodesValues,
  type BarcodeCountryType,
  type ParsedBarcodeType,
} from "../types/driversLicenseScanner";

const countryCodesMap = {
  USA: BarcodeCountryCodesValues.US,
  CAN: BarcodeCountryCodesValues.CA,
} as const;

const countryDateFormatsMap = {
  US: "MMDDYYYY",
  CA: "YYYYMMDD",
};

const extractKeyValue = (
  key: string,
  data: string,
  target: keyof ParsedBarcodeType,
) => {
  const matchingLine = data.match(
    new RegExp(`(\r\n|\n|\r|ANSI.+)(${String(key)})(.+)`),
  );
  if (matchingLine) {
    return { [target]: matchingLine[matchingLine.length - 1].trim() };
  }
  return {};
};

const parseCountryCode = ({ issuingCountry }: Record<string, string>) => {
  switch (issuingCountry) {
    case BarcodeCountryCodesValues.CA:
      return String(countryCodesMap.CAN);
    default:
      return String(countryCodesMap.USA);
  }
};

const parseDate = (
  data: Record<string, string>,
  label: string,
  country: string = BarcodeCountryCodesValues.US,
) => {
  const dateString = data[label];
  if (!dateString || dateString.length !== 8) return {};

  const dateObj = dayjs(
    dateString,
    countryDateFormatsMap[country as BarcodeCountryType],
  );

  return dateObj.isValid() ? { [label]: dateObj.format("YYYY-MM-DD") } : {};
};

const parseZipCode = (
  { addressZip }: { addressZip?: string },
  countryCode: string = BarcodeCountryCodesValues.US,
) => {
  if (!addressZip) return {};

  // if the country is not US or it doesn't have 9 digits, there's no need to parse
  if (countryCode !== BarcodeCountryCodesValues.US || addressZip.length !== 9)
    return { addressZip };

  // if the last 4 digits are zeroes, should return only the first 5
  const firstPart = addressZip.slice(0, 5);
  if (addressZip.endsWith("0000")) {
    return { addressZip: firstPart };
  }

  // if its' 9 digits and the last 4 aren't zeroes, should add a dash to it for ZIP+4 format
  const secondPart = addressZip.slice(5);
  return { addressZip: `${firstPart}-${secondPart}` };
};

export const parseBarcode = (data: string): ParsedBarcodeType | undefined => {
  if (!data) return;

  const keyValueIssuingCountry = extractKeyValue(
    BarcodeAbbreviations.COUNTRY,
    data,
    "issuingCountry",
  );

  const issuingCountry = parseCountryCode(keyValueIssuingCountry);
  return {
    issuingCountry,
    ...extractKeyValue(BarcodeAbbreviations.FIRST_NAME, data, "firstName"),
    ...extractKeyValue(BarcodeAbbreviations.FIRST_NAME_DCT, data, "firstName"),
    ...extractKeyValue(BarcodeAbbreviations.FAMILY_NAME, data, "lastName"),
    ...extractKeyValue(
      BarcodeAbbreviations.ADDRESS_STREET,
      data,
      "addressStreet",
    ),
    ...extractKeyValue(
      BarcodeAbbreviations.ADDRESS_STREET_2,
      data,
      "addressStreet2",
    ),
    ...parseZipCode(
      extractKeyValue(BarcodeAbbreviations.ADDRESS_ZIP, data, "addressZip"),
      issuingCountry,
    ),
    ...extractKeyValue(BarcodeAbbreviations.ADDRESS_CITY, data, "addressCity"),
    ...extractKeyValue(
      BarcodeAbbreviations.ADDRESS_STATE,
      data,
      "addressState",
    ),
    ...parseDate(
      extractKeyValue(BarcodeAbbreviations.DATE_OF_BIRTH, data, "birthDate"),
      "birthDate",
      issuingCountry,
    ),
    ...parseDate(
      extractKeyValue(
        BarcodeAbbreviations.EXPIRATION_DATE,
        data,
        "expirationDate",
      ),
      "expirationDate",
      issuingCountry,
    ),
    ...parseDate(
      extractKeyValue(BarcodeAbbreviations.ISSUE_DATE, data, "issueDate"),
      "issueDate",
      issuingCountry,
    ),
    ...extractKeyValue(
      BarcodeAbbreviations.LICENSE_NUMBER,
      data,
      "licenseNumber",
    ),
  } as unknown as ParsedBarcodeType;
};

export const isParsedBarCodeValid = (
  receivedProperties?: ParsedBarcodeType,
): boolean => {
  if (!receivedProperties) return false;
  const { issuingCountry, lastName, licenseNumber } = receivedProperties;
  return !!issuingCountry && !!lastName && !!licenseNumber;
};
