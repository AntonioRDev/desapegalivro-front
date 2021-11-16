import React from "react";
import { Box, Divider, Flex, Text, Image } from "@chakra-ui/react";
import { Application } from "../../../models/domain/Application";

type Props = {
  application: Application;
};

const ApplicationCard: React.FC<Props> = ({ application }) => {
  return (
    <Flex
      bgColor="white"
      borderWidth={1}
      borderColor="gray.400"
      rounded="lg"
      p="3"
      width="fit-content"
    >
      <Flex>
        <Image src={application.book.bookCoverUrl} height={200} width={200} />
      </Flex>

      <Flex direction="column" pl="3">
        <Text>{application.book.title}</Text>
        <Text>{application.book.category.name}</Text>

        <Divider />

        <Flex h="100%" alignItems="center">
          <Text mr="2">
            Status: {application.book.isActive ? "Aberto" : "Doado"}
          </Text>
          <Flex alignItems="center" justifyContent="center">
            <Box
              height="1rem"
              width="1rem"
              rounded="full"
              bgColor={application.book.isActive ? "green" : "red"}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ApplicationCard;
