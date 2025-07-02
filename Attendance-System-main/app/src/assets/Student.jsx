import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';

const StudentForm = () => {
  const toast = useToast();

  const [studentData, setStudentData] = useState({
    name: '',
    rollNumber: '',
    className: '',
  });

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your backend API
      const res = await axios.post('http://localhost:3002/api/students/registerStudent', studentData);
      toast({
        title: 'Student Registered',
        description: 'Student data saved successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      console.log(res.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="8" p="6" boxShadow="lg" borderRadius="md">
      <Heading mb="6" textAlign="center" size="lg">
        Student Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={studentData.name}
              onChange={handleChange}
              placeholder="Enter student name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Roll No</FormLabel>
            <Input
              type="text"
              name="rollNumber"
              value={studentData.rollNumber}
              onChange={handleChange}
              placeholder="Enter roll number"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Class</FormLabel>
            {/* <Input
              type="text"
              name="className"
              value={studentData.className}
              onChange={handleChange}
              placeholder="Enter class (e.g. BCA)"
            /> */}
          
           <Select
              type="text"
              name="className"
              value={studentData.className}
              onChange={handleChange}

          >
             <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="BSc">BSc</option>
            <option value="MSc">MSc</option>
          </Select> 
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Submit
          </Button>
          {/* <p>Teacher Login Here   <Link to='/' style={{color:'blue',textDecoration:'underline'}}>Login</Link></p> */}
        </VStack>
      </form>
    </Box>
  );
};

export default StudentForm;
