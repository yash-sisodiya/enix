import { AddressInterface } from '@/common/interface';
import * as Device from 'expo-device';

export function getPseudoDeviceId() {
  const deviceName = Device.deviceName || 'unknown_device';
  const osBuildFingerprint = Device.osBuildFingerprint || 'unknown_fingerprint';
  const osInternalBuildId = Device.osInternalBuildId || 'unknown_build_id';

  // Combine the fields to form a pseudo device ID
  const pseudoDeviceId = `${deviceName}-${osBuildFingerprint}-${osInternalBuildId}`;

  return pseudoDeviceId;
}

export const formatName = (firstName: string, lastName: string) => {
  const cleanFirstName = firstName ? firstName.trim() : "";
  const cleanLastName = lastName ? lastName.trim() : "";

  return `${cleanFirstName} ${cleanLastName}`.trim();
};

export function formatAddress(address?: AddressInterface) {
  if (!address) return '-';
  const {
    address: address1,
    city,
    state,
    stateCode,
    postalCode,
    country,
    coordinates
  } = address;

  const parts = [];

  if (address1) parts.push(address1);
  if (city) parts.push(city);
  if (state) parts.push(state);
  if (stateCode) parts.push(`(${stateCode})`);
  if (postalCode) parts.push(postalCode);
  if (country) parts.push(country);

  let fullAddress = parts.join(', ');

  if (coordinates) {
    fullAddress += ` (Lat: ${coordinates.lat}, Lng: ${coordinates.lng})`;
  }
  return fullAddress || '-';
}
