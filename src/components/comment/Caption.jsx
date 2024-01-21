import { Avatar, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { timeStamp } from '../../utils/timeStamp';
import { useSelector } from 'react-redux';

const Caption = ({ post }) => {
  const userProfile = useSelector((state) => state.profile.userProfile);

  return (
    <Flex gap={4}>
      <Link to={`/${userProfile.userName}`}>
        <Avatar src={userProfile.profilePicURL} size={'sm'} />
      </Link>
      <Flex direction={'column'}>
        <Flex gap={2} alignItems={'center'}>
          <Text fontWeight={'bold'} fontSize={12}>
            {userProfile.userName}
          </Text>
          <Text fontSize={14}>{post.caption}</Text>
        </Flex>
        <Text fontSize={12} color={'gray'}>
          {timeStamp(post.createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Caption;
