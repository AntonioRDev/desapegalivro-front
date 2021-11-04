import React from "react";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import BookLogo from "../../assets/icons/BookLogo.svg";
import InputSearch from "./InputSearch";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <Flex
      height="4.0625rem"
      w="100%"
      bgColor="white"
      shadow="md"
      justifyContent="center"
    >
      <Flex
        px="3.125rem"
        py=".8rem"
        justifyContent="space-between"
        maxWidth="maxWidthLayout"
        width='100%'
      >
        <Flex alignItems="center" cursor="pointer">
          <Image src={BookLogo} />

          <Text fontFamily="dancingScript" fontSize="1.5rem" ml="0.625rem">
            Desapega Livro
          </Text>
        </Flex>

        <Flex>
          <InputSearch />
        </Flex>

        <Flex alignItems="center">
          <Button
            rounded="1.25rem"
            variant="outline"
            borderColor="secondary"
            color="secondary"
          >
            Doar Agora!
          </Button>

          <Icon
            as={FaUserCircle}
            color="secondary"
            boxSize={9}
            cursor="pointer"
            ml="1.875rem"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}