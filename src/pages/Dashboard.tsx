import { Paper, Typography, Box, Grid } from '@mui/material';
import { People, AttachMoney, ShoppingCart, TrendingUp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Layout from '../components/layout/Layout';

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  minHeight: '140px',
}));

const StatIcon = styled('div')(({ theme }) => ({
  fontSize: '2.5rem',
  marginBottom: theme.spacing(1),
  color: theme.palette.primary.main,
}));

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', value: '2,345', icon: <People fontSize="large" />, change: '+12%' },
    { title: 'Total Revenue', value: '$34,545', icon: <AttachMoney fontSize="large" />, change: '+8%' },
    { title: 'Total Orders', value: '1,234', icon: <ShoppingCart fontSize="large" />, change: '+5%' },
    { title: 'Growth', value: '18%', icon: <TrendingUp fontSize="large" />, change: '+3%' },
  ];

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard elevation={3}>
              <StatIcon>{stat.icon}</StatIcon>
              <Typography variant="h5" component="div">
                {stat.value}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {stat.title}
              </Typography>
              <Typography 
                variant="caption" 
                color={stat.change.startsWith('+') ? 'success.main' : 'error.main'}
                sx={{ mt: 1 }}
              >
                {stat.change} from last month
              </Typography>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Sales Overview
            </Typography>
            {/* Chart would go here */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100% - 40px)' }}>
              <Typography color="textSecondary">Sales chart will be displayed here</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            {/* Activity log would go here */}
            <Box sx={{ mt: 2 }}>
              {[1, 2, 3, 4, 5].map((item) => (
                <Box key={item} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                  <Typography variant="body2">User activity {item}</Typography>
                  <Typography variant="caption" color="textSecondary">2 hours ago</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
