
import React from "react";

const icons = {
  home: (
    <svg className="inline mr-2" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2l8 7h-3v7h-4v-4H9v4H5v-7H2l8-7z" /></svg>
  ),
  patients: (
    <svg className="inline mr-2" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" /></svg>
  ),
  medications: (
    <svg className="inline mr-2" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M7 9V7a3 3 0 116 0v2a3 3 0 01-6 0zm-2 2a5 5 0 1110 0v2a5 5 0 01-10 0v-2z" /></svg>
  ),
  notifications: (
    <svg className="inline mr-2" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 016 6v5l1 2v1H3v-1l1-2V8a6 6 0 016-6z" /></svg>
  ),
  profile: (
    <svg className="inline mr-2" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" /></svg>
  ),
};

export default function Sidebar({ user, onLogout, setSection, section }) {
  const links = [
    { label: "Home", value: "home" },
    { label: "Patients", value: "patients" },
    { label: "Medications", value: "medications" },
    { label: "Notifications", value: "notifications" },
    { label: "Profile", value: "profile" },
  ];
  return (
    <div className="h-full bg-gradient-to-b from-blue-700 to-blue-400 text-white w-60 flex flex-col py-8 px-6 shadow-xl">
      <div className="mb-10 text-center">
        <div className="font-bold text-xl text-white drop-shadow">{user.name}</div>
        <div className="text-xs opacity-80 text-blue-200">{user.role}</div>
      </div>
      <nav className="flex-1">
        {links.map((l) => (
          <button
            key={l.value}
            className={`w-full text-left py-3 px-4 rounded-lg mb-3 font-semibold flex items-center transition-all duration-200 ${section === l.value ? "bg-white text-blue-700 shadow" : "hover:bg-blue-600 hover:text-white"}`}
            onClick={() => setSection(l.value)}
          >
            {icons[l.value]} {l.label}
          </button>
        ))}
      </nav>
      <button onClick={onLogout} className="mt-10 py-2 px-4 bg-red-500 rounded-lg font-semibold hover:bg-red-600 shadow">Logout</button>
    </div>
  );
}
