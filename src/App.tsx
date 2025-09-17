import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import MockTest from "./pages/MockTest";  // <-- Updated import
import Login from "./pages/Login";
import Progress from "./pages/ProgressPage";
import Resources from "./pages/ResourcePage";
import Signup from "./pages/Signup";
import TipsPage from "./pages/TipsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mocktest" element={<MockTest />} /> {/* Updated route */}
        <Route path="/login" element={<Login />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<div className="text-center py-20 text-2xl">Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
