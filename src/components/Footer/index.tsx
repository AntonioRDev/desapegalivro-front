import React from "react";
import { Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";

export default function Footer() {
  return (
    <Flex
      as='footer'
      height="4.0625rem"
      w="100%"
      justifyContent="center"
      alignItems="center"
      bgColor="white"
      shadow="0px -4px 3px rgba(0, 0, 0, 0.1)"
    >
      <Flex maxWidth="maxWidthLayout" width='100%' justifyContent='space-between'>
        <Text verticalAlign="center">
          Copyright © {new Date().getFullYear()} - Todos os direitos reservados
        </Text>

        <HStack spacing="0.625rem">
          <Icon as={BsInstagram} boxSize={6} cursor="pointer" />

          <Icon as={BsFacebook} boxSize={6} cursor="pointer" />

          <Icon as={BsTwitter} boxSize={6} cursor="pointer" />
        </HStack>
      </Flex>
    </Flex>
  );
}
