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

// Car Management Component
export const CarManagementw = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/warehouse/dimMasina');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  return (
    <div>
    <Header/>
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Management Mașini
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cod Mașină</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Data Achiziționare</TableCell>
                <TableCell>Data Următoare Revizie</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.cod_masina}>
                  <TableCell>{car.cod_masina}</TableCell>
                  <TableCell>{car.marca}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{new Date(car.data_achizitionare).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(car.data_revizie_urm).toLocaleDateString()}</TableCell>
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

// Ride Management Component
export const RideManagementw = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/warehouse/FCursa');
      const data = await response.json();
      setRides(data);
    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  };

  return (
    <div>
    <Header/>
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Management Curse
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cod Cursă</TableCell>
                <TableCell>Nota Șofer</TableCell>
                <TableCell>Nota Client</TableCell>
                <TableCell>Cod Factură</TableCell>
                <TableCell>Cod Client</TableCell>
                <TableCell>Cod Angajat</TableCell>
                <TableCell>Cod Mașină</TableCell>
                <TableCell>Cod Locație</TableCell>
                <TableCell>Cod Timp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rides.map((ride) => (
                <TableRow key={ride.cod_cursa}>
                  <TableCell>{ride.cod_cursa}</TableCell>
                  <TableCell>{ride.nota_sofer}</TableCell>
                  <TableCell>{ride.nota_client}</TableCell>
                  <TableCell>{ride.cod_factura}</TableCell>
                  <TableCell>{ride.cod_client}</TableCell>
                  <TableCell>{ride.cod_angajat}</TableCell>
                  <TableCell>{ride.cod_masina}</TableCell>
                  <TableCell>{ride.cod_locatie}</TableCell>
                  <TableCell>{ride.cod_timp}</TableCell>
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