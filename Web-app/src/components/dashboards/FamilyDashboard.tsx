import React, { useState } from 'react';
import Layout from '../common/Layout';
import { Heart, Clock, FileText, Phone, Calendar, User, Pill, Activity } from 'lucide-react';

const FamilyDashboard: React.FC = () => {
  const patientInfo = {
    name: 'Robert Smith',
    age: 67,
    room: '205B',
    admissionDate: '2024-01-15',
    condition: 'Post-surgical recovery',
    doctor: 'Dr. Sarah Johnson',
    nurse: 'Emily Rodriguez',
  };

  const medications = [
    { name: 'Pain Relief Medication', dosage: '10mg', frequency: 'Every 6 hours', nextDue: '2:00 PM', status: 'on-time' },
    { name: 'Antibiotic', dosage: '250mg', frequency: 'Every 8 hours', nextDue: '4:00 PM', status: 'scheduled' },
    { name: 'Blood Pressure Medication', dosage: '5mg', frequency: 'Daily', nextDue: '8:00 AM (Tomorrow)', status: 'scheduled' },
  ];

  const vitals = [
    { type: 'Blood Pressure', value: '125/82 mmHg', time: '10:00 AM', status: 'normal' },
    { type: 'Heart Rate', value: '74 bpm', time: '10:00 AM', status: 'normal' },
    { type: 'Temperature', value: '98.6°F', time: '10:00 AM', status: 'normal' },
    { type: 'Oxygen Level', value: '98%', time: '10:00 AM', status: 'normal' },
  ];

  const recentUpdates = [
    { type: 'medication', message: 'Pain medication administered at 8:00 AM', time: '2 hours ago', icon: Pill },
    { type: 'vitals', message: 'Vitals check completed - all normal', time: '2 hours ago', icon: Activity },
    { type: 'visit', message: 'Dr. Johnson completed morning rounds', time: '3 hours ago', icon: User },
    { type: 'care', message: 'Physical therapy session scheduled for 2:00 PM', time: '4 hours ago', icon: Calendar },
  ];

  const visitingHours = {
    weekday: '10:00 AM - 8:00 PM',
    weekend: '10:00 AM - 6:00 PM',
    today: 'Monday - Open until 8:00 PM',
  };

  return (
    <Layout title="Family Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome, John Smith</h2>
              <p className="text-purple-100 mt-1">Here's the latest update on {patientInfo.name}'s care</p>
            </div>
            <Heart className="h-12 w-12 text-purple-200" />
          </div>
        </div>

        {/* Patient Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Patient</p>
                  <p className="mt-1 text-lg font-medium text-gray-900">{patientInfo.name}</p>
                  <p className="text-sm text-gray-600">Age {patientInfo.age}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Room</p>
                  <p className="mt-1 text-lg font-medium text-gray-900">{patientInfo.room}</p>
                  <p className="text-sm text-gray-600">General Ward</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Primary Doctor</p>
                  <p className="mt-1 text-lg font-medium text-gray-900">{patientInfo.doctor}</p>
                  <p className="text-sm text-gray-600">Cardiology</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Primary Nurse</p>
                  <p className="mt-1 text-lg font-medium text-gray-900">{patientInfo.nurse}</p>
                  <p className="text-sm text-gray-600">Day Shift</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">Current Condition</p>
                <p className="mt-1 text-blue-800">{patientInfo.condition}</p>
                <p className="text-xs text-blue-600 mt-1">Admitted on {new Date(patientInfo.admissionDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Medications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Pill className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Current Medications</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {medications.map((med, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{med.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{med.dosage} • {med.frequency}</p>
                        <div className="flex items-center mt-2">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-500">Next dose: {med.nextDue}</span>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        med.status === 'on-time' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {med.status === 'on-time' ? 'On schedule' : 'Scheduled'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Latest Vitals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Latest Vitals</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {vitals.map((vital, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-600">{vital.type}</p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {vital.status}
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{vital.value}</p>
                    <p className="text-xs text-gray-500 mt-1">Recorded at {vital.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Updates & Visiting Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Updates */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Updates</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <update.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{update.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{update.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visiting Information & Contact */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Visiting Hours</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="font-medium text-purple-900">Today ({visitingHours.today.split(' - ')[0]})</p>
                    <p className="text-sm text-purple-700">{visitingHours.today.split(' - ')[1]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Weekdays: {visitingHours.weekday}</p>
                    <p className="text-sm text-gray-600">Weekends: {visitingHours.weekend}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Emergency Contact</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-3">For urgent matters or emergencies:</p>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-900">Nurse Station</p>
                  <p className="text-blue-600">(555) 123-4567</p>
                  <p className="text-sm text-gray-500">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FamilyDashboard;