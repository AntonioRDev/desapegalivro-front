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
import { parseCookies } from "nookies";
import { useDebounce } from "../utils";
import cep from "cep-promise";
import { states } from "../config/constants";
import Select from "../components/Select";
import { UserRegisterDto } from '../models/dto/UserRegisterDto';
import { createUser } from "../services/user";

const Registrar: React.FC = () => {
  const router = useRouter();

  const [isLoading, setLoading] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [neighborhood, setNeighborhood] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [uf, setUf] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [whatsapp, setWhatsApp] = React.useState("");

  const debouncedPostalCode: string = useDebounce<string>(postalCode, 500);

  React.useEffect(() => {
    if (debouncedPostalCode) {
      cep(debouncedPostalCode).then((response) => {
        setCity(response.city);
        setNeighborhood(response.neighborhood);
        setUf(response.state);
        setStreet(response.street);
      });
    }
  }, [debouncedPostalCode]);

  const onSubmit = async () => {
    if(password !== confirmPassword) {
      //TODO: Toast
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
        whatsapp
      };

      await createUser(payload);
      
      //TODO: toast
      router.push("/login");
      setLoading(false);
    } catch (error) {
      console.log('onSubmit error', error);
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
                  <Input
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Input
                    placeholder="Senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </VStack>

                <VStack w="50%" spacing="3">
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Input
                    placeholder="Confirmar senha"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </VStack>
              </HStack>

              <Divider mb="5" />

              <HStack w="100%" spacing="3" mb="5" alignItems="flex-start">
                <VStack w="50%" spacing="3">
                  <Input
                    placeholder="CEP (somente numeros)"
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />

                  <Input
                    placeholder="Número"
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />

                  <Select
                    _placeholder={{ color: "gray" }}
                    placeholder="Estado"
                    bgColor="white"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    {states.map((state) => (
                      <option key={state.id} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </Select>

                  <Input
                    placeholder="Cidade"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </VStack>

                <VStack w="50%" spacing="3">
                  <Input
                    placeholder="Rua"
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />

                  <Input
                    placeholder="Bairro"
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                  />

                  <Input
                    placeholder="UF"
                    type="text"
                    maxLength={2}
                    value={uf}
                    onChange={(e) => setUf(e.target.value)}
                  />
                </VStack>
              </HStack>

              <Divider mb="5" />

              <HStack w="100%" spacing="3" mb="5">
                <Flex w="50%">
                  <Input
                    placeholder="Telefone/Celular"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Flex>

                <Flex w="50%">
                  <Input
                    placeholder="WhatsApp"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsApp(e.target.value)}
                  />
                </Flex>
              </HStack>

              <Flex>
                <Button bgColor="secondary" color="white" onClick={onSubmit} isLoading={isLoading} isDisabled={isLoading}>
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
