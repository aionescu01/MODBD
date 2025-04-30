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

const AngajatIdentityManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    nume: '',
    prenume: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/central/angajatIdentity');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
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
      const url = selectedEmployee 
        ? `http://localhost:3001/api/central/angajatIdentity/${selectedEmployee.cod_angajat}`
        : 'http://localhost:3001/api/central/angajatIdentity';
      
      const method = selectedEmployee ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      setOpenDialog(false);
      setSelectedEmployee(null);
      setFormData({
        nume: '',
        prenume: ''
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setFormData(employee);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/central/angajatIdentity/${id}`, {
        method: 'DELETE',
      });
      setOpenDeleteDialog(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="parent">
      <Header/>
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Management Angajați
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setSelectedEmployee(null);
              setFormData({
                nume: '',
                prenume: ''
              });
              setOpenDialog(true);
            }}
          >
            Adaugă Angajat
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nume</TableCell>
                <TableCell>Prenume</TableCell>
                <TableCell>Acțiuni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.cod_angajat}>
                  <TableCell>{employee.nume}</TableCell>
                  <TableCell>{employee.prenume}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(employee)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          setSelectedEmployee(employee);
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
            {selectedEmployee ? 'Editează Angajat' : 'Adaugă Angajat Nou'}
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
                label="Nume"
                name="nume"
                value={formData.nume}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Prenume"
                name="prenume"
                value={formData.prenume}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Anulează</Button>
            <Button onClick={handleSubmit} variant="contained">
              {selectedEmployee ? 'Salvează' : 'Adaugă'}
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
              Ești sigur că vrei să ștergi acest angajat? Această acțiune nu poate fi anulată.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Anulează</Button>
            <Button 
              onClick={() => handleDelete(selectedEmployee?.cod_angajat)}
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

export default AngajatIdentityManagement;