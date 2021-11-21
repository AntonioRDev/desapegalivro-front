import React, { useContext } from "react";
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
  Image,
  Badge,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Map from "../../pages-components/BookDetails/Map";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getBookById } from "../../services/books";
import { DonatedBook } from "../../models/domain/DonatedBook";
import ApplicationModal from "../../pages-components/BookDetails/ApplicationModal";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

type Props = {
  book: DonatedBook;
  mapCenter?: [number, number]
};

const BookDetails: NextPage<Props> = (props) => {
  const { sizes } = useTheme();
  const router = useRouter();
  const { isAuthenticaded } = useContext(AuthContext);

  const [book, setBook] = React.useState(props.book);
  const [isApplicationModalOpen, setApplicationModal] = React.useState(false);

  React.useEffect(() => {
    console.log(props.mapCenter)
    if(props.mapCenter) {

    }
  }, [])

  const onAplly = () => {
    if(!isAuthenticaded) {
      router.push("/login");
      return;
    }
    
    setApplicationModal(true);
  }

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
                    Código: {book.id}
                  </Text>
                </Flex>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>

          <Divider mb="3" />

          <Flex mb="8">
            <Flex direction="column">
              <Image
                src={book.bookCoverUrl}
                alt="Capa do livro"
                height={312}
                width={496}
              />

              <Flex pt="3" justifyContent="center">
                <Text>Doado por: &nbsp;</Text>
                <Text fontWeight="bold">{book.user.name}</Text>
              </Flex>
            </Flex>

            <Flex
              direction="column"
              w="100%"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Flex justifyContent="center" w="100%">
                <Heading fontSize="1.5rem">{book.title}</Heading>
              </Flex>

              <VStack spacing="2" alignItems="flex-start" pl="6">
                <Text>
                  Categoria: <Badge colorScheme="green"><b>{book.category.name}</b></Badge>
                </Text>

                <Text>
                  Tempo de uso: <b>{book.usageTime}</b>
                </Text>

                <Text>
                  Idioma: <b>{book.language}</b>
                </Text>

                <Text>
                  Autor: <b>{book.author}</b>
                </Text>

                <Text>
                  Páginas: <b>{book.pagesQty}</b>
                </Text>
              </VStack>

              <Flex justifyContent="center" w="100%">
                <Button bgColor="primary" color="white" onClick={onAplly}>
                  Candidatar para receber
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Flex h="100%">
            <Flex direction="column" h="100%" pr="6">
              <Text textAlign="center" fontSize="xl" fontWeight="bold">
                Localização do doador
              </Text>

              <VStack
                h="100%"
                justifyContent="center"
                alignItems="left"
                spacing="9"
              >
                <Flex direction="column">
                  <Text>
                    Estado: <b>{book.user.address.state}</b>
                  </Text>
                  <Text>
                    Cidade: <b>{book.user.address.city}</b>
                  </Text>
                </Flex>

                <Text>
                  Caso você seja escolhiodo para receber a doação, mais
                  informações de localização e contato do doador serão enviadas
                  por e-mail.
                </Text>
              </VStack>
            </Flex>

            <Map mapCenter={props.mapCenter}/>
          </Flex>
        </Flex>
      </Flex>

      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setApplicationModal(false)}
        book={book}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  if (query.bookId && typeof query.bookId === "string") {
    const response = await getBookById(query.bookId);
    const book = response.data;

    //map
    const address = book.user.address;
    const formattedAddress = `${address.city} - ${address.uf}`;

    const mapboxClient = mbxGeocoding({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!, });
    const mapres = await mapboxClient.forwardGeocode({ query: formattedAddress}).send()

    return {
      props: {
        book,
        mapCenter: mapres.body?.features?.length ? mapres.body.features[0].center : undefined
      },
    };
  }

  return {
    props: {},
  };
};

export default BookDetails;
