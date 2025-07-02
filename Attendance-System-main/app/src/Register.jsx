import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Button, FormControl, FormLabel,
  Input, Heading, VStack, useToast,
  Container
} from '@chakra-ui/react';
import axios from 'axios';

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({ title: 'Passwords do not match', status: 'error', duration: 3000, isClosable: true });
      return;
    }

    try {
      const res = await axios.post('http://localhost:3002/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast({ title: 'Registration successful!', status: 'success', duration: 3000, isClosable: true });
      navigate('/login');
    } catch (error) {
      toast({ title: 'Registration failed.', description: error.response?.data?.message || error.message, status: 'error', duration: 3000, isClosable: true });
    }
  };

  return (
   <Box minHeight="100vh" bgGradient="linear(to-r, teal.00, blue.300)" p={8}>
    <Container maxW="400px" mx="auto" mt="8" p="6" boxShadow="lg" 
   bgGradient="linear(to-r, orange.400, yellow.400)"

     borderRadius="md">
      <Heading mb="6" textAlign="center">Teacher Registration</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl isRequired><FormLabel>Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} autoComplete="name" />
          </FormControl>
          <FormControl isRequired><FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" />
          </FormControl>
          <FormControl isRequired><FormLabel>Password</FormLabel>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password" />
          </FormControl>
          <FormControl isRequired><FormLabel>Confirm Password</FormLabel>
            <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">Register</Button>
          <p>Already registered? <Link to='/login' style={{ color: 'blue', textDecoration: 'underline' }}>Login</Link></p>
        </VStack>
      </form>
    </Container>
    </Box>
  );
};

export default Register;
