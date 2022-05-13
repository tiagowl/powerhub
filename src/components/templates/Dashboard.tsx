import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../organisms/Navbar';
import Sidebar from '../organisms/Sidebar';

// import { Container } from './styles';

const Dashboard = ({children}) => {
  return(
    <Flex h="100%" >
        <Sidebar/>
        <Flex w="100%" flexDirection="column" >
            <Navbar/>
            <Flex w="100%" pl="7" pt="7" pr="7" flexDirection="column" h="100%" bg="#F1F5F9" >
                {children}
            </Flex>
        </Flex>
    </Flex> 
  );
}

export default Dashboard;