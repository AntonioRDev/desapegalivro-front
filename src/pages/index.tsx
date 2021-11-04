import React from "react";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import { Flex, Grid, Heading, HStack, Select, Text } from "@chakra-ui/react";
import CategoriesBadge from "../components/Header/CategoriesBadge";
import { GiDualityMask, GiHamburgerMenu } from "react-icons/gi";
import BookListItem from "../pages-components/Home/BookListItem";

const Home: NextPage = () => {
  return (
    <Layout>
      <Flex direction="column" px="50px">
        <Heading fontSize="22px" my="36px" fontWeight="normal">
          Livros que estão sendo doados no momento:
        </Heading>

        <HStack spacing='40px' justifyContent='center'>
          <CategoriesBadge categoryName="Arte" icon={GiDualityMask}/>
          <CategoriesBadge categoryName="Arte" icon={GiDualityMask}/>
          <CategoriesBadge categoryName="Arte" icon={GiDualityMask}/>
          <CategoriesBadge categoryName="Arte" icon={GiDualityMask}/>
          <CategoriesBadge categoryName="Arte" icon={GiDualityMask}/>
          <CategoriesBadge categoryName="Arte" icon={GiDualityMask}/>
          <CategoriesBadge categoryName="Arte" icon={GiDualityMask}/>
          <CategoriesBadge categoryName="Arte" icon={GiDualityMask}/>
          <CategoriesBadge categoryName="Arte" icon={GiDualityMask}/>
          <CategoriesBadge categoryName="Mais categorias" icon={GiHamburgerMenu}/>
        </HStack>

        <Flex>
          <Flex direction='column'>
            <Text>Filtre pela localização:</Text>

            <Select placeholder='Cidade' bgColor='white'></Select>
            <Select placeholder='Estado' bgColor='white'></Select>
          </Flex>
        </Flex>

        <Flex w='100%'>
          <Grid>
            <BookListItem />
            <BookListItem />
            <BookListItem />
            <BookListItem />
            <BookListItem />
            <BookListItem />
            <BookListItem />
            <BookListItem />
          </Grid>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Home;
