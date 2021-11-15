import React, { useContext } from "react";
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
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from 'nookies';

const Login: React.FC = () => {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    try {
      await signIn({ email, password });
    } catch (error) {
      console.log('handleLogin', error);
    }
  }

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
          <Image src={BookLogo} alt="Logo livro" />

          <Text fontFamily="dancingScript" fontSize="1.5rem" ml="0.625rem">
            Desapega Livro
          </Text>
        </Flex>

        <Flex as="main" height="100%" alignItems="center">
          <Flex w="50%">
            <Image
              src={BookLogin}
              width={480}
              height={480}
              alt="Livros na estante"
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
                Entre para aproveitar os benefícios!
              </Heading>

              <VStack w="100%" spacing="3" mb="5">
                <Input
                  placeholder="Email"
                  value={email}
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Senha"
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* <Checkbox>Entrar automaticamente</Checkbox> */}
              </VStack>

              <Flex mb="5">
                <Button onClick={handleLogin}>
                  Entrar
                </Button>
              </Flex>

              <Text
                cursor="pointer"
                color="purple.300"
                _hover={{ color: "purple.500", textDecoration: "underline" }}
                onClick={() => router.push("/registrar")}
              >
                Não tem uma conta? Clique para se cadastar!
              </Text>
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

  if (desapegatoken) {
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

export default Login;