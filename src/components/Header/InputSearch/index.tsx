import { InputGroup, Input, InputRightAddon } from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";

const InputSearch: React.FC = () => {
  return (
    <InputGroup size="sm" rounded="md">
      <Input
        placeholder="Digite o nome do livro..."
        pl="1.875rem"
        py="1.25rem"
        rounded="md"
        borderColor="gray.300"
        minW="21.875rem"
        fontSize="1rem"
      />
      <InputRightAddon
        bgColor="transparent"
        cursor="pointer"
        rounded="md"
        borderColor="gray.300"
        py="1.25rem"
        px="1.25rem"
      >
        <BsSearch color="black" />
      </InputRightAddon>
    </InputGroup>
  );
};

export default InputSearch;
