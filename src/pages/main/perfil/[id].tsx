import { AddIcon, CalendarIcon, CheckCircleIcon, CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import { Avatar, Button, Center, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaBook, FaRegNewspaper } from 'react-icons/fa';
import Dashboard from '../../../components/templates/Dashboard';
import api from '../../../services/api';
import {Exercicie, Plan, Registration, Workout} from '../../../global/interfaces';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from "../../../generator/pdf";
import {AiOutlineUser} from "react-icons/ai";
import {GiWeight} from "react-icons/gi";

// import { Container } from './styles';

const Perfil: NextPage = () => {

    const [open, setOpen] = useState(false);
    const {onClose} = useDisclosure();
    const router = useRouter();
    const [profile, setProfile] = useState<Registration[]>();
    const [updatePayload, setUpdatePayload] = useState<Registration>();
    const [loading, setLoading] = useState(false);
    const [exercicies, setExercicies] = useState<Exercicie[]>();
    const [workoutPayload, setWorkoutPayload] = useState<Workout>();
    const [workouts, setWorkouts] = useState<Workout[]>();
    const [workoutA, setWorkoutA] = useState<Workout[]>();
    const [workoutB, setWorkoutB] = useState<Workout[]>();
    const [workoutC, setWorkoutC] = useState<Workout[]>();
    const toast = useToast();
    const [updateModal, setUpdateModal] = useState(false);
    const [workoutId, setWorkoutId] = useState(0);
    const [workout, setWorkout] = useState<Workout>();
    const [plans, setPlans] = useState<Plan[]>();
    const [deleteSubModal, setDeleteSubModal] = useState(false);

    useEffect(()=>{
        fetchProfile();
        getWorkouts();
    }, [router?.query?.id]);

    useEffect(()=>{
        getExercicies();
        fetchPlans();
    }, []);

    useEffect(()=>{
        let workoutA = workouts?.filter((workout) => workout.separation === "a");
        let workoutB = workouts?.filter((workout) => workout.separation === "b");
        let workoutC = workouts?.filter((workout) => workout.separation === "c");

        setWorkoutA(workoutA);
        setWorkoutB(workoutB);
        setWorkoutC(workoutC);
    }, [workouts])

    useEffect(()=>{
        if(workoutId > 0){
            const workoutById = workouts?.find((workout)=> workout?.id === workoutId);
            setWorkout(workoutById);
            setUpdateModal(true);
        }
    }, [workoutId]);

    const fetchProfile = async () => {
        setLoading(true);
        if(router?.query?.id){
            try{
                const response = await api.get("/rest/v1/registrations", {
                    params:{
                        id: `eq.${router?.query?.id}`,
                        select: "*",
                    }
                });
                if(response?.status === 200){
                    setLoading(false);
                    setProfile(response?.data);
                }
            }catch(err){
                
            }
        }
    }

    const updateWorkout = async () => {
        setLoading(true);

        try{
            const response = await api.patch("/rest/v1/workouts", workout ,{
                params:{
                    id: `eq.${workoutId}`
                }
            });
            if(response?.status === 200){
                setLoading(false);
                setUpdateModal(false);
                getWorkouts();
            }
        }catch(err){

        }
    }

    const createWorkout = async () => {
        setLoading(true);
        try{
            const response = await api.post("/rest/v1/workouts", {...workoutPayload, user: router?.query?.id});
            if(response?.status === 201){
                setLoading(false);
                setOpen(false);
                getWorkouts();
            }
        }catch(err){
            setLoading(false);
            return toast({
                title: "Todos os campos devem ser preenchidos",
                status: "warning",
                isClosable: true
            })
        }
    }

    const getWorkouts = async () => {
        if(router?.query?.id){
            try{
                const response = await api.get("/rest/v1/workouts", {
                    params:{
                        user:`eq.${router?.query?.id}`,
                        select: "*" 
                    }
                });
                if(response?.status === 200){
                    setWorkouts(response?.data)
                }
            }catch(err){
    
            }
        }
    }

    const getExercicies = async () => {
        try{
            const response = await api.get("/rest/v1/exercicies", {
                params:{
                    select: "*"
                }
            });
            if(response?.status === 200){
                setExercicies(response?.data);
            }
        }catch(err){

        }
    }

    const deleteWorkout = async (id: number) => {
        
        try{
            const response = await api.delete("/rest/v1/workouts", {
                params:{
                    id: `eq.${id}`
                }
            });
            if(response?.status === 200){
                getWorkouts();
            }
        }catch(err){

        }
    }

    const fetchPlans = async() => {
        try{
            const response = await api.get("/rest/v1/plans", {
                params:{
                    select: "*",
                    gym: `eq.${sessionStorage.getItem("gym")}`
                }
            });
            if(response?.status === 200){
                setPlans(response?.data)
            }

        }catch(err){

        }
    }

    const deleteSub = async () => {
        setLoading(true);
        try{
            const response = await api.delete("/rest/v1/registrations", {
                params:{
                    id: `eq.${profile[0]?.id}`
                }
            });
            if(response?.status === 200){
                setLoading(false);
                setDeleteSubModal(false);
                router.push("/main/cadastros");
            }
        }catch(err){

        }
    }

    const updateProfile = async () => {
        setLoading(true);
        if(router?.query?.id){
            try{
                const response = await api.patch("/rest/v1/registrations", updatePayload, {
                    params: {
                        id: `eq.${router?.query?.id}`
                    }
                });
                if(response?.status === 200){
                    fetchProfile();
                    toast({
                        title: "Usuário atualizado!",
                        status: "success",
                        isClosable: true
                    })
                }
            }catch(err){
                setLoading(false);
            }
        }
    }

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
                        <Text fontSize="md" fontFamily="Nunito" fontWeight="bold" color="gray" >{profile?.[0]?.name}</Text>
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
                        <Text fontSize="sm" pb="3" borderBottom="1px solid #DEDDDD" fontFamily="Nunito" fontWeight="bold" color="gray" >{profile?.[0]?.ocupation}</Text>
                        <Flex mt="6" >
                            <FaRegNewspaper/>
                            <Text fontSize="sm" ml="1" fontFamily="Nunito" fontWeight="bold" >Notas</Text>
                        </Flex>
                        <Text fontSize="sm" mb="2" pb="3" borderBottom="1px solid #DEDDDD" fontFamily="Nunito" fontWeight="bold" color="gray" >{profile?.[0]?.notes}</Text>
                        <Flex mt="6" >
                            <AiOutlineUser/>
                            <Text fontSize="sm" ml="1" fontFamily="Nunito" fontWeight="bold" >Idade</Text>
                        </Flex>
                        <Text fontSize="sm" mb="2" pb="3" borderBottom="1px solid #DEDDDD" fontFamily="Nunito" fontWeight="bold" color="gray" >{profile?.[0]?.age}</Text>
                        <Flex mt="6" >
                            <GiWeight/>
                            <Text fontSize="sm" ml="1" fontFamily="Nunito" fontWeight="bold" >Peso</Text>
                        </Flex>
                        <Text fontSize="sm" mb="2" pb="3" borderBottom="1px solid #DEDDDD" fontFamily="Nunito" fontWeight="bold" color="gray" >{profile?.[0]?.weight}</Text>
                        <Flex mt="6" >
                            <CalendarIcon/>
                            <Text fontSize="sm" ml="1" fontFamily="Nunito" fontWeight="bold" >Plano</Text>
                        </Flex>
                        <Text fontSize="sm" mb="2" pb="3" borderBottom="1px solid #DEDDDD" fontFamily="Nunito" fontWeight="bold" color="gray" >{profile?.[0]?.plan}</Text>
                        <Flex mt="6" >
                            <CheckCircleIcon/>
                            <Text fontSize="sm" ml="1" fontFamily="Nunito" fontWeight="bold" >Objetivo</Text>
                        </Flex>
                        <Text fontSize="sm" mb="2" pb="3" fontFamily="Nunito" fontWeight="bold" color="gray" >{profile?.[0]?.objective}</Text>
                    </Flex>
                </Flex>
                <Button colorScheme="red" w="170px" mt="3" onClick={()=>setDeleteSubModal(true)} leftIcon={<DeleteIcon/>} size="md" >Excluir cadastro</Button>
            </Flex>
            <Flex w="74%" ml="7" h="100%">
                <Flex w="100%" h="auto" >
                    <Tabs w="100%" >
                        <TabList>
                            <Tab>Editar</Tab>
                            <Tab>Treino</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Flex w="100%" flexDirection="column" pb="4" boxShadow="0 1px 1px rgb(0 0 0 / 10%);" borderTopStartRadius="5px" borderTopEndRadius="5px" borderTop="3px solid #3c8dbc" h="auto" bg="white" >
                                    <Flex borderBottom="1px solid #f4f4f4" w="100%" pb="2" >
                                        <Text color="#001737" ml="3" mt="2" fontSize="xl" fontFamily="Nunito" >Editar</Text>
                                    </Flex>
                                    <Flex flexDirection="column" mt="3" pl="3" pr="3" justifyContent="flex-start" >
                                        <Text fontFamily="Nunito" fontWeight="bold" fontSize="md" >Nome</Text>
                                        <Input size="md" mb="3" value={updatePayload?.name} onChange={(e)=>setUpdatePayload({...updatePayload, name: e.target.value})} borderRadius="none" type="text" border="1px solid #d2d6de" />
                                        <Text fontFamily="Nunito" fontWeight="bold" fontSize="md" >Email</Text>
                                        <Input size="md" mb="3" value={updatePayload?.email} onChange={(e)=>setUpdatePayload({...updatePayload, email: e.target.value})} borderRadius="none" type="text" border="1px solid #d2d6de" />
                                        <Text fontFamily="Nunito" fontWeight="bold" fontSize="md" >Idade</Text>
                                        <Input size="md" mb="3" value={updatePayload?.age} onChange={(e)=>setUpdatePayload({...updatePayload, age: e.target.value})} borderRadius="none" type="number" border="1px solid #d2d6de" />
                                        <Text fontFamily="Nunito" fontWeight="bold" fontSize="md" >Ocupação</Text>
                                        <Input size="md" mb="3" value={updatePayload?.ocupation} onChange={(e)=>setUpdatePayload({...updatePayload, ocupation: e.target.value})} borderRadius="none" type="text" border="1px solid #d2d6de" />
                                        <Text fontFamily="Nunito" fontWeight="bold" fontSize="md" >Peso</Text>
                                        <Input size="md" mb="3" value={updatePayload?.weight} onChange={(e)=>setUpdatePayload({...updatePayload, weight: parseInt(e.target.value)})} borderRadius="none" type="number" border="1px solid #d2d6de" />
                                        <Text fontFamily="Nunito" fontWeight="bold" fontSize="md" >Altura</Text>
                                        <Input size="md" value={updatePayload?.height} onChange={(e)=>setUpdatePayload({...updatePayload, height: e.target.value})} mb="3" borderRadius="none" type="number" border="1px solid #d2d6de" />
                                        <Text fontFamily="Nunito" fontWeight="bold" fontSize="md" >Objetivo</Text>
                                        <Select size="md" value={updatePayload?.objective} onChange={(e)=>setUpdatePayload({...updatePayload, objective: e.target.value})} mb="3" borderRadius="none" border="1px solid #d2d6de">
                                            <option value="Hipertrofia">Hipertrofia</option>
                                            <option value="Perda de peso">Perda de peso</option>
                                            <option value="Condicionamento">Condicionamento</option>
                                            <option value="Saúde">Saúde</option>
                                        </Select>
                                        <Text fontFamily="Nunito" fontWeight="bold" fontSize="md" >Plano</Text>
                                        <Select size="md" value={updatePayload?.plan} onChange={(e)=>setUpdatePayload({...updatePayload, plan: e.target.value})} mb="3" borderRadius="none" border="1px solid #d2d6de">
                                            {plans?.map((plan)=>(
                                                <option value={plan?.description}>{plan?.description}</option>
                                            ))}
                                        </Select>
                                        <Text fontFamily="Nunito" fontWeight="bold" fontSize="md" >Notas</Text>
                                        <Textarea mb="3" value={updatePayload?.notes} onChange={(e)=>setUpdatePayload({...updatePayload, notes: e.target.value})} />
                                        <Button isLoading={loading} onClick={updateProfile} bg="#3c8dbc" w="130px" borderRadius="none" color="white" fontSize="sm" fontFamily="Source Sans Pro" borderColor="#367fa9" >Editar</Button>
                                    </Flex>
                                </Flex>            
                            </TabPanel>
                            <TabPanel>
                                <Flex flexDirection="column" w="100%" >
                                    <Flex w="100%" justifyContent="flex-end" mb="3" >
                                        {!loading && <PDFDownloadLink fileName="Treino" document={<Pdf student={profile?.[0]?.name} data={workouts} />} >
                                            <Button bg="#dd4b39" borderRadius="3px" leftIcon={<CopyIcon color="white" />} border="1px solid #d73925" fontFamily="Nunito" color="white" >Exportar PDF</Button>
                                            </PDFDownloadLink>}
                                            <Button onClick={()=>setOpen(true)} ml="3" leftIcon={<AddIcon color="white" />} fontFamily="Nunito" borderRadius="0.25rem" color="white" boxShadow="0 1px 2px 0 rgb(0 0 0 / .05)" bg="rgb(99, 102, 241)" >Adicionar</Button>
                                    </Flex>
                                    <Flex mb="3" flexDirection="column" h="auto" bg="white" borderRadius="2px" w="100%" border="1px solid rgb(226, 232, 240)" >
                                        <Flex justifyContent="space-between" alignItems="center" w="100%" pl="4" pr="4" pt="4" borderBottom="1px solid #edf1f8" pb="3" >
                                            <Text fontSize="lg" fontWeight="bold" color="rgb(30, 41, 59)" fontFamily="Nunito" >Treino A</Text>
                                        </Flex>
                                        <Flex w="100%" height="auto" pl="3" pr="3" flexDirection="column" pt="3" pb="4"  >
                                                <Flex w="100%" borderRadius="2px" bg="rgb(248, 250, 252)" pl="2" h="34px" alignItems="center">
                                                    <Text fontSize="sm" fontWeight="bold" mr="25%" fontFamily="Nunito" color="rgb(148, 163, 184)" >Descrição</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="7" fontFamily="Nunito" color="rgb(148, 163, 184)" >Carga</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Repetições</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Séries</Text>
                                                </Flex>
                                            {workoutA?.map((workout)=>(
                                                <Flex w="100%" pl="3" pt="3" pb="3" alignItems="center" borderBottom="1px solid #edf1f8" >
                                                    <Text fontSize="sm" cursor="pointer" fontWeight="bold" w="33%" fontFamily="Nunito" color="rgb(30, 41, 59)" >{workout?.exercicie}</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="8%" fontFamily="Nunito" color="rgb(30, 41, 59)" >{workout?.load}</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="12%" fontFamily="Nunito" color="rgb(30, 41, 59)" >{workout?.repetitions}</Text>
                                                    <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" mr="7%" color="rgb(30, 41, 59)" >{workout?.series}</Text>
                                                    <Button fontFamily="Nunito" size="sm" color="white" mr="4" bg="#367fa9" onClick={()=>setWorkoutId(workout?.id)} border="1px solid #204d74" >Editar</Button>
                                                    <Button fontFamily="Nunito" onClick={()=>deleteWorkout(workout?.id)} size="sm" color="white" bg="#dd4b39" border="1px solid #d73925" >Excluir</Button>
                                                </Flex>
                                            ))}
                                        </Flex>
                                    </Flex>
                                    <Flex mb="3" flexDirection="column" h="auto" bg="white" borderRadius="2px" w="100%" border="1px solid rgb(226, 232, 240)" >
                                        <Flex justifyContent="space-between" alignItems="center" w="100%" pl="4" pr="4" pt="4" borderBottom="1px solid #edf1f8" pb="3" >
                                            <Text fontSize="lg" fontWeight="bold" color="rgb(30, 41, 59)" fontFamily="Nunito" >Treino B</Text>
                                        </Flex>
                                        <Flex w="100%" height="auto" pl="3" pr="3" flexDirection="column" pt="3" pb="4"  >
                                                <Flex w="100%" borderRadius="2px" bg="rgb(248, 250, 252)" pl="2" h="34px" alignItems="center">
                                                    <Text fontSize="sm" fontWeight="bold" mr="25%" fontFamily="Nunito" color="rgb(148, 163, 184)" >Descrição</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="7" fontFamily="Nunito" color="rgb(148, 163, 184)" >Carga</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Repetições</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Séries</Text>
                                                </Flex>
                                            {workoutB?.map((workout)=>(
                                                <Flex w="100%" pl="3" pt="3" pb="3" alignItems="center" borderBottom="1px solid #edf1f8" >
                                                    <Text fontSize="sm" cursor="pointer" fontWeight="bold" w="33%" fontFamily="Nunito" color="rgb(30, 41, 59)" >{workout?.exercicie}</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="8%" fontFamily="Nunito" color="rgb(30, 41, 59)" >{workout?.load}</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="12%" fontFamily="Nunito" color="rgb(30, 41, 59)" >{workout?.repetitions}</Text>
                                                    <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" mr="7%" color="rgb(30, 41, 59)" >{workout?.series}</Text>
                                                    <Button fontFamily="Nunito" size="sm" color="white" mr="4" bg="#367fa9" onClick={()=>setWorkoutId(workout?.id)} border="1px solid #204d74" >Editar</Button>
                                                    <Button fontFamily="Nunito" onClick={()=>deleteWorkout(workout?.id)} size="sm" color="white" bg="#dd4b39" border="1px solid #d73925" >Excluir</Button>
                                                </Flex>
                                            ))}
                                        </Flex>
                                    </Flex>
                                    <Flex mb="3" flexDirection="column" h="auto" bg="white" borderRadius="2px" w="100%" border="1px solid rgb(226, 232, 240)" >
                                        <Flex justifyContent="space-between" alignItems="center" w="100%" pl="4" pr="4" pt="4" borderBottom="1px solid #edf1f8" pb="3" >
                                            <Text fontSize="lg" fontWeight="bold" color="rgb(30, 41, 59)" fontFamily="Nunito" >Treino C</Text>
                                        </Flex>
                                        <Flex w="100%" height="auto" pl="3" pr="3" flexDirection="column" pt="3" pb="4"  >
                                                <Flex w="100%" borderRadius="2px" bg="rgb(248, 250, 252)" pl="2" h="34px" alignItems="center">
                                                    <Text fontSize="sm" fontWeight="bold" mr="25%" fontFamily="Nunito" color="rgb(148, 163, 184)" >Descrição</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="7" fontFamily="Nunito" color="rgb(148, 163, 184)" >Carga</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Repetições</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="8" fontFamily="Nunito" color="rgb(148, 163, 184)" >Séries</Text>
                                                </Flex>
                                            {workoutC?.map((workout)=>(
                                                <Flex w="100%" pl="3" pt="3" pb="3" alignItems="center" borderBottom="1px solid #edf1f8" >
                                                    <Text fontSize="sm" cursor="pointer" fontWeight="bold" w="33%" fontFamily="Nunito" color="rgb(30, 41, 59)" >{workout?.exercicie}</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="8%" fontFamily="Nunito" color="rgb(30, 41, 59)" >{workout?.load}</Text>
                                                    <Text fontSize="sm" fontWeight="bold" mr="12%" fontFamily="Nunito" color="rgb(30, 41, 59)" >{workout?.repetitions}</Text>
                                                    <Text fontSize="sm" fontWeight="bold" fontFamily="Nunito" w="7%" color="rgb(30, 41, 59)" >{workout?.series}</Text>
                                                    <Button fontFamily="Nunito" size="sm" color="white" mr="4" bg="#367fa9" onClick={()=>setWorkoutId(workout?.id)} border="1px solid #204d74" >Editar</Button>
                                                    <Button fontFamily="Nunito" onClick={()=>deleteWorkout(workout?.id)} size="sm" color="white" bg="#dd4b39" border="1px solid #d73925" >Excluir</Button>
                                                </Flex>
                                            ))}
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Flex>
            <Modal isOpen={open} size="xl" onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Adicionar exercício</ModalHeader>
                        <ModalCloseButton onClick={()=>setOpen(false)} />
                        <ModalBody>
                            <Flex flexDirection="column" w="100%" h="auto" >
                                <Flex w="100%" justifyContent="space-between" >
                                    <Flex flexDirection="column" w="250px" justifyContent="flex-start" >
                                        <Text fontSize="lg" >Descrição</Text>
                                        <Input type="text" size="lg" value={workoutPayload?.exercicie} onChange={(e)=>setWorkoutPayload({...workoutPayload, exercicie: e.target.value})} />
                                    </Flex>
                                    <Flex flexDirection="column" w="250px" justifyContent="flex-start" >
                                        <Text fontSize="lg" >Peso</Text>
                                        <Input size="lg" value={workoutPayload?.load} onChange={(e)=>setWorkoutPayload({...workoutPayload, load: parseInt(e.target.value)})} type="number" />
                                    </Flex>
                                </Flex>
                                <Flex w="100%" mt="7" justifyContent="space-between" >
                                    <Flex flexDirection="column" w="250px" justifyContent="flex-start" >
                                        <Text fontSize="lg" >Repetições</Text>
                                        <Input size="lg" value={workoutPayload?.repetitions} onChange={(e)=>setWorkoutPayload({...workoutPayload, repetitions: parseInt(e.target.value)})} type="number" />
                                    </Flex>
                                    <Flex flexDirection="column" w="250px" justifyContent="flex-start" >
                                        <Text fontSize="lg" >Séries</Text>
                                        <Input size="lg" value={workoutPayload?.series} onChange={(e)=>setWorkoutPayload({...workoutPayload, series: parseInt(e.target.value)})} type="number" />
                                    </Flex>
                                </Flex>
                                <Flex w="100%" mt="7" justifyContent="space-between" >
                                <Flex flexDirection="column" w="250px" justifyContent="flex-start" >
                                        <Text fontSize="lg" >Separação</Text>
                                        <Select size="lg" value={workoutPayload?.separation} onChange={(e)=>setWorkoutPayload({...workoutPayload, separation: e.target.value})} >
                                                <option value="a">A</option>
                                                <option value="b">B</option>
                                                <option value="c">C</option>
                                        </Select>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={createWorkout} isLoading={loading} colorScheme='blue'>
                            Adicionar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Modal isOpen={updateModal} size="xl" onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Editar exercício</ModalHeader>
                        <ModalCloseButton onClick={()=>setUpdateModal(false)} />
                        <ModalBody>
                            <Flex flexDirection="column" w="100%" h="auto" >
                                <Flex w="100%" justifyContent="space-between" >
                                    <Flex flexDirection="column" w="250px" justifyContent="flex-start" >
                                        <Text fontSize="lg" >Descrição</Text>
                                        <Select size="lg" value={workout?.exercicie} onChange={(e)=>setWorkout({...workout, exercicie: e.target.value})} >
                                            {exercicies?.map((exercicie)=>(
                                                <option value={exercicie?.description}>{exercicie?.description}</option>
                                            ))}
                                        </Select>
                                    </Flex>
                                    <Flex flexDirection="column" w="250px" justifyContent="flex-start" >
                                        <Text fontSize="lg" >Peso</Text>
                                        <Input size="lg" value={workout?.load} onChange={(e)=>setWorkout({...workout, load: parseInt(e.target.value)})} type="number" />
                                    </Flex>
                                </Flex>
                                <Flex w="100%" mt="7" justifyContent="space-between" >
                                    <Flex flexDirection="column" w="250px" justifyContent="flex-start" >
                                        <Text fontSize="lg" >Repetições</Text>
                                        <Input size="lg" value={workout?.repetitions} onChange={(e)=>setWorkout({...workout, repetitions: parseInt(e.target.value)})} type="number" />
                                    </Flex>
                                    <Flex flexDirection="column" w="250px" justifyContent="flex-start" >
                                        <Text fontSize="lg" >Séries</Text>
                                        <Input size="lg" value={workout?.series} onChange={(e)=>setWorkout({...workout, series: parseInt(e.target.value)})} type="number" />
                                    </Flex>
                                </Flex>
                                <Flex w="100%" mt="7" justifyContent="space-between" >
                                <Flex flexDirection="column" w="250px" justifyContent="flex-start" >
                                        <Text fontSize="lg" >Separação</Text>
                                        <Select size="lg" value={workout?.separation} onChange={(e)=>setWorkout({...workout, separation: e.target.value})} >
                                                <option value="a">A</option>
                                                <option value="b">B</option>
                                                <option value="c">C</option>
                                        </Select>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={updateWorkout} isLoading={loading} colorScheme='blue'>
                            Editar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Modal isOpen={deleteSubModal} size="sm" onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Deseja excluir o cadastro?</ModalHeader>
                        <ModalCloseButton onClick={()=>setDeleteSubModal(false)} />
                        <ModalBody>
                        </ModalBody>

                        <ModalFooter display="flex" justifyContent="center" >
                            <Button onClick={deleteSub} size="lg" isLoading={loading} colorScheme='red'>
                            Excluir
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
          </Flex>
      </Dashboard>
  );
}

export default Perfil;