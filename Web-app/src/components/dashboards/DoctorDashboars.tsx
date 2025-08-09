import React, { useState } from 'react';
import Layout from '../common/Layout';
import { Calendar, Users, FileText, TrendingUp, Clock, AlertCircle, CheckCircle, Plus } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Active Patients', value: '24', icon: Users, color: 'bg-blue-500', trend: '+2 today' },
    { label: 'Prescriptions Today', value: '12', icon: FileText, color: 'bg-green-500', trend: '+5 pending' },
    { label: 'Critical Alerts', value: '3', icon: AlertCircle, color: 'bg-red-500', trend: 'Requires attention' },
    { label: 'Completed Rounds', value: '8', icon: CheckCircle, color: 'bg-indigo-500', trend: '92% completion' },
  ];

  const recentPatients = [
    { id: 1, name: 'John Doe', room: '101A', condition: 'Post-operative', lastVisit: '2 hours ago', status: 'stable' },
    { id: 2, name: 'Sarah Wilson', room: '203B', condition: 'Cardiac Monitoring', lastVisit: '4 hours ago', status: 'critical' },
    { id: 3, name: 'Michael Brown', room: '305C', condition: 'Recovery', lastVisit: '1 hour ago', status: 'improving' },
  ];

  const pendingPrescriptions = [
    { patient: 'Alice Johnson', medication: 'Metformin 500mg', time: '2:00 PM', status: 'pending' },
    { patient: 'Bob Smith', medication: 'Lisinopril 10mg', time: '3:30 PM', status: 'overdue' },
    { patient: 'Carol White', medication: 'Atorvastatin 20mg', time: '4:00 PM', status: 'scheduled' },
  ];

  return (
    <Layout title="Doctor Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Good Morning, Dr. Johnson</h2>
              <p className="text-blue-100 mt-1">You have 5 patients scheduled for rounds today</p>
            </div>
            <Calendar className="h-12 w-12 text-blue-200" />
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
          {/* Recent Patients */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Patients</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{patient.name}</h4>
                      <p className="text-sm text-gray-600">Room {patient.room} • {patient.condition}</p>
                      <p className="text-xs text-gray-500 mt-1">Last visit: {patient.lastVisit}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        patient.status === 'stable' ? 'bg-green-100 text-green-800' :
                        patient.status === 'critical' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Prescriptions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Medication Reviews</h3>
                <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                  <Plus className="h-4 w-4 mr-1" />
                  New Prescription
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {pendingPrescriptions.map((prescription, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{prescription.patient}</h4>
                      <p className="text-sm text-gray-600">{prescription.medication}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">Due: {prescription.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        prescription.status === 'overdue' ? 'bg-red-100 text-red-800' :
                        prescription.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {prescription.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Start Patient Rounds
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 transition-colors">
            View All Patients
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 transition-colors">
            Prescription History
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;