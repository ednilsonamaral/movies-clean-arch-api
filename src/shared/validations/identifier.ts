import { validate } from 'uuid';

export function isUUID (uuid: string): boolean {
  return validate(uuid);
}

export function validateUUIDs (uuids: string[]): boolean {
  return uuids.every(isUUID);
}