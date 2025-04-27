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

const CurseManagement = () => {
  const [curse, setCurse] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCursa, setSelectedCursa] = useState(null);
  const [formData, setFormData] = useState({
    cod_masina: '',
    cod_sofer: '',
    cod_client: '',
    adresa_client: '',
    destinatie: '',
    cod_locatie: ''
  });

  useEffect(() => {
    fetchCurse();
  }, []);

  const fetchCurse = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/oltp/cursa');
      const data = await response.json();
      setCurse(data);
    } catch (error) {
      console.error('Error fetching curse:', error);
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
      const url = selectedCursa 
        ? `http://localhost:3001/api/oltp/cursa/${selectedCursa.cod_cursa}`
        : 'http://localhost:3001/api/oltp/cursa';
      
      const method = selectedCursa ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      setOpenDialog(false);
      setSelectedCursa(null);
      setFormData({
        cod_masina: '',
        cod_sofer: '',
        cod_client: '',
        adresa_client: '',
        destinatie: '',
        cod_locatie: ''
      });
      fetchCurse();
    } catch (error) {
      console.error('Error saving cursa:', error);
    }
  };

  const handleEdit = (cursa) => {
    setSelectedCursa(cursa);
    setFormData(cursa);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/oltp/cursa/${id}`, {
        method: 'DELETE',
      });
      setOpenDeleteDialog(false);
      setSelectedCursa(null);
      fetchCurse();
    } catch (error) {
      console.error('Error deleting cursa:', error);
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
          <Button
            variant="contained"
            onClick={() => {
              setSelectedCursa(null);
              setFormData({
                cod_masina: '',
                cod_sofer: '',
                cod_client: '',
                adresa_client: '',
                destinatie: '',
                cod_locatie: ''
              });
              setOpenDialog(true);
            }}
          >
            Adaugă Cursă
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cod Mașină</TableCell>
                <TableCell>Cod Șofer</TableCell>
                <TableCell>Cod Client</TableCell>
                <TableCell>Adresa Client</TableCell>
                <TableCell>Destinație</TableCell>
                <TableCell>Cod Locație</TableCell>
                <TableCell>Acțiuni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {curse.map((cursa) => (
                <TableRow key={cursa.cod_cursa}>
                  <TableCell>{cursa.cod_masina}</TableCell>
                  <TableCell>{cursa.cod_sofer}</TableCell>
                  <TableCell>{cursa.cod_client}</TableCell>
                  <TableCell>{cursa.adresa_client}</TableCell>
                  <TableCell>{cursa.destinatie}</TableCell>
                  <TableCell>{cursa.cod_locatie}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(cursa)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          setSelectedCursa(cursa);
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
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedCursa ? 'Editează Cursă' : 'Adaugă Cursă Nouă'}
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1 },
                mt: 2,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2
              }}
            >
              <TextField
                label="Cod Mașină"
                name="cod_masina"
                type="number"
                value={formData.cod_masina}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Cod Șofer"
                name="cod_sofer"
                type="number"
                value={formData.cod_sofer}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Cod Client"
                name="cod_client"
                type="number"
                value={formData.cod_client}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Adresa Client"
                name="adresa_client"
                value={formData.adresa_client}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Destinație"
                name="destinatie"
                value={formData.destinatie}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Cod Locație"
                name="cod_locatie"
                type="number"
                value={formData.cod_locatie}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Anulează</Button>
            <Button onClick={handleSubmit} variant="contained">
              {selectedCursa ? 'Salvează' : 'Adaugă'}
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
              Ești sigur că vrei să ștergi această cursă? Această acțiune nu poate fi anulată.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Anulează</Button>
            <Button 
              onClick={() => handleDelete(selectedCursa?.cod_cursa)}
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

export default CurseManagement;