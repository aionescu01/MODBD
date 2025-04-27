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

const InvoiceManagementw = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/warehouse/dimFactura');
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  return (
    <div>
    <Header/>
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Management Facturi
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cod Factură</TableCell>
                <TableCell>Cod Dispecer</TableCell>
                <TableCell>Cod Cursă</TableCell>
                <TableCell>Data Emitere</TableCell>
                <TableCell>Preț</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.cod_factura}>
                  <TableCell>{invoice.cod_factura}</TableCell>
                  <TableCell>{invoice.cod_dispecer}</TableCell>
                  <TableCell>{invoice.cod_cursa}</TableCell>
                  <TableCell>{new Date(invoice.data_emitere).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('ro-RO', {
                      style: 'currency',
                      currency: 'RON'
                    }).format(invoice.pret)}
                  </TableCell>
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

export default InvoiceManagementw;