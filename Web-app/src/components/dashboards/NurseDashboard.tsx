import React, { useState } from 'react';
import Layout from '../common/Layout';
import { Activity, Clock, Users, AlertTriangle, Pill, CheckSquare, Calendar, Plus } from 'lucide-react';

const NurseDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('medications');

  const medicationSchedule = [
    { id: 1, patient: 'John Doe', room: '101A', medication: 'Insulin', time: '10:00 AM', status: 'due', priority: 'high' },
    { id: 2, patient: 'Sarah Wilson', room: '203B', medication: 'Blood Pressure Medication', time: '10:30 AM', status: 'completed', priority: 'medium' },
    { id: 3, patient: 'Michael Brown', room: '305C', medication: 'Pain Relief', time: '11:00 AM', status: 'overdue', priority: 'high' },
    { id: 4, patient: 'Alice Johnson', room: '102A', medication: 'Antibiotics', time: '11:30 AM', status: 'due', priority: 'medium' },
  ];

  const vitalsChecks = [
    { patient: 'Emma Davis', room: '204A', nextCheck: '12:00 PM', lastReading: 'BP: 120/80, HR: 72', status: 'normal' },
    { patient: 'Robert Johnson', room: '301B', nextCheck: '12:30 PM', lastReading: 'BP: 140/90, HR: 88', status: 'elevated' },
    { patient: 'Linda Wilson', room: '103C', nextCheck: '1:00 PM', lastReading: 'BP: 110/70, HR: 65', status: 'normal' },
  ];

  const alerts = [
    { type: 'medication', message: 'Patient in Room 305C refused medication', time: '5 min ago', severity: 'high' },
    { type: 'vitals', message: 'Elevated blood pressure - Room 301B', time: '10 min ago', severity: 'medium' },
    { type: 'system', message: 'New doctor\'s order for Room 102A', time: '15 min ago', severity: 'low' },
  ];

  const stats = [
    { label: 'Patients Assigned', value: '16', icon: Users, color: 'bg-blue-500' },
    { label: 'Medications Due', value: '8', icon: Pill, color: 'bg-orange-500' },
    { label: 'Completed Today', value: '24', icon: CheckSquare, color: 'bg-green-500' },
    { label: 'Active Alerts', value: '3', icon: AlertTriangle, color: 'bg-red-500' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'due': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-blue-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <Layout title="Nurse Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Good Morning, Nurse Rodriguez</h2>
              <p className="text-green-100 mt-1">You have 8 medications due in the next hour</p>
            </div>
            <Activity className="h-12 w-12 text-green-200" />
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
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Medication Schedule */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Medication Schedule</h3>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Refresh
                  </button>
                  <span className="text-gray-300">|</span>
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Last updated: 2 min ago</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {medicationSchedule.map((med) => (
                  <div key={med.id} className={`bg-white border-l-4 ${getPriorityColor(med.priority)} p-4 rounded-r-lg border border-gray-200 shadow-sm`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="font-medium text-gray-900">{med.patient}</h4>
                            <p className="text-sm text-gray-600">Room {med.room} • {med.medication}</p>
                          </div>
                          <div className="text-center">
                            <Clock className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                            <span className="text-sm font-medium text-gray-700">{med.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(med.status)}`}>
                          {med.status}
                        </span>
                        {med.status === 'due' && (
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Administer
                          </button>
                        )}
                        {med.status === 'overdue' && (
                          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Mark Late
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts & Vitals */}
          <div className="space-y-6">
            {/* Alerts */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.severity === 'high' ? 'bg-red-500' :
                        alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Vitals */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Vitals Schedule</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {vitalsChecks.map((vital, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{vital.patient}</h4>
                        <span className="text-sm text-gray-500">Room {vital.room}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{vital.lastReading}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Next: {vital.nextCheck}</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          vital.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {vital.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Medication Record
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Record Vitals
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 transition-colors">
            Patient Reports
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NurseDashboard;