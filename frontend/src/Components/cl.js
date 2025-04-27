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

const ClientManagementw = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/warehouse/dimClient');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  return (
    <div>
    <Header/>
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Management Clienți
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cod Client</TableCell>
                <TableCell>Nume Client</TableCell>
                <TableCell>Notă Client</TableCell>
                <TableCell>Apelativ</TableCell>
                <TableCell>Data Nașterii</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.cod_client}>
                  <TableCell>{client.cod_client}</TableCell>
                  <TableCell>{client.nume_client}</TableCell>
                  <TableCell>{client.nota_client}</TableCell>
                  <TableCell>{client.apelativ}</TableCell>
                  <TableCell>{new Date(client.data_nastere).toLocaleDateString()}</TableCell>
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

export default ClientManagementw;