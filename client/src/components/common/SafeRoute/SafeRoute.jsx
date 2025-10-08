import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function SafeRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to='/login' />;
  }
  return children;
}
