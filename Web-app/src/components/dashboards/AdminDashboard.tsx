import React, { useState } from 'react';
import Layout from '../common/Layout';
import { 
  Users, Activity, Database, Shield, TrendingUp, AlertTriangle, 
  Server, UserCheck, Settings, BarChart3, Calendar, Clock 
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // const [activeTab, setActiveTab] = useState('overview');

  const systemStats = [
    { label: 'Total Users', value: '247', icon: Users, color: 'bg-blue-500', trend: '+12 this month', change: '+5.1%' },
    { label: 'Active Sessions', value: '89', icon: Activity, color: 'bg-green-500', trend: '23 doctors, 66 nurses', change: '+2.3%' },
    { label: 'System Uptime', value: '99.9%', icon: Server, color: 'bg-purple-500', trend: '45 days continuous', change: '0%' },
    { label: 'Security Alerts', value: '2', icon: Shield, color: 'bg-red-500', trend: '1 resolved today', change: '-50%' },
  ];

  const departmentStats = [
    { name: 'Cardiology', patients: 42, staff: 15, occupancy: '85%', color: 'bg-blue-500' },
    { name: 'Emergency', patients: 28, staff: 22, occupancy: '92%', color: 'bg-red-500' },
    { name: 'Pediatrics', patients: 19, staff: 12, occupancy: '63%', color: 'bg-green-500' },
    { name: 'Surgery', patients: 31, staff: 18, occupancy: '78%', color: 'bg-purple-500' },
    { name: 'ICU', patients: 16, staff: 25, occupancy: '89%', color: 'bg-yellow-500' },
  ];

  const recentAlerts = [
    { type: 'security', message: 'Failed login attempt detected for admin account', time: '5 min ago', severity: 'high' },
    { type: 'system', message: 'Database backup completed successfully', time: '1 hour ago', severity: 'low' },
    { type: 'performance', message: 'Server response time elevated in ICU module', time: '2 hours ago', severity: 'medium' },
    { type: 'user', message: 'New doctor account created: Dr. Lisa Wang', time: '3 hours ago', severity: 'low' },
  ];

  const userActivity = [
    { role: 'Doctors', active: 23, total: 45, percentage: 51 },
    { role: 'Nurses', active: 66, total: 120, percentage: 55 },
    { role: 'Admin Staff', active: 8, total: 15, percentage: 53 },
    { role: 'Family Members', active: 34, total: 67, percentage: 51 },
  ];

  const systemHealth = [
    { component: 'Web Server', status: 'healthy', uptime: '99.9%', response: '120ms' },
    { component: 'Database', status: 'healthy', uptime: '99.8%', response: '45ms' },
    { component: 'Authentication', status: 'healthy', uptime: '100%', response: '80ms' },
    { component: 'Medication API', status: 'warning', uptime: '98.2%', response: '250ms' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Layout title="System Administration">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">System Overview</h2>
              <p className="text-red-100 mt-1">MedTracker Pro administration console</p>
            </div>
            <Database className="h-12 w-12 text-red-200" />
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs font-medium ${
                      stat.change.startsWith('+') ? 'text-green-600' : 
                      stat.change === '0%' ? 'text-gray-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">{stat.trend}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department Overview */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Department Overview</h3>
                <BarChart3 className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${dept.color} mr-3`}></div>
                        <h4 className="font-medium text-gray-900">{dept.name}</h4>
                      </div>
                      <span className="text-sm font-medium text-gray-600">Occupancy: {dept.occupancy}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Patients</p>
                        <p className="text-lg font-semibold text-gray-900">{dept.patients}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Staff</p>
                        <p className="text-lg font-semibold text-gray-900">{dept.staff}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${dept.color}`}
                          style={{ width: dept.occupancy }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
                <AlertTriangle className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${getSeverityColor(alert.severity)}`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Activity & System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <UserCheck className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {userActivity.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{user.role}</p>
                      <p className="text-sm text-gray-600">{user.active} of {user.total} active</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{user.percentage}%</p>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${user.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Server className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {systemHealth.map((component, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{component.component}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(component.status)}`}>
                        {component.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p>Uptime: {component.uptime}</p>
                      </div>
                      <div>
                        <p>Response: {component.response}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="flex flex-wrap gap-4">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
            <Users className="h-4 w-4 mr-2" />
            User Management
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 transition-colors">
            Generate Reports
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 transition-colors">
            Backup Database
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;