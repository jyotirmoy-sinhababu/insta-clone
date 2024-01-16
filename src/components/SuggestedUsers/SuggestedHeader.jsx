import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import useLogout from '../../hooks/useLogout';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

const SuggestedHeader = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useSelector((state) => state.auth.user);

  if (!authUser) return null;

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`${authUser.userName}`}>
          <Avatar size={'lg'} src={authUser.profilePicURL} />
        </Link>
        <Link to={`${authUser.userName}`}>
          <Text fontSize={12} fontWeight={'bold'}>
            {authUser.userName}
          </Text>
        </Link>
      </Flex>
      <Button
        size={'xs'}
        background={'transparent'}
        _hover={{ background: 'transparent' }}
        fontSize={14}
        fontWeight={'medium'}
        color={'blue.400'}
        onClick={handleLogout}
        isLoading={isLoggingOut}
        cursor={'pointer'}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default SuggestedHeader;
