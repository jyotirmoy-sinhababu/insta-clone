import { Box, Flex } from '@chakra-ui/react';
import SideBar from '../../components/SideBar/SideBar';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBar from '../../components/navbar/NavBar';

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const authState = useSelector((state) => state.auth.user);

  const canRenderSidebar = pathname !== '/auth' && authState;
  const canRenderNavbar = !authState && pathname !== '/auth';

  return (
    <Flex flexDir={canRenderNavbar ? 'column' : 'row'}>
      {canRenderSidebar ? (
        <Box w={{ base: '70px', md: '240px' }}>
          <SideBar />
        </Box>
      ) : null}

      {canRenderNavbar ? <NavBar /> : null}

      <Box flex={1} w={{ base: 'calc(100%-70px)', md: 'calc(100%-240px)' }}>
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;
