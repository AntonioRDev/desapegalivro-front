import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FilterParams } from "../../../pages";
import { GrFormClose } from "react-icons/gr";

type Props = {
  filterParams: FilterParams;
  onRemove: () => void
};

const FilterBadge: React.FC<Props> = ({ filterParams, onRemove }) => {
  return (
    <Flex
      maxW="100%"
      rounded="lg"
      bgColor="primary"
      color="white"
      p="2"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text isTruncated>{`${filterParams.label}: ${filterParams.value}`}</Text>

      <Flex>
        <Box h="100%" width="1px" bgColor="white" />

        <Icon
          as={GrFormClose}
          color="white"
          boxSize={6}
          cursor="pointer"
          onClick={onRemove}
        />
      </Flex>
    </Flex>
  );
};

export default FilterBadge;
