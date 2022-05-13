import { AtSignIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Button, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Square, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';

// import { Container } from './styles';

const Login: NextPage = () => {
  return (
    <Square bg="#d2d6de" minWidth="100%" minHeight="100vh" display="flex" flexDirection="column">
      <Flex mb="5" >  
        <Text fontSize="4xl" fontFamily="Source Sans Pro" color="#333" fontWeight="bold" >Power</Text>
        <Text fontSize="4xl" fontFamily="Source Sans Pro" color="#333" fontWeight="200" >HUB</Text>
      </Flex>
      <Flex bg="white" pt="5" w="370px" h="300px" flexDirection="column" alignItems="center" >
        <Text fontSize="sm" mb="5" fontFamily="Source Sans Pro" fontWeight="300" >Sign in to start your session</Text>
        <InputGroup w="330px" mb="5" h="34px">
          <InputRightElement
            pointerEvents='none'
            children={<EmailIcon color='#777' />}
          />
          <Input type='email'fontFamily="Source Sans Pro" borderRadius="none" placeholder='Email' />
        </InputGroup>
        <InputGroup w="330px" mb="10" h="34px" >
          <InputRightElement
            pointerEvents='none'
            children={<LockIcon color='#777' />}
          />
          <Input type='email' fontFamily="Source Sans Pro" borderRadius="none" placeholder='Password' />
        </InputGroup>
        <Flex justifyContent="space-between" alignItems="center" w="330px" >
          <Text color="#337ab7" fontSize="sm" fontFamily="Source Sans Pro" >I forgot my password</Text>
          <Button bg="#3c8dbc" borderRadius="none" color="white" fontSize="sm" fontFamily="Source Sans Pro" borderColor="#367fa9" >Sign In</Button>
        </Flex>
      </Flex>
    </Square>
  );
}

export default Login;