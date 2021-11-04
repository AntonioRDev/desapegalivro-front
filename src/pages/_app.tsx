import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const appTheme = extendTheme({
  colors: {
    primary: '#C03A2B',
    secondary: '#35495E'
  },
  fonts: {
    mvBoli: "'mv-boli-regular', sans-serif",
    dancingScript: "'Dancing Script', cursive",
    aladin:
      'Aladin, sans-serif',
    body: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    heading:
      'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={appTheme} resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
