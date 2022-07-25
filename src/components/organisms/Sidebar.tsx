import { CalendarIcon, RepeatClockIcon, TimeIcon } from '@chakra-ui/icons';
import { Avatar, background, Circle, Flex, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiUsers } from "react-icons/hi";
import { CgGym } from "react-icons/cg";
import api from '../../services/api';
import { Gym } from '../../global/interfaces';

// import { Container } from './styles';

const Sidebar = () => {

    const router = useRouter();
    const [gym, setGym] = useState<Gym>();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchGymData();
    }, []);

    const fetchGymData = async () => {
        try{
            const response = await api.get("/rest/v1/gyms", {
                params:{
                    id: `eq.${JSON.parse(sessionStorage.getItem("gym"))}`,
                    select: "*"
                }
            })
            if(response?.status === 200){
                setGym(response?.data[0]);
                setLoading(false);
            }
        }catch(err){

        }
    }

  return (
    <Flex bg="#1E293B" w="270px" minH="100vh" maxH="100%" flexDirection="column" >
        <Flex w="100%" h="57px" bg="#2d3643" justifyContent="center" alignItems="center" >
            <Flex mt="1" >  
                <Text fontSize="2xl" fontFamily="Source Sans Pro" color="white" fontWeight="bold" >Power</Text>
                <Text fontSize="2xl" fontFamily="Source Sans Pro" color="white" fontWeight="200" >HUB</Text>
            </Flex>
        </Flex>
        {loading ? <Spinner mt="4" mb="4" ml="100px" color="white" /> : 
        <Flex w="100%" h="auto" mb="4" alignItems="center" pl="5" pt="5" pb="1" >
            <Avatar size="sm" mr="3" />
            <Text fontSize="sm" fontFamily="Nunito" color="white" fontWeight="bold" >{gym?.name}</Text>
        </Flex>}
        <Text bg="#161e2b" pt="2" pb="2" fontSize="xs" pl="5" color="#64748B" >PAGES</Text>
        <Flex cursor="pointer" pl="5" pt="3.5" pb="3.5" onClick={()=>router.push("/main")} _hover={{backgroundColor: "#161e2b"}} alignItems="center" >
            <TimeIcon color="#6c83a7" mr="3" />
            <Text fontSize="sm" color="white" fontWeight="bold" fontFamily="Nunito" >Dashboard</Text>
        </Flex>
        <Flex pl="5" cursor="pointer" onClick={()=>router.push("/main/cadastros")} pt="3.5" pb="3.5" _hover={{backgroundColor: "#161e2b"}} alignItems="center" >
            <HiUsers color="#6c83a7" style={{marginRight: "10px"}} />
            <Text fontSize="sm" color="white" fontWeight="bold" fontFamily="Nunito" >Cadastros</Text>
        </Flex>
        <Flex pl="5" cursor="pointer" onClick={()=>router.push("/main/planos")} pt="3.5" pb="3.5" _hover={{backgroundColor: "#161e2b"}} alignItems="center" >
            <CalendarIcon color="#6c83a7" mr="10px" />
            <Text fontSize="sm" color="white" fontWeight="bold" fontFamily="Nunito" >Planos</Text>
        </Flex>
    </Flex>
  ); 
}

export default Sidebar;