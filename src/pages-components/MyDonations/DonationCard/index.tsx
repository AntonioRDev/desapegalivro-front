import React from "react";
import { Button, Divider, Flex, Switch, Text } from "@chakra-ui/react";
import Image from "next/image";
import HpBook from "../../../assets/images/hpbook.jpg";

const DonationCard: React.FC = () => {
  return (
    <Flex bgColor='white' borderWidth={1} borderColor='gray.400' rounded='lg' p='3' width='fit-content'>
      <Flex>
        <Image src={HpBook} height={200} width={200}/>
      </Flex>

      <Flex direction='column'>
        <Text>Título</Text>
        <Text>Categoria</Text>

        <Divider />

        <Text>Contatos recebidos: 0</Text>
        <Text>Data do cadastro:</Text>
        <Text> 17/10/2021</Text>

        <Flex>
          <Text>Mostrar no site:</Text>
          <Switch />
        </Flex>

        <Flex justifyContent='center'>
          <Button bgColor="primary" color="white">Editar</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DonationCard;
