// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Planner from './pages/Planner';
import Resources from './pages/Resources';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotesProvider } from './contexts/NotesContext';

export default function App() {
  return (
    <ThemeProvider>
      <NotesProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/resources" element={<Resources />} />
            </Routes>
          </Layout>
        </Router>
      </NotesProvider>
    </ThemeProvider>
  );
}
