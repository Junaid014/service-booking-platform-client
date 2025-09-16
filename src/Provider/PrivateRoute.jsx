
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from '../Shared/Loading';

const PrivetRoute = ({children}) => {
    const{user,loading}=useAuth();
    const location=useLocation();
    
    if(loading){
        return <Loading></Loading>
    }
    if(user){
        return children
    }
    return <Navigate state={location.pathname} to="/auth/login" ></Navigate>
};

export default PrivetRoute;