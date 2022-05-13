import { Avatar, Center, Flex, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import { FaBook, FaRegNewspaper } from 'react-icons/fa';
import Dashboard from '../../../components/templates/Dashboard';

// import { Container } from './styles';

const Perfil: NextPage = () => {
  return (
      <Dashboard>
          <Flex w="100%" justifyContent="flex-start" alignItems="center" mb="3" > 
            <Text color="#001737" fontSize="2xl" fontFamily="Nunito" fontWeight="bold" >Perfil</Text>
          </Flex>
          <Flex w="100%">
            <Flex w="23%" flexDirection="column" h="100%" >
                <Flex w="100%" flexDirection="column" boxShadow="0 1px 1px rgb(0 0 0 / 10%);" borderTopStartRadius="5px" borderTopEndRadius="5px" borderTop="3px solid #3c8dbc" h="170px" bg="white" >
                    <Center h="170px" flexDirection="column">
                        <Avatar size="lg" mb="2" />
                        <Text fontSize="lg" mb="2" fontFamily="Nunito" fontWeight="bold" >Nome</Text>
                        <Text fontSize="md" fontFamily="Nunito" fontWeight="bold" color="gray" >Aluno</Text>
                    </Center>
                </Flex>
                <Flex w="100%" mt="9" pt="2" flexDirection="column" boxShadow="0 1px 1px rgb(0 0 0 / 10%);" borderTopStartRadius="5px" borderTopEndRadius="5px" borderTop="3px solid #3c8dbc" h="auto" bg="white" >
                    <Flex borderBottom="1px solid #f4f4f4" w="100%" pb="2" >
                        <Text color="#001737" ml="3" fontSize="xl" fontFamily="Nunito" >Sobre</Text>
                    </Flex>
                    <Flex w="100%" pl="3" pr="3" pt="3" flexDirection="column" >
                        <Flex>
                            <FaBook/>
                            <Text fontSize="sm" ml="1" fontFamily="Nunito" fontWeight="bold" >Ocupação</Text>
                        </Flex>
                        <Text fontSize="sm" pb="3" borderBottom="1px solid black" fontFamily="Nunito" fontWeight="bold" color="gray" >Professor de química</Text>
                        <Flex mt="6" >
                            <FaRegNewspaper/>
                            <Text fontSize="sm" ml="1" fontFamily="Nunito" fontWeight="bold" >Notas</Text>
                        </Flex>
                        <Text fontSize="sm" pb="3" mb="2" fontFamily="Nunito" fontWeight="bold" color="gray" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex w="74%" ml="7" h="100%">
                <Flex w="100%" flexDirection="column" boxShadow="0 1px 1px rgb(0 0 0 / 10%);" borderTopStartRadius="5px" borderTopEndRadius="5px" borderTop="3px solid #3c8dbc" h="auto" bg="white" >
                    <Flex borderBottom="1px solid #f4f4f4" w="100%" pb="2" >
                        <Text color="#001737" ml="3" mt="2" fontSize="xl" fontFamily="Nunito" >Editar</Text>
                    </Flex>
                </Flex>
            </Flex>
          </Flex>
      </Dashboard>
  );
}

export default Perfil;