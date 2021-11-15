import { InputGroup, Input, InputProps, InputRightAddon } from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";

type Props = InputProps & {
  onSearchSubmit: () => void;
}

const InputSearch: React.FC<Props> = (props) => {
  const { onSearchSubmit, ...rest} = props;

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
        {...rest}
      />
      <InputRightAddon
        bgColor="transparent"
        cursor="pointer"
        rounded="md"
        borderColor="gray.300"
        py="1.25rem"
        px="1.25rem"
        onClick={() => onSearchSubmit()}
      >
        <BsSearch color="black" />
      </InputRightAddon>
    </InputGroup>
  );
};

export default InputSearch;
