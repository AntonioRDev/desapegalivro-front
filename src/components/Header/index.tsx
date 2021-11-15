import React, { useContext } from "react";
import {
  Avatar,
  Button,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import BookLogo from "../../assets/icons/BookLogo.svg";
import InputSearch from "./InputSearch";
import { useRouter } from "next/router";
import { AuthContext } from "../../contexts/AuthContext";
import { HamburgerIcon } from "@chakra-ui/icons";
import { GoSignOut } from "react-icons/go";
import { RiHandHeartLine } from "react-icons/ri";
import { FaRegHandPointer } from "react-icons/fa";

export default function Header() {
  const router = useRouter();
  const { user, signOut } = useContext(AuthContext);

  const [search, setSearch] = React.useState("");

  const onSearchSubmit = () => {
    const pathUrl = `/?busca=${search}`;
    window.location.href = encodeURI(pathUrl);
  };

  return (
    <Flex
      as="header"
      height="4.0625rem"
      w="100%"
      bgColor="white"
      shadow="md"
      justifyContent="center"
    >
      <Flex
        py=".8rem"
        justifyContent="space-between"
        maxWidth="maxWidthLayout"
        width="100%"
      >
        <Flex
          alignItems="center"
          cursor="pointer"
          onClick={() => router.push("/")}
        >
          <Image src={BookLogo} alt="Logo Desapega Livro" />

          <Text fontFamily="dancingScript" fontSize="1.5rem" ml="0.625rem">
            Desapega Livro
          </Text>
        </Flex>

        <Flex>
          <InputSearch
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearchSubmit={onSearchSubmit}
          />
        </Flex>

        <Flex alignItems="center">
          <Button
            rounded="1.25rem"
            variant="outline"
            borderColor="secondary"
            color="secondary"
            onClick={() => router.push("/doar")}
          >
            Doar Agora!
          </Button>

          {user && (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Opções"
                icon={<HamburgerIcon color='secondary'/>}
                variant="outline"
                ml="1.875rem"
                borderColor='secondary'
              />
              <MenuList>
                <MenuItem icon={<Icon as={FaRegHandPointer} />} onClick={() => router.push("/minhas-candidaturas")}>
                  Minhas candidaturas
                </MenuItem>

                <MenuItem icon={<Icon as={RiHandHeartLine} />} onClick={() => router.push("/minhas-doacoes")}>
                  Minhas doações
                </MenuItem>

                <MenuItem icon={<Icon as={GoSignOut} />} onClick={() => signOut()}>Sair</MenuItem>
              </MenuList>
            </Menu>
          )}

          <Avatar
            src={
              user
                ? `https://ui-avatars.com/api/?name=${user.name
                    .split(" ")
                    .join("+")}`
                : ""
            }
            cursor={user ? "default" : "pointer"}
            ml="1.875rem"
            onClick={() => (user ? null : router.push("/login"))}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
