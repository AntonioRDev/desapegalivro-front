import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
