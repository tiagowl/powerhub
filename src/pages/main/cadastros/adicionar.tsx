import { Button, Flex, Input, Select, Text, Textarea } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import Dashboard from '../../../components/templates/Dashboard';

// import { Container } from './styles';

const Adicionar: NextPage = () => {
  return (
      <Dashboard>
          <Flex flexDirection="column" bg="white" borderRadius="2px" w="100%" h="auto" border="1px solid rgb(226, 232, 240)" >
            <Flex justifyContent="space-between" alignItems="center" w="100%" pl="4" pr="4" pt="4" borderBottom="1px solid #edf1f8" pb="3" >
                <Text fontSize="lg" fontWeight="bold" color="rgb(30, 41, 59)" fontFamily="Nunito" >Cadastrar</Text>
            </Flex>
            <Flex pl="4" pr="4" w="100%" h="auto" mt="5" flexDirection="column" justifyContent="flex-start" >
                <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" >Nome</Text>
                <Input size="lg" type="text" />
            </Flex>
            <Flex pl="4" pr="4" w="100%" h="auto" mt="3" flexDirection="column" justifyContent="flex-start" >
                <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" >Email</Text>
                <Input size="lg" type="text" />
            </Flex>
            <Flex pl="4" pr="4" w="100%" h="auto" mt="3" flexDirection="column" justifyContent="flex-start" >
                <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" >Genero</Text>
                <Select fontFamily="Nunito" fontSize="sm" size="lg">
                    <option value="">Masculino</option>
                </Select>
            </Flex>
            <Flex pl="4"  pr="4" w="100%" h="auto" mt="3" flexDirection="column" justifyContent="flex-start" >
                <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" >Observações</Text>
                <Textarea size="lg" h="100px"/>
            </Flex>
            <Flex pl="4" mb="4" pr="4" w="100%" h="auto" mt="3" flexDirection="row" justifyContent="flex-end" >
                <Button fontFamily="Nunito" borderRadius="0.25rem"  boxShadow="0 1px 2px 0 rgb(0 0 0 / .05)" colorScheme="teal" variant="outline" >Cancelar</Button>
                <Button fontFamily="Nunito" ml="3" borderRadius="0.25rem" color="white" boxShadow="0 1px 2px 0 rgb(0 0 0 / .05)" bg="rgb(99, 102, 241)" >Cadastrar</Button>
            </Flex>
          </Flex>
      </Dashboard>
  );
}

export default Adicionar;