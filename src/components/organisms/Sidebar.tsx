import { TimeIcon } from '@chakra-ui/icons';
import { Avatar, background, Circle, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { HiUsers } from "react-icons/hi";

// import { Container } from './styles';

const Sidebar = () => {
  return (
    <Flex bg="#1E293B" w="270px" h="100vh" flexDirection="column" >
        <Flex w="100%" h="57px" bg="#2d3643" justifyContent="center" alignItems="center" >
            <Flex mt="1" >  
                <Text fontSize="2xl" fontFamily="Source Sans Pro" color="white" fontWeight="bold" >Power</Text>
                <Text fontSize="2xl" fontFamily="Source Sans Pro" color="white" fontWeight="200" >HUB</Text>
            </Flex>
        </Flex>
        <Flex w="100%" h="auto" mb="4" alignItems="center" pl="5" pt="5" pb="1" >
            <Avatar size="sm" mr="3" />
            <Text fontSize="sm" fontFamily="Nunito" color="white" fontWeight="bold" >Nome academia</Text>
        </Flex>
        <Text bg="#161e2b" pt="2" pb="2" fontSize="xs" pl="5" color="#64748B" >PAGES</Text>
        <Flex pl="5" pt="3.5" pb="3.5" _hover={{backgroundColor: "#161e2b"}} alignItems="center" >
            <TimeIcon color="#6c83a7" mr="3" />
            <Text fontSize="sm" color="white" fontWeight="bold" fontFamily="Nunito" >Dashboard</Text>
        </Flex>
        <Flex pl="5" pt="3.5" pb="3.5" _hover={{backgroundColor: "#161e2b"}} alignItems="center" >
            <HiUsers color="#6c83a7" style={{marginRight: "10px"}} />
            <Text fontSize="sm" color="white" fontWeight="bold" fontFamily="Nunito" >Cadastros</Text>
        </Flex>
    </Flex>
  ); 
}

export default Sidebar;