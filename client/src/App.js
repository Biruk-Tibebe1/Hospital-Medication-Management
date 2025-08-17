


import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";

export default function App() {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [message, setMessage] = useState("");
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupMiddleName, setSignupMiddleName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPassword2, setSignupPassword2] = useState("");
  const [signupRole, setSignupRole] = useState("nurse");
  const [signupSpecialization, setSignupSpecialization] = useState("");
  const [signupMsg, setSignupMsg] = useState("");
  const [signupPicture, setSignupPicture] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  });
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);


  // Login
  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5050/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("");
        setToken(data.token);
        setUser(data.user);
        fetchPatients(data.token, data.user);
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (err) {
      setMessage("Server error");
    }
    setLoading(false);
  };

  // Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupMsg("");
    // Email validation
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(signupEmail)) {
      setSignupMsg("Please enter a valid email address");
      return;
    }
    // Strong password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(signupPassword)) {
      setSignupMsg("Password must be at least 8 characters and include upper/lowercase letters, numbers, and symbols");
      return;
    }
    if (signupPassword !== signupPassword2) {
      setSignupMsg("Passwords do not match");
      return;
    }
    if (!signupPicture) {
      setSignupMsg("Please upload a profile picture");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
  formData.append("firstName", signupFirstName);
  formData.append("middleName", signupMiddleName);
  formData.append("lastName", signupLastName);
      formData.append("email", signupEmail);
      formData.append("password", signupPassword);
      formData.append("role", signupRole);
      formData.append("specialization", signupRole === "doctor" || signupRole === "cardroom" ? signupSpecialization : "");
      formData.append("picture", signupPicture);
      const res = await fetch("http://localhost:5050/api/users/signup", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setSignupMsg("Signup successful! Awaiting admin approval.");
        // Send approval notification to admin (placeholder logic)
        await fetch("http://localhost:5050/api/users/notify-admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            adminEmail: "biruksolomonti@gmail.com",
            newUser: {
              firstName: signupFirstName,
              middleName: signupMiddleName,
              lastName: signupLastName,
              email: signupEmail,
              role: signupRole,
              specialization: signupRole === "doctor" || signupRole === "cardroom" ? signupSpecialization : ""
            }
          })
        });
      } else {
        setSignupMsg(data.error || "Signup failed");
      }
    } catch (err) {
      setSignupMsg("Server error");
    }
    setLoading(false);
  };



  // Fetch patients based on role
  const fetchPatients = async (jwt, userObj) => {
    setLoading(true);
    let url = "http://localhost:5050/api/patients";
    if (userObj.role === "doctor") {
      url += `?doctorId=${userObj.id}`;
    }
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      const data = await res.json();
      setPatients(Array.isArray(data) ? data : []);
    } catch (err) {
      setPatients([]);
    }
    setLoading(false);
  };

  // Logout
  const handleLogout = () => {
    setToken("");
    setUser(null);
    setPatients([]);
    setTab("login");
    setEmail("");
    setPassword("");
    setMessage("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Dashboard UI
  if (token && user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400"></div>
        <style>{`
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientMove 8s ease-in-out infinite;
          }
          @keyframes gradientMove {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}</style>
        <Dashboard user={user} token={token} onLogout={handleLogout} />
      </div>
    );
  }

  // Auth UI
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Modern blue/white hero background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 via-blue-300 to-white animate-gradient"></div>
      <style>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 8s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
      `}</style>
      <div className="bg-white/95 shadow-2xl rounded-2xl p-10 w-full max-w-lg relative z-10 flex flex-col items-center">
        {/* Hero section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2 drop-shadow">Hospital Medication Manager</h1>
          <p className="text-blue-500 text-lg mb-2">Efficient, secure, and modern medication management for hospitals.</p>
        </div>
        <div className="flex justify-center mb-6 w-full">
          <button
            className={`px-6 py-2 rounded-t-lg font-semibold transition-all duration-200 w-1/2 ${tab === "login" ? "bg-blue-600 text-white" : "bg-gray-100 text-blue-600"}`}
            onClick={() => setTab("login")}
          >Login</button>
          <button
            className={`px-6 py-2 rounded-t-lg font-semibold transition-all duration-200 w-1/2 ${tab === "signup" ? "bg-green-600 text-white" : "bg-gray-100 text-green-600"}`}
            onClick={() => setTab("signup")}
          >Signup</button>
        </div>
        {tab === "login" ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4 mb-2 w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border p-2 rounded focus:outline-blue-400"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border p-2 rounded focus:outline-blue-400 w-full"
                required
              />
              <button type="button" className="absolute right-2 top-2 text-blue-600 text-xl" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <span role="img" aria-label="hide"><svg width="22" height="22" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3C5 3 1.73 7.11 1.73 10c0 2.89 3.27 7 8.27 7s8.27-4.11 8.27-7c0-2.89-3.27-7-8.27-7zm0 12c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm0-10a3 3 0 100 6 3 3 0 000-6z"/></svg></span>
                ) : (
                  <span role="img" aria-label="show"><svg width="22" height="22" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3C5 3 1.73 7.11 1.73 10c0 2.89 3.27 7 8.27 7s8.27-4.11 8.27-7c0-2.89-3.27-7-8.27-7zm0 12c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm0-10a3 3 0 100 6 3 3 0 000-6z"/></svg></span>
                )}
              </button>
            </div>
            <button type="button" className="text-blue-500 underline text-sm self-end" onClick={() => setShowInfo(!showInfo)}>
              {showInfo ? "Hide info" : "Info"}
            </button>
            {showInfo && (
              <div className="bg-blue-50 border border-blue-200 rounded p-2 text-blue-700 text-sm mb-2">
                You can login with your registered email and password. If you forgot your password, contact the admin for reset.
              </div>
            )}
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Login</button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col gap-4 mb-2" encType="multipart/form-data">
            <input
              type="file"
              accept="image/*"
              onChange={e => setSignupPicture(e.target.files[0])}
              className="border p-2 rounded focus:outline-green-400"
              required
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First Name"
                value={signupFirstName}
                onChange={e => setSignupFirstName(e.target.value)}
                className="border p-2 rounded focus:outline-green-400 w-1/3"
                required
              />
              <input
                type="text"
                placeholder="Middle Name"
                value={signupMiddleName}
                onChange={e => setSignupMiddleName(e.target.value)}
                className="border p-2 rounded focus:outline-green-400 w-1/3"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={signupLastName}
                onChange={e => setSignupLastName(e.target.value)}
                className="border p-2 rounded focus:outline-green-400 w-1/3"
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={e => setSignupEmail(e.target.value)}
              className="border p-2 rounded focus:outline-green-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={e => setSignupPassword(e.target.value)}
              className="border p-2 rounded focus:outline-green-400"
              required
            />
            <input
              type="password"
              placeholder="Re-enter Password"
              value={signupPassword2}
              onChange={e => setSignupPassword2(e.target.value)}
              className="border p-2 rounded focus:outline-green-400"
              required
            />
            <select
              value={signupRole}
              onChange={e => setSignupRole(e.target.value)}
              className="border p-2 rounded focus:outline-green-400"
              required
            >
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="cardroom">Cardroom</option>
            </select>
            {(signupRole === "doctor" || signupRole === "cardroom") && (
              <input
                type="text"
                placeholder="Specialization (e.g. Cardiology)"
                value={signupSpecialization}
                onChange={e => setSignupSpecialization(e.target.value)}
                className="border p-2 rounded focus:outline-green-400"
                required
              />
            )}
            <button className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition">Signup</button>
          </form>
        )}
        {tab === "login" && message && <div className="mt-2 text-center text-red-500">{message}</div>}
        {tab === "signup" && signupMsg && <div className="mt-2 text-center text-green-600">{signupMsg}</div>}
      </div>
    </div>
  );
}
