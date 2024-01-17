import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';
import { FaLinkedin } from 'react-icons/fa6';

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
          >
            See All
          </Text>
        </Flex>
      )}
      {suggestedUser?.map((user) => {
        return <SuggestedUser user={user} key={user.id} />;
      })}
      <Box
        fontSize={12}
        color={'grey.500'}
        mt={5}
        alignSelf={'start'}
        display={'flex'}
        alignItems={'center'}
        gap={'2'}
      >
        2024 Built By
        <Link
          href='https://www.linkedin.com/in/jyotirmoy-sinhababu-64b9a7212?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
          target='_blank'
          color='blue.500'
          fontSize={14}
          display={'flex'}
          alignItems={'center'}
          gap={'2'}
        >
          <FaLinkedin />
          Jyotirmoy Sinhababu
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
