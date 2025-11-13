# Careerion Admin Panel 👨‍💼

React + TypeScript admin dashboard for managing the Careerion platform.

## 📋 Overview

The admin panel provides comprehensive management tools for:
- User management and moderation
- Job listings management
- Company profiles
- Application tracking
- Analytics and reporting
- System settings
- Content moderation

## 🛠 Tech Stack

- **Framework:** React 18.3 with TypeScript
- **Build Tool:** Vite 6.0
- **Styling:** Tailwind CSS 3.4
- **State Management:** React Context API
- **Routing:** React Router DOM 7.0
- **HTTP Client:** Axios 1.7
- **Charts:** Recharts 2.15
- **Icons:** Lucide React 0.468
- **Testing:** Vitest + React Testing Library

## 📁 Project Structure

```
admin-panel/
├── src/
│   ├── components/          # React components
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   └── charts/
│   │       └── AnalyticsChart.tsx
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx
│   │   ├── UsersPage.tsx
│   │   ├── JobsPage.tsx
│   │   ├── CompaniesPage.tsx
│   │   ├── ApplicationsPage.tsx
│   │   ├── CareerAnalyticsPage.tsx
│   │   └── SettingsPage.tsx
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx
│   ├── __tests__/          # Test files
│   │   └── Dashboard.test.tsx
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── Dockerfile              # Docker configuration
├── nginx.conf              # Nginx configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- Backend API running on http://localhost:5001
- Admin credentials

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

Application will run on http://localhost:5174

### Build for Production

```bash
# Build
npm run build

# Preview production build
npm run preview
```

## ✨ Features

### 1. Dashboard
- Overview statistics
- User growth charts
- Job posting trends
- Application metrics
- Recent activity feed
- Quick actions

### 2. User Management
- View all users
- Search and filter users
- User details and profiles
- Ban/unban users
- Role management (user/admin)
- Activity logs

### 3. Job Management
- Create new job listings
- Edit existing jobs
- Delete jobs
- Job status management
- Application tracking per job
- Job analytics

### 4. Company Management
- Add new companies
- Edit company profiles
- Company verification
- Company statistics
- Associated jobs

### 5. Application Tracking
- View all applications
- Filter by status (pending/accepted/rejected)
- Application details
- Bulk actions
- Export data

### 6. Analytics
- User engagement metrics
- Career chat usage
- Popular career categories
- Job application trends
- Conversion rates
- Custom date ranges

### 7. Settings
- Platform configuration
- Email templates
- API settings
- Security settings
- Backup and restore

## 🎨 Pages

### Dashboard
```tsx
// Main dashboard with overview
<Dashboard />
```

Features:
- Total users, jobs, applications
- Growth charts
- Recent activity
- Quick stats

### Users Page
```tsx
// User management interface
<UsersPage />
```

Features:
- User list with search
- User details modal
- Ban/unban actions
- Role assignment

### Jobs Page
```tsx
// Job management interface
<JobsPage />
```

Features:
- Job listings table
- Create/edit job modal
- Delete confirmation
- Status toggle

### Companies Page
```tsx
// Company management
<CompaniesPage />
```

Features:
- Company directory
- Add/edit company
- Verification status
- Company analytics

### Applications Page
```tsx
// Application tracking
<ApplicationsPage />
```

Features:
- Application list
- Status filters
- Bulk actions
- Export functionality

### Career Analytics
```tsx
// Detailed analytics
<CareerAnalyticsPage />
```

Features:
- Chat usage statistics
- Category popularity
- User engagement
- AI model performance

### Settings
```tsx
// Platform settings
<SettingsPage />
```

Features:
- General settings
- Email configuration
- API keys management
- Security options

## 🧪 Testing

### Run Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Example
```typescript
describe('Dashboard', () => {
  test('renders dashboard statistics', () => {
    render(<Dashboard />);
    
    expect(screen.getByText(/Total Users/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Jobs/i)).toBeInTheDocument();
  });
});
```

## 🔐 Authentication

### Admin Login Flow
1. Admin enters credentials
2. Backend validates and returns JWT
3. Token stored in localStorage
4. Protected routes check for admin role
5. Unauthorized access redirected to login

```typescript
// Protected route
<Route
  path="/admin/*"
  element={
    <ProtectedRoute requireAdmin>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

## 📊 Components

### Sidebar Navigation
```tsx
<Sidebar>
  <SidebarItem icon={Home} label="Dashboard" to="/admin" />
  <SidebarItem icon={Users} label="Users" to="/admin/users" />
  <SidebarItem icon={Briefcase} label="Jobs" to="/admin/jobs" />
  {/* ... */}
</Sidebar>
```

### Analytics Chart
```tsx
<AnalyticsChart
  data={chartData}
  xKey="date"
  yKey="value"
  title="User Growth"
/>
```

### Data Table
```tsx
<DataTable
  columns={columns}
  data={users}
  onRowClick={handleRowClick}
  searchable
  sortable
/>
```

## 🎨 Styling

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        admin: {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444'
        }
      }
    }
  }
}
```

### Custom Styles
- Admin-specific color scheme
- Data table styling
- Chart customization
- Modal designs
- Form layouts

## 📈 Analytics Integration

### Recharts Implementation
```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

<LineChart data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
  <Line type="monotone" dataKey="users" stroke="#3b82f6" />
</LineChart>
```

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
VITE_API_URL=http://localhost:5001/api

# Optional
VITE_ADMIN_PANEL_NAME=Careerion Admin
VITE_ADMIN_VERSION=1.0.0
```

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': 'http://localhost:5001'
    }
  }
});
```

## 🐳 Docker

### Build Image
```bash
docker build \
  --build-arg VITE_API_URL=http://localhost:5001/api \
  -t careerion-admin .
```

### Run Container
```bash
docker run -d \
  -p 3001:80 \
  --name careerion-admin \
  careerion-admin
```

### Docker Compose
```bash
docker-compose up -d admin-panel
```

## 🔒 Security

### Admin Authorization
- JWT token validation
- Role-based access control (RBAC)
- Admin-only routes
- Secure API calls

```typescript
// Check admin role
const isAdmin = currentUser?.role === 'admin';

if (!isAdmin) {
  return <Navigate to="/login" />;
}
```

### Data Protection
- Input validation
- XSS prevention
- CSRF protection
- Secure token storage

## 📊 Data Management

### API Calls
```typescript
// Get all users
const fetchUsers = async () => {
  const response = await axios.get('/api/admin/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Update user
const updateUser = async (userId, data) => {
  await axios.put(`/api/admin/users/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
```

### State Management
```typescript
// AuthContext for admin state
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAdmin: false,
  login: () => {},
  logout: () => {}
});
```

## 🚀 Performance

### Optimization
- Lazy loading for routes
- Memoization for expensive calculations
- Virtual scrolling for large tables
- Debounced search inputs
- Optimized re-renders

```tsx
// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
```

## 🐛 Debugging

### Development Tools
```bash
# React DevTools
npm install -g react-devtools

# Check API calls
# Use browser Network tab
```

### Common Issues

**Issue:** Unauthorized access
```typescript
// Check token
console.log(localStorage.getItem('adminToken'));

// Verify admin role
console.log(currentUser?.role);
```

**Issue:** Charts not rendering
```bash
# Verify Recharts installation
npm list recharts

# Check data format
console.log(chartData);
```

## 📝 Scripts

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "lint": "eslint . --ext ts,tsx",
  "format": "prettier --write \"src/**/*.{ts,tsx}\""
}
```

## 🎯 Best Practices

1. **Code Organization**
   - Separate components by feature
   - Use TypeScript for type safety
   - Keep components small and focused

2. **State Management**
   - Use Context for global state
   - Local state for component-specific data
   - Avoid prop drilling

3. **Performance**
   - Lazy load heavy components
   - Memoize expensive calculations
   - Optimize re-renders

4. **Security**
   - Always validate admin role
   - Sanitize user inputs
   - Use secure API calls

## 🚀 Deployment

### Production Build
```bash
# Build
npm run build

# Output in dist/ folder
# Deploy to:
# - Netlify
# - Vercel
# - AWS S3
# - Nginx server
```

### Nginx Configuration
```nginx
server {
  listen 80;
  server_name admin.careerion.com;
  root /usr/share/nginx/html;
  
  location / {
    try_files $uri $uri/ /index.html;
  }
  
  # Security headers
  add_header X-Frame-Options "SAMEORIGIN";
  add_header X-Content-Type-Options "nosniff";
}
```

## 🤝 Contributing

1. Follow React best practices
2. Use TypeScript for all new code
3. Write tests for new features
4. Update documentation
5. Follow the existing code style

## 📞 Support

For admin panel issues:
- Check browser console
- Verify admin credentials
- Check API connectivity
- Review authorization headers

---

**Admin Panel Version:** 1.0.0
**Last Updated:** November 11, 2025
