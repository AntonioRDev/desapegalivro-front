import React from "react";
import {
  Button,
  Divider,
  Flex,
  Switch,
  Text,
  Image,
  Badge,
  VStack,
} from "@chakra-ui/react";
import { DonatedBook } from "../../../models/domain/DonatedBook";
import format from "date-fns/format";
import { toggleBookStatus } from "../../../services/books";

type Props = {
  book: DonatedBook;
};

const DonationCard: React.FC<Props> = ({ book }) => {
  const [isActive, setIsActive] = React.useState(book.isActive);
  const [isLoading, setLoading] = React.useState(false);

  const onToggleStatus = async () => {
    try {
      setLoading(true);

      await toggleBookStatus(book.id.toString());

      setIsActive(!isActive);
      setLoading(false);
    } catch (error) {
      console.log("onToggleStatus error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      bgColor="white"
      borderWidth={1}
      borderColor="gray.400"
      rounded="lg"
      p="2"
    >
      <Flex>
        <Image src={book.bookCoverUrl} height={200} width={200} />
      </Flex>

      <VStack pl="2">
        <Text fontWeight="bold" color="primary">
          {book.title}
        </Text>

        <Badge colorScheme="green">
          <Text textAlign="center">{book.category.name}</Text>
        </Badge>

        <Divider />

        <Text textAlign="center">
          Contatos recebidos: {book.applicationsQty}
        </Text>

        <Text>Data do cadastro:</Text>
        <Text> {format(new Date(book.createdAt), "dd/MM/yyyy")}</Text>

        <Flex>
          <Text>Mostrar no site:</Text>
          <Switch
            isChecked={isActive}
            onChange={() => onToggleStatus()}
            ml="2"
            isDisabled={isLoading}
          />
        </Flex>

        {/* <Flex justifyContent='center'>
          <Button bgColor="primary" color="white">Editar</Button>
        </Flex> */}
      </VStack>
    </Flex>
  );
};

export default DonationCard;
