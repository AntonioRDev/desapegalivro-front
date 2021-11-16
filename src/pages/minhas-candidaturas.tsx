import React from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Text,
  useTheme,
  Heading,
  Grid,
  HStack,
  Icon,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ApplicationCard from "../pages-components/MyApplications/ApplicationCard";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { parseCookies } from "nookies";
import { Application } from "../models/domain/Application";
import { getApplicationsByUser } from "../services/application";

type Props = {
  applications: Application[];
};

const MyApplications: NextPage<Props> = ({ applications }) => {
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
                  Minhas candidaturas
                </Text>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>

          <Divider mb="3" />

          <Heading mb="6" fontSize="1.5rem">
            Livros que me candidatei para receber:
          </Heading>

          <Flex direction="column">
            <Grid templateColumns="1fr 1fr 1fr" gap="1rem" mb="8">
              {applications.map((application) => (
                <ApplicationCard application={application} />
              ))}
            </Grid>

            {/* <Flex justifyContent="center" mb="6">
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
            </Flex> */}
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
  console.log("desapegatoken", desapegatoken);
  if (!desapegatoken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    const { userId } = JSON.parse(desapegatoken);

    const applicatons = await getApplicationsByUser(userId);

    return {
      props: {
        applications: applicatons.data,
      },
    };
  }
};

export default MyApplications;
