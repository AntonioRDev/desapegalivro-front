import React from "react";
import { Button, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { DonatedBook } from "../../../models/domain/DonatedBook";
import { useRouter } from "next/router";

type Props = {
  book: DonatedBook;
};

const BookListItem: React.FC<Props> = ({ book }) => {
  const router = useRouter();

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
          src={book.bookCoverUrl}
          height={200}
          width={200}
          maxWidth="100%"
          borderTopRadius="lg"
          cursor='pointer'
          onClick={() => router.push(`/detalhes/${book.id}`)}
        />
      </Flex>

      <Flex direction="column" p="1rem" alignItems="center">
        <Heading
          fontSize="lg"
          cursor="pointer"
          mb="2"
          _hover={{ textDecoration: "underline" }}
          onClick={() => router.push(`/detalhes/${book.id}`)}
        >
          {book.title}
        </Heading>

        <Text mb="2">Doado por: {book.user.name}</Text>

        <Button
          rounded="md"
          bgColor="primary"
          color="white"
          fontWeight="medium"
          onClick={() => router.push(`/detalhes/${book.id}`)}
        >
          Candidatar para receber
        </Button>
      </Flex>
    </Flex>
  );
};

export default BookListItem;
