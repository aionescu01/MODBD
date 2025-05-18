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
  Stack
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const IstoricSoferiManagement = () => {
  const [istoricSoferi, setIstoricSoferi] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedIstoric, setSelectedIstoric] = useState(null);
  const [formData, setFormData] = useState({
    cod_sofer: '',
    nota: '',
    numar_curse: ''
  });

  useEffect(() => {
    fetchIstoricSoferi();
  }, []);

  const fetchIstoricSoferi = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/oltp/istoricsoferi');
      const data = await response.json();
      setIstoricSoferi(data);
    } catch (error) {
      console.error('Error fetching istoric soferi:', error);
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
      const url = selectedIstoric 
        ? `http://localhost:3001/api/oltp/istoricsoferi/${selectedIstoric.cod_sofer}`
        : 'http://localhost:3001/api/oltp/istoricsoferi';
      
      const method = selectedIstoric ? 'PUT' : 'POST';
      
      const submitData = {
        ...formData,
        nota: parseFloat(formData.nota),
        numar_curse: parseInt(formData.numar_curse, 10)
      };
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
      
      setOpenDialog(false);
      setSelectedIstoric(null);
      setFormData({
        cod_sofer: '',
        nota: '',
        numar_curse: ''
      });
      fetchIstoricSoferi();
    } catch (error) {
      console.error('Error saving istoric sofer:', error);
    }
  };

  const handleEdit = (istoric) => {
    setSelectedIstoric(istoric);
    setFormData({
      cod_sofer: istoric.cod_sofer,
      nota: istoric.nota.toString(),
      numar_curse: istoric.numar_curse.toString()
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/oltp/istoricsoferi/${id}`, {
        method: 'DELETE',
      });
      setOpenDeleteDialog(false);
      setSelectedIstoric(null);
      fetchIstoricSoferi();
    } catch (error) {
      console.error('Error deleting istoric sofer:', error);
    }
  };

  return (
    <div className="parent">
      <Header/>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2">
              Management Istoric Șoferi
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setSelectedIstoric(null);
                setFormData({
                  cod_sofer: '',
                  nota: '',
                  numar_curse: ''
                });
                setOpenDialog(true);
              }}
            >
              Adaugă Istoric Șofer
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cod Șofer</TableCell>
                  <TableCell>Notă</TableCell>
                  <TableCell>Număr Curse</TableCell>
                  <TableCell>Acțiuni</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {istoricSoferi.map((istoric) => (
                  <TableRow key={istoric.id}>
                    <TableCell>{istoric.cod_sofer}</TableCell>
                    <TableCell>{istoric.nota.toFixed(2)}</TableCell>
                    <TableCell>{istoric.numar_curse}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(istoric)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            setSelectedIstoric(istoric);
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
              {selectedIstoric ? 'Editează Istoric Șofer' : 'Adaugă Istoric Șofer Nou'}
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
                  label="Cod Șofer"
                  name="cod_sofer"
                  type="number"
                  value={formData.cod_sofer}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!!selectedIstoric}
                />
                <TextField
                  label="Notă"
                  name="nota"
                  type="number"
                  inputProps={{ 
                    step: "0.01",
                    min: "0",
                    max: "10"
                  }}
                  value={formData.nota}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Număr Curse"
                  name="numar_curse"
                  type="number"
                  inputProps={{ min: "0" }}
                  value={formData.numar_curse}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Anulează</Button>
              <Button onClick={handleSubmit} variant="contained">
                {selectedIstoric ? 'Salvează' : 'Adaugă'}
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
                Ești sigur că vrei să ștergi acest istoric? Această acțiune nu poate fi anulată.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)}>Anulează</Button>
              <Button 
                onClick={() => handleDelete(selectedIstoric?.cod_sofer)}
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

export default IstoricSoferiManagement;
