import React, { useContext } from "react";
import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { DonatedBook } from "../../../models/domain/DonatedBook";
import { applyToReceiveBook } from "../../../services/application";
import { AuthContext } from "../../../contexts/AuthContext";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

type Props = {
  book: DonatedBook;
  isOpen: boolean;
  onClose: () => void;
};

const ApplicationModal: React.FC<Props> = ({ book, isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const toast = useToast();

  const [description, setDescription] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const handleApply = async () => {
    if(!user) {
      onClose();
      return;
    }

    if (!description) {
      toast({
        title: "Campo vazio",
        description: "Escreva o porque você deseja receber esta doação",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true
      });

      return;
    }

    try {
      setLoading(true);

      const params = {
        userId: user.id,
        bookId: book.id,
        description,
        contact: user.phone,
      };

      await applyToReceiveBook(params);

      toast({
        title: "Sucesso ao se candidatar!",
        description: "Você pode ver sua candidatura em: Minhas candidaturas",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      setLoading(false);
      router.push("/minhas-candidaturas");
    } catch (error) {
      console.log("handleApply error", error);
      toast({
        title: "Erro ao se candidatar",
        description: "Ocorreu algum erro ao se candidatar, tente novamente mais tarde",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign="center">
          Candidatar para receber livro
        </ModalHeader>

        <ModalBody>
          <Flex direction="column">
            <Heading fontSize="md" mb="6" textAlign="center">
              Você está candidatando para receber o livro{" "}
              <Text color="primary">{book.title}</Text>
            </Heading>

            <Textarea
              placeholder="Diga o porque você deseja receber esta doação..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} disabled={isLoading}>
            Voltar
          </Button>

          <Button
            colorScheme="blue"
            onClick={handleApply}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Candidatar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ApplicationModal;
