import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Save,
  Security,
  Notifications,
  Storage,
  Api,
  Delete,
  Add,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SettingsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  '& .MuiCardHeader-root': {
    backgroundColor: theme.palette.grey[50],
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Careerion Admin',
    siteDescription: 'AI-powered career guidance platform',
    maintenanceMode: false,
    
    // API Settings
    geminiApiKey: '',
    mongoUri: '',
    jwtSecret: '',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    adminAlerts: true,
    
    // Security Settings
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    requireTwoFactor: false,
    
    // Career AI Settings
    maxResponseLength: 1000,
    enablePersonalization: true,
    enableAnalytics: true,
  });

  const [apiKeys, setApiKeys] = useState([
    { name: 'Gemini API', key: 'AIzaSy...', status: 'active' },
    { name: 'MongoDB', key: 'mongodb://...', status: 'active' },
  ]);

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Load settings from backend
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Mock loading settings - replace with actual API call
      console.log('Loading settings...');
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = async () => {
    setSaveStatus('saving');
    try {
      // Mock save - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleDeleteApiKey = (index: number) => {
    setApiKeys(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 3 }}>
        System Settings
      </Typography>

      {saveStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      {saveStatus === 'error' && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to save settings. Please try again.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <SettingsCard>
            <CardHeader
              title="General Settings"
              avatar={<Storage color="primary" />}
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Site Name"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange('siteName', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Site Description"
                  multiline
                  rows={3}
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.maintenanceMode}
                      onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                    />
                  }
                  label="Maintenance Mode"
                />
              </Box>
            </CardContent>
          </SettingsCard>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <SettingsCard>
            <CardHeader
              title="Security Settings"
              avatar={<Security color="primary" />}
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Session Timeout (hours)"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                />
                <TextField
                  fullWidth
                  label="Max Login Attempts"
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.requireTwoFactor}
                      onChange={(e) => handleSettingChange('requireTwoFactor', e.target.checked)}
                    />
                  }
                  label="Require Two-Factor Authentication"
                />
              </Box>
            </CardContent>
          </SettingsCard>
        </Grid>

        {/* API Configuration */}
        <Grid item xs={12} md={6}>
          <SettingsCard>
            <CardHeader
              title="API Configuration"
              avatar={<Api color="primary" />}
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Gemini API Key"
                  type="password"
                  value={settings.geminiApiKey}
                  onChange={(e) => handleSettingChange('geminiApiKey', e.target.value)}
                  helperText="Used for AI career recommendations"
                />
                <TextField
                  fullWidth
                  label="MongoDB URI"
                  type="password"
                  value={settings.mongoUri}
                  onChange={(e) => handleSettingChange('mongoUri', e.target.value)}
                  helperText="Database connection string"
                />
                <TextField
                  fullWidth
                  label="JWT Secret"
                  type="password"
                  value={settings.jwtSecret}
                  onChange={(e) => handleSettingChange('jwtSecret', e.target.value)}
                  helperText="Secret key for JWT tokens"
                />
              </Box>
            </CardContent>
          </SettingsCard>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <SettingsCard>
            <CardHeader
              title="Notification Settings"
              avatar={<Notifications color="primary" />}
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                    />
                  }
                  label="Push Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.adminAlerts}
                      onChange={(e) => handleSettingChange('adminAlerts', e.target.checked)}
                    />
                  }
                  label="Admin Alerts"
                />
              </Box>
            </CardContent>
          </SettingsCard>
        </Grid>

        {/* Career AI Settings */}
        <Grid item xs={12}>
          <SettingsCard>
            <CardHeader
              title="Career AI Configuration"
              avatar={<Api color="primary" />}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Max Response Length"
                    type="number"
                    value={settings.maxResponseLength}
                    onChange={(e) => handleSettingChange('maxResponseLength', parseInt(e.target.value))}
                    helperText="Maximum words in AI responses"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.enablePersonalization}
                        onChange={(e) => handleSettingChange('enablePersonalization', e.target.checked)}
                      />
                    }
                    label="Enable Personalization"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.enableAnalytics}
                        onChange={(e) => handleSettingChange('enableAnalytics', e.target.checked)}
                      />
                    }
                    label="Enable Analytics"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </SettingsCard>
        </Grid>

        {/* API Keys Management */}
        <Grid item xs={12}>
          <SettingsCard>
            <CardHeader
              title="API Keys Status"
              action={
                <Button startIcon={<Add />} size="small">
                  Add Key
                </Button>
              }
            />
            <CardContent>
              <List>
                {apiKeys.map((apiKey, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={apiKey.name}
                      secondary={`${apiKey.key.substring(0, 10)}...`}
                    />
                    <Chip
                      label={apiKey.status}
                      color={apiKey.status === 'active' ? 'success' : 'error'}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => handleDeleteApiKey(index)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </SettingsCard>
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<Save />}
          onClick={handleSaveSettings}
          disabled={saveStatus === 'saving'}
          sx={{ minWidth: 150 }}
        >
          {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsPage;