
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from '../Shared/Loading';

const PrivetRoute = ({children}) => {
    const{user,loading}=useAuth();
    const location=useLocation();
    console.log("PrivetRoute location.state:", location.state); 
    
    if(loading){
        return <Loading></Loading>
    }
    if(user){
        return children
    }
     return <Navigate to="/auth/login" state={{ from: location }} replace />;

};

export default PrivetRoute;