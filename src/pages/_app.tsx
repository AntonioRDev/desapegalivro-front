import "../config/global.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";
import { AuthProvider } from "../contexts/AuthContext";

const appTheme = extendTheme({
  colors: {
    primary: "#C03A2B",
    secondary: "#35495E",
  },
  sizes: {
    maxWidthLayout: "76rem",
    headerHeight: "4.0625rem",
    footerHeight: "4.0625rem"
  },
  fonts: {
    poppins: "'Poppins', sans-serif",
    mvBoli: "'mv-boli-regular', sans-serif",
    dancingScript: "'Dancing Script', cursive",
    aladin: "Aladin, sans-serif",
    body: 'poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    heading:
      'poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Desapega Livro - Seu lugar de doar livros!</title>
      </Head>

      <ChakraProvider theme={appTheme} resetCSS>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
