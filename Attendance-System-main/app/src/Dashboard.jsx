import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Flex,
  Heading,
  Button,
  
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';

const Dashboard = () => {
  // Use a column layout on mobile, row layout on larger screens
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container maxW="100%" p={4}>
      {/* Navbar */}
      <Flex
        as="nav"
        bg="blue.500"
        color="white"
        p={4}
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}
        justify="space-between"
        mb={8}
        borderRadius="md"
        gap={4}
      >
        <Heading as="h1" size="lg" color="white">
          Admin Dashboard
        </Heading>

        <Stack
          direction={{ base: 'column', sm: 'row', md: 'row' }}
          spacing={isMobile ? 2 : 4}
          width={{ base: '100%', md: 'auto' }}
        >
          <Button as={Link} to="/Students" colorScheme="white" variant="outline">
            Add Student
          </Button>
          <Button as={Link} to="/attend" colorScheme="white" variant="outline">
            Mark Attendance
          </Button>
          <Button as={Link} to="/summery" colorScheme="white" variant="outline" >
             Attendance Summary
          </Button>
          <Button as={Link} to="/login" colorScheme="red">
            Logout
          </Button>
        </Stack>
      </Flex>

      {/* Additional content can be added below */}
    </Container>
  );
};

export default Dashboard;
