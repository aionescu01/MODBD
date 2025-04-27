import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Container
} from '@mui/material';

const EmployeeWare = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/warehouse/dimAngajat');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  return (
    <div>
    <Header/>
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Management Angajați
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Hire Date</TableCell>
                <TableCell>Salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.cod_angajat}>
                  <TableCell>{employee.cod_angajat}</TableCell>
                  <TableCell>{employee.nume_angajat}</TableCell>
                  <TableCell>{employee.tip_angajat}</TableCell>
                  <TableCell>{new Date(employee.data_angajare).toLocaleDateString()}</TableCell>
                  <TableCell>{new Intl.NumberFormat('ro-RO', {
                    style: 'currency',
                    currency: 'RON'
                  }).format(employee.salariu)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
    <Footer/>
    </div>
  );
};

export default EmployeeWare;