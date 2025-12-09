/**
 * Tab Navigation Layout
 * Premium tab bar with haptic feedback and fluid icons.
 */
import React from "react";
import { Tabs } from "expo-router";
import { View, Text, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@src/constants/tokens";

// Tab icon component
function TabIcon({
  icon,
  label,
  focused,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  focused: boolean;
}) {
  return (
    <View className="items-center justify-center py-1 gap-1">
      <Ionicons
        name={focused ? icon : `${icon}-outline` as any}
        size={24}
        color={focused ? colors.primary.DEFAULT : colors.foreground.muted}
      />
      <Text
        className={`text-[10px] font-medium ${focused ? "text-primary" : "text-foreground-muted"
          }`}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface.DEFAULT,
          borderTopColor: colors.border.subtle,
          borderTopWidth: 0.5,
          elevation: 0, // Android shadow remove
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 28 : 8,
          height: Platform.OS === "ios" ? 88 : 64,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="home" label="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="winspay"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="card" label="WINSPAY" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="stickers"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="qr-code" label="Stickers" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="stats-chart" label="Activity" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="settings" label="Settings" focused={focused} />
          ),
        }}
      />
      {/* Hide default screens from tabs template */}
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="two" options={{ href: null }} />
    </Tabs>
  );
}
