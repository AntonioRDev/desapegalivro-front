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
      rounded="20px"
      py="8px"
      px="24px"
      alignItems="center"
      cursor="pointer"
      borderWidth={1}
      borderColor="gray.300"
      {...rest}
    >
      <Icon as={icon} boxSize={8} mr="10px" />
      <Text>{categoryName}</Text>
    </Flex>
  );
};

export default CategoriesBadge;
