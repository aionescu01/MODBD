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

// Location Management Component
export const LocationManagementw = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/warehouse/dimLocatie');
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  return (
    <div>
    <Header/>
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Management Locații
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cod Locație</TableCell>
                <TableCell>Localitate</TableCell>
                <TableCell>Județ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.cod_locatie}>
                  <TableCell>{location.cod_locatie}</TableCell>
                  <TableCell>{location.localitate}</TableCell>
                  <TableCell>{location.judet}</TableCell>
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

// Time Management Component
export const TimeManagementw = () => {
  const [timeRecords, setTimeRecords] = useState([]);

  useEffect(() => {
    fetchTimeRecords();
  }, []);

  const fetchTimeRecords = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/warehouse/dimTimp');
      const data = await response.json();
      setTimeRecords(data);
    } catch (error) {
      console.error('Error fetching time records:', error);
    }
  };

  return (
    <div>
    <Header/>
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Management Timp
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cod Timp</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>An</TableCell>
                <TableCell>Luna</TableCell>
                <TableCell>Nume Luna</TableCell>
                <TableCell>Trimestru</TableCell>
                <TableCell>Ziua</TableCell>
                <TableCell>Ziua Săptămânii</TableCell>
                <TableCell>Nume Zi</TableCell>
                <TableCell>Este Weekend</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timeRecords.map((record) => (
                <TableRow key={record.cod_timp}>
                  <TableCell>{record.cod_timp}</TableCell>
                  <TableCell>{new Date(record.data).toLocaleDateString()}</TableCell>
                  <TableCell>{record.anul}</TableCell>
                  <TableCell>{record.luna}</TableCell>
                  <TableCell>{record.nume_luna}</TableCell>
                  <TableCell>{record.trimestru}</TableCell>
                  <TableCell>{record.ziua}</TableCell>
                  <TableCell>{record.ziua_saptamanii}</TableCell>
                  <TableCell>{record.nume_zi}</TableCell>
                  <TableCell>{record.este_weekend ? 'Da' : 'Nu'}</TableCell>
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