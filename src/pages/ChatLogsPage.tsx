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
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { Search, Visibility, ExpandMore, SmartToy, Person } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

interface ChatLog {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  message: string;
  response: string;
  modelUsed: string;
  timestamp: string;
  responseTime?: number;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ChatLogsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState<ChatLog | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchChatLogs();
  }, []);

  const fetchChatLogs = async () => {
    try {
      // For now, we'll create mock data since we don't have chat logging in the backend yet
      // In a real implementation, you'd call: const response = await axios.get(`${API_URL}/admin/chat-logs`);
      
      const mockChatLogs: ChatLog[] = [
        {
          _id: '1',
          userId: 'user1',
          userName: 'John Smith',
          userEmail: 'john.sample@example.com',
          message: 'I need career advice for transitioning to tech',
          response: 'Based on your background, I recommend starting with...',
          modelUsed: 'gemini-flash-latest',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
          responseTime: 1200
        },
        {
          _id: '2',
          userId: 'user2',
          userName: 'Sarah Johnson',
          userEmail: 'sarah.sample@example.com',
          message: 'What skills should I learn for product management?',
          response: 'For product management, focus on these key areas...',
          modelUsed: 'gemini-flash-latest',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          responseTime: 950
        },
        {
          _id: '3',
          userId: 'user3',
          userName: 'Mike Chen',
          userEmail: 'mike.sample@example.com',
          message: 'How do I prepare for engineering interviews?',
          response: 'Engineering interview preparation involves...',
          modelUsed: 'gemini-flash-latest',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
          responseTime: 1500
        }
      ];
      
      setChatLogs(mockChatLogs);
    } catch (error) {
      console.error('Error fetching chat logs:', error);
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

  const handleViewChat = (chat: ChatLog) => {
    setSelectedChat(chat);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedChat(null);
  };

  const filteredChats = chatLogs.filter(
    (chat) =>
      chat.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.modelUsed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const chatTime = new Date(timestamp);
    const diffMs = now.getTime() - chatTime.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 3 }}>
        AI Chat Logs
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search chat logs..."
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
                <TableCell>User</TableCell>
                <TableCell>Message Preview</TableCell>
                <TableCell>AI Model</TableCell>
                <TableCell>Response Time</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    Loading chat logs...
                  </TableCell>
                </TableRow>
              ) : filteredChats.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    No chat logs found
                  </TableCell>
                </TableRow>
              ) : (
                filteredChats
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((chat) => (
                    <StyledTableRow key={chat._id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                            {chat.userName.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={500}>
                              {chat.userName}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {chat.userEmail}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ maxWidth: 300 }}>
                          {chat.message.length > 100 
                            ? `${chat.message.substring(0, 100)}...` 
                            : chat.message
                          }
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={<SmartToy />}
                          label={chat.modelUsed}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {chat.responseTime ? `${chat.responseTime}ms` : 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">
                            {formatTimestamp(chat.timestamp)}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {getTimeAgo(chat.timestamp)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Full Conversation">
                          <IconButton 
                            size="small"
                            onClick={() => handleViewChat(chat)}
                          >
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
          count={filteredChats.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Chat Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
              {selectedChat?.userName.charAt(0).toUpperCase()}
            </Avatar>
            Chat with {selectedChat?.userName}
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedChat && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {formatTimestamp(selectedChat.timestamp)} • Model: {selectedChat.modelUsed}
                {selectedChat.responseTime && ` • Response Time: ${selectedChat.responseTime}ms`}
              </Typography>

              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="subtitle1" fontWeight={500}>
                      User Message
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="body1">
                      {selectedChat.message}
                    </Typography>
                  </Paper>
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SmartToy sx={{ mr: 1, color: 'secondary.main' }} />
                    <Typography variant="subtitle1" fontWeight={500}>
                      AI Response
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Paper sx={{ p: 2, bgcolor: 'primary.50' }}>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                      {selectedChat.response}
                    </Typography>
                  </Paper>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatLogsPage;