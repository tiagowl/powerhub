import { Button, Flex, Input, Select, Text, Textarea, useToast } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Dashboard from '../../../components/templates/Dashboard';
import { Registration } from '../../../global/interfaces';
import api from '../../../services/api';

// import { Container } from './styles';

const Adicionar: NextPage = () => {

    const [payload, setPayload] = useState<Registration>();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(1);
    const toast = useToast();
    const router = useRouter();

    const register = async () => {
        setLoading(true);
        try{
            const response = await api.post("/rest/v1/registrations", {...payload,type: type, gym: typeof window !== "undefined" && sessionStorage.getItem("gym")});
            if(response.status === 201){
                setLoading(false);
                toast({
                    title: "Cadastro criado!",
                    status: "success",
                    isClosable: true
                })
                router.push("/main/cadastros");
            }
        }catch(err){
            setLoading(false);
        }
    }

  return (
      <Dashboard>
          <Flex flexDirection="column" bg="white" borderRadius="2px" w="100%" h="auto" border="1px solid rgb(226, 232, 240)" >
            <Flex justifyContent="space-between" alignItems="center" w="100%" pl="4" pr="4" pt="4" borderBottom="1px solid #edf1f8" pb="3" >
                <Text fontSize="lg" fontWeight="bold" color="rgb(30, 41, 59)" fontFamily="Nunito" >Cadastrar</Text>
            </Flex>
            <Flex pl="4" pr="4" w="100%" h="auto" mt="5" flexDirection="column" justifyContent="flex-start" >
                <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" >Nome</Text>
                <Input size="lg" value={payload?.name} onChange={(e)=>setPayload({...payload, name: e.target.value})}  type="text" />
            </Flex>
            <Flex pl="4" pr="4" w="100%" h="auto" mt="3" flexDirection="column" justifyContent="flex-start" >
                <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" >Email</Text>
                <Input size="lg" type="text" />
            </Flex>
            <Flex pl="4" pr="4" w="100%" h="auto" mt="3" flexDirection="column" justifyContent="flex-start" >
                <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" >Idade</Text>
                <Input size="lg" value={payload?.age} onChange={(e)=>setPayload({...payload, age: e.target.value})} type="text" />
            </Flex>
            <Flex pl="4" pr="4" w="100%" h="auto" mt="3" flexDirection="column" justifyContent="flex-start" >
                <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" >Peso</Text>
                <Input size="lg" value={payload?.weight} onChange={(e)=>setPayload({...payload, weight: parseInt(e.target.value)})} type="number" />
            </Flex>
            <Flex pl="4" pr="4" w="100%" h="auto" mt="3" flexDirection="column" justifyContent="flex-start" >
                <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" >Altura</Text>
                <Input size="lg" value={payload?.height} onChange={(e)=>setPayload({...payload, height: e.target.value})} type="text" />
            </Flex>
            <Flex pl="4" pr="4" w="100%" h="auto" mt="3" flexDirection="column" justifyContent="flex-start" >
                <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" >Ocupação</Text>
                <Input size="lg" value={payload?.ocupation} onChange={(e)=>setPayload({...payload, ocupation: e.target.value})} type="text" />
            </Flex>
            <Flex pl="4"  pr="4" w="100%" h="auto" mt="3" flexDirection="column" justifyContent="flex-start" >
                <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" >Notas</Text>
                <Textarea size="lg" value={payload?.notes} onChange={(e)=>setPayload({...payload, notes: e.target.value})} h="100px"/>
            </Flex>
            <Flex pl="4"  pr="4" w="100%" h="auto" mt="3" flexDirection="column" justifyContent="flex-start" >
                <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" >Tipo</Text>
                <Select size="lg" value={type} onChange={(e)=>setType(parseInt(e.target.value))}>
                    <option selected value={1}>Aluno</option>
                    <option value={2}>Professor</option>
                </Select>
            </Flex>
            <Flex pl="4" mb="4" pr="4" w="100%" h="auto" mt="3" flexDirection="row" justifyContent="flex-end" >
                <Button fontFamily="Nunito" borderRadius="0.25rem"  boxShadow="0 1px 2px 0 rgb(0 0 0 / .05)" colorScheme="teal" variant="outline" >Cancelar</Button>
                <Button isLoading={loading} fontFamily="Nunito" ml="3" borderRadius="0.25rem" color="white" boxShadow="0 1px 2px 0 rgb(0 0 0 / .05)" onClick={register} bg="rgb(99, 102, 241)" >Cadastrar</Button>
            </Flex>
          </Flex>
      </Dashboard>
  );
}

export default Adicionar;