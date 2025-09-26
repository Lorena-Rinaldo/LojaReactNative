import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';



export default function RootLayout() { //conexão entre as stack navigation
  //  e tab navigation, xulambs, beltranis, etc qualqer tela fora da tab navigation, estará aqui

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="xulambs" />
        <Stack.Screen name="beltranis" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );

}
