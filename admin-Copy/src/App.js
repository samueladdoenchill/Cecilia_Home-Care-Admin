import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OTPVerification from "./pages/OTPVerification";
import Dashboard from "./pages/Dashboard";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Contents from "./pages/Content";
import WritePost from "./pages/WritePost";

function Layout() {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="w-full h-full flex border-t pt-16 ">
        <div className="hidden lg:flex ">
          <Sidebar />
        </div>

        <div className="w-full flex-1 px-8 py-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="w-full min-h-screen">
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messages" element={<Contents />} />
          <Route path="/write/:postId?" element={<WritePost />} />
        </Route>


        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="sign-in" element={<LoginPage />} /> 
        <Route path="/otp-verification" element={<OTPVerification />} />
      </Routes>
    </main>
  );
}

export default App;
