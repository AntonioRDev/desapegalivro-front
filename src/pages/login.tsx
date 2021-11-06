import React from "react";
import {
  Button,
  Flex,
  Heading,
  Checkbox,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import BookLogo from "../assets/icons/BookLogo.svg";
import BookLogin from "../assets/images/book-login.svg";
import Image from "next/image";

const Login: React.FC = () => {
  return (
    <Flex
      justifyContent="center"
      w="100%"
      minHeight="100vh"
      height="100%"
      bgColor="#F5F0EE"
    >
      <Flex direction="column" height="100%" maxWidth="maxWidthLayout" w="100%">
        <Flex as="header" alignItems="center" cursor="pointer" pt="8">
          <Image src={BookLogo} />

          <Text fontFamily="dancingScript" fontSize="1.5rem" ml="0.625rem">
            Desapega Livro
          </Text>
        </Flex>

        <Flex as="main" height="100%" alignItems="center">
          <Flex w="50%">
            <Image src={BookLogin} width={480} height={480} />
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
                Entre para aproveitar os benefícios!
              </Heading>

              <VStack w="100%" spacing="3" mb="5">
                <Input placeholder="Email" />

                <Input placeholder="Senha" />

                <Checkbox>Entrar automaticamente</Checkbox>
              </VStack>

              <Flex>
                <Button>Entrar</Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
