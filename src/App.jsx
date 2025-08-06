import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import NotesPage from './pages/NotesPage';
import PlannerPage from './pages/PlannerPage';
import ResourcesPage from './pages/ResourcesPage';
import ChatPage from './pages/ChatPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './App.css'

export default function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/chat" element={<ChatPage />} /> {/* optional */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}