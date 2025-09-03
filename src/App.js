import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Results from './pages/Results';
import Courses from './pages/Courses';
import ProtectedRoute from './ProtectedRoute';
import NavBar from './pages/components/NavBar';
import Admin from './pages/AdminPage';
import Student from './pages/StudentPage';

import './App.css';


const Layout = ({ children }) => (
  <div className="app-layout">
    <NavBar />
    <div className="content-container">
      {children}
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <Layout>
            <Login />
          </Layout>
        } />

        <Route path="/" element={
          <Layout>
            <ProtectedRoute>
              <Student />
            </ProtectedRoute>
          </Layout>
        } />

        <Route path="/admin" element={
          <Layout>
      
              <Admin />
            
          </Layout>
        } />

        <Route path="/student" element={
          <Layout>
            <ProtectedRoute>
              <Student />
            </ProtectedRoute>
          </Layout>
        } />
        
      </Routes>
    </Router>
  );
}

export default App;
