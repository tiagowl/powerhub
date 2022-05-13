import { BellIcon, ChevronDownIcon, InfoIcon } from '@chakra-ui/icons';
import { Avatar, Fade, Flex, Square, Text, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

// import { Container } from './styles';

const Navbar = () => {

  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  return (
    <Flex w="100%" justifyContent="flex-end" alignItems="center" bg="white" h="4rem" pr="7" borderBottom="1px solid #e5e7eb" >
        <InfoIcon fontSize="md" color="#1E293B" />
        <BellIcon fontSize="xl" ml="4" color="#1E293B" />
        <Text fontSize="xl" ml="2" color="#cfd2dc" >|</Text>
        <Avatar size="sm" cursor="pointer" ml="2" onClick={onToggle} />
        <Text fontSize="sm" cursor="pointer" fontFamily="Nunito" ml="2" onClick={onToggle} fontWeight="bold" >Academia Inc.</Text>
        <ChevronDownIcon cursor="pointer" fontSize="md" ml="1" onClick={onToggle} color="#b0b2b8" />
        <Fade in={isOpen}  >
        <Flex w="174px" right="4" zIndex="1" borderRadius="4px" flexDirection="column"  mt="2" position="absolute"  bg="white"  h="220px">
            <Square minW="100%" borderTopEndRadius="4px" borderTopStartRadius="4px" minH="90px" bg="#1E293B" >
                <Avatar src="" size="md" />
            </Square>
            <Flex flexDirection="column" borderEndEndRadius="4px" borderEndStartRadius="4px" bg="white" w="175px" h="100%" borderLeft="1px solid rgb(226, 232, 240)" borderRight="1px solid rgb(226, 232, 240)" borderBottom="1px solid rgb(226, 232, 240)" >
                <Text fontFamily="Nunito" fontWeight="bold" mt="2" ml="2.5" fontSize="md" >Nome</Text>
                <Text fontSize="xs" pl="2.5" pb="1" borderBottom="1.7px solid rgb(226 232 240 / 1)" color="rgb(100, 116, 139)" fontFamily="Nunito" >
                  <i>Administrador</i>
                </Text>
                <Text fontFamily="Nunito" fontWeight="bold" cursor="pointer" mt="2" ml="2.5" onClick={()=>router.push("/main/perfil/1")} fontSize="sm" >Ver perfil</Text>
                <Text fontFamily="Nunito" fontWeight="bold" cursor="pointer" mt="2" ml="2.5" fontSize="sm" >Sair</Text>
            </Flex>
        </Flex>
    </Fade>
    </Flex>
  );
}

export default Navbar;