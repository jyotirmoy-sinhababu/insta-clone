import {
  Flex,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

import {
  NotificationsLogo,
  UnlikeLogo,
  CommentLogo,
} from '../../assets/Constants';

import { useSelector } from 'react-redux';

import usePostComment from '../../hooks/usePostComment';
import useLikeOrUnlike from '../../hooks/useLikeOrUnlike';
import CommentModal from '../Modals/CommentModal';
import { timeStamp } from '../../utils/timeStamp';

const PostFooter = ({ post, isProfilePage, createProfile }) => {
  const [comment, setComment] = useState('');

  const { isCommenting, handleComment } = usePostComment();
  const { isLiked, likesCount, handleLikePost } = useLikeOrUnlike(post);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const commentRef = useRef(null);
  const authUser = useSelector((state) => state.auth.user);

  const handleSubmitComment = async () => {
    if (post.id && comment.length > 0) await handleComment(post.id, comment);
    setComment('');
  };

  return (
    <Box mb={10} marginTop={'auto'}>
      <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={'pointer'} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>

        <Box
          cursor={'pointer'}
          fontSize={18}
          onClick={() => commentRef.current.focus()}
        >
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={'sm'}>
        {likesCount} likes
      </Text>

      {isProfilePage && (
        <Text fontSize='12' color={'gray'}>
          Posted {timeStamp(post.createdAt)}
        </Text>
      )}

      {!isProfilePage && (
        <>
          <Text fontSize='sm' fontWeight={700}>
            {createProfile?.username}{' '}
            <Text as='span' fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text
              fontSize='sm'
              color={'gray'}
              cursor={'pointer'}
              onClick={onOpen}
            >
              View all {post.comments.length} comments
            </Text>
          )}
          {/* COMMENTS MODAL ONLY IN THE HOME PAGE */}
          {isOpen ? (
            <CommentModal isOpen={isOpen} onClose={onClose} post={post} />
          ) : null}
        </>
      )}

      {authUser && (
        <Flex
          alignItems={'center'}
          gap={2}
          justifyContent={'space-between'}
          w={'full'}
        >
          <InputGroup>
            <Input
              variant={'flushed'}
              placeholder={'Add a comment...'}
              fontSize={14}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
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
      )}
    </Box>
  );
};

export default PostFooter;
