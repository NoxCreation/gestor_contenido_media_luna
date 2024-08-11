import React, { useEffect } from 'react';
import pluginId from '../../pluginId';
import {
  Flex,
} from '@chakra-ui/react'
import { CardInfo } from '../../components/CardInfo';


const HomePage = () => {
  useEffect(() => {
    
  }, [])

  return (
    <Flex p="10" gap="5">
      <CardInfo />
      <CardInfo />
    </Flex>

  );
};

export default HomePage;
