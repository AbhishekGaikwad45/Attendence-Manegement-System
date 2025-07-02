// App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

// Import your components/pages
import Dashboard from './Dashboard';
import AttendancePage from './Attendance';
import Summery from './Summery';
import Register from './Register';
import Login from './Login';
import Student from './assets/Student';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<Student />} />
          <Route
            path="/attend"
            element={
              <>
             
                <Dashboard />
                <AttendancePage />
                 
              </>
            }
          />
          <Route
            path="/summery"
            element={
              <>
                <Dashboard />
                <Summery />
                
              </>
            }
          />
          <Route
  path="/students"
  element={
    <>
      <Dashboard />
      <Student />
    </>
  }
/>

        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
