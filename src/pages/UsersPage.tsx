import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton, Tooltip, Button, TextField, InputAdornment } from '@mui/material';
import { Search, Edit, Delete, PersonAdd } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Layout from '../components/layout/Layout';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StatusBadge = styled('span')<{ status: string }>(({ status }) => ({
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'capitalize',
  backgroundColor: 
    status === 'active' 
      ? 'rgba(34, 197, 94, 0.16)' 
      : status === 'suspended' 
      ? 'rgba(255, 171, 0, 0.16)' 
      : 'rgba(255, 86, 48, 0.16)',
  color: 
    status === 'active' 
      ? 'rgb(17, 141, 87)' 
      : status === 'suspended' 
      ? 'rgb(183, 110, 0)' 
      : 'rgb(183, 29, 24)',
}));

const UsersPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        joinDate: '2023-01-15',
        status: 'active',
      },
      // Add more mock users as needed
    ];
    
    setUsers(mockUsers);
    setLoading(false);
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            User Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Add User
          </Button>
        </Box>

        <Paper sx={{ p: 2, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 400 }}
          />
        </Paper>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <StyledTableRow key={user.id} hover>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <StatusBadge status={user.status}>
                            {user.status}
                          </StatusBadge>
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Edit">
                            <IconButton size="small" sx={{ mr: 1 }}>
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="error">
                              <Delete fontSize="small" />
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
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Layout>
  );
};

export default UsersPage;
