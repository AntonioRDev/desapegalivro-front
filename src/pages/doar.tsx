import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  Text,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import HpBook from "../assets/images/hpbook.jpg";
import Select from "../components/Select";

const Donate: React.FC = () => {
  const { sizes } = useTheme();

  return (
    <Layout>
      <Flex
        w="100%"
        minHeight={`calc(100vh - ${sizes.headerHeight} - ${sizes.footerHeight})`}
        justifyContent="center"
      >
        <Flex direction="column" maxWidth="maxWidthLayout" width="100%">
          <Flex mt="6" mb="3">
            <Text fontWeight="semibold">Você está em: &nbsp;</Text>

            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <Text fontWeight="bold" color="primary">
                  Doar Livro
                </Text>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>

          <Divider mb="3" />

          <Flex
            direction="column"
            bgColor="white"
            borderWidth={1}
            borderColor="black"
            rounded="1.25rem"
            p='6'
            mb='3'
          >
            <Flex mb='6'>
              <Image src={HpBook} />

              <Flex direction="column" pl='6'>
                <Text>Imagem da capa do livro</Text>

                <input type="file" />
              </Flex>
            </Flex>

            <HStack spacing='3' alignItems='flex-start' mb="6">
              <VStack w="50%" spacing="3">
                <Input placeholder="Título do livro" />

                <Input placeholder="Tempo de uso" />

                <Input placeholder="Autor" />

                <Input placeholder="Quantidade de Páginas" />
              </VStack>

              <VStack w="50%" spacing="3">
                <Select placeholder="Categoria"></Select>

                <Select placeholder="Idioma"></Select>
              </VStack>
            </HStack>

            <Flex justifyContent='center'>
              <Button bgColor='primary' color='white'>Cadastrar livro para doação</Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Donate;
