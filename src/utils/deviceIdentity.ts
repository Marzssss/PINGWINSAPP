/**
 * Device Identity Abstraction
 * Clean seam for future platform-specific secure identifiers.
 * DO NOT reference IMEI anywhere - use "device identity" terminology.
 */
import { Platform } from "react-native";

export type DeviceIdentity = {
    platform: "ios" | "android" | "web";
    // Future fields:
    // secureHardwareId?: string;
    // anonymousDeviceToken?: string;
};

export function getDeviceIdentity(): DeviceIdentity {
    const os = Platform.OS;
    return {
        platform: os === "web" ? "web" : (os as "ios" | "android"),
    };
}

export function isNativePlatform(): boolean {
    return Platform.OS !== "web";
}
