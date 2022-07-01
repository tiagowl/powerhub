import { AddIcon } from '@chakra-ui/icons';
import { Avatar, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Dashboard from '../../../components/templates/Dashboard';
import api from '../../../services/api';
import {Registration} from '../../../global/interfaces';

// import { Container } from './styles';

const Cadastros: NextPage = () => {

    const router = useRouter();
    const toast = useToast();
    const [teachers, setTeachers] = useState<Registration[]>();
    const [students, setStudents] = useState<Registration[]>();
    const [Initialrow, setInitialRow] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(2)
    const [lastRow, setLastRow] = useState(Initialrow + rowPerPage)

    useEffect(()=>{
        fetchRegistrations(1);
        fetchRegistrations(2);
    }, []);

    const fetchRegistrations = async (type: number) => {
        try{
            const response = await api.get("/rest/v1/registrations", {
                params:{
                    type: `eq.${type}`,
                    select: "*",
                    gym: `eq.${JSON.parse(sessionStorage.getItem("gym"))}`
                }
            });
            if(response?.status === 200){
                switch(type){
                    case 1:
                        setStudents(response?.data);
                        break;
                    case 2:
                        setTeachers(response?.data);
                }
            }
        }catch(err){
            toast({
                title: err?.response?.data,
                status: "warning",
                isClosable: true
            })
        }
    } 

  return (
      <Dashboard>

        <Tabs>
            <TabList borderBottom="1px" >
                <Tab fontFamily="Nunito" fontWeight="bold" >Alunos</Tab>
                <Tab fontFamily="Nunito" fontWeight="bold" >Professores</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Flex flexDirection="column" bg="white" borderRadius="2px" w="650px" h="auto" border="1px solid rgb(226, 232, 240)" >
                        <Flex justifyContent="space-between" alignItems="center" w="100%" pl="4" pr="4" pt="4" borderBottom="1px solid #edf1f8" pb="3" >
                            <Text fontSize="lg" fontWeight="bold" color="rgb(30, 41, 59)" fontFamily="Nunito" >Alunos</Text>
                            <Button onClick={()=>router.push("/main/cadastros/adicionar")} leftIcon={<AddIcon color="white" />} fontFamily="Nunito" borderRadius="0.25rem" color="white" boxShadow="0 1px 2px 0 rgb(0 0 0 / .05)" bg="rgb(99, 102, 241)" >Adicionar</Button>
                        </Flex>
                        <Flex w="100%" height="auto" pl="3" pr="3" flexDirection="column" pt="3" pb="4"  >
                            <Flex w="100%" borderRadius="2px" bg="rgb(248, 250, 252)" pl="2" h="34px" alignItems="center">
                                <Text fontSize="sm" fontWeight="bold" mr="25%" fontFamily="Nunito" color="rgb(148, 163, 184)" >Aluno</Text>
                                <Text fontSize="sm" fontWeight="bold" mr="7" fontFamily="Nunito" color="rgb(148, 163, 184)" >Idade</Text>
                                <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Peso</Text>
                                <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Altura</Text>
                                <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Plano</Text>
                                <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Objetivo</Text>
                                <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Situação</Text>
                            </Flex>
                            {students?.map((student)=>(
                                <Flex w="100%" pl="3" pt="3" pb="3" alignItems="center" borderBottom="1px solid #edf1f8" >
                                    <Flex w="100%" alignItems="center" >
                                        <Avatar size="sm" mr="2" />
                                        <Text fontSize="sm" cursor="pointer" onClick={()=>router.push(`/main/perfil/${student?.id}`)} fontWeight="bold" mr="25%" fontFamily="Nunito" color="rgb(30, 41, 59)" >{student?.name}</Text>
                                    </Flex>
                                    <Text fontSize="sm" fontWeight="bold" mr="7" fontFamily="Nunito" color="rgb(30, 41, 59)" >{student?.age}</Text>
                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(30, 41, 59)" >Peso</Text>
                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(30, 41, 59)" >Altura</Text>
                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(30, 41, 59)" >Plano</Text>
                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rrgb(30, 41, 59)" >Objetivo</Text>
                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(30, 41, 59)" >Situação</Text>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                </TabPanel>
                <TabPanel>
                <Flex flexDirection="column" bg="white" borderRadius="2px" w="650px" h="auto" border="1px solid rgb(226, 232, 240)" >
                        <Flex justifyContent="space-between" alignItems="center" w="100%" pl="4" pr="4" pt="4" borderBottom="1px solid #edf1f8" pb="3" >
                            <Text fontSize="lg" fontWeight="bold" color="rgb(30, 41, 59)" fontFamily="Nunito" >Professores</Text>
                            <Button onClick={()=>router.push("/main/cadastros/adicionar")} leftIcon={<AddIcon color="white" />} fontFamily="Nunito" borderRadius="0.25rem" color="white" boxShadow="0 1px 2px 0 rgb(0 0 0 / .05)" bg="rgb(99, 102, 241)" >Adicionar</Button>
                        </Flex>
                        <Flex w="100%" height="auto" pl="3" pr="3" flexDirection="column" pt="3" pb="4"  >
                            <Flex w="100%" borderRadius="2px" bg="rgb(248, 250, 252)" pl="2" h="34px" alignItems="center">
                                <Text fontSize="sm" fontWeight="bold" mr="25%" fontFamily="Nunito" color="rgb(148, 163, 184)" >Aluno</Text>
                                <Text fontSize="sm" fontWeight="bold" mr="7" fontFamily="Nunito" color="rgb(148, 163, 184)" >Idade</Text>
                                <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Peso</Text>
                                <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Altura</Text>
                                <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Plano</Text>
                                <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Objetivo</Text>
                                <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Situação</Text>
                            </Flex>
                            {teachers?.map((student)=>(
                                <Flex w="100%" pl="3" pt="3" pb="3" alignItems="center" borderBottom="1px solid #edf1f8" >
                                    <Flex w="100%" alignItems="center" >
                                        <Avatar size="sm" mr="2" />
                                        <Text fontSize="sm" cursor="pointer" onClick={()=>router.push(`/main/perfil/${student?.id}`)} fontWeight="bold" mr="25%" fontFamily="Nunito" color="rgb(30, 41, 59)" >{student?.name}</Text>
                                    </Flex>
                                    <Text fontSize="sm" fontWeight="bold" mr="7" fontFamily="Nunito" color="rgb(30, 41, 59)" >{student?.age}</Text>
                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(30, 41, 59)" >Peso</Text>
                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(30, 41, 59)" >Altura</Text>
                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(30, 41, 59)" >Plano</Text>
                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rrgb(30, 41, 59)" >Objetivo</Text>
                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(30, 41, 59)" >Situação</Text>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                </TabPanel>
            </TabPanels>
        </Tabs>

      </Dashboard>
  );
}

export default Cadastros;