import { AtSignIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Button, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Square, Text, useToast } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import api from '../services/api';

// import { Container } from './styles';

const Login: NextPage = () => {

  const router = useRouter();
  const [payloadLogin, setPayloadLogin] = useState({email: "", password: ""});
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const Login = async () => {
    setLoading(true);
    try{
      const response = await api.post("/auth/v1/token?grant_type=password", payloadLogin);
      if(response?.status === 200){
        setUserData();
      }
    }catch(err){
      setLoading(false)
      toast({
        title: err?.response?.data?.error_description,
        status: "warning",
        isClosable: true
      })
    }
  }

  const setUserData = async () => {
    try{
      const response = await api.get("/rest/v1/registrations", {
        params:{
          email: `eq.${payloadLogin.email}`,
          select: "*"
        }
      });
      if(response?.status === 200){
        sessionStorage.setItem("name", response?.data?.[0]?.name);
        sessionStorage.setItem("gym", response?.data?.[0]?.gym);
        sessionStorage.setItem("idUser", response?.data?.[0]?.id);
        router.push("/main");
        setLoading(false);
      }
    }catch(err){
      setLoading(false);
      toast({
        title: "Erro ao buscar dados",
        status: "warning",
        isClosable: true
      })
    }
  }

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
          <Input type='email' value={payloadLogin.email} onChange={(e)=>setPayloadLogin({...payloadLogin, email: e.target.value})} fontFamily="Source Sans Pro" borderRadius="none" placeholder='Email' />
        </InputGroup>
        <InputGroup w="330px" mb="10" h="34px" >
          <InputRightElement
            pointerEvents='none'
            children={<LockIcon color='#777' />}
          />
          <Input type='password' value={payloadLogin.password} onChange={(e)=>setPayloadLogin({...payloadLogin, password: e.target.value})} fontFamily="Source Sans Pro" borderRadius="none" placeholder='Password' />
        </InputGroup>
        <Flex justifyContent="flex-start" alignItems="center" w="330px" >
          <Button isLoading={loading} bg="#3c8dbc" onClick={Login} borderRadius="none" color="white" fontSize="sm" fontFamily="Source Sans Pro" borderColor="#367fa9" >Sign In</Button>
        </Flex>
      </Flex>
    </Square>
  );
}

export default Login;