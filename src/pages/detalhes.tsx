import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Image from "next/image";
import HpBook from "../assets/images/hpbook.jpg";
import Map from "../pages-components/BookDetails/Map";

const BookDetails: React.FC = () => {
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
                <Flex>
                  Detalhes do livro: &nbsp;
                  <Text fontWeight="bold" color="primary">
                    Código: 16313
                  </Text>
                </Flex>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>

          <Divider mb="3" />

          <Flex mb='8'>
            <Flex direction="column">
              <Image src={HpBook} height={312} width={496} />

              <Flex pt='3' justifyContent='center'>
                <Text>Doado por: &nbsp;</Text>
                <Text fontWeight="bold">Nome do Doador</Text>
              </Flex>
            </Flex>

            <Flex
              direction="column"
              w="100%"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Flex justifyContent="center" w="100%">
                <Heading fontSize="1.5rem">
                  Harry Potter e o Enigma do Príncipe
                </Heading>
              </Flex>

              <VStack spacing="2" alignItems="flex-start" pl="6">
                <Text>Categoria: <b>Ação</b></Text>

                <Text>Tempo de uso: <b>1 ano</b></Text>

                <Text>Idioma: <b>Português</b></Text>

                <Text>Autor: <b>Collen Houck</b></Text>

                <Text>Páginas: <b>400</b></Text>
              </VStack>

              <Flex justifyContent="center" w="100%">
                <Button bgColor='primary' color='white'>Candidatar para receber</Button>
              </Flex>
            </Flex>
          </Flex>

          <Flex h='100%'>
            <Flex direction='column' h='100%' pr='6'>
              <Text textAlign='center' fontSize='xl' fontWeight='bold'>Localização do doador</Text>

              <VStack h='100%' justifyContent='center' alignItems='left' spacing='9'>
                <Flex direction="column">
                  <Text>Estado: <b>Minas Gerais</b></Text>
                  <Text>Cidade: <b>Contagem</b></Text>
                </Flex>

                <Text>
                  Caso você seja escolhiodo para receber a doação, mais
                  informações de localização e contato do doador serão enviadas
                  por e-mail.
                </Text>
              </VStack>
            </Flex>

            <Map />
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default BookDetails;
