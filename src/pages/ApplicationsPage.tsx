import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search,
  Visibility,
  Person,
  Work,
  CalendarToday,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

interface Application {
  _id: string;
  jobId: {
    _id: string;
    title: string;
    company: string;
  };
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StatusChip = styled(Chip)<{ status: string }>(({ status, theme }) => ({
  backgroundColor:
    status === 'pending'
      ? theme.palette.warning.light
      : status === 'reviewed'
      ? theme.palette.info.light
      : status === 'accepted'
      ? theme.palette.success.light
      : theme.palette.error.light,
  color:
    status === 'pending'
      ? theme.palette.warning.contrastText
      : status === 'reviewed'
      ? theme.palette.info.contrastText
      : status === 'accepted'
      ? theme.palette.success.contrastText
      : theme.palette.error.contrastText,
  fontWeight: 600,
  textTransform: 'capitalize',
}));

const ApplicationsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/applications`);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      await axios.put(`${API_URL}/admin/applications/${applicationId}`, {
        status: newStatus,
      });
      fetchApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.jobId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.jobId?.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 3 }}>
        Application Management
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            variant="outlined"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status Filter</InputLabel>
            <Select
              value={statusFilter}
              label="Status Filter"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="reviewed">Reviewed</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Applicant</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Applied Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    Loading applications...
                  </TableCell>
                </TableRow>
              ) : filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    No applications found
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((application) => (
                    <StyledTableRow key={application._id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Person sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                            <Typography variant="body2" fontWeight={500}>
                              {application.userId?.name || 'Unknown User'}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {application.userId?.email || 'No email'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Work sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                          <Typography variant="body2">
                            {application.jobId?.title || 'Unknown Job'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {application.jobId?.company || 'Unknown Company'}
                      </TableCell>
                      <TableCell>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                          <Select
                            value={application.status}
                            onChange={(e) => handleStatusChange(application._id, e.target.value)}
                            variant="outlined"
                            sx={{ 
                              '& .MuiSelect-select': { 
                                py: 0.5,
                                fontSize: '0.875rem',
                              }
                            }}
                          >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="reviewed">Reviewed</MenuItem>
                            <MenuItem value="accepted">Accepted</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarToday sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                          {new Date(application.appliedAt).toLocaleDateString()}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton size="small">
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </StyledTableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredApplications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ApplicationsPage;