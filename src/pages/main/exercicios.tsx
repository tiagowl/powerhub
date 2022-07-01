import { AddIcon } from '@chakra-ui/icons';
import { Flex, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Input } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Dashboard from '../../components/templates/Dashboard';
import { Exercicie } from '../../global/interfaces';
import api from '../../services/api';

// import { Container } from './styles';

const Exercicios: NextPage = () => {

    const [open, setOpen] = useState(false);
    const {onClose} = useDisclosure();
    const [exercicies, setExercicies] = useState<Exercicie[]>();
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [Initialrow, setInitialRow] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(2)
    const [lastRow, setLastRow] = useState(Initialrow + rowPerPage)

    useEffect(()=>{
        fetchExercicies();
    }, []);

    const fetchExercicies = async() => {
        try{
            const response = await api.get("/rest/v1/exercicies", {
                params:{
                    select: "*"
                }
            });
            if(response?.status === 200){
                setExercicies(response?.data)
            }

        }catch(err){

        }
    }

    const createExercicie = async () =>{
        setLoading(true)
        try{
            const response = await api.post("/rest/v1/exercicies", {description});
            if(response?.status === 201){
                setLoading(false);
                setOpen(false);
                fetchExercicies();
            }
        }catch(err){

        }
    }

  return (
      <Dashboard>
          <Flex flexDirection="column" bg="white" borderRadius="2px" w="650px" h="auto" border="1px solid rgb(226, 232, 240)" >
            <Flex justifyContent="space-between" alignItems="center" w="100%" pl="4" pr="4" pt="4" borderBottom="1px solid #edf1f8" pb="3" >
                <Text fontSize="lg" fontWeight="bold" color="rgb(30, 41, 59)" fontFamily="Nunito" >Exercícios</Text>
                <Button leftIcon={<AddIcon color="white" />} onClick={()=>setOpen(true)} fontFamily="Nunito" borderRadius="0.25rem" color="white" boxShadow="0 1px 2px 0 rgb(0 0 0 / .05)" bg="rgb(99, 102, 241)" >Adicionar</Button>
            </Flex>
            <Flex w="100%" height="auto" pl="3" pr="3" flexDirection="column" pt="3" pb="4"  >
                {exercicies?.map((exercicie)=>(
                    <Flex w="100%" pl="3" pt="3" pb="3" alignItems="center" borderBottom="1px solid #edf1f8" >
                        <Text fontSize="sm" fontWeight="bold" mr="7" fontFamily="Nunito" color="rgb(30, 41, 59)" >{exercicie?.description}</Text>        
                    </Flex>
                ))}
            </Flex>
          </Flex>
          <Modal isOpen={open} size="xl" onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Adicionar exercício</ModalHeader>
                        <ModalCloseButton onClick={()=>setOpen(false)} />
                        <ModalBody>
                            <Flex flexDirection="column" w="100%" h="auto" >
                                <Text fontSize="md" >Exercício</Text>
                                <Input size="lg" value={description} onChange={(e)=>setDescription(e.target.value)} />      
                            </Flex>
                        </ModalBody>

                        <ModalFooter>
                            <Button isLoading={loading} onClick={createExercicie} colorScheme='blue'>
                            Adicionar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
      </Dashboard>
  );
}

export default Exercicios;