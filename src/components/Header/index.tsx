import React from "react";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import BookLogo from "../../assets/icons/BookLogo.svg";
import InputSearch from "./InputSearch";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <Flex
      height="65px"
      w="100%"
      bgColor="white"
      shadow="md"
      px="50px"
      py="15px"
      justifyContent="space-between"
    >
      <Flex alignItems="center" cursor="pointer">
        <Image src={BookLogo} />

        <Text fontFamily="dancingScript" fontSize="24px" ml="10px">
          Desapega Livro
        </Text>
      </Flex>

      <Flex>
        <InputSearch />
      </Flex>

      <Flex alignItems="center">
        <Button
          rounded="20px"
          variant="outline"
          borderColor="secondary"
          color="secondary"
        >
          Doar Agora!
        </Button>

        <Icon as={FaUserCircle} color="secondary" boxSize={9} cursor="pointer" ml="30px" />
      </Flex>
    </Flex>
  );
}
