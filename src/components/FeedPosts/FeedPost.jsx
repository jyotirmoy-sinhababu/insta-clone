import { Box, Image } from '@chakra-ui/react';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

const FeedPost = () => {
  return (
    <>
      <PostHeader>
        <Box>
          <Image src='/img1' alt=' user profile pic' />
        </Box>
      </PostHeader>
      <PostFooter />
    </>
  );
};

export default FeedPost;
