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

const DetaliiCursaSudManagement = () => {
  const [detaliiCurse, setDetaliiCurse] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDetaliu, setSelectedDetaliu] = useState(null);
  const [formData, setFormData] = useState({
    cod_cursa: 1,
    data_cursa: '',
    nota_sofer: 1,
    nota_client: 1
  });

  useEffect(() => {
    fetchDetaliiCurse();
  }, []);

  const fetchDetaliiCurse = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/sud/detaliiCursaSud');
      const data = await response.json();
      setDetaliiCurse(data);
    } catch (error) {
      console.error('Error fetching detalii curse:', error);
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
      const url = selectedDetaliu 
        ? `http://localhost:3001/api/sud/detaliiCursaSud/${selectedDetaliu.cod_cursa}`
        : 'http://localhost:3001/api/sud/detaliiCursaSud';
      
      const method = selectedDetaliu ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      setOpenDialog(false);
      setSelectedDetaliu(null);
      setFormData({
        cod_cursa: 1,
        data_cursa: '',
        nota_sofer: 1,
        nota_client: 1
      });
      fetchDetaliiCurse();
    } catch (error) {
      console.error('Error saving detalii cursa:', error);
    }
  };

  const handleEdit = (detaliu) => {
    setSelectedDetaliu(detaliu);
    setFormData({
      ...detaliu,
      data_cursa: detaliu.data_cursa.slice(0, 16) // Format datetime-local
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/sud/detaliiCursaSud/${id}`, {
        method: 'DELETE',
      });
      setOpenDeleteDialog(false);
      setSelectedDetaliu(null);
      fetchDetaliiCurse();
    } catch (error) {
      console.error('Error deleting detalii cursa:', error);
    }
  };

  return (
    <div>
      <Header/>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2">
              Management Detalii Curse
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setSelectedDetaliu(null);
                setFormData({
                  cod_cursa: 1,
                  data_cursa: '',
                  nota_sofer: 1,
                  nota_client: 1
                });
                setOpenDialog(true);
              }}
            >
              Adaugă Detalii Cursă
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cod Cursă</TableCell>
                  <TableCell>Data Cursă</TableCell>
                  <TableCell>Nota Șofer</TableCell>
                  <TableCell>Nota Client</TableCell>
                  <TableCell>Acțiuni</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detaliiCurse.map((detaliu) => (
                  <TableRow key={detaliu.id}>
                    <TableCell>{detaliu.cod_cursa}</TableCell>
                    <TableCell>
                      {new Date(detaliu.data_cursa).toLocaleString()}
                    </TableCell>
                    <TableCell>{detaliu.nota_sofer}</TableCell>
                    <TableCell>{detaliu.nota_client}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(detaliu)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            setSelectedDetaliu(detaliu);
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
              {selectedDetaliu ? 'Editează Detalii Cursă' : 'Adaugă Detalii Cursă Nouă'}
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
                  label="Cod Cursă"
                  name="cod_cursa"
                  type="number"
                  value={formData.cod_cursa}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Data Cursă"
                  name="data_cursa"
                  type="datetime-local"
                  value={formData.data_cursa}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Nota Șofer"
                  name="nota_sofer"
                  type="number"
                  inputProps={{ min: 1, max: 10 }}
                  value={formData.nota_sofer}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Nota Client"
                  name="nota_client"
                  type="number"
                  inputProps={{ min: 1, max: 10 }}
                  value={formData.nota_client}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Anulează</Button>
              <Button onClick={handleSubmit} variant="contained">
                {selectedDetaliu ? 'Salvează' : 'Adaugă'}
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
                Ești sigur că vrei să ștergi aceste detalii ale cursei? Această acțiune nu poate fi anulată.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)}>Anulează</Button>
              <Button 
                onClick={() => handleDelete(selectedDetaliu?.cod_cursa)}
                color="error"
                variant="contained"
              >
                Șterge
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Container>
      <Footer />
  </div>
  );
};

export default DetaliiCursaSudManagement;