import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, Heading, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3002/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/attend');
    } catch (error) {
      setMessage('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Box minHeight="100vh" bgGradient="linear(to-r, teal.400, blue.400)" p={8}>
      <Container maxW="md" centerContent >
        <Box p={8} borderWidth={1} borderRadius="lg" boxShadow="md" bg="white" width="100%" maxW="400px"
       bgGradient="linear(to-r, orange.400, yellow.400)"

>
          <Heading as="h1" mb={6} textAlign="center">Login</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" mb={4}><FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} isRequired autoComplete="email" />
            </FormControl>
            <FormControl id="password" mb={4}><FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} isRequired autoComplete="current-password" />
            </FormControl>
            <Button colorScheme="blue" type="submit" width="full">Login</Button>
            
          </form>
          {message && <Text color="red.500" mt={4} textAlign="center">{message}</Text>}
          <p>Create an account <Link to='/' style={{ textDecoration: "underline", color: "blue" }}>Register</Link></p>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
