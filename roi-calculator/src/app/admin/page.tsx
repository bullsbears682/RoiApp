'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Calculator, 
  TrendingUp, 
  Globe, 
  Search, 
  Filter,
  Download,
  RefreshCw,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  _count?: {
    calculations: number;
  };
}

interface Calculation {
  id: string;
  businessType: string;
  scenario: string;
  country: string;
  currency: string;
  timeframe: string;
  createdAt: string;
  user?: {
    email: string;
    name?: string;
  };
}

interface Analytics {
  totalUsers: number;
  totalCalculations: number;
  activeUsers: number;
  topBusinessTypes: Array<{ name: string; count: number }>;
  topCountries: Array<{ name: string; count: number }>;
  recentActivity: Array<{
    type: 'user_signup' | 'calculation';
    description: string;
    timestamp: string;
  }>;
}

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'calculations' | 'analytics'>('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  // Mock data for demonstration (in a real app, this would come from APIs)
  useEffect(() => {
    if (user?.role === 'ADMIN') {
      // Simulate loading data
      setTimeout(() => {
        setUsers([
          {
            id: '1',
            email: 'john@example.com',
            name: 'John Doe',
            role: 'USER',
            createdAt: '2024-01-15T10:30:00Z',
            _count: { calculations: 5 }
          },
          {
            id: '2',
            email: 'jane@startup.com',
            name: 'Jane Smith',
            role: 'USER',
            createdAt: '2024-01-20T14:15:00Z',
            _count: { calculations: 12 }
          },
          {
            id: '3',
            email: 'admin@roicalc.com',
            name: 'Admin User',
            role: 'ADMIN',
            createdAt: '2024-01-01T09:00:00Z',
            _count: { calculations: 3 }
          }
        ]);

        setCalculations([
          {
            id: '1',
            businessType: 'Tech Startup',
            scenario: 'SaaS MVP',
            country: 'United States',
            currency: 'USD',
            timeframe: 'Monthly',
            createdAt: '2024-01-25T16:45:00Z',
            user: { email: 'john@example.com', name: 'John Doe' }
          },
          {
            id: '2',
            businessType: 'E-commerce',
            scenario: 'Dropshipping',
            country: 'United Kingdom',
            currency: 'GBP',
            timeframe: 'Quarterly',
            createdAt: '2024-01-25T15:30:00Z',
            user: { email: 'jane@startup.com', name: 'Jane Smith' }
          }
        ]);

        setAnalytics({
          totalUsers: 156,
          totalCalculations: 1247,
          activeUsers: 89,
          topBusinessTypes: [
            { name: 'Tech Startup', count: 245 },
            { name: 'E-commerce', count: 198 },
            { name: 'Consulting', count: 156 },
            { name: 'SaaS', count: 134 },
            { name: 'Retail', count: 98 }
          ],
          topCountries: [
            { name: 'United States', count: 456 },
            { name: 'United Kingdom', count: 234 },
            { name: 'Canada', count: 189 },
            { name: 'Germany', count: 167 },
            { name: 'Australia', count: 134 }
          ],
          recentActivity: [
            {
              type: 'calculation',
              description: 'New ROI calculation for Tech Startup',
              timestamp: '2024-01-25T16:45:00Z'
            },
            {
              type: 'user_signup',
              description: 'New user registered: jane@startup.com',
              timestamp: '2024-01-25T15:30:00Z'
            }
          ]
        });

        setIsLoadingData(false);
      }, 1000);
    }
  }, [user]);

  if (isLoading || !user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Restricted</h1>
          <p className="text-muted-foreground">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCalculations = calculations.filter(calc =>
    calc.businessType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    calc.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    calc.user?.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, monitor usage, and view analytics</p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'calculations', label: 'Calculations', icon: Calculator },
              { id: 'analytics', label: 'Analytics', icon: Globe },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && analytics && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Calculations</CardTitle>
                  <Calculator className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalCalculations}</div>
                  <p className="text-xs text-muted-foreground">+23% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Calculations/User</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(analytics.totalCalculations / analytics.totalUsers).toFixed(1)}</div>
                  <p className="text-xs text-muted-foreground">All time average</p>
                </CardContent>
              </Card>
            </div>

            {/* Top Business Types and Countries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Business Types</CardTitle>
                  <CardDescription>Most popular business types for ROI calculations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.topBusinessTypes.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">#{index + 1}</span>
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Countries</CardTitle>
                  <CardDescription>Countries with most ROI calculations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.topCountries.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">#{index + 1}</span>
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users by email or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>Users ({filteredUsers.length})</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">User</th>
                        <th className="text-left py-3 px-4 font-medium">Role</th>
                        <th className="text-left py-3 px-4 font-medium">Calculations</th>
                        <th className="text-left py-3 px-4 font-medium">Joined</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium">{user.name || 'No name'}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.role === 'ADMIN' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">{user._count?.calculations || 0}</td>
                          <td className="py-3 px-4">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Calculations Tab */}
        {activeTab === 'calculations' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search calculations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Calculations Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Calculations ({filteredCalculations.length})</CardTitle>
                <CardDescription>Monitor ROI calculation activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Business Type</th>
                        <th className="text-left py-3 px-4 font-medium">Scenario</th>
                        <th className="text-left py-3 px-4 font-medium">Country</th>
                        <th className="text-left py-3 px-4 font-medium">User</th>
                        <th className="text-left py-3 px-4 font-medium">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCalculations.map((calc) => (
                        <tr key={calc.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">{calc.businessType}</td>
                          <td className="py-3 px-4">{calc.scenario}</td>
                          <td className="py-3 px-4">{calc.country}</td>
                          <td className="py-3 px-4">
                            <div className="text-sm">
                              <div>{calc.user?.name || 'Anonymous'}</div>
                              <div className="text-muted-foreground">{calc.user?.email}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {new Date(calc.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && analytics && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>Detailed insights into application usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Advanced Analytics Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Detailed charts, user behavior analysis, and performance metrics will be available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}