import "../config/global.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Aladin&family=Dancing+Script:wght@400;500;600;700&family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://www.dafontfree.net/embed/bXYtYm9saS1yZWd1bGFyJmRhdGEvNDkvbS8zODM0My9tdmJvbGkudHRm"
          rel="stylesheet"
          type="text/css"
        />
      </Head>

      <ChakraProvider theme={appTheme} resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
