import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Input,
  Text,
  useTheme,
  VStack,
  Image,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import Select from "../components/Select";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { parseCookies } from "nookies";
import { getAllCategories } from "../services/category";
import { Category } from "../models/domain/Category";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadImage } from "../services/storage";
import { DonateBookRequestDto } from "../models/dto/DonateBookRequestDto";
import { AuthContext } from "../contexts/AuthContext";
import { donate } from "../services/books";
import { useRouter } from "next/router";

type Props = {
  categories: Category[];
};

const Donate: NextPage<Props> = ({ categories }) => {
  const { sizes } = useTheme();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [isLoading, setLoading] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<FileList | null>(
    null
  );

  const [bookCoverUrl, setBookCoverUrl] = React.useState("");
  const [bookTitle, setBookTitle] = React.useState("");
  const [usageTime, setUsageTime] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [pagesQty, setPagesQty] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState("");

  useEffect(() => {
    if (selectedFiles && selectedFiles[0]) {
      uploadImage(selectedFiles[0]).then((response) => {
        setBookCoverUrl(response.data.url);
      });
    }
  }, [selectedFiles]);

  const handleDonation = async () => {
    if (!user) {
      return;
    }

    try {
      setLoading(true);

      const payload: DonateBookRequestDto = {
        userId: user.id,
        bookCoverUrl,
        categoryId: Number(selectedCategory),
        title: bookTitle,
        usageTime,
        author,
        pagesQty: Number(pagesQty),
        language: selectedLanguage,
      };
      
      await donate(payload);
      
      router.push("/minhas-doacoes");
      setLoading(false);
    } catch (error) {
      console.log("handleDonation error", error);
    } finally {
      setLoading(false);
    }
  };

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
            p="6"
            mb="3"
          >
            <Flex mb="6">
              <Image
                src={bookCoverUrl}
                height="12.5rem"
                width="12.5rem"
                alt="Capa do livro"
                fallbackSrc="https://via.placeholder.com/200"
              />

              <Flex direction="column" pl="6">
                <Text mb="4">Imagem da capa do livro</Text>

                <Flex
                  as="label"
                  borderWidth={1}
                  borderColor="gray.200"
                  p="2"
                  cursor="pointer"
                  justifyContent="center"
                  alignItems="center"
                >
                  <input
                    type="file"
                    onChange={(e) => setSelectedFiles(e.target.files)}
                  />

                  <Text mr="2">Enviar imagem</Text>
                  <Icon as={AiOutlineCloudUpload} />
                </Flex>
              </Flex>
            </Flex>

            <HStack spacing="3" alignItems="flex-start" mb="6">
              <VStack w="50%" spacing="3">
                <Input
                  placeholder="Título do livro"
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                />

                <Input
                  placeholder="Tempo de uso"
                  type="text"
                  value={usageTime}
                  onChange={(e) => setUsageTime(e.target.value)}
                />

                <Input
                  placeholder="Autor"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />

                <Input
                  placeholder="Quantidade de Páginas"
                  type="number"
                  value={pagesQty}
                  onChange={(e) => setPagesQty(e.target.value)}
                />
              </VStack>

              <VStack w="50%" spacing="3">
                <Select
                  placeholder="Categoria"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>

                <Select
                  placeholder="Idioma"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option>Português</option>
                  <option>Inglês</option>
                </Select>
              </VStack>
            </HStack>

            <Flex justifyContent="center">
              <Button
                bgColor="primary"
                color="white"
                onClick={handleDonation}
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Cadastrar livro para doação
              </Button>
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
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    const categories = await getAllCategories();

    return {
      props: {
        categories: categories.data,
      },
    };
  }
};

export default Donate;
