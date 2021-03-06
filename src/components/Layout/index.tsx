import React from "react";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import Header from "../Header";
import Footer from "../Footer";

type Props = {
  title?: string;
};

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>
          {title ? title : "Desapega Livro - Seu lugar de doar livros!"}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="column" minH="100vh" w="100%" bgColor="#F5F0EE">
        <Header />
        {children}
        <Footer />
      </Flex>
    </>
  );
};

export default Layout;
