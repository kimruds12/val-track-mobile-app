import { Stack } from 'expo-router';

export default function PatronLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(libraryvisitor)" options={{ headerShown: false }} />
