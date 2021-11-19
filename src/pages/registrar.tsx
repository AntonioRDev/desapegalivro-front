import React from "react";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import BookLogo from "../assets/icons/BookLogo.svg";
import BookSign from "../assets/images/book-sign.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import cep from "cep-promise";
import { states } from "../config/constants";
import { UserRegisterDto } from "../models/dto/UserRegisterDto";
import { createUser } from "../services/user";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@chakra-ui/react";
import debounce from "debounce";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  postalCode: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  uf: string;
  number: string;
  phone: string;
  whatsapp: string;
};

const validationSchema = yup.object().shape({
  name: yup.string().max(100).required("Você precisa preencher este campo"),
  email: yup.string().email("Email inválido").max(100).required("Você precisa preencher este campo"),
  password: yup.string().max(100).required("Você precisa preencher este campo"),
  confirmPassword: yup
    .string()
    .max(100)
    .oneOf([yup.ref("password"), null], "As senhas precisam ser iguais"),
  postalCode: yup
    .string()
    .max(100)
    .required("Você precisa preencher este campo"),
  street: yup.string().max(100).required("Você precisa preencher este campo"),
  neighborhood: yup
    .string()
    .max(100)
    .required("Você precisa preencher este campo"),
  city: yup.string().max(100).required("Você precisa preencher este campo"),
  state: yup.string().max(100).required("Você precisa preencher este campo"),
  uf: yup.string().max(2).required("Você precisa preencher este campo"),
  number: yup.string().max(100).required("Você precisa preencher este campo"),
  phone: yup.string().max(100).required("Você precisa preencher este campo"),
  whatsapp: yup.string().max(100).required("Você precisa preencher este campo"),
});

const Registrar: React.FC = () => {
  const router = useRouter();
  const toast = useToast();

  const [isLoading, setLoading] = React.useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: FormValues) => {
    const {
      name,
      email,
      password,
      confirmPassword,
      postalCode,
      street,
      neighborhood,
      city,
      state,
      uf,
      number,
      phone,
      whatsapp,
    } = data;

    if (password !== confirmPassword) {
      toast({
        title: "Erro ao fazer cadastro",
        description: "A senha e a confirmação não se coincidem",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const payload: UserRegisterDto = {
        name,
        email,
        password,
        postalCode,
        street,
        neighborhood,
        city,
        state,
        uf,
        number,
        phone,
        whatsapp,
      };

      await createUser(payload);

      toast({
        title: "Sucesso ao fazer cadastro!",
        description: "Agora você pode realizar o login para entrar no sistema",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      router.push("/login");
      setLoading(false);
    } catch (error) {
      console.log("onSubmit error", error);
      toast({
        title: "Erro ao fazer cadastro",
        description: "Ocorreu um erro ao fazer o cadastro, tente novamente mais tarde",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const checkPostalCode = async(postalCode: string) => {
    try {
      const response = await cep(postalCode);
      setValue("city", response.city, { shouldValidate: true });
      setValue("neighborhood", response.neighborhood, { shouldValidate: true });
      setValue("uf", response.state, { shouldValidate: true });
      setValue("street", response.street, { shouldValidate: true });
    } catch(error) {
      console.log('checkPostalCode', error);
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  Crie uma conta para poder doar e receber livros!
                </Heading>

                <HStack w="100%" spacing="3" mb="5">
                  <VStack w="50%" spacing="3">
                    <FormControl isInvalid={!!errors.name}>
                      <Input placeholder="Nome" {...register("name")} />

                      <FormErrorMessage>
                        {errors.name?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password}>
                      <Input
                        placeholder="Senha"
                        type="password"
                        {...register("password")}
                      />

                      <FormErrorMessage>
                        {errors.password?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </VStack>

                  <VStack w="50%" spacing="3">
                    <FormControl isInvalid={!!errors.email}>
                      <Input
                        placeholder="Email"
                        type="email"
                        {...register("email")}
                      />

                      <FormErrorMessage>
                        {errors.email?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.confirmPassword}>
                      <Input
                        placeholder="Confirmar senha"
                        type="password"
                        {...register("confirmPassword")}
                      />

                      <FormErrorMessage>
                        {errors.confirmPassword?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </VStack>
                </HStack>

                <Divider mb="5" />

                <HStack w="100%" spacing="3" mb="5" alignItems="flex-start">
                  <VStack w="50%" spacing="3">
                    <FormControl isInvalid={!!errors.postalCode}>
                      <Input
                        placeholder="CEP (somente numeros)"
                        {...register("postalCode")}
                        onChange={debounce((e) => {
                          checkPostalCode(e.target.value);
                        }, 500)}
                      />

                      <FormErrorMessage>
                        {errors.postalCode?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.number}>
                      <Input
                        placeholder="Número"
                        type="number"
                        {...register("number")}
                      />

                      <FormErrorMessage>
                        {errors.number?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.state}>
                      <Select
                        _placeholder={{ color: "gray" }}
                        placeholder="Estado"
                        bgColor="white"
                        {...register("state")}
                      >
                        {states.map((state) => (
                          <option key={state.id} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </Select>

                      <FormErrorMessage>
                        {errors.state?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.city}>
                      <Input
                        placeholder="Cidade"
                        type="text"
                        {...register("city")}
                      />

                      <FormErrorMessage>
                        {errors.city?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </VStack>

                  <VStack w="50%" spacing="3">
                    <FormControl isInvalid={!!errors.street}>
                      <Input
                        placeholder="Rua"
                        type="text"
                        {...register("street")}
                      />

                      <FormErrorMessage>
                        {errors.street?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.neighborhood}>
                      <Input
                        placeholder="Bairro"
                        type="text"
                        {...register("neighborhood")}
                      />

                      <FormErrorMessage>
                        {errors.neighborhood?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.uf}>
                      <Input
                        placeholder="UF"
                        type="text"
                        maxLength={2}
                        {...register("uf")}
                      />

                      <FormErrorMessage>{errors.uf?.message}</FormErrorMessage>
                    </FormControl>
                  </VStack>
                </HStack>

                <Divider mb="5" />

                <HStack w="100%" spacing="3" mb="5">
                  <Flex w="50%">
                    <FormControl isInvalid={!!errors.phone}>
                      <Input
                        placeholder="Telefone/Celular"
                        type="tel"
                        {...register("phone")}
                      />

                      <FormErrorMessage>
                        {errors.phone?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>

                  <Flex w="50%">
                    <FormControl isInvalid={!!errors.whatsapp}>
                      <Input
                        placeholder="Telefone/Celular"
                        type="tel"
                        {...register("whatsapp")}
                      />

                      <FormErrorMessage>
                        {errors.whatsapp?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                </HStack>

                <Flex>
                  <Button
                    bgColor="secondary"
                    color="white"
                    type="submit"
                    isLoading={isLoading}
                    isDisabled={!isValid || isLoading}
                  >
                    Criar conta
                  </Button>
                </Flex>
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

export default Registrar;
