import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckIcon from '@mui/icons-material/Check';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Payments = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentPeriod, setPaymentPeriod] = useState('all');

  // Placeholder data for payments
  const paymentsData = [
    {
      id: 'PAY-20250315-001',
      tenant: 'John Doe',
      property: '121 Main Street, Apt 2B',
      amount: 1200.00,
      date: '2025-03-15',
      method: 'Credit Card',
      status: 'Completed'
    },
    {
      id: 'PAY-20250312-002',
      tenant: 'Jane Smith',
      property: '456 Oak Avenue',
      amount: 2400.00,
      date: '2025-03-12',
      method: 'Bank Transfer',
      status: 'Completed'
    },
    {
      id: 'PAY-20250310-003',
      tenant: 'Robert Johnson',
      property: '789 Pine Street, Unit 3',
      amount: 1800.00,
      date: '2025-03-10',
      method: 'Cash',
      status: 'Completed'
    },
    {
      id: 'PAY-20250401-004',
      tenant: 'Emily Davis',
      property: '101 Elm Court, Apt 5C',
      amount: 950.00,
      date: '2025-04-01',
      method: 'Credit Card',
      status: 'Pending'
    },
    {
      id: 'PAY-20250405-005',
      tenant: 'Michael Wilson',
      property: '202 Maple Drive',
      amount: 2100.00,
      date: '2025-04-05',
      method: 'Check',
      status: 'Overdue'
    },
  ];

  // Summary data
  const summaryData = {
    totalCollected: 5400.00,
    pendingPayments: 950.00,
    overduePayments: 2100.00,
    totalPayments: 8450.00
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePeriodChange = (event) => {
    setPaymentPeriod(event.target.value);
  };

  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());

    const currentMonth = new Date().getMonth() + 1;
    const paymentMonth = new Date(payment.date).getMonth() + 1;

    if (paymentPeriod === 'all') return matchesSearch;
    if (paymentPeriod === 'current') return matchesSearch && paymentMonth === currentMonth;
    if (paymentPeriod === 'pending') return matchesSearch && payment.status === 'Pending';
    if (paymentPeriod === 'overdue') return matchesSearch && payment.status === 'Overdue';
    return matchesSearch;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>Payments</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Record Payment
        </Button>
      </Box>

      {/* Payment Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalAtmIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Collected</Typography>
              </Box>
              <Typography variant="h4" color="primary">${summaryData.totalCollected.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CreditCardIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Pending</Typography>
              </Box>
              <Typography variant="h4" color="info">${summaryData.pendingPayments.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AttachMoneyIcon color="error" sx={{ mr: 1 }} />
                <Typography variant="h6">Overdue</Typography>
              </Box>
              <Typography variant="h4" color="error">${summaryData.overduePayments.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ReceiptIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Total</Typography>
              </Box>
              <Typography variant="h4" color="success">${summaryData.totalPayments.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}