import React from "react";
import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import BookLogo from "../assets/icons/BookLogo.svg";
import BookSign from "../assets/images/book-sign.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from 'nookies';

const Registrar: React.FC = () => {
  const router = useRouter();

  return (
    <Flex
      justifyContent="center"
      w="100%"
      minHeight="100vh"
      height="100%"
      bgColor="#F5F0EE"
    >
      <Flex direction="column" height="100%" maxWidth="maxWidthLayout" w="100%">
        <Flex
          as="header"
          alignItems="center"
          cursor="pointer"
          pt="8"
          onClick={() => router.push("/")}
        >
          <Image src={BookLogo} alt="Logo Desapega Livro" />

          <Text fontFamily="dancingScript" fontSize="1.5rem" ml="0.625rem">
            Desapega Livro
          </Text>
        </Flex>

        <Flex as="main" height="100%" alignItems="center">
          <Flex w="50%">
            <Image
              src={BookSign}
              alt="Pessoa lendo livro"
              width={480}
              height={480}
            />
          </Flex>

          <Flex w="50%" alignItems="center">
            <Flex
              as="form"
              direction="column"
              alignItems="center"
              shadow="lg"
              bgColor="white"
              borderWidth={1}
              borderColor="gray.300"
              rounded="lg"
              p="8"
              height="fit-content"
            >
              <Heading fontSize="x-large" textAlign="center" mb="5">
                Crie uma conta para poder doar e receber livros!
              </Heading>

              <HStack w="100%" spacing="3" mb="5">
                <VStack w="50%" spacing="3">
                  <Input placeholder="Nome" />

                  <Input placeholder="Senha" type="password" />
                </VStack>

                <VStack w="50%" spacing="3">
                  <Input placeholder="Email" type="email" />

                  <Input placeholder="Confirmar senha" type="password" />
                </VStack>
              </HStack>

              <Divider mb="5" />

              <HStack w="100%" spacing="3" mb="5">
                <VStack w="50%" spacing="3">
                  <Input placeholder="CEP" />

                  <Input placeholder="Número" />

                  <Input placeholder="Cidade" />
                </VStack>

                <VStack w="50%" spacing="3">
                  <Input placeholder="Rua" />

                  <Input placeholder="Bairro" />

                  <Input placeholder="UF" />
                </VStack>
              </HStack>

              <Divider mb="5" />

              <HStack w="100%" spacing="3" mb="5">
                <Flex w="50%">
                  <Input placeholder="Telefone/Celular" type="tel" />
                </Flex>

                <Flex w="50%">
                  <Input placeholder="WhatsApp" type="tel" />
                </Flex>
              </HStack>

              <Flex>
                <Button bgColor="secondary" color="white">
                  Criar conta
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { desapegatoken } = parseCookies(context);

  if (!desapegatoken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {}
    }
  }
};

export default Registrar;
