import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const appTheme = extendTheme({
  colors: {
    primary: '#C03A2B',
    secondary: '#35495E'
  },
  sizes: {
    maxWidthLayout: '76rem'
  },
  fonts: {
    poppins: "'Poppins', sans-serif",
    mvBoli: "'mv-boli-regular', sans-serif",
    dancingScript: "'Dancing Script', cursive",
    aladin:
      'Aladin, sans-serif',
    body: 'poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    heading:
      'poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
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
