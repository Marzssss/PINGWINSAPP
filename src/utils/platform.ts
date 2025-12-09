/**
 * Platform utilities for cross-platform behavior.
 */
import { Platform, Dimensions } from "react-native";

export const isWeb = Platform.OS === "web";
export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const isNative = !isWeb;

export function getScreenDimensions() {
    const { width, height } = Dimensions.get("window");
    return { width, height };
}

export function isSmallDevice() {
    const { width } = getScreenDimensions();
    return width < 375;
}

export function isTablet() {
    const { width } = getScreenDimensions();
    return width >= 768;
}
