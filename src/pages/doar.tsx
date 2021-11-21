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
  FormControl,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
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
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@chakra-ui/react";

type Props = {
  categories: Category[];
};

type FormValues = {
  bookTitle: string;
  usageTime: string;
  author: string;
  pagesQty: string;
  selectedCategory: string;
  selectedLanguage: string;
};

const validationSchema = yup.object().shape({
  bookTitle: yup
    .string()
    .max(100)
    .required("Você precisa preencher este campo"),
  usageTime: yup
    .string()
    .max(100)
    .required("Você precisa preencher este campo"),
  author: yup.string().max(100).required("Você precisa preencher este campo"),
  pagesQty: yup.string().max(100).required("Você precisa preencher este campo"),
  selectedCategory: yup
    .string()
    .max(100)
    .required("Você precisa preencher este campo"),
  selectedLanguage: yup
    .string()
    .max(100)
    .required("Você precisa preencher este campo"),
});

const Donate: NextPage<Props> = ({ categories }) => {
  const { sizes } = useTheme();
  const toast = useToast();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [isLoading, setLoading] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<FileList | null>(
    null
  );

  const [bookCoverUrl, setBookCoverUrl] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (selectedFiles && selectedFiles[0]) {
      uploadImage(selectedFiles[0]).then((response) => {
        setBookCoverUrl(response.data.url);
      });
    }
  }, [selectedFiles]);

  const handleDonation = async (data: FormValues) => {
    if(!bookCoverUrl) {
      toast({
        title: "Sem imagem da capa",
        description: "Você precisa enviar a imagem da capa do livro!",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });

      return;
    }

    const {
      selectedCategory,
      bookTitle,
      usageTime,
      author,
      pagesQty,
      selectedLanguage,
    } = data;

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

      toast({
        title: "Sucesso ao fazer cadastro de doação!",
        description: "Você pode ver sua doação em: Minhas doações",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      router.push("/minhas-doacoes");
    } catch (error) {
      toast({
        title: "Erro ao fazer cadastro de livro",
        description: "Ocorreu um erro. Tente novamente mais tarde.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
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

            <form onSubmit={handleSubmit(handleDonation)}>
              <HStack spacing="3" alignItems="flex-start" mb="6">
                <VStack w="50%" spacing="3">
                  <FormControl isInvalid={!!errors.bookTitle}>
                    <Input
                      placeholder="Título do livro"
                      type="text"
                      {...register("bookTitle")}
                    />

                    <FormErrorMessage>
                      {errors.bookTitle?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.usageTime}>
                    <Input
                      placeholder="Tempo de uso"
                      type="text"
                      {...register("usageTime")}
                    />

                    <FormErrorMessage>
                      {errors.usageTime?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.author}>
                    <Input
                      placeholder="Autor"
                      type="text"
                      {...register("author")}
                    />

                    <FormErrorMessage>
                      {errors.author?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.pagesQty}>
                    <Input
                      placeholder="Quantidade de Páginas"
                      type="text"
                      {...register("pagesQty")}
                    />

                    <FormErrorMessage>
                      {errors.pagesQty?.message}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>

                <VStack w="50%" spacing="3">
                  <FormControl isInvalid={!!errors.selectedCategory}>
                    <Select
                      placeholder="Categoria"
                      {...register("selectedCategory")}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Select>

                    <FormErrorMessage>
                      {errors.selectedCategory?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.selectedLanguage}>
                    <Select
                      placeholder="Idioma"
                      {...register("selectedLanguage")}
                    >
                      <option>Português</option>
                      <option>Inglês</option>
                    </Select>

                    <FormErrorMessage>
                      {errors.selectedLanguage?.message}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>
              </HStack>

              <Flex justifyContent="center">
                <Button
                  bgColor="primary"
                  color="white"
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={!isValid || isLoading}
                >
                  Cadastrar livro para doação
                </Button>
              </Flex>
            </form>
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
