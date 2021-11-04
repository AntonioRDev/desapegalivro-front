import { InputGroup, Input, InputRightAddon } from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";

type Props = {};

const InputSearch: React.FC<Props> = (props) => {
  return (
    <InputGroup size="sm" rounded="md">
      <Input
        placeholder="Digite o nome do livro..."
        pl="30px"
        py="20px"
        rounded="md"
        borderColor="gray.300"
        minW='350px'
        fontSize='16px'
      />
      <InputRightAddon
        children={<BsSearch color="black" />}
        bgColor="transparent"
        cursor="pointer"
        rounded="md"
        borderColor="gray.300"
        py="20px"
        px="20px"
      />
    </InputGroup>
  );
};

export default InputSearch;
