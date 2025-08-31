// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Planner from './pages/Planner';
import Resources from './pages/Resources';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotesProvider } from './contexts/NotesContext';
import { EventsProvider } from './contexts/EventsContext';
import { SearchProvider } from './contexts/SearchContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Landing from './pages/Landing';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loader />;

  return (
    <SearchProvider>
      <ThemeProvider>
        <NotesProvider>
          <EventsProvider>
            <Router>
              <Layout>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Landing />} />
                  <Route 
                    path="/login" 
                    element={!user ? <Login /> : <Navigate to="/app" replace />} 
                  />
                  <Route 
                    path="/signup" 
                    element={!user ? <Signup /> : <Navigate to="/app" replace />} 
                  />

                  {/* Protected routes */}
                  <Route 
                    path="/app" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/notes" 
                    element={
                      <ProtectedRoute>
                        <Notes />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/planner" 
                    element={
                      <ProtectedRoute>
                        <Planner />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/resources" 
                    element={
                      <ProtectedRoute>
                        <Resources />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Catch-all redirect for unknown routes */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </Router>
          </EventsProvider>
        </NotesProvider>
      </ThemeProvider>
    </SearchProvider>
  );
}
