import { useState, useEffect } from 'react';
import { Paper, Typography, Box, Grid, Card, CardContent, LinearProgress, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { People, Work, Business, Assignment, TrendingUp, PersonAdd, WorkOutline, BusinessCenter } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

interface Stats {
  totalUsers: number;
  totalJobs: number;
  totalCompanies: number;
  totalApplications: number;
}

interface RecentUser {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const StatIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: '12px',
  marginBottom: theme.spacing(2),
}));

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const statsResponse = await axios.get(`${API_URL}/admin/stats`);
      setStats(statsResponse.data);

      // Fetch recent users
      const usersResponse = await axios.get(`${API_URL}/admin/users`);
      const sortedUsers = usersResponse.data
        .sort((a: RecentUser, b: RecentUser) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
      setRecentUsers(sortedUsers);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard Overview
        </Typography>
        <LinearProgress />
      </Box>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers?.toLocaleString() || '0',
      icon: <People />,
      color: '#1976d2',
      bgColor: 'rgba(25, 118, 210, 0.1)',
      change: '+12%',
    },
    {
      title: 'Total Jobs',
      value: stats?.totalJobs?.toLocaleString() || '0',
      icon: <Work />,
      color: '#2e7d32',
      bgColor: 'rgba(46, 125, 50, 0.1)',
      change: '+8%',
    },
    {
      title: 'Total Companies',
      value: stats?.totalCompanies?.toLocaleString() || '0',
      icon: <Business />,
      color: '#ed6c02',
      bgColor: 'rgba(237, 108, 2, 0.1)',
      change: '+5%',
    },
    {
      title: 'Applications',
      value: stats?.totalApplications?.toLocaleString() || '0',
      icon: <Assignment />,
      color: '#9c27b0',
      bgColor: 'rgba(156, 39, 176, 0.1)',
      change: '+15%',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 3 }}>
        Dashboard Overview
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color={stat.change.startsWith('+') ? 'success.main' : 'error.main'}
                      sx={{ fontWeight: 600 }}
                    >
                      {stat.change} from last month
                    </Typography>
                  </Box>
                  <StatIcon sx={{ backgroundColor: stat.bgColor, color: stat.color }}>
                    {stat.icon}
                  </StatIcon>
                </Box>
              </CardContent>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Career Platform Overview */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Careerion Platform Overview
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <PersonAdd sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" fontWeight={600}>
                      {stats?.totalUsers || 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Registered Users
                    </Typography>
                    <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                      +12% this month
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <WorkOutline sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
                    <Typography variant="h6" fontWeight={600}>
                      {stats?.totalJobs || 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Active Jobs
                    </Typography>
                    <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                      +8% this month
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <BusinessCenter sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
                    <Typography variant="h6" fontWeight={600}>
                      {stats?.totalCompanies || 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Partner Companies
                    </Typography>
                    <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                      +5% this month
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 4, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                  Platform Health Status
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'success.main', mr: 1 }} />
                  <Typography variant="body2">AI Career Recommendations: Active</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'success.main', mr: 1 }} />
                  <Typography variant="body2">User Authentication: Operational</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'success.main', mr: 1 }} />
                  <Typography variant="body2">Database: Connected</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Users */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Recent Users
            </Typography>
            <List sx={{ mt: 2 }}>
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => (
                  <ListItem key={user._id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={
                        <Box>
                          <Typography variant="caption" display="block">
                            {user.email}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Joined {new Date(user.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary="No recent users"
                    secondary="Users will appear here as they register"
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
