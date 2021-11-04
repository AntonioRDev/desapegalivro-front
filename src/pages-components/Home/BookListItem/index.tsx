import React from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import HpBook from "../../../assets/images/hpbook.jpg"

type Props = {

};

const BookListItem: React.FC<Props> = (props) => {

  return (
    <Flex direction='column' bgColor='white' borderWidth={1} borderColor='gray.300' rounded='1.25rem'>
        <Image src={HpBook} />

        <Flex direction='column'>
            <Heading>Título do Livro</Heading>

            <Text>Doado por: Nome do autor</Text>

            <Button rounded='md'>Candidatar para receber</Button>
        </Flex>
    </Flex>
  );
};

export default BookListItem;
