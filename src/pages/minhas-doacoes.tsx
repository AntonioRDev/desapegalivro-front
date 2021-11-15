import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Flex,
  Divider,
  useTheme,
  Heading,
  HStack,
  Icon,
  Grid,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Layout from "../components/Layout";
import DonationCard from "../pages-components/MyDonations/DonationCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from 'nookies';

const MyDonations: React.FC = () => {
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
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="#">Minha conta</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <Text fontWeight="bold" color="primary">
                  Minhas doações
                </Text>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>

          <Divider mb="3" />

          <Heading mb="6">Livros cadastrados para doação:</Heading>

          <Flex direction="column">
            <Grid templateColumns="1fr 1fr 1fr" gap="1.5rem" mb="8">
              <DonationCard />
              <DonationCard />
              <DonationCard />
              <DonationCard />
              <DonationCard />
              <DonationCard />
              <DonationCard />
              <DonationCard />
            </Grid>

            <Flex justifyContent="center" mb="6">
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
    </Layout>
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

export default MyDonations;
