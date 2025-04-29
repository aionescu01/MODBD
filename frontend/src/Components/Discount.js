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

const DiscountManagement = () => {
  const [discounts, setDiscounts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [formData, setFormData] = useState({
    cod_discount: ''
  });

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/oltp/discount');
      const data = await response.json();
      setDiscounts(data);
    } catch (error) {
      console.error('Error fetching discounts:', error);
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
      const url = selectedDiscount 
        ? `http://localhost:3001/api/oltp/discount/${selectedDiscount.nota_discount}`
        : 'http://localhost:3001/api/oltp/discount';
      
      const method = selectedDiscount ? 'PUT' : 'POST';
      
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
      setSelectedDiscount(null);
      setFormData({
        cod_discount: ''
      });
      fetchDiscounts();
    } catch (error) {
      console.error('Error saving discount:', error);
    }
  };

  const handleEdit = (discount) => {
    setSelectedDiscount(discount);
    setFormData({
      cod_discount: discount.cod_discount
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/oltp/discount/${id}`, {
        method: 'DELETE',
      });
      setOpenDeleteDialog(false);
      setSelectedDiscount(null);
      fetchDiscounts();
    } catch (error) {
      console.error('Error deleting discount:', error);
    }
  };

  return (
    <div>
      <Header/>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2">
              Management Discounts
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setSelectedDiscount(null);
                setFormData({
                  cod_discount: ''
                });
                setOpenDialog(true);
              }}
            >
              Adaugă Discount
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Notă Discount</TableCell>
                  <TableCell>Cod Discount</TableCell>
                  <TableCell>Acțiuni</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {discounts.map((discount) => (
                  <TableRow key={discount.nota_discount}>
                    <TableCell>{discount.nota_discount}</TableCell>
                    <TableCell>{discount.cod_discount}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(discount)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            setSelectedDiscount(discount);
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
              {selectedDiscount ? 'Editează Discount' : 'Adaugă Discount Nou'}
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
                  label="Cod Discount"
                  name="cod_discount"
                  type="number"
                  value={formData.cod_discount}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Anulează</Button>
              <Button onClick={handleSubmit} variant="contained">
                {selectedDiscount ? 'Salvează' : 'Adaugă'}
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
                Ești sigur că vrei să ștergi acest discount? Această acțiune nu poate fi anulată.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)}>Anulează</Button>
              <Button 
                onClick={() => handleDelete(selectedDiscount?.nota_discount)}
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

export default DiscountManagement;