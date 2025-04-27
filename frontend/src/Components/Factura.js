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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Box,
  Container,
  Stack
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const FacturaManagement = () => {
  const [facturi, setFacturi] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedFactura, setSelectedFactura] = useState(null);
  const [formData, setFormData] = useState({
    cod_dispecer: '',
    cod_cursa: '',
    pret: ''
  });

  useEffect(() => {
    fetchFacturi();
  }, []);

  const fetchFacturi = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/oltp/factura');
      const data = await response.json();
      setFacturi(data);
    } catch (error) {
      console.error('Error fetching facturi:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const url = selectedFactura 
        ? `http://localhost:3001/api/oltp/factura/${selectedFactura.cod_factura}`
        : 'http://localhost:3001/api/oltp/factura';
      
      const method = selectedFactura ? 'PUT' : 'POST';
      
      // Convert price to number for submission
      const submitData = {
        ...formData,
        pret: parseFloat(formData.pret)
      };
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
      
      setOpenDialog(false);
      setSelectedFactura(null);
      setFormData({
        cod_dispecer: '',
        cod_cursa: '',
        pret: ''
      });
      fetchFacturi();
    } catch (error) {
      console.error('Error saving factura:', error);
    }
  };

  const handleEdit = (factura) => {
    setSelectedFactura(factura);
    setFormData({
      cod_dispecer: factura.cod_dispecer,
      cod_cursa: factura.cod_cursa,
      pret: factura.pret.toString()
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/oltp/factura/${id}`, {
        method: 'DELETE',
      });
      setOpenDeleteDialog(false);
      setSelectedFactura(null);
      fetchFacturi();
    } catch (error) {
      console.error('Error deleting factura:', error);
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
          <Button
            variant="contained"
            onClick={() => {
              setSelectedFactura(null);
              setFormData({
                cod_dispecer: '',
                cod_cursa: '',
                pret: ''
              });
              setOpenDialog(true);
            }}
          >
            Adaugă Factură
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cod Factură</TableCell>
                <TableCell>Cod Dispecer</TableCell>
                <TableCell>Cod Cursă</TableCell>
                <TableCell>Preț (RON)</TableCell>
                <TableCell>Acțiuni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facturi.map((factura) => (
                <TableRow key={factura.cod_factura}>
                  <TableCell>{factura.cod_factura}</TableCell>
                  <TableCell>{factura.cod_dispecer}</TableCell>
                  <TableCell>{factura.cod_cursa}</TableCell>
                  <TableCell>{factura.pret.toFixed(2)}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(factura)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          setSelectedFactura(factura);
                          setOpenDeleteDialog(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {selectedFactura ? 'Editează Factură' : 'Adaugă Factură Nouă'}
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1 },
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <TextField
                label="Cod Dispecer"
                name="cod_dispecer"
                type="number"
                value={formData.cod_dispecer}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Cod Cursă"
                name="cod_cursa"
                type="number"
                value={formData.cod_cursa}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Preț"
                name="pret"
                type="number"
                inputProps={{ 
                  step: "0.01",
                  min: "0"
                }}
                value={formData.pret}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Anulează</Button>
            <Button onClick={handleSubmit} variant="contained">
              {selectedFactura ? 'Salvează' : 'Adaugă'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirmă ștergerea</DialogTitle>
          <DialogContent>
            <Typography>
              Ești sigur că vrei să ștergi această factură? Această acțiune nu poate fi anulată.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Anulează</Button>
            <Button 
              onClick={() => handleDelete(selectedFactura?.cod_factura)}
              color="error"
              variant="contained"
            >
              Șterge
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
    <Footer/>
    </div>
  );
};

export default FacturaManagement;