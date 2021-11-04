import React from "react";
import { Button, Flex, Heading, Text, Image } from "@chakra-ui/react";
import HpBook from "../../../assets/images/hpbook.jpg";

type Props = {};

const BookListItem: React.FC<Props> = (props) => {
  return (
    <Flex
      direction="column"
      bgColor="white"
      borderWidth={1}
      borderColor="gray.300"
      rounded="lg"
    >
      <Flex justifyContent="center">
        <Image
          src={HpBook.src}
          height="12.5rem"
          width="100%"
          maxWidth="100%"
          borderTopRadius="lg"
        />
      </Flex>

      <Flex direction="column" p="1rem" alignItems="center">
        <Heading fontSize="lg" mb="2">
          Título do Livro
        </Heading>

        <Text mb="2">Doado por: Nome do autor</Text>

        <Button rounded="md" bgColor="primary" color="white" fontWeight='medium'>
          Candidatar para receber
        </Button>
      </Flex>
    </Flex>
  );
};

export default BookListItem;
