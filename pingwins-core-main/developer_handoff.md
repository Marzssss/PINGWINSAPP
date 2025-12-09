# PINGWINS — Developer Handoff (Core System)
Version: 1.0  
© 2025 PINGWINS Inc.

------------------------------------------------------------

1. OVERVIEW
The PINGWINS ecosystem is built on one foundation: every object deserves a verifiable identity. The Smart Sticker (BLE + NFC core) is the authentication engine that anchors all PINGWINS verticals.

This handoff introduces:
- Smart Sticker Core System
- WINSPAY device-locked payment logic
- Database architecture (PostgreSQL + PostGIS)
- Backend structure
- Frontend logic
- Ecosystem expansion hooks

This document defines what must be built, how it behaves, and the standards for IP integrity.

------------------------------------------------------------

2. CORE CONCEPT — SMART STICKER IDENTITY LAYER

Each PINGWINS Smart Sticker contains:
- BLE chip
- NFC UID identity
- Unique PINGWINS Identifier (PWID)
- Device-lock logic
- Cloud registration & verification

PWID = the immutable root identity for all verticals.

------------------------------------------------------------

3. REGISTRATION FLOW (Sticker → Owner)

Process:
1. User taps or scans sticker.
2. App retrieves PWID from NFC or BLE.
3. Registration screen collects:
   - Name
   - Email
   - Phone
   - Device IMEI
   - Optional photo of object
4. PWID is permanently locked to IMEI.
5. Entry is stored in the PostgreSQL database.

Rules:
- PWIDs are non-transferable.
- Each PWID binds to exactly one IMEI.
- If sticker is peeled/tampered, status becomes invalid.

------------------------------------------------------------

4. DATABASE SCHEMA (PostgreSQL + PostGIS)

Table: stickers
Columns: id (PK), pwid, ble_uuid, nfc_uid, created_at, status

Table: ownership
Columns: id (PK), pwid (FK), user_id (FK), imei, locked_at

Table: users
Columns: id (PK), name, email, phone, created_at

Table: winspay_wallets
Columns: id (PK), user_id (FK), wallet_address, status

Table: transactions
Columns: id (PK), sender_id, receiver_id, pwid, amount, created_at

Table: geo_events
Columns: id (PK), pwid, geom (PostGIS POINT), timestamp

------------------------------------------------------------

5. BACKEND ARCHITECTURE

Framework: Node.js (Express) or Python (FastAPI)

Core API Endpoints:
POST /register-sticker     → Bind sticker to IMEI  
GET  /verify                → Verify authenticity  
POST /winspay/send          → Send WINSPAY payment  
GET  /winspay/history       → Transaction history  
GET  /object/lookup         → Future vertical search  

Backend Logic Requirements:
- PWID must never change once created.
- Ownership table enforces UNIQUE pwid.
- All WINSPAY actions must validate device IMEI before proceeding.

------------------------------------------------------------

6. WINSPAY — DEVICE-LOCKED PAYMENT SYSTEM

Rules:
- Each PWID corresponds to a non-transferable wallet identity.
- Payments require a one-time unlock code.
- Only the device with the registered IMEI can send funds.
- No gifting or transferring ownership of a PWID.

Payment Flow:
1. User initiates payment.
2. Backend verifies IMEI matches PWID.
3. System generates a 6-digit one-time code.
4. User enters code → payment executes → ledger updates.

------------------------------------------------------------

7. FRONTEND LOGIC (APP)

App Tabs:
- Home (scan + verify)
- WINSPAY (send/receive + dashboard)
- My Stickers
- Activity
- Settings

UI Behavior:
- If sticker unregistered → open onboarding.
- If sticker registered → show verification page.
- If device IMEI does not match → block access.

------------------------------------------------------------

8. ECOSYSTEM EXPANSION HOOKS

Future verticals plug directly into PWID:
- Luxury authentication
- Travel identity
- Auction provenance
- Logistics/delivery
- Smart toys (PINGWIN figurines)
- WINSPAY Vault
- Government identity
- Banking layer

PWID remains the universal root key.

------------------------------------------------------------

9. SECURITY REQUIREMENTS
- QR tamper logic
- PWID encryption
- TLS mandatory
- Device-binding cannot be undone without admin override
- No frontend-stored secrets

------------------------------------------------------------

10. IP OWNERSHIP & REPO STRUCTURE

All code in this repo is the property of PINGWINS INC.

Recommended repo structure:
backend/
frontend/
db/
docs/
tests/

Contractors receive access, not IP ownership.

------------------------------------------------------------

11. DEVELOPER NOTES
- Do not alter PWID logic.
- No transfer mechanisms unless approved.
- Every function must include audit logging.
- Code must be clean, modular, and handoff ready.

------------------------------------------------------------

12. ENGINEER NEXT STEPS
1. Set up schema locally.
2. Implement registration endpoint.
3. Implement WINSPAY one-time code logic.
4. Build test UI screens for registration + verification.
5. Push code to main only via pull request.

------------------------------------------------------------
