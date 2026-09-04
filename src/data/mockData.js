// Mock Metrology Data & Full Codebase Artifacts for e-Verify Metrology (SIH 26036)

export const INITIAL_CERTIFICATES = [
  {
    certificateId: "CERT-2026-WB-8821",
    instrumentId: "INST-WB-4401",
    instrumentType: "Non-Automatic Weighing Instrument (NAWI) - Weighbridge",
    manufacturer: "Avery Weigh-Tronix India Pvt Ltd",
    modelNumber: "BridgeMaster E-1200",
    serialNumber: "SN-98214-DEL",
    accuracyClass: "Class III (Medium Accuracy)",
    maxCapacity: "60,000 kg (60 Ton)",
    minCapacity: "400 kg",
    verificationScaleInterval: "20 kg (e = 20 kg)",
    traderName: "Tata Steel Logistics & Depot Yard",
    premisesAddress: "Plot 42, Sector 18, Transport Nagar, New Delhi 110042",
    lmoName: "Rajesh Kumar Sharma (Inspector ID: LMO-DL-08)",
    lmoDesignation: "Senior Legal Metrology Officer, Zone-IV",
    sealNumber: "SEAL-GOV-2026-991823",
    mpeStatus: "PASS",
    testLoadReadings: [
      { appliedLoad: "10,000 kg", indicatedValue: "10,000 kg", error: "0 kg", maxAllowedError: "±20 kg", status: "PASS" },
      { appliedLoad: "30,000 kg", indicatedValue: "30,010 kg", error: "+10 kg", maxAllowedError: "±40 kg", status: "PASS" },
      { appliedLoad: "60,000 kg", indicatedValue: "59,985 kg", error: "-15 kg", maxAllowedError: "±60 kg", status: "PASS" }
    ],
    issuedAt: "2026-03-01T10:30:00.000Z",
    expiresAt: "2027-02-28T23:59:59.000Z",
    status: "ACTIVE",
    gpsCoordinates: { lat: 28.6139, lng: 77.2090 },
    stampingLocation: "Delhi Transport Nagar Yard #3",
    digitalSignature: "RSA-PSS-SHA256:8f92a1e0...b820a1"
  },
  {
    certificateId: "CERT-2026-CS-3390",
    instrumentId: "INST-CS-1092",
    instrumentType: "Electronic Point-of-Sale Retail Weighing Scale",
    manufacturer: "Essae Teraoka Pvt Ltd",
    modelNumber: "DS-215 POS Bench Scale",
    serialNumber: "SN-44109-MUM",
    accuracyClass: "Class III",
    maxCapacity: "30 kg",
    minCapacity: "100 g",
    verificationScaleInterval: "5 g (e = 5 g)",
    traderName: "Reliance Fresh Supermarket #104",
    premisesAddress: "Shop 12-14, Phoenix Palladium, Lower Parel, Mumbai 400013",
    lmoName: "Priya V. Sawant (Inspector ID: LMO-MH-14)",
    lmoDesignation: "Legal Metrology Inspector, District Mumbai South",
    sealNumber: "SEAL-GOV-2026-550192",
    mpeStatus: "PASS",
    testLoadReadings: [
      { appliedLoad: "5 kg", indicatedValue: "5.000 kg", error: "0 g", maxAllowedError: "±5 g", status: "PASS" },
      { appliedLoad: "15 kg", indicatedValue: "15.002 kg", error: "+2 g", maxAllowedError: "±10 g", status: "PASS" },
      { appliedLoad: "30 kg", indicatedValue: "29.996 kg", error: "-4 g", maxAllowedError: "±15 g", status: "PASS" }
    ],
    issuedAt: "2026-02-15T09:15:00.000Z",
    expiresAt: "2027-02-14T23:59:59.000Z",
    status: "ACTIVE",
    gpsCoordinates: { lat: 18.9986, lng: 72.8258 },
    stampingLocation: "Lower Parel Commercial Complex",
    digitalSignature: "RSA-PSS-SHA256:7c11a09d...f021e9"
  },
  {
    certificateId: "CERT-2026-FD-7712",
    instrumentId: "INST-FD-8830",
    instrumentType: "Multi-Product Fuel Dispensing Unit (MPD)",
    manufacturer: "Gilbarco Veeder-Root India",
    modelNumber: "Horizon Plus MPD 4-Arm",
    serialNumber: "SN-66710-BLR",
    accuracyClass: "Class 0.5 (Liquid Fuel Measuring)",
    maxCapacity: "80 Litres/min",
    minCapacity: "5 Litres/min",
    verificationScaleInterval: "10 mL",
    traderName: "Indian Oil Corporation Auto Care Station",
    premisesAddress: "Survey 88, Outer Ring Road, Bellandur, Bengaluru 560103",
    lmoName: "Anand M. Gowda (Inspector ID: LMO-KA-02)",
    lmoDesignation: "Divisional Assistant Controller of Legal Metrology",
    sealNumber: "SEAL-GOV-2026-118844",
    mpeStatus: "PASS",
    testLoadReadings: [
      { appliedLoad: "5 Litres Test Standard", indicatedValue: "5.004 Litres", error: "+4 mL", maxAllowedError: "±25 mL", status: "PASS" },
      { appliedLoad: "20 Litres Test Standard", indicatedValue: "19.992 Litres", error: "-8 mL", maxAllowedError: "±100 mL", status: "PASS" }
    ],
    issuedAt: "2026-01-20T11:45:00.000Z",
    expiresAt: "2027-01-19T23:59:59.000Z",
    status: "ACTIVE",
    gpsCoordinates: { lat: 12.9352, lng: 77.6245 },
    stampingLocation: "IOCL Station Bellandur",
    digitalSignature: "RSA-PSS-SHA256:3a45c812...d198bb"
  }
];

export const MOCK_APPLICATIONS = [
  {
    appId: "APP-2026-8801",
    traderName: "BigBasket Distribution Center 09",
    instrumentType: "Industrial High-Capacity Platform Scale",
    model: "Essae PR-500",
    capacity: "500 kg",
    submissionDate: "2026-03-04",
    status: "PENDING_INSPECTION",
    priority: "HIGH",
    assignedLmo: "Rajesh Kumar Sharma",
    location: "Noida Sector 63"
  },
  {
    appId: "APP-2026-8802",
    traderName: "Bharat Petroleum Highway Oasis",
    instrumentType: "Fuel Dispenser 2-Nozzle",
    model: "Tokheim Quantium 510",
    capacity: "50 L/min",
    submissionDate: "2026-03-03",
    status: "SCHEDULED",
    priority: "MEDIUM",
    assignedLmo: "Anand M. Gowda",
    location: "NH-44 Highway Mile 14"
  },
  {
    appId: "APP-2026-8803",
    traderName: "Kalyan Jewellers Showroom",
    instrumentType: "High-Precision Class II Analytical Balance",
    model: "Sartorius Entris II",
    capacity: "620 g (e=1mg)",
    submissionDate: "2026-03-02",
    status: "INSPECTION_COMPLETED",
    priority: "URGENT",
    assignedLmo: "Priya V. Sawant",
    location: "Zaveri Bazaar, Mumbai"
  }
];

export const MOCK_ANOMALIES = [
  {
    id: "ANOM-2026-019",
    type: "INSPECTOR_VELOCITY_VIOLATION",
    severity: "CRITICAL",
    score: 0.94,
    description: "Impossible Inspector Velocity: LMO-UP-12 stamped 2 weighbridges located 180 km apart within 14 minutes.",
    target: "LMO Inspector: Suresh Tripathi (ID: LMO-UP-12)",
    timestamp: "10 mins ago",
    status: "FLAGGED_FOR_AUDIT",
    aiModel: "FastAPI Isolation Forest v2.1"
  },
  {
    id: "ANOM-2026-018",
    type: "UNUSUAL_PASS_RATE_SPIKE",
    severity: "HIGH",
    score: 0.88,
    description: "Statistical Drift Anomaly: GATC Verification Center #04 reported 100% pass rate over 240 fuel dispensers without a single calibration failure.",
    target: "GATC Center 04 (Northern Petroleum Zone)",
    timestamp: "45 mins ago",
    status: "AUTO_NOTIFIED_DIRECTOR",
    aiModel: "Z-Score Statistical Drift Classifier"
  },
  {
    id: "ANOM-2026-017",
    type: "DUPLICATE_SERIAL_ATTEMPT",
    severity: "MEDIUM",
    score: 0.79,
    description: "Duplicate Hardware Serial: Instrument SN-88192-DEL registered simultaneously in Ghaziabad and Jaipur.",
    target: "Trader: Apex Grain Merchants",
    timestamp: "2 hours ago",
    status: "BLOCKED_BY_DATABASE_CONSTRAINT",
    aiModel: "Hardware Unique Hash Validator"
  }
];

export const CODEBASE_SNIPPETS = {
  prismaSchema: `// backend/prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  SUPER_ADMIN
  DIRECTOR_METROLOGY
  LMO_INSPECTOR
  GATC_OFFICER
  TRADER
  MANUFACTURER
}

enum CertificateStatus {
  ACTIVE
  EXPIRED
  REVOKED
  SUSPENDED
}

enum MpeStatus {
  PASS
  FAIL
  MARGINAL
}

model User {
  id              String         @id @default(uuid())
  email           String         @unique
  passwordHash    String
  fullName        String
  phone           String?
  role            Role           @default(TRADER)
  governmentId    String?        // LMO badge ID or Trader GSTIN
  assignedState   String?
  assignedZone    String?
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
  
  verifications   Verification[] @relation("InspectorVerifications")
  applications    Application[]  @relation("TraderApplications")
  auditLogs       AuditLog[]
}

model Instrument {
  id              String         @id @default(uuid())
  serialNumber    String         @unique
  instrumentType  String         // NAWI Weighbridge, POS Scale, MPD Fuel Dispenser
  manufacturer    String
  modelNumber     String
  accuracyClass   String         // Class I, Class II, Class III, Class 0.5
  maxCapacity     String
  minCapacity     String
  verificationScaleInterval String // e.g. "e = 5 g" or "e = 20 kg"
  ownerId         String
  ownerGstin      String
  registeredAt    DateTime       @default(now())

  applications    Application[]
  certificates    Certificate[]
}

model Application {
  id              String         @id @default(uuid())
  applicationNo   String         @unique
  traderId        String
  trader          User           @relation("TraderApplications", fields: [traderId], references: [id])
  instrumentId    String
  instrument      Instrument     @relation(fields: [instrumentId], references: [id])
  premisesAddress String
  status          String         @default("SUBMITTED")
  createdAt       DateTime       @default(now())
  
  verifications   Verification[]
}

model Verification {
  id              String         @id @default(uuid())
  applicationId   String
  application     Application    @relation(fields: [applicationId], references: [id])
  inspectorId     String
  inspector       User           @relation("InspectorVerifications", fields: [inspectorId], references: [id])
  testLoadData    Json           // Array of { appliedLoad, indicatedValue, error, maxAllowedError, status }
  mpeStatus       MpeStatus      @default(PASS)
  physicalSealId  String         @unique
  latitude        Float
  longitude       Float
  photoProofUrl   String?
  performedAt     DateTime       @default(now())
  
  certificate     Certificate?
}

model Certificate {
  id              String            @id @default(uuid())
  certificateNo   String            @unique
  instrumentId    String
  instrument      Instrument        @relation(fields: [instrumentId], references: [id])
  verificationId  String            @unique
  verification    Verification      @relation(fields: [verificationId], references: [id])
  
  sha256Hash      String            // Cryptographic canonical SHA-256 digest
  qrPayloadJson   String            // { v, c, h, e, u }
  pdfUrl          String?
  issuedAt        DateTime          @default(now())
  expiresAt       DateTime
  status          CertificateStatus @default(ACTIVE)
  digitalSignature String
  
  auditLogs       AuditLog[]
}

model AnomalyLog {
  id              String         @id @default(uuid())
  anomalyType     String         // VELOCITY_VIOLATION, PASS_RATE_SPIKE, REPEATED_DUPLICATE
  severity        String         // LOW, MEDIUM, HIGH, CRITICAL
  anomalyScore    Float
  targetEntity    String
  description     String
  detectedAt      DateTime       @default(now())
  resolved        Boolean        @default(false)
}

model AuditLog {
  id              String         @id @default(uuid())
  userId          String?
  user            User?          @relation(fields: [userId], references: [id])
  certificateId   String?
  certificate     Certificate?   @relation(fields: [certificateId], references: [id])
  action          String
  ipAddress       String?
  userAgent       String?
  timestamp       DateTime       @default(now())
}`,

  certificateService: `// backend/src/services/certificateService.ts
import crypto from 'crypto';
import QRCode from 'qrcode';
import sharp from 'sharp';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export interface CertificateData {
  certificateId: string;
  instrumentId: string;
  issuedAt: string;
  expiresAt: string;
  lmoId: string;
  sealNumber: string;
  mpeStatus: string;
  verificationUrl: string;
}

export class CertificateService {
  /**
   * 1. Generates SHA-256 Canonical Digest
   */
  public static computeHash(data: CertificateData): string {
    const canonicalString = [
      data.certificateId,
      data.instrumentId,
      data.issuedAt,
      data.expiresAt,
      data.lmoId,
      data.sealNumber,
      data.mpeStatus
    ].join('|');

    return crypto.createHash('sha256').update(canonicalString).digest('hex');
  }

  /**
   * 2. Generates High Error Correction (H) QR Code with Government Emblem Overlay (Sharp)
   */
  public static async generateSecurityQR(data: CertificateData, emblemPath: string): Promise<Buffer> {
    const hash = this.computeHash(data);
    
    // Standard SIH 26036 JSON payload
    const qrPayload = {
      v: "1.0",
      c: data.certificateId,
      h: hash,
      e: data.expiresAt,
      u: data.verificationUrl
    };

    // Generate Level-H (30% error recovery) QR code Buffer
    const qrSvgBuffer = await QRCode.toBuffer(JSON.stringify(qrPayload), {
      errorCorrectionLevel: 'H',
      type: 'png',
      margin: 2,
      width: 400,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });

    // Resize Government Emblem to fit central 22% of QR code
    const emblemBuffer = await sharp(emblemPath)
      .resize(80, 80, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toBuffer();

    // Composite emblem into QR center using Sharp
    const finalQrWithLogo = await sharp(qrSvgBuffer)
      .composite([
        {
          input: emblemBuffer,
          gravity: 'center'
        }
      ])
      .png()
      .toBuffer();

    return finalQrWithLogo;
  }

  /**
   * 3. Generates Production-Ready PDF Certificate with PDFKit
   */
  public static async generatePdfCertificate(
    data: CertificateData & { traderName: string; instrumentType: string; lmoName: string },
    qrBuffer: Buffer,
    outputPath: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 40 });
      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      // Security Guilloche / Border
      doc.rect(20, 20, 555, 802).lineWidth(2).strokeColor('#0284c7').stroke();
      doc.rect(24, 24, 547, 794).lineWidth(0.5).strokeColor('#94a3b8').stroke();

      // Header
      doc.fontSize(16).font('Helvetica-Bold').fillColor('#0f172a').text('GOVERNMENT OF INDIA', { align: 'center' });
      doc.fontSize(12).font('Helvetica').fillColor('#0369a1').text('DEPARTMENT OF LEGAL METROLOGY', { align: 'center' });
      doc.fontSize(14).font('Helvetica-Bold').fillColor('#0f172a').text('DIGITAL CERTIFICATE OF VERIFICATION', { align: 'center' });
      doc.moveDown(1);

      // Certificate Details Table
      doc.fontSize(10).font('Helvetica-Bold').fillColor('#334155');
      doc.text(\`Certificate ID: \${data.certificateId}\`, 50, 140);
      doc.text(\`Validity: \${data.issuedAt.slice(0, 10)} to \${data.expiresAt.slice(0, 10)}\`, 320, 140);
      doc.moveDown(0.5);

      doc.font('Helvetica').fillColor('#1e293b');
      doc.text(\`Instrument Type: \${data.instrumentType}\`, 50, 170);
      doc.text(\`Trader Name: \${data.traderName}\`, 50, 190);
      doc.text(\`Physical Seal UUID: \${data.sealNumber}\`, 50, 210);
      doc.text(\`Verification Officer: \${data.lmoName} (ID: \${data.lmoId})\`, 50, 230);
      doc.text(\`MPE Compliance Status: \${data.mpeStatus}\`, 50, 250);

      // Embed QR Code
      doc.image(qrBuffer, 380, 170, { width: 140 });
      doc.fontSize(8).fillColor('#64748b').text('Scan with e-Verify Mobile App or any QR scanner to verify offline hash.', 360, 320, { width: 180, align: 'center' });

      // Security Hash footer
      doc.fontSize(8).font('Courier').fillColor('#475569');
      doc.text(\`Cryptographic SHA-256 Digest: \${this.computeHash(data)}\`, 50, 760);

      doc.end();
      stream.on('finish', () => resolve());
      stream.on('error', reject);
    });
  }
}`,

  fastApiAiService: `# ai-service/main.py
"""
FastAPI Microservice for Legal Metrology Anomaly Detection (SIH 26036)
Detects:
1. Inspector Velocity Violations (GPS Teleportation)
2. Pass Rate Statistical Drift
3. Suspicious Duplicate Serial Numbers
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
from sklearn.ensemble import IsolationForest
from datetime import datetime
import math

app = FastAPI(title="e-Verify Metrology AI Anomaly Engine", version="1.0.0")

# In-memory Isolation Forest model trained on inspector throughput & distance metrics
iso_forest = IsolationForest(contamination=0.03, random_state=42)

# Synthetic training baseline: [time_delta_mins, distance_km, inspections_per_hour, pass_rate]
X_train_normal = np.array([
    [45, 12, 1.2, 0.92],
    [60, 25, 1.0, 0.88],
    [30, 8, 1.8, 0.95],
    [90, 40, 0.8, 0.85],
    [50, 15, 1.1, 0.90],
    [120, 60, 0.6, 0.82]
])
iso_forest.fit(X_train_normal)

def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371.0 # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

class VerificationEvent(BaseModel):
    inspector_id: str
    latitude: float
    longitude: float
    timestamp_iso: str
    instrument_serial: str
    result: str # PASS or FAIL

class InspectorHistory(BaseModel):
    last_lat: float
    last_lng: float
    last_timestamp_iso: str
    recent_verifications_count: int
    recent_pass_count: int

class AnomalyEvaluationRequest(BaseModel):
    current_event: VerificationEvent
    history: InspectorHistory

@app.post("/api/v1/detect-anomaly")
async def evaluate_anomaly(req: AnomalyEvaluationRequest):
    curr = req.current_event
    hist = req.history
    
    # 1. Compute velocity & distance
    t1 = datetime.fromisoformat(hist.last_timestamp_iso.replace('Z', '+00:00'))
    t2 = datetime.fromisoformat(curr.timestamp_iso.replace('Z', '+00:00'))
    time_diff_hours = max((t2 - t1).total_seconds() / 3600.0, 0.001)
    time_diff_mins = time_diff_hours * 60.0
    
    distance_km = haversine_distance(hist.last_lat, hist.last_lng, curr.latitude, curr.longitude)
    velocity_kmh = distance_km / time_diff_hours
    
    # 2. Check for impossible speed (e.g. > 120 km/h in urban verification or instant teleportation)
    is_velocity_anomaly = velocity_kmh > 120.0 and distance_km > 15.0
    
    # 3. Pass Rate Drift
    total_recent = hist.recent_verifications_count + 1
    total_passed = hist.recent_pass_count + (1 if curr.result == "PASS" else 0)
    pass_rate = total_passed / total_recent
    
    # 4. Feature Vector for Isolation Forest
    feature_vector = np.array([[time_diff_mins, distance_km, total_recent / max(time_diff_hours, 1.0), pass_rate]])
    prediction = iso_forest.predict(feature_vector)[0] # -1 = anomaly, 1 = normal
    raw_anomaly_score = float(iso_forest.decision_function(feature_vector)[0])
    
    anomaly_detected = (prediction == -1) or is_velocity_anomaly
    severity = "CRITICAL" if is_velocity_anomaly else ("HIGH" if anomaly_detected else "NORMAL")

    return {
        "inspector_id": curr.inspector_id,
        "distance_km": round(distance_km, 2),
        "time_diff_mins": round(time_diff_mins, 1),
        "velocity_kmh": round(velocity_kmh, 1),
        "anomaly_detected": anomaly_detected,
        "anomaly_score": round(1.0 - raw_anomaly_score, 3),
        "severity": severity,
        "flag_reason": "Inspector Velocity Violation (Physical Infeasibility)" if is_velocity_anomaly else ("Statistical Pattern Drift" if anomaly_detected else "None")
    }`,

  flutterOfflineValidator: `// mobile/lib/services/offline_validator.dart
import 'dart:convert';
import 'package:crypto/crypto.dart';

class QrPayload {
  final String version;
  final String certificateId;
  final String hash;
  final String expiryIso;
  final String verificationUrl;

  QrPayload({
    required this.version,
    required this.certificateId,
    required this.hash,
    required this.expiryIso,
    required this.verificationUrl,
  });

  factory QrPayload.fromJson(Map<String, dynamic> json) {
    return QrPayload(
      version: json['v'] as String? ?? '1.0',
      certificateId: json['c'] as String? ?? '',
      hash: json['h'] as String? ?? '',
      expiryIso: json['e'] as String? ?? '',
      verificationUrl: json['u'] as String? ?? '',
    );
  }
}

class OfflineValidationResult {
  final bool isValid;
  final String message;
  final String computedHash;
  final String embeddedHash;
  final bool isExpired;

  OfflineValidationResult({
    required this.isValid,
    required this.message,
    required this.computedHash,
    required this.embeddedHash,
    required this.isExpired,
  });
}

class MetrologyOfflineValidator {
  /// Computes canonical SHA-256 hash strictly matching the backend specification
  static String computeCanonicalHash({
    required String certificateId,
    required String instrumentId,
    required String issuedAt,
    required String expiresAt,
    required String lmoId,
    required String sealNumber,
    required String mpeStatus,
  }) {
    final canonicalString = [
      certificateId,
      instrumentId,
      issuedAt,
      expiresAt,
      lmoId,
      sealNumber,
      mpeStatus,
    ].join('|');

    final bytes = utf8.encode(canonicalString);
    final digest = sha256.convert(bytes);
    return digest.toString();
  }

  /// Validates QR payload without any active internet connection
  static OfflineValidationResult validateScannedQr({
    required String qrRawString,
    Map<String, dynamic>? localCachedCert,
  }) {
    try {
      final decodedJson = jsonDecode(qrRawString) as Map<String, dynamic>;
      final payload = QrPayload.fromJson(decodedJson);

      // 1. Expiry Check
      final expiryDate = DateTime.parse(payload.expiryIso);
      final isExpired = DateTime.now().isAfter(expiryDate);

      // 2. If cached full certificate is stored in Hive DB:
      if (localCachedCert != null) {
        final recomputedHash = computeCanonicalHash(
          certificateId: localCachedCert['certificateId'] ?? payload.certificateId,
          instrumentId: localCachedCert['instrumentId'] ?? '',
          issuedAt: localCachedCert['issuedAt'] ?? '',
          expiresAt: localCachedCert['expiresAt'] ?? payload.expiryIso,
          lmoId: localCachedCert['lmoId'] ?? '',
          sealNumber: localCachedCert['sealNumber'] ?? '',
          mpeStatus: localCachedCert['mpeStatus'] ?? 'PASS',
        );

        final matches = recomputedHash.toLowerCase() == payload.hash.toLowerCase();
        
        if (!matches) {
          return OfflineValidationResult(
            isValid: false,
            message: "TAMPER ALERT: Scanned payload hash does not match computed certificate digest!",
            computedHash: recomputedHash,
            embeddedHash: payload.hash,
            isExpired: isExpired,
          );
        }

        return OfflineValidationResult(
          isValid: true,
          message: isExpired ? "VALID (BUT EXPIRED)" : "AUTHENTIC VERIFIED CERTIFICATE (OFFLINE CHECK PASSED)",
          computedHash: recomputedHash,
          embeddedHash: payload.hash,
          isExpired: isExpired,
        );
      }

      // 3. Standalone payload structure verification (256-bit Hex format)
      final hashRegex = RegExp(r'^[a-fA-F0-9]{64}$');
      final isFormatValid = hashRegex.hasMatch(payload.hash);

      return OfflineValidationResult(
        isValid: isFormatValid,
        message: isFormatValid ? "VALID PAYLOAD FORMAT (SIGNATURE PRESENT)" : "INVALID SIGNATURE FORMAT",
        computedHash: "N/A (Full cert not in local cache)",
        embeddedHash: payload.hash,
        isExpired: isExpired,
      );
    } catch (e) {
      return OfflineValidationResult(
        isValid: false,
        message: "Failed to parse QR payload: \${e.toString()}",
        computedHash: "",
        embeddedHash: "",
        isExpired: false,
      );
    }
  }
}`,

  dockerCompose: `# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: everify_postgres
    restart: always
    environment:
      POSTGRES_USER: everify_user
      POSTGRES_PASSWORD: everify_secure_password
      POSTGRES_DB: everify_metrology_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - everify_net

  redis:
    image: redis:7-alpine
    container_name: everify_redis
    restart: always
    ports:
      - "6379:6379"
    networks:
      - everify_net

  minio:
    image: minio/minio:latest
    container_name: everify_minio
    restart: always
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin_secret
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - miniodata:/data
    networks:
      - everify_net

  ai-service:
    build:
      context: ./ai-service
      dockerfile: Dockerfile
    container_name: everify_ai_service
    restart: always
    ports:
      - "8000:8000"
    environment:
      - ENVIRONMENT=production
    networks:
      - everify_net

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: everify_backend
    restart: always
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://everify_user:everify_secure_password@postgres:5432/everify_metrology_db
      - REDIS_URL=redis://redis:6379
      - MINIO_ENDPOINT=minio
      - MINIO_PORT=9000
      - AI_SERVICE_URL=http://ai-service:8000
      - JWT_SECRET=super_secret_jwt_signing_key_sih2026
    depends_on:
      - postgres
      - redis
      - minio
      - ai-service
    networks:
      - everify_net

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: everify_frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - everify_net

volumes:
  pgdata:
  miniodata:

networks:
  everify_net:
    driver: bridge`
};
