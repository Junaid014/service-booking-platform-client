// src/routes/CustomerRoute.jsx
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from '../Shared/Loading';
import useUserRole from '../hooks/useUserRole';

const CustomerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (!user || role !== 'customer') {
    return <Navigate state={{ from: location.pathname }} to="/forbidden" />;
  }

  return children;
};

export default CustomerRoute;
