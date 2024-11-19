// src/utils/deviceIdentifier.ts
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const getDeviceIdentifier = async (): Promise<string> => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
};
