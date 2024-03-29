import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

import SuggestedUser from './SuggestedUser';
import SuggestedHeader from './SuggestedHeader';

import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers';

const SuggestedUsers = () => {
  const { isLoading, suggestedUser } = useGetSuggestedUsers();

  if (isLoading) {
    return null;
  }

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      {suggestedUser.length !== 0 && (
        <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
          <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
            Suggested for you
          </Text>
          <Text
            fontSize={12}
            fontWeight={'bold'}
            _hover={{ color: 'gray.400' }}
            cursor={'pointer'}
            display={{ base: 'none', lg: 'block' }}
          >
            See All
          </Text>
        </Flex>
      )}
      <Box display={{ base: 'flex', lg: ' block' }}>
        {suggestedUser?.map((user) => {
          return (
            <Box key={user.id} mt={5}>
              <SuggestedUser user={user} />
            </Box>
          );
        })}
      </Box>

      <Box
        fontSize={12}
        color={'grey.500'}
        mt={5}
        alignSelf={'start'}
        display={{ base: 'none', lg: 'flex' }}
        alignItems={'center'}
        gap={'2'}
      >
        2024 Built By
        <Link
          href='https://github.com/jyotirmoy-sinhababu'
          target='_blank'
          color='blue.500'
          fontSize={14}
          display={'flex'}
          alignItems={'center'}
          gap={'2'}
        >
          <FaGithub />
          Jyotirmoy Sinhababu
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
