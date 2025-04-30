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

const LucreazaInManagement = () => {
  const [lucreazaInData, setLucreazaInData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRelation, setSelectedRelation] = useState(null);
  const [formData, setFormData] = useState({
    cod_angajat: '',
    cod_locatie: ''
  });

  useEffect(() => {
    fetchLucreazaInData();
  }, []);

  const fetchLucreazaInData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/oltp/lucreazaIn');
      const data = await response.json();
      setLucreazaInData(data);
    } catch (error) {
      console.error('Error fetching lucreazaIn data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const method = selectedRelation ? 'PUT' : 'POST';
      const url = selectedRelation
        ? `http://localhost:3001/api/oltp/lucreazaIn/${selectedRelation.cod_angajat}/${selectedRelation.cod_locatie}`
        : 'http://localhost:3001/api/oltp/lucreazaIn';

      const submitData = {
        ...formData,
        cod_angajat: parseInt(formData.cod_angajat),
        cod_locatie: parseInt(formData.cod_locatie)
      };

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      setOpenDialog(false);
      setSelectedRelation(null);
      setFormData({
        cod_angajat: '',
        cod_locatie: ''
      });
      fetchLucreazaInData();
    } catch (error) {
      console.error('Error saving lucreazaIn relation:', error);
    }
  };

  const handleEdit = (relation) => {
    setSelectedRelation(relation);
    setFormData({
      cod_angajat: relation.cod_angajat.toString(),
      cod_locatie: relation.cod_locatie.toString()
    });
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      await fetch(
        `http://localhost:3001/api/oltp/lucreazaIn/${selectedRelation.cod_angajat}/${selectedRelation.cod_locatie}`,
        {
          method: 'DELETE'
        }
      );
      setOpenDeleteDialog(false);
      setSelectedRelation(null);
      fetchLucreazaInData();
    } catch (error) {
      console.error('Error deleting lucreazaIn relation:', error);
    }
  };

  return (
    <div className="parent">
      <Header/>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2">
              Management Relații Angajat-Locație
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setSelectedRelation(null);
                setFormData({
                  cod_angajat: '',
                  cod_locatie: ''
                });
                setOpenDialog(true);
              }}
            >
              Adaugă Relație
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cod Angajat</TableCell>
                  <TableCell>Cod Locație</TableCell>
                  <TableCell>Acțiuni</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lucreazaInData.map((relation) => (
                  <TableRow key={`${relation.cod_angajat}-${relation.cod_locatie}`}>
                    <TableCell>{relation.cod_angajat}</TableCell>
                    <TableCell>{relation.cod_locatie}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(relation)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            setSelectedRelation(relation);
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
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>{selectedRelation ? 'Editează Relație' : 'Adaugă Relație Nouă'}</DialogTitle>
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
                  label="Cod Angajat"
                  name="cod_angajat"
                  type="number"
                  value={formData.cod_angajat}
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
                {selectedRelation ? 'Salvează' : 'Adaugă'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
            <DialogTitle>Confirmă ștergerea</DialogTitle>
            <DialogContent>
              <Typography>
                Ești sigur că vrei să ștergi această relație? Această acțiune nu poate fi anulată.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)}>Anulează</Button>
              <Button onClick={handleDelete} color="error" variant="contained">
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

export default LucreazaInManagement;
