// Browser & client-side cryptographic utilities for e-Verify Metrology (SIH 26036)

/**
 * Computes canonical SHA-256 hash from certificate attributes.
 * Canonical string: certId|instrumentId|issuedAt|expiresAt|lmoId|sealNumber|mpeStatus
 */
export async function computeCertificateHash(data) {
  const canonicalString = [
    data.certificateId || data.c || '',
    data.instrumentId || '',
    data.issuedAt || '',
    data.expiresAt || data.e || '',
    data.lmoId || '',
    data.sealNumber || '',
    data.mpeStatus || 'PASS'
  ].join('|');

  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(canonicalString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Builds standard SIH 26036 QR Payload format:
 * { "v": "1.0", "c": certificateId, "h": SHA-256 hash, "e": expiry ISO, "u": verification URL }
 */
export async function generateQrPayload(cert) {
  const hash = await computeCertificateHash(cert);
  const baseUrl = window.location.origin;
  const payload = {
    v: "1.0",
    c: cert.certificateId,
    h: hash,
    e: cert.expiresAt,
    u: `${baseUrl}/?verify=${cert.certificateId}`
  };
  return {
    jsonString: JSON.stringify(payload),
    payload,
    computedHash: hash
  };
}

/**
 * Offline validation logic:
 * Recomputes SHA-256 from data fields and compares with the embedded hash `h`
 */
export async function validateQrPayloadOffline(payload, fullCertData = null) {
  if (!payload || !payload.c || !payload.h) {
    return {
      isValid: false,
      reason: "Malformed QR Payload: Missing critical cryptographic parameters (c, h)."
    };
  }

  // If full cert data is available (e.g. from local Hive storage / scanned full payload)
  if (fullCertData) {
    const recalculatedHash = await computeCertificateHash(fullCertData);
    const matches = recalculatedHash.toLowerCase() === payload.h.toLowerCase();
    return {
      isValid: matches,
      embeddedHash: payload.h,
      recalculatedHash: recalculatedHash,
      reason: matches ? "Cryptographic Signature Verified. No Tampering Detected." : "TAMPER ALERT: Embedded hash does not match computed hash!"
    };
  }

  // Basic structure verification
  const isHashValidFormat = /^[a-fA-F0-9]{64}$/.test(payload.h);
  return {
    isValid: isHashValidFormat,
    embeddedHash: payload.h,
    reason: isHashValidFormat 
      ? "Payload signature structure is valid (SHA-256 256-bit digest)." 
      : "Invalid SHA-256 digest format."
  };
}
