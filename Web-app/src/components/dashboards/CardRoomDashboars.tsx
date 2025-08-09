import React, { useState } from 'react';
import Layout from '../common/Layout';
import { UserPlus, Users, FileText, Search, Calendar, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';

const CardRoomDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Patients Registered Today', value: '12', icon: UserPlus, color: 'bg-blue-500', trend: '+3 since morning' },
    { label: 'Pending Registrations', value: '5', icon: Clock, color: 'bg-orange-500', trend: '2 in process' },
    { label: 'Total Active Patients', value: '147', icon: Users, color: 'bg-green-500', trend: '+8 this week' },
    { label: 'Discharge Processing', value: '7', icon: FileText, color: 'bg-purple-500', trend: '3 completed today' },
  ];

  const pendingRegistrations = [
    { id: 1, name: 'Jennifer Martinez', type: 'Emergency', time: '2:30 PM', status: 'in_progress', priority: 'high', insurance: 'Blue Cross' },
    { id: 2, name: 'David Wilson', type: 'Scheduled Surgery', time: '3:00 PM', status: 'waiting', priority: 'medium', insurance: 'Aetna' },
    { id: 3, name: 'Lisa Anderson', type: 'Outpatient', time: '3:15 PM', status: 'documents_needed', priority: 'low', insurance: 'Medicare' },
  ];

  const recentActivities = [
    { type: 'registration', patient: 'Michael Brown', action: 'Registered for surgery', time: '1 hour ago', status: 'completed' },
    { type: 'discharge', patient: 'Sarah Davis', action: 'Discharge processed', time: '2 hours ago', status: 'completed' },
    { type: 'update', patient: 'Robert Johnson', action: 'Insurance information updated', time: '3 hours ago', status: 'completed' },
    { type: 'transfer', patient: 'Amy Wilson', action: 'Room transfer processed', time: '4 hours ago', status: 'completed' },
  ];

  const todayAppointments = [
    { time: '9:00 AM', patient: 'John Smith', doctor: 'Dr. Johnson', type: 'Follow-up', status: 'completed' },
    { time: '10:30 AM', patient: 'Mary Brown', doctor: 'Dr. Williams', type: 'Surgery Prep', status: 'in_progress' },
    { time: '2:00 PM', patient: 'James Wilson', doctor: 'Dr. Davis', type: 'Consultation', status: 'scheduled' },
    { time: '3:30 PM', patient: 'Linda Johnson', doctor: 'Dr. Thompson', type: 'Post-op Check', status: 'scheduled' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'documents_needed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <Layout title="Registration Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Good Morning, Maria</h2>
              <p className="text-orange-100 mt-1">5 patients are waiting for registration assistance</p>
            </div>
            <UserPlus className="h-12 w-12 text-orange-200" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Registrations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Pending Registrations</h3>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                  <Plus className="h-4 w-4 mr-1" />
                  New Registration
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {pendingRegistrations.map((registration) => (
                  <div key={registration.id} className={`border-l-4 ${getPriorityColor(registration.priority)} bg-white p-4 rounded-r-lg border border-gray-200`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{registration.name}</h4>
                        <p className="text-sm text-gray-600">{registration.type} • {registration.insurance}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Arrived: {registration.time}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(registration.status)} mt-1`}>
                          {registration.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                        Process
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {todayAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-center">
                        <Clock className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                        <span className="text-sm font-medium text-gray-700">{appointment.time}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{appointment.patient}</h4>
                        <p className="text-sm text-gray-600">{appointment.doctor} • {appointment.type}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {activity.type === 'registration' && <UserPlus className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'discharge' && <FileText className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'update' && <CheckCircle className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'transfer' && <Users className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.patient}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Patient Registration
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Process Discharge
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 transition-colors">
            Insurance Verification
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 transition-colors">
            View Reports
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CardRoomDashboard;