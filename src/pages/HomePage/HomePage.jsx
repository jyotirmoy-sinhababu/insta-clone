import { Container, Flex, Box } from '@chakra-ui/react';

import FeedPosts from '../../components/FeedPosts/FeedPosts';
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers';

const HomePage = () => {
  return (
    <Container maxW={'container.lg'}>
      <Flex
        gap={{ base: 5, lg: 20 }}
        flexDir={{ base: 'column-reverse', lg: 'row' }}
      >
        <Box flex={2} py={10}>
          <FeedPosts />
        </Box>
        <Box flex={3} mr={20} display={'block'} maxW={'300px'}>
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
