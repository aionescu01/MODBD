import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
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

const LocatiiCentralManagement = () => {
  const [locatii, setLocatii] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedLocatie, setSelectedLocatie] = useState(null);
  const [formData, setFormData] = useState({
    localitate: '',
    judet: ''
  });

  useEffect(() => {
    fetchLocatii();
  }, []);

  const fetchLocatii = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/central/locatiiCentral');
      const data = await response.json();
      setLocatii(data);
    } catch (error) {
      console.error('Error fetching locatii:', error);
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
      const url = selectedLocatie 
        ? `http://localhost:3001/api/central/locatiiCentral/${selectedLocatie.cod_locatie}`
        : 'http://localhost:3001/api/central/locatiiCentral';
      
      const method = selectedLocatie ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      setOpenDialog(false);
      setSelectedLocatie(null);
      setFormData({
        localitate: '',
        judet: ''
      });
      fetchLocatii();
    } catch (error) {
      console.error('Error saving locatie:', error);
    }
  };

  const handleEdit = (locatie) => {
    setSelectedLocatie(locatie);
    setFormData({
      localitate: locatie.localitate,
      judet: locatie.judet
    });
    setOpenDialog(true);
  };

  const handleDelete = async (cod_locatie) => {
    try {
      await fetch(`http://localhost:3001/api/central/locatiiCentral/${cod_locatie}`, {
        method: 'DELETE',
      });
      setOpenDeleteDialog(false);
      setSelectedLocatie(null);
      fetchLocatii();
    } catch (error) {
      console.error('Error deleting locatie:', error);
    }
  };

  return (
    <div className="parent">
      <Header/>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2">
              Management Locații
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setSelectedLocatie(null);
                setFormData({
                  localitate: '',
                  judet: ''
                });
                setOpenDialog(true);
              }}
            >
              Adaugă Locație
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cod Locație</TableCell>
                  <TableCell>Localitate</TableCell>
                  <TableCell>Județ</TableCell>
                  <TableCell>Acțiuni</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locatii.map((locatie) => (
                  <TableRow key={locatie.cod_locatie}>
                    <TableCell>{locatie.cod_locatie}</TableCell>
                    <TableCell>{locatie.localitate}</TableCell>
                    <TableCell>{locatie.judet}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(locatie)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            setSelectedLocatie(locatie);
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
              {selectedLocatie ? 'Editează Locație' : 'Adaugă Locație Nouă'}
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
                  label="Localitate"
                  name="localitate"
                  value={formData.localitate}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Județ"
                  name="judet"
                  value={formData.judet}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Anulează</Button>
              <Button onClick={handleSubmit} variant="contained">
                {selectedLocatie ? 'Salvează' : 'Adaugă'}
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
                Ești sigur că vrei să ștergi această locație? Această acțiune nu poate fi anulată.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)}>Anulează</Button>
              <Button 
                onClick={() => handleDelete(selectedLocatie?.cod_locatie)}
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

export default LocatiiCentralManagement;