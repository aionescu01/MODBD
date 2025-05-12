import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';
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
  Stack,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const MasiniManagement = () => {
  const [masini, setMasini] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedMasina, setSelectedMasina] = useState(null);
  const [formData, setFormData] = useState({
    numar_masina: '',
    data_achizitionare: '',
    data_revizie_urm: '',
    marca: '',
    model: '',
  });

  useEffect(() => {
    fetchMasini();
  }, []);

  const fetchMasini = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/oltp/masina');
      const data = await response.json();
      setMasini(data);
    } catch (error) {
      console.error('Error fetching masini:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const url = selectedMasina
        ? `http://localhost:3001/api/oltp/masina/${selectedMasina.cod_masina}`
        : 'http://localhost:3001/api/oltp/masina';

      const method = selectedMasina ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setOpenDialog(false);
      setSelectedMasina(null);
      setFormData({
        numar_masina: '',
        data_achizitionare: '',
        data_revizie_urm: '',
        marca: '',
        model: '',
      });
      fetchMasini();
    } catch (error) {
      console.error('Error saving masina:', error);
    }
  };

  const handleEdit = (masina) => {
    setSelectedMasina(masina);
    setFormData(masina);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/oltp/masina/${id}`, {
        method: 'DELETE',
      });
      setOpenDeleteDialog(false);
      setSelectedMasina(null);
      fetchMasini();
    } catch (error) {
      console.error('Error deleting masina:', error);
    }
  };

  return (
    <div className="parent">
      <Header/>
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Management Mașini
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setSelectedMasina(null);
              setFormData({
                numar_masina: '',
                data_achizitionare: '',
                data_revizie_urm: '',
                marca: '',
                model: '',
              });
              setOpenDialog(true);
            }}
          >
            Adaugă Mașină
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Număr Mașină</TableCell>
                <TableCell>Data Achiziționare</TableCell>
                <TableCell>Data Revizie Următoare</TableCell>
                <TableCell>Marcă</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Acțiuni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {masini.map((masina) => (
                <TableRow key={masina.cod_masina}>
                  <TableCell>{masina.numar_masina}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    }).format(new Date(masina.data_achizitionare))}
                  </TableCell>

                  <TableCell>
                    {new Intl.DateTimeFormat('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    }).format(new Date(masina.data_revizie_urm))}
                  </TableCell>
                  <TableCell>{masina.marca}</TableCell>
                  <TableCell>{masina.model}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton size="small" color="primary" onClick={() => handleEdit(masina)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          setSelectedMasina(masina);
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
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>{selectedMasina ? 'Editează Mașină' : 'Adaugă Mașină Nouă'}</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1 },
                mt: 2,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
              }}
            >
              <TextField
                label="Număr Mașină"
                name="numar_masina"
                value={formData.numar_masina}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Data Achiziționare"
                name="data_achizitionare"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.data_achizitionare ? formData.data_achizitionare.split('T')[0] : ''}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Data Revizie Următoare"
                name="data_revizie_urm"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.data_revizie_urm ? formData.data_revizie_urm.split('T')[0] : ''}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Marcă"
                name="marca"
                value={formData.marca}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Anulează</Button>
            <Button onClick={handleSubmit} variant="contained">
              {selectedMasina ? 'Salvează' : 'Adaugă'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Confirmă ștergerea</DialogTitle>
          <DialogContent>
            <Typography>
              Ești sigur că vrei să ștergi această mașină? Această acțiune nu poate fi anulată.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Anulează</Button>
            <Button
              onClick={() => handleDelete(selectedMasina?.cod_masina)}
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

export default MasiniManagement;
