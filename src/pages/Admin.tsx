import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new AdminPanel
    navigate('/admin-panel', { replace: true });
  }, [navigate]);

  return null;
};

export default Admin;