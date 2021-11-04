import React from "react";
import { Flex, Icon, Text, FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = FlexProps & {
  categoryName: string;
  icon: IconType;
};

const CategoriesBadge: React.FC<Props> = (props) => {
  const { categoryName, icon, ...rest } = props;

  return (
    <Flex
      bgColor="white"
      rounded="1.25rem"
      py="0.5rem"
      px="1.5rem"
      alignItems="center"
      cursor="pointer"
      borderWidth={1}
      borderColor="gray.300"
      {...rest}
    >
      <Icon as={icon} boxSize={8} mr="0.625rem" />
      <Text>{categoryName}</Text>
    </Flex>
  );
};

export default CategoriesBadge;
