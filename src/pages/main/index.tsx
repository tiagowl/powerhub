import { CalendarIcon } from '@chakra-ui/icons';
import { Button, Flex, Square, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import { CgGym } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import Dashboard from '../../components/templates/Dashboard';
import { BsFillCartFill } from "react-icons/bs";
// import { Container } from './styles';

const Main: NextPage = () => {
  return(
      <Dashboard>
          <Flex w="100%" borderRadius="3px" h="65px" pl="4" pr="4" alignItems="center" mb="7" justifyContent="space-between" bg="white"  >
            <Text fontSize="sm" fontFamily="Nunito"  color="#7e7e7e" >Boa tarde Academia Inc. O que você deseja fazer hoje?</Text>
            <Button fontSize="xs" color="white" borderRadius="5px"  bg="#a461d8" fontFamily="Nunito" >Enviar Contato</Button>
          </Flex>
          <Flex w="100%" justifyContent="space-between" alignItems="center" mb="3" > 
            <Text color="#001737" fontSize="2xl" fontFamily="Nunito" fontWeight="bold" >Dashboard</Text>
            <Flex bg="white" alignItems="center" pl="3" borderRadius="3px" h="45px" w="150px" >
                <CalendarIcon color="#a7afb7" mr="3" />
                <Text color="#a7afb7" fontSize="sm" fontWeight="bold" fontFamily="Nunito" >24 mar 2022</Text>
            </Flex>
          </Flex>
          <Flex w="100%" h="auto" >
            <Flex w="303.5px" mr="8" h="90px" borderRadius="2px" bg="white" boxShadow="0px 1px 1px 0px rgba(0,0,0,0.1)" >
                <Square size="90px" bg="rgb(0, 192, 239)" >
                    <FaUsers fontSize="3rem" color="white" />
                </Square>
                <Flex alignItems="flex-start" flexDirection="column" ml="3" mt="3" >
                    <Text fontSize="md" fontFamily="Nunito" >Novos Alunos</Text>
                    <Text fontSize="md" fontFamily="Nunito" fontWeight="bold" >2,000</Text>
                </Flex>
            </Flex>
            <Flex w="303.5px" h="90px" borderRadius="2px" bg="white" boxShadow="0px 1px 1px 0px rgba(0,0,0,0.1)" >
                <Square size="90px" bg="rgb(0, 166, 90)" >
                    <BsFillCartFill fontSize="3rem" color="white" />
                </Square>
                <Flex alignItems="flex-start" flexDirection="column" ml="3" mt="3" >
                    <Text fontSize="md" fontFamily="Nunito" >Novas Compras</Text>
                    <Text fontSize="md" fontFamily="Nunito" fontWeight="bold" >2,000</Text>
                </Flex>
            </Flex>
          </Flex>
      </Dashboard>
  );
}

export default Main;