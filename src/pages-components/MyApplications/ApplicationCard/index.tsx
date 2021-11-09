import React from "react";
import { Box, Button, Divider, Flex, Switch, Text } from "@chakra-ui/react";
import Image from "next/image";
import HpBook from "../../../assets/images/hpbook.jpg";

const ApplicationCard: React.FC = () => {
  return (
    <Flex bgColor='white' borderWidth={1} borderColor='gray.400' rounded='lg' p='3' width='fit-content'>
      <Flex>
        <Image src={HpBook} height={200} width={200}/>
      </Flex>

      <Flex direction='column' pl='3'>
        <Text>Título</Text>
        <Text>Categoria</Text>

        <Divider />

        <Flex h='100%' alignItems='center'>
            <Text mr='2'>Status: Aberto</Text>
            <Flex alignItems='center' justifyContent='center'>
                <Box height='1rem' width='1rem' rounded='full' bgColor='green'/>
            </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ApplicationCard;
