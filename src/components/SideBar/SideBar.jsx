import { Avatar, Box, Button, Flex, Link, Tooltip } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
  CreatePostLogo,
  InstagramLogo,
  InstagramMobileLogo,
  NotificationsLogo,
  SearchLogo,
} from '../../assets/Constants';

import { AiFillHome } from 'react-icons/ai';
import { RiLogoutBoxLine } from 'react-icons/ri';

import useLogout from '../../hooks/useLogout';

import { useSelector } from 'react-redux';

const SideBar = () => {
  const authUser = useSelector((state) => state.auth.user);

  const sidebarItems = [
    { icon: <AiFillHome size={25} />, text: 'Home', link: '/' },
    { icon: <SearchLogo />, text: 'Search' },
    { icon: <NotificationsLogo />, text: 'Notifications' },
    { icon: <CreatePostLogo />, text: 'Create' },
    {
      icon: <Avatar size={'sm'} name='tunir ma' src='/profilepic.png' />,
      text: 'Profile',
      link: '/authUser',
    },
  ];

  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <Box
      height={'100vh'}
      borderRight={'1px solid'}
      borderColor={'whiteAlpha.300'}
      py={8}
      position={'sticky'}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={'column'} gap={10} w='full' height={'full'}>
        <Link
          to={'/'}
          as={RouterLink}
          pl={2}
          display={{ base: 'none', md: 'block' }}
          cursor='pointer'
        >
          <InstagramLogo />
        </Link>
        <Link
          to={'/'}
          as={RouterLink}
          p={2}
          display={{ base: 'block', md: 'none' }}
          borderRadius={6}
          _hover={{
            bg: 'whiteAlpha.200',
          }}
          w={{ base: 10 }}
          cursor='pointer'
        >
          <InstagramMobileLogo />
        </Link>
        <Flex direction={'column'} gap={5} cursor={'pointer'}>
          {sidebarItems.map((item, index) => {
            return (
              <Tooltip
                key={index}
                hasArrow
                label={item.text}
                placement='right'
                ml={1}
                openDelay={500}
                display={{ base: 'block', md: 'none' }}
              >
                <Link
                  display={'flex'}
                  to={item.link || null}
                  as={RouterLink}
                  alignItems={'center'}
                  gap={4}
                  _hover={{ bg: 'whiteAlpha.400' }}
                >
                  {item.icon}
                  <Box display={{ base: 'none', md: 'block' }}>{item.text}</Box>
                </Link>
              </Tooltip>
            );
          })}
        </Flex>
        <Tooltip
          hasArrow
          label={'Logout'}
          placement='right'
          ml={1}
          openDelay={500}
          display={{ base: 'block', md: 'none' }}
        >
          <Flex
            onClick={handleLogout}
            display={'flex'}
            to={'/auth'}
            as={RouterLink}
            alignItems={'center'}
            gap={4}
            _hover={{ bg: 'whiteAlpha.400' }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: 'full' }}
            mt={'auto'}
            justifyContent={{ base: 'center', md: 'flex-start' }}
          >
            <RiLogoutBoxLine size={25} />
            <Button
              display={{ base: 'none', md: 'block' }}
              variant={'ghost'}
              _hover={{ bg: 'transparent' }}
              isLoading={isLoggingOut}
            >
              Logout
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default SideBar;
