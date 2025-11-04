import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  People,
  Work,
  Business,
  Psychology,
  School,
  LocationOn,
  AttachMoney,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

interface AnalyticsData {
  totalUsers: number;
  totalJobs: number;
  totalCompanies: number;
  totalApplications: number;
  userGrowth: number;
  jobGrowth: number;
  topSkills: Array<{ skill: string; count: number }>;
  topIndustries: Array<{ industry: string; count: number }>;
  careerGoals: Array<{ goal: string; count: number }>;
  educationLevels: Array<{ level: string; count: number }>;
  workPreferences: Array<{ preference: string; count: number }>;
  locationPreferences: Array<{ location: string; count: number }>;
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

const CareerAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch basic stats
      const statsResponse = await axios.get(`${API_URL}/admin/stats`);
      
      // Mock additional analytics data - replace with real API calls
      const mockAnalytics: AnalyticsData = {
        ...statsResponse.data,
        userGrowth: 12.5,
        jobGrowth: 8.3,
        topSkills: [
          { skill: 'JavaScript', count: 245 },
          { skill: 'Python', count: 198 },
          { skill: 'React', count: 167 },
          { skill: 'Node.js', count: 134 },
          { skill: 'SQL', count: 123 },
        ],
        topIndustries: [
          { industry: 'Technology', count: 342 },
          { industry: 'Healthcare', count: 198 },
          { industry: 'Finance', count: 156 },
          { industry: 'Education', count: 134 },
          { industry: 'Marketing', count: 98 },
        ],
        careerGoals: [
          { goal: 'Senior Developer', count: 89 },
          { goal: 'Team Lead', count: 67 },
          { goal: 'Product Manager', count: 54 },
          { goal: 'Entrepreneur', count: 43 },
          { goal: 'Data Scientist', count: 38 },
        ],
        educationLevels: [
          { level: "Bachelor's Degree", count: 234 },
          { level: "Master's Degree", count: 156 },
          { level: 'High School', count: 89 },
          { level: 'Associate Degree', count: 67 },
          { level: 'PhD/Doctorate', count: 34 },
        ],
        workPreferences: [
          { preference: 'Remote', count: 298 },
          { preference: 'Hybrid', count: 187 },
          { preference: 'In-office', count: 134 },
          { preference: 'Flexible', count: 98 },
        ],
        locationPreferences: [
          { location: 'San Francisco, CA', count: 89 },
          { location: 'New York, NY', count: 76 },
          { location: 'Austin, TX', count: 54 },
          { location: 'Seattle, WA', count: 43 },
          { location: 'Remote', count: 298 },
        ],
      };
      
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 3 }}>
          Career Analytics
        </Typography>
        <LinearProgress />
      </Box>
    );
  }

  if (!analytics) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 3 }}>
          Career Analytics
        </Typography>
        <Typography>Failed to load analytics data.</Typography>
      </Box>
    );
  }

  const stats = [
    {
      title: 'Total Users',
      value: analytics.totalUsers.toLocaleString(),
      growth: analytics.userGrowth,
      icon: <People />,
      color: '#1976d2',
      bgColor: 'rgba(25, 118, 210, 0.1)',
    },
    {
      title: 'Total Jobs',
      value: analytics.totalJobs.toLocaleString(),
      growth: analytics.jobGrowth,
      icon: <Work />,
      color: '#2e7d32',
      bgColor: 'rgba(46, 125, 50, 0.1)',
    },
    {
      title: 'Total Companies',
      value: analytics.totalCompanies.toLocaleString(),
      growth: 5.2,
      icon: <Business />,
      color: '#ed6c02',
      bgColor: 'rgba(237, 108, 2, 0.1)',
    },
    {
      title: 'Applications',
      value: analytics.totalApplications.toLocaleString(),
      growth: 15.8,
      icon: <TrendingUp />,
      color: '#9c27b0',
      bgColor: 'rgba(156, 39, 176, 0.1)',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 3 }}>
        Career Analytics Dashboard
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
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
                    <Chip
                      label={`+${stat.growth}%`}
                      size="small"
                      color="success"
                      variant="outlined"
                    />
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

      {/* Detailed Analytics */}
      <Grid container spacing={3}>
        {/* Top Skills */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Psychology sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={600}>
                Most In-Demand Skills
              </Typography>
            </Box>
            <TableContainer sx={{ maxHeight: 300 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Skill</TableCell>
                    <TableCell align="right">Users</TableCell>
                    <TableCell align="right">%</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analytics.topSkills.map((skill, index) => (
                    <TableRow key={index}>
                      <TableCell>{skill.skill}</TableCell>
                      <TableCell align="right">{skill.count}</TableCell>
                      <TableCell align="right">
                        {((skill.count / analytics.totalUsers) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Top Industries */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Business sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={600}>
                Popular Industries
              </Typography>
            </Box>
            <TableContainer sx={{ maxHeight: 300 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Industry</TableCell>
                    <TableCell align="right">Interest</TableCell>
                    <TableCell align="right">%</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analytics.topIndustries.map((industry, index) => (
                    <TableRow key={index}>
                      <TableCell>{industry.industry}</TableCell>
                      <TableCell align="right">{industry.count}</TableCell>
                      <TableCell align="right">
                        {((industry.count / analytics.totalUsers) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Education Levels */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <School sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={600}>
                Education Distribution
              </Typography>
            </Box>
            <TableContainer sx={{ maxHeight: 300 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Education Level</TableCell>
                    <TableCell align="right">Users</TableCell>
                    <TableCell align="right">%</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analytics.educationLevels.map((level, index) => (
                    <TableRow key={index}>
                      <TableCell>{level.level}</TableCell>
                      <TableCell align="right">{level.count}</TableCell>
                      <TableCell align="right">
                        {((level.count / analytics.totalUsers) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Work Preferences */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={600}>
                Work Preferences
              </Typography>
            </Box>
            <TableContainer sx={{ maxHeight: 300 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Preference</TableCell>
                    <TableCell align="right">Users</TableCell>
                    <TableCell align="right">%</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analytics.workPreferences.map((pref, index) => (
                    <TableRow key={index}>
                      <TableCell>{pref.preference}</TableCell>
                      <TableCell align="right">{pref.count}</TableCell>
                      <TableCell align="right">
                        {((pref.count / analytics.totalUsers) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CareerAnalyticsPage;