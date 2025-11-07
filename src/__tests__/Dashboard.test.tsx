// Admin Dashboard Component Tests
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import axios from 'axios';
import Dashboard from '../pages/Dashboard';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockStats = {
    totalUsers: 150,
    totalJobs: 45,
    totalCompanies: 20,
    totalApplications: 89
};

const mockUsers = [
    {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date().toISOString()
    },
    {
        _id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        createdAt: new Date().toISOString()
    }
];

describe('Dashboard Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('adminToken', 'test-token');
    });

    test('renders dashboard title', () => {
        mockedAxios.get.mockResolvedValue({ data: mockStats });
        
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        
        expect(screen.getByText(/Dashboard Overview/i)).toBeInTheDocument();
    });

    test('fetches and displays statistics', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockStats });
        mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });
        
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        
        await waitFor(() => {
            expect(screen.getByText('150')).toBeInTheDocument(); // Total Users
            expect(screen.getByText('45')).toBeInTheDocument(); // Total Jobs
            expect(screen.getByText('20')).toBeInTheDocument(); // Total Companies
            expect(screen.getByText('89')).toBeInTheDocument(); // Total Applications
        });
    });

    test('displays stat cards', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockStats });
        mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });
        
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        
        await waitFor(() => {
            expect(screen.getByText(/Total Users/i)).toBeInTheDocument();
            expect(screen.getByText(/Total Jobs/i)).toBeInTheDocument();
            expect(screen.getByText(/Total Companies/i)).toBeInTheDocument();
            expect(screen.getByText(/Applications/i)).toBeInTheDocument();
        });
    });

    test('displays recent users', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockStats });
        mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });
        
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        
        await waitFor(() => {
            expect(screen.getByText(/Recent Users/i)).toBeInTheDocument();
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        });
    });

    test('shows loading state', () => {
        mockedAxios.get.mockImplementation(() => 
            new Promise(resolve => setTimeout(() => resolve({ data: mockStats }), 1000))
        );
        
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    test('handles API error gracefully', async () => {
        mockedAxios.get.mockRejectedValue(new Error('API Error'));
        
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        
        await waitFor(() => {
            // Should still render without crashing
            expect(screen.getByText(/Dashboard Overview/i)).toBeInTheDocument();
        });
    });

    test('displays platform health status', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockStats });
        mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });
        
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        
        await waitFor(() => {
            expect(screen.getByText(/Platform Health Status/i)).toBeInTheDocument();
            expect(screen.getByText(/AI Career Recommendations: Active/i)).toBeInTheDocument();
        });
    });
});
