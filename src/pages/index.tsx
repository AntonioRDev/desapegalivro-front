import React from "react";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import {
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import CategoriesBadge from "../pages-components/Home/CategoriesBadge";
import { GiDualityMask, GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BookListItem from "../pages-components/Home/BookListItem";
import Select from "../components/Select";

const Home: NextPage = () => {
  return (
    <Layout>
      <Flex justifyContent="center">
        <Flex direction="column" maxWidth="maxWidthLayout" px="50px">
          <Heading fontSize="xl" mt="6" mb="6" fontWeight='normal'>
            Livros que estão sendo doados no momento:
          </Heading>

          <HStack spacing="2.5rem" justifyContent="center" mb="6">
            <CategoriesBadge categoryName="Arte" icon={GiDualityMask} />
            <CategoriesBadge categoryName="Arte" icon={GiDualityMask} />
            <CategoriesBadge categoryName="Arte" icon={GiDualityMask} />
            <CategoriesBadge categoryName="Arte" icon={GiDualityMask} />
            <CategoriesBadge categoryName="Arte" icon={GiDualityMask} />
            <CategoriesBadge categoryName="Arte" icon={GiDualityMask} />
            <CategoriesBadge categoryName="Mais" icon={GiHamburgerMenu} />
          </HStack>

          <Flex>
            <VStack spacing='3' mr='2rem'>
              <Text textAlign='center'>Filtre pela localização:</Text>

              <Select placeholder="Cidade" bgColor="white"></Select>
              <Select placeholder="Estado" bgColor="white"></Select>
            </VStack>

            <Flex direction="column" w="100%">
              <Grid templateColumns="1fr 1fr 1fr" gap="1.5rem" mb="8">
                <BookListItem />
                <BookListItem />
                <BookListItem />
                <BookListItem />
                <BookListItem />
                <BookListItem />
                <BookListItem />
                <BookListItem />
              </Grid>

              <Flex justifyContent='center'>
                <HStack fontSize="lg" spacing="3rem">
                  <Flex cursor="pointer">
                    <Icon as={IoIosArrowBack} boxSize={7} mr="10px" />
                    <Text>Anterior</Text>
                  </Flex>

                  <Flex>1 de 20</Flex>

                  <Flex cursor="pointer">
                    <Text>Próximo</Text>
                    <Icon as={IoIosArrowForward} boxSize={7} ml="10px" />
                  </Flex>
                </HStack>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Home;
