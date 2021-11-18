import React, { useContext } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
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
import { parseCookies } from "nookies";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from "@chakra-ui/react";

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);
  const toast = useToast();

  const [isLoading, setLoading] = React.useState(false);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .max(100)
      .email("O email digitado é inválido")
      .required("Você precisa digitar o campo e-mail"),
    password: yup
      .string()
      .max(100)
      .required("Você precisa digitar a sua senha"),
  });

  const { register, handleSubmit, formState:{ errors, isValid } } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });

  const handleLogin = async (data: FormValues) => {
    const { email, password } = data;

    try {
      setLoading(true);

      await signIn({ email, password });

      toast({
        title: "Sucesso ao fazer login!",
        description: "Você será redirecionado em segundos",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Erro ao fazer login.",
        description: "O seu email ou sua senha está incorreto.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      console.log("handleLogin", error);
    } finally {
      setLoading(false);
    }
  };

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
            <form onSubmit={handleSubmit(handleLogin)}>
              <Flex
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
                  <FormControl isInvalid={!!errors.email}>
                    <Input
                      placeholder="Email"
                      type="email"
                      {...register("email")}
                    />

                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.password}>
                    <Input
                      placeholder="Senha"
                      type="password"
                      {...register("password")}
                    />

                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                  </FormControl>
                </VStack>

                <Flex mb="5">
                  <Button
                    type="submit"
                    disabled={!isValid || isLoading}
                    isLoading={isLoading}
                  >
                    Entrar
                  </Button>
                </Flex>

                <Text
                  cursor="pointer"
                  color="purple.300"
                  _hover={{
                    color: "purple.500",
                    textDecoration: "underline",
                  }}
                  onClick={() => router.push("/registrar")}
                >
                  Não tem uma conta? Clique para se cadastar!
                </Text>
              </Flex>
            </form>
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
      props: {},
    };
  }
};

export default Login;
