import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 ">Users</h1>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="*" element={<Navigate to="/users" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;