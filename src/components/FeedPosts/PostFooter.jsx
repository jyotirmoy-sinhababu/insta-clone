import {
  Flex,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import {
  NotificationsLogo,
  UnlikeLogo,
  CommentLogo,
} from '../../assets/Constants';

import usePostComment from '../../hooks/usePostComment';
import useLikeOrUnlike from '../../hooks/useLikeOrUnlike';

const PostFooter = ({ post, isProfilePage }) => {
  const [likes, setLikes] = useState(1000);
  const [comment, setComment] = useState('');

  const { isCommenting, handleComment } = usePostComment();
  const { isLiked, likesCount, handleLikePost } = useLikeOrUnlike(post?.id);

  const handleSubmitComment = async () => {
    if (post.id && comment.length > 0) await handleComment(post.id, comment);
    setComment('');
  };

  return (
    <Box mb={10}>
      <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={2}>
        <Box onClick={handleLikePost} cursor={'pointer'} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box cursor={'pointer'} fontSize={18}>
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={'sm'}>
        {likesCount} likes
      </Text>
      <Text fontSize='sm' fontWeight={700}>
        developer_
        <Text as='span' fontWeight={400}>
          Feeling good
        </Text>
      </Text>
      <Text fontSize='sm' color={'grey'}>
        View all 1,000 comments
      </Text>
      <Flex
        alignItems={'center'}
        gap={2}
        justifyContent={'space-between'}
        w={'full'}
      >
        <InputGroup>
          <Input
            variant={'flushed'}
            placeContent={'Add a comment...'}
            fontSize={14}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          />
          <InputRightElement>
            <Button
              fontSize={14}
              color={'blue.500'}
              fontWeight={600}
              cursor={'pointer'}
              _hover={{ color: 'white' }}
              bg={'transparent'}
              onClick={handleSubmitComment}
              isLoading={isCommenting}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default PostFooter;
