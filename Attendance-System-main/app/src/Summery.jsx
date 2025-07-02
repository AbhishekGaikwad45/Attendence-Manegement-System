import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Heading,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
  VStack,
} from '@chakra-ui/react';

const ClasswiseAttendance = () => {
  const [className, setClassName] = useState('BCA'); 
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3002/api/attendance/classwise/${className}`);

        if (Array.isArray(data)) {
          setAttendanceData(data);
        } else {
          console.error('Unexpected data format:', data);
          setAttendanceData([]);
        }
      } catch (error) {
        console.error('Error fetching class-wise attendance:', error);
        setAttendanceData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [className]);

  return (
    <Container maxW="container.lg" p={4} minHeight="100vh"
      bgGradient="linear(to-r, teal.400, blue.400)">
      <VStack spacing={6} align="stretch" mb={8}>
        <Heading as="h1" size="lg" textAlign="center">
          Class-wise Attendance Percentage for {className}
        </Heading>

        {/* Dropdown to select class */}
        <Box>
          <Select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Select Class"
            size="lg"
            bg="white"
            borderColor="gray.300"
          >
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="BSc">BSc</option>
            <option value="MSc">MSc</option>
            {/* Add more classes as needed */}
          </Select>
        </Box>

        {/* Displaying data */}
        {loading ? (
          <Box textAlign="center">
            <Spinner size="lg" color="blue.500" />
            <Text mt={4}>Loading...</Text>
          </Box>
        ) : (
          <Box bg="white" p={4} borderRadius="md" boxShadow="md">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Roll Number</Th>
                  <Th>Attendance Percentage</Th>
                </Tr>
              </Thead>
              <Tbody>
                {attendanceData.length > 0 ? (
                  attendanceData.map((student) => (
                    <Tr key={student.rollNumber}>
                      <Td>{student.studentName}</Td>
                      <Td>{student.rollNumber}</Td>
                      <Td>{student.percentage}%</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan="3">No data found</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default ClasswiseAttendance;
