import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";

export default function Dashboard({ user, token, onLogout }) {
  const audioRef = useRef(null);
  const [section, setSection] = useState("home");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  // Admin approval requests state (move hooks to top level)
  const [approvalRequests, setApprovalRequests] = useState([]);
  // Profile image upload and preview state (move hooks to top level)
  const [preview, setPreview] = useState(user.picture || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name));
  const [uploadMsg, setUploadMsg] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  // Fetch patients based on role
  const fetchPatients = async () => {
    setLoading(true);
    let url = "http://localhost:5050/api/patients";
    if (user.role === "doctor") {
      url += `?doctorId=${user.id}`;
    }
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPatients(Array.isArray(data) ? data : []);
      generateNotifications(data);
    } catch (err) {
      setPatients([]);
    }
    setLoading(false);
  };

  // Generate notifications for medication times
  const generateNotifications = (patients) => {
    const now = new Date();
    let notes = [];
    patients.forEach((p) => {
      if (p.medications && p.medications.length > 0) {
        p.medications.forEach((m) => {
          const nextDose = getNextDoseTime(m, now);
          if (nextDose && (nextDose - now) / (1000 * 60) < 60) {
            notes.push({
              patient: p.name,
              medication: m.name,
              time: nextDose.toLocaleTimeString(),
              message: `Medication '${m.name}' for ${p.name} is due at ${nextDose.toLocaleTimeString()}`
            });
          }
        });
      }
    });
    if (notes.length > notifications.length && audioRef.current) {
      audioRef.current.play();
    }
    setNotifications(notes);
  };

  // Dummy next dose time calculator (replace with real logic)
  const getNextDoseTime = (med, now) => {
    // For demo, just return startDate if within next hour
    const start = new Date(med.startDate);
    if (start > now && (start - now) / (1000 * 60) < 60) return start;
    return null;
  };

  // Section content
  let content;
  // Patient registration state (move hooks to top level)
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
  name: "",
  age: "",
  dob: new Date().toISOString().slice(0, 10),
  gender: "Male",
  cardNumber: Math.floor(100000 + Math.random() * 900000).toString(),
  doctor: ""
  });
  const [registerMsg, setRegisterMsg] = useState("");

  useEffect(() => {
    if (user.role === "admin") {
      // Fetch approval requests (replace with real API)
      fetch("http://localhost:5050/api/users/approval-requests", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setApprovalRequests(Array.isArray(data) ? data : []));
    }
  }, [user.role, token]);

  if (section === "home") {
    // Quick stats
    const stats = [
      { label: "Patients", value: patients.length, icon: <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" /></svg> },
      { label: "Medications", value: patients.reduce((acc, p) => acc + (p.medications ? p.medications.length : 0), 0), icon: <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20"><path d="M7 9V7a3 3 0 116 0v2a3 3 0 01-6 0zm-2 2a5 5 0 1110 0v2a5 5 0 01-10 0v-2z" /></svg> },
      { label: "Notifications", value: notifications.length, icon: <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 016 6v5l1 2v1H3v-1l1-2V8a6 6 0 016-6z" /></svg> },
    ];
    // Recent activity (demo)
    const recentActivity = [
      { text: "New patient registered", time: "2 min ago", icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" /></svg> },
      { text: "Medication updated", time: "10 min ago", icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M7 9V7a3 3 0 116 0v2a3 3 0 01-6 0zm-2 2a5 5 0 1110 0v2a5 5 0 01-10 0v-2z" /></svg> },
      { text: "Admin approved user", time: "1 hour ago", icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 016 6v5l1 2v1H3v-1l1-2V8a6 6 0 016-6z" /></svg> },
    ];
    // Announcements (demo)
    const announcements = [
      { text: "System update: Improved notification system!", date: "Aug 12, 2025", icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M13 16h-1v-4h-1v4H7v-4H6v4H5v-4H4v4H3v-4H2v4H1v-4H0v4h20v-4h-1v4h-1v-4h-1v4h-1v-4h-1v4h-1v-4h-1v4z" /></svg> },
      { text: "Welcome to the new dashboard experience.", date: "Aug 10, 2025", icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M13 16h-1v-4h-1v4H7v-4H6v4H5v-4H4v4H3v-4H2v4H1v-4H0v4h20v-4h-1v4h-1v-4h-1v4h-1v-4h-1v4h-1v-4h-1v4z" /></svg> },
    ];
    content = (
      <div className="flex flex-col gap-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl shadow-lg p-10 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold mb-2 drop-shadow">Hospital Medication Manager</h1>
          <p className="text-lg mb-4">Efficient, secure, and modern medication management for hospitals.</p>
          <div className="flex gap-6 mt-4">
            {stats.map((s, idx) => (
              <div key={idx} className="bg-white text-blue-700 rounded-xl shadow-lg px-6 py-4 flex flex-col items-center min-w-[120px]">
                <span className="mb-2">{s.icon}</span>
                <span className="text-2xl font-bold">{s.value}</span>
                <span className="text-sm font-semibold">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Recent Activity & Announcements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Recent Activity</h2>
            <ul>
              {recentActivity.map((a, idx) => (
                <li key={idx} className="mb-2 flex justify-between items-center">
                  <span className="flex items-center gap-2">{a.icon} {a.text}</span>
                  <span className="text-xs text-blue-400">{a.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Announcements</h2>
            <ul>
              {announcements.map((a, idx) => (
                <li key={idx} className="mb-2 flex justify-between items-center">
                  <span className="flex items-center gap-2">{a.icon} {a.text}</span>
                  <span className="text-xs text-blue-400">{a.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Footer */}
        <footer className="text-center text-blue-600 mt-8 text-sm opacity-80">
          &copy; 2025 Hospital Medication Manager. Inspired by the family background and the gap between patient and their poor medication time management. Designed for hospital use. All rights reserved.
        </footer>
      </div>
    );
  } else if (section === "patients") {

    // Register patient
    const handleRegister = async (e) => {
      e.preventDefault();
      setRegisterMsg("");
      try {
        const res = await fetch("http://localhost:5050/api/patients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newPatient)
        });
        const data = await res.json();
        if (res.ok) {
          setRegisterMsg("Patient registered successfully!");
          setNewPatient({ name: "", dob: "", gender: "Male", cardNumber: "" });
          fetchPatients();
        } else {
          setRegisterMsg(data.error || "Registration failed");
        }
      } catch (err) {
        setRegisterMsg("Server error");
      }
    };

    // Patient details modal
    const PatientModal = ({ patient, onClose }) => (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
          <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={onClose}>✕</button>
          <h3 className="text-xl font-bold mb-2">Patient Details</h3>
          <div className="mb-2">Name: <span className="font-semibold">{patient.name}</span></div>
          <div className="mb-2">DOB: <span className="font-semibold">{patient.dob ? new Date(patient.dob).toLocaleDateString() : ""}</span></div>
          <div className="mb-2">Gender: <span className="font-semibold">{patient.gender}</span></div>
          <div className="mb-2">Card Number: <span className="font-semibold">{patient.cardNumber}</span></div>
          <div className="mb-2">Medications:</div>
          {patient.medications && patient.medications.length > 0 ? (
            <ul className="list-disc ml-4">
              {patient.medications.map((m) => (
                <li key={m._id}>
                  {m.name} ({m.dosage}) - {m.frequency}
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </div>
      </div>
    );

    content = (
      <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-200">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-8 drop-shadow flex items-center gap-2">
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" /></svg>
          Patient Management
        </h2>
        {user.role === "cardroom" && (
          <form onSubmit={handleRegister} className="flex gap-4 mb-8 flex-wrap items-end bg-blue-50 p-4 rounded-xl shadow">
            <input type="text" placeholder="Name" value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} className="border-2 border-blue-300 p-3 rounded-xl focus:outline-blue-400 bg-white shadow" required />
            <input type="number" placeholder="Age" value={newPatient.age} onChange={e => setNewPatient({ ...newPatient, age: e.target.value })} className="border-2 border-blue-300 p-3 rounded-xl focus:outline-blue-400 bg-white shadow" required min="0" />
            <input type="date" placeholder="DOB" value={newPatient.dob} readOnly className="border-2 border-blue-300 p-3 rounded-xl focus:outline-blue-400 bg-white shadow" required />
            <select value={newPatient.gender} onChange={e => setNewPatient({ ...newPatient, gender: e.target.value })} className="border-2 border-blue-300 p-3 rounded-xl focus:outline-blue-400 bg-white shadow">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input type="text" placeholder="Card Number" value={newPatient.cardNumber} readOnly className="border-2 border-blue-300 p-3 rounded-xl focus:outline-blue-400 bg-white shadow" required />
            <input type="text" placeholder="Assigned Doctor" value={newPatient.doctor} onChange={e => setNewPatient({ ...newPatient, doctor: e.target.value })} className="border-2 border-blue-300 p-3 rounded-xl focus:outline-blue-400 bg-white shadow" required />
            <button className="py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold shadow">Register</button>
          </form>
        )}
        {/* Patient editing modal for cardroom users */}
        {user.role === "cardroom" && showModal && selectedPatient && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={()=>setShowModal(false)}>✕</button>
              <h3 className="text-xl font-bold mb-2">Edit Patient</h3>
              <form onSubmit={async (e) => {
                e.preventDefault();
                // Update patient logic here (API call)
                // ...existing code...
                setShowModal(false);
              }} className="flex flex-col gap-4">
                <input type="text" value={selectedPatient.name} onChange={e => setSelectedPatient({ ...selectedPatient, name: e.target.value })} className="border p-2 rounded" required />
                <input type="number" value={selectedPatient.age || ''} onChange={e => setSelectedPatient({ ...selectedPatient, age: e.target.value })} className="border p-2 rounded" required min="0" />
                <input type="date" value={selectedPatient.dob ? selectedPatient.dob.slice(0,10) : ''} onChange={e => setSelectedPatient({ ...selectedPatient, dob: e.target.value })} className="border p-2 rounded" required />
                <select value={selectedPatient.gender} onChange={e => setSelectedPatient({ ...selectedPatient, gender: e.target.value })} className="border p-2 rounded">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input type="text" value={selectedPatient.cardNumber} readOnly className="border p-2 rounded" />
                <input type="text" value={selectedPatient.doctor || ''} onChange={e => setSelectedPatient({ ...selectedPatient, doctor: e.target.value })} className="border p-2 rounded" required />
                <button className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold">Save</button>
              </form>
            </div>
          </div>
        )}
        {registerMsg && <div className="mb-4 text-green-600 font-semibold">{registerMsg}</div>}
        {loading ? (
          <div className="text-center text-blue-600">Loading...</div>
        ) : patients.length === 0 ? (
          <div className="text-center text-blue-400">No patients found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-blue-200 rounded-lg overflow-hidden mb-6 shadow">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-3 text-left text-blue-700">Name</th>
                  <th className="p-3 text-left text-blue-700">DOB</th>
                  <th className="p-3 text-left text-blue-700">Gender</th>
                  <th className="p-3 text-left text-blue-700">Card Number</th>
                  <th className="p-3 text-left text-blue-700">Medications</th>
                  <th className="p-3 text-left text-blue-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p._id} className="border-b border-blue-100 hover:bg-blue-50 transition">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.dob ? new Date(p.dob).toLocaleDateString() : ""}</td>
                    <td className="p-3">{p.gender}</td>
                    <td className="p-3">{p.cardNumber}</td>
                    <td className="p-3">
                      {p.medications && p.medications.length > 0 ? (
                        <ul className="list-disc ml-4">
                          {p.medications.map((m) => (
                            <li key={m._id}>
                              {m.name} ({m.dosage}) - {m.frequency}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-blue-300">None</span>
                      )}
                    </td>
                    <td className="p-3">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold" onClick={() => { setSelectedPatient(p); setShowModal(true); }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showModal && selectedPatient && <PatientModal patient={selectedPatient} onClose={() => setShowModal(false)} />}
      </div>
    );
  } else if (section === "medications") {
    content = (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-extrabold text-blue-700 mb-6 drop-shadow">Medications</h2>
        <p className="text-blue-500 text-lg">Feature coming soon: medication management and assignment.</p>
      </div>
    );
  } else if (section === "notifications") {
    content = (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-extrabold text-blue-700 mb-6 drop-shadow">Notifications</h2>
        {user.role === "admin" && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-blue-600 mb-2">Approval Requests</h3>
            {approvalRequests.length === 0 ? (
              <div className="text-center text-blue-400">No approval requests.</div>
            ) : (
              <ul className="mb-4">
                {approvalRequests.map((req, idx) => (
                  <li key={idx} className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-2 rounded text-blue-700 font-semibold shadow flex justify-between items-center">
                    <span>{req.name} ({req.email}) - Role: {req.role}</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 font-semibold" onClick={async () => {
                        // Find user by email (fetch all users, find matching email)
                        const usersRes = await fetch("http://localhost:5050/api/users", {
                          headers: { Authorization: `Bearer ${token}` }
                        });
                        const users = await usersRes.json();
                        const userToApprove = users.find(u => u.email === req.email);
                        if (userToApprove) {
                          await fetch(`http://localhost:5050/api/users/${userToApprove._id}/approve`, {
                            method: 'PUT',
                            headers: { Authorization: `Bearer ${token}` }
                          });
                          setApprovalRequests(prev => prev.filter(r => r.email !== req.email));
                          setNotifications(prev => prev.filter(n => !n.message.includes(req.email)));
                        }
                      }}>Approve</button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 font-semibold" onClick={async () => {
                        await fetch(`http://localhost:5050/api/users/approval-requests/${req.email}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
                        setApprovalRequests(prev => prev.filter(r => r.email !== req.email));
                        setNotifications(prev => prev.filter(n => !n.message.includes(req.email)));
                      }}>Cancel</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <h3 className="text-lg font-bold text-blue-600 mb-2">Medication Notifications</h3>
        {notifications.length === 0 ? (
          <div className="text-center text-blue-400">No upcoming medication times.</div>
        ) : (
          <ul className="mb-4">
            {notifications.map((n, idx) => (
              <li key={idx} className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-2 rounded text-blue-700 font-semibold shadow">
                {n.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  } else if (section === "profile") {
    const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      // Upload to backend
      const formData = new FormData();
      formData.append("picture", file);
      try {
        const res = await fetch(`http://localhost:5050/api/users/${user.id}/picture`, {
          method: "POST",
          body: formData
        });
        const data = await res.json();
        if (res.ok) {
          setUploadMsg("Profile picture updated!");
        } else {
          setUploadMsg(data.error || "Upload failed");
        }
      } catch {
        setUploadMsg("Server error");
      }
    };
    content = (
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-extrabold text-blue-700 mb-6 drop-shadow flex items-center gap-2">
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" /></svg>
          Profile
        </h2>
        <img src={preview} alt="Profile" className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover border-4 border-blue-200" />
        <input type="file" accept="image/*" className="mb-4" onChange={handleImageChange} />
        {uploadMsg && <div className="mb-4 text-green-600 font-semibold">{uploadMsg}</div>}
        <div className="mb-4 text-blue-700 font-bold flex items-center gap-2"><svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" /></svg> Name: <span className="font-semibold text-blue-900">{user.name}</span></div>
        <div className="mb-4 text-blue-700 font-bold flex items-center gap-2"><svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M13 16h-1v-4h-1v4H7v-4H6v4H5v-4H4v4H3v-4H2v4H1v-4H0v4h20v-4h-1v4h-1v-4h-1v4h-1v-4h-1v4h-1v-4h-1v4z" /></svg> Email: <span className="font-semibold text-blue-900">{user.email}</span></div>
        <div className="mb-4 text-blue-700 font-bold flex items-center gap-2"><svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M7 9V7a3 3 0 116 0v2a3 3 0 01-6 0zm-2 2a5 5 0 1110 0v2a5 5 0 01-10 0v-2z" /></svg> Role: <span className="font-semibold text-blue-900">{user.role}</span></div>
      </div>
    );
  }

  // Main layout wrapper
  return (
  <div className="flex h-screen w-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 shadow-2xl rounded-none overflow-hidden animate-fadein relative">
  {/* Sidebar navigation styled like Diabetes Prediction System */}
  <aside className="w-64 bg-white/90 shadow-xl h-full flex flex-col justify-between py-8 px-4 fixed left-0 top-0 z-10">
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-8 text-center">Hospital Admin</h2>
      <nav className="flex flex-col gap-4">
        <button className={`text-left px-4 py-2 rounded-lg font-semibold transition ${section==='home'?'bg-blue-100 text-blue-700':'text-gray-700 hover:bg-blue-50'}`} onClick={()=>setSection('home')}>Dashboard</button>
        <button className={`text-left px-4 py-2 rounded-lg font-semibold transition ${section==='patients'?'bg-blue-100 text-blue-700':'text-gray-700 hover:bg-blue-50'}`} onClick={()=>setSection('patients')}>Patient Management</button>
        <button className={`text-left px-4 py-2 rounded-lg font-semibold transition ${section==='medications'?'bg-blue-100 text-blue-700':'text-gray-700 hover:bg-blue-50'}`} onClick={()=>setSection('medications')}>Medications</button>
        <button className={`text-left px-4 py-2 rounded-lg font-semibold transition ${section==='notifications'?'bg-blue-100 text-blue-700':'text-gray-700 hover:bg-blue-50'}`} onClick={()=>setSection('notifications')}>Notifications</button>
        <button className={`text-left px-4 py-2 rounded-lg font-semibold transition ${section==='profile'?'bg-blue-100 text-blue-700':'text-gray-700 hover:bg-blue-50'}`} onClick={()=>setSection('profile')}>Profile</button>
      </nav>
    </div>
    <button className="mt-8 px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600" onClick={onLogout}>Logout</button>
  </aside>
  {/* Main content area */}
  <div className="flex-1 overflow-y-auto px-12 py-10 ml-64">
    <div className="transition-all duration-500">
      {content}
    </div>
    <audio ref={audioRef} src={require('./notification.mp3')} style={{ display: 'none' }} />
    <footer className="text-center text-blue-600 mt-8 text-sm opacity-80">
      &copy; 2025 Hospital Medication Manager. Inspired by the family background and the gap between patient and their poor medication time management. Designed for hospital use. All rights reserved.
    </footer>
  </div>
  {/* Background hospitality/doctor icon */}
  <svg
    className="absolute left-0 top-0 w-64 h-64 opacity-10 text-blue-400 pointer-events-none"
    viewBox="0 0 512 512"
    fill="currentColor"
    style={{zIndex:0}}
  >
    <path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm0 48c97.2 0 176 78.8 176 176s-78.8 176-176 176S80 353.2 80 256 158.8 80 256 80zm0 64c-61.9 0-112 50.1-112 112s50.1 112 112 112 112-50.1 112-112-50.1-112-112-112zm0 48a64 64 0 110 128 64 64 0 010-128zm-32 64a32 32 0 1064 0 32 32 0 00-64 0z" />
    <rect x="200" y="360" width="112" height="32" rx="16" fill="#3b82f6" />
    <rect x="240" y="392" width="32" height="48" rx="16" fill="#3b82f6" />
  </svg>
</div>
);
}
