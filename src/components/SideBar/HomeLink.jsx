import { AiFillHome } from 'react-icons/ai';

const HomeLink = () => {
  return (
    <>
      {' '}
      <Tooltip
        hasArrow
        label={'Home'}
        placement='right'
        ml={1}
        openDelay={500}
        display={{ base: 'block', md: 'none' }}
      >
        <Link
          display={'flex'}
          to={'/'}
          as={RouterLink}
          alignItems={'center'}
          gap={4}
          _hover={{ bg: 'whiteAlpha.400' }}
        >
          <AiFillHome size={25} />
          <Box display={{ base: 'none', md: 'block' }}>Home</Box>
        </Link>
      </Tooltip>
    </>
  );
};

export default HomeLink;
