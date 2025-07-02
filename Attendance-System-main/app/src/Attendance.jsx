import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  Text,
  HStack,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState('BCA');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3002/api/attendance/classwise/${selectedClass}`);
        console.log("Fetched students:", data); // Debug line
        setStudents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]);
      }
    };

    fetchStudents();
  }, [selectedClass]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const submitAttendance = async () => {
    console.log("Submitting attendance:", attendance);
    console.log("Date:", date);
    try {
      await axios.post('http://localhost:3002/api/attendance/mark', {
        attendanceData: attendance,
        date: date,
      });
      alert('Attendance submitted successfully');
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert('Failed to submit attendance');
    }
  };

  return (
    <Box minHeight="100vh" bgGradient="linear(to-r, teal.400, blue.400)" p={8}>
      <Container maxW="container.md" centerContent>
        <Box
          p={8}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="md"
          bg="white"
          width="100%"
        >
          <Heading as="h1" mb={6} textAlign="center">
            Mark Attendance for {selectedClass} - {date}
          </Heading>

          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Select Date</FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Select Class</FormLabel>
              <Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="BSc">BSc</option>
                <option value="MSc">MSc</option>
              </Select>
            </FormControl>

            <Box>
              {students.length > 0 ? (
                students.map((student) => {
                  const studentId = student._id || student.id || student.studentId;
                  if (!studentId) return null;

                  return (
                    <HStack
                      key={studentId}
                      spacing={4}
                      align="center"
                      p={3}
                      borderBottom="1px"
                      borderColor="gray.200"
                    >
                      <Text flex={1}>
                        {student.studentName} - {student.rollNumber}
                      </Text>

                      <RadioGroup
                        onChange={(value) => handleAttendanceChange(studentId, value)}
                        value={attendance[studentId] || ''}
                      >
                        <HStack spacing={4}>
                          <Radio value="Present">Present</Radio>
                          <Radio value="Absent">Absent</Radio>
                        </HStack>
                      </RadioGroup>
                    </HStack>
                  );
                })
              ) : (
                <Text>No students found</Text>
              )}
            </Box>

            <Button colorScheme="blue" onClick={submitAttendance}>
              Submit Attendance
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default AttendancePage;
