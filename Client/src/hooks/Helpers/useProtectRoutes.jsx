import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../../context/userContext'
import { RankContext } from '../../../context/rankContext';

const useProtectRoutes = () => {
    const { user } = useContext(UserContext);

    const isUnauthenticated = user === null;
    const isUnverified = user && !user.isVerified;
    const isProfileIncomplete = user && user.firstName == null;

    const PageRouteProtection = ({ providedRole }) => {

        if (isUnauthenticated) return <Navigate to="/" />;
        if (isUnverified) return <Navigate to="/emailverification" />;
        if (isProfileIncomplete) return <Navigate to="/profileregistration" />;
        if (user.role !== providedRole) return <Navigate to="/restriction" />;

        return <Outlet />;
    };

    const AuthPageProtection = () => {

        if (isUnauthenticated) return <Outlet />;
        if (isUnverified) return <Navigate to="/emailverification" />;
        if (isProfileIncomplete) return <Navigate to="/profileregistration" />;

        switch (user.role) {
            case 'user':
                return <Navigate to="/dashboard" />;
            case 'admin':
                return <Navigate to="/admin/dashboard" />;
            default:
                return <Navigate to="/restriction" />;
        }
    };

    const EmailPageProtection = () => {

        if (!isUnverified || isUnauthenticated) return <Navigate to="/" />;
        return <Outlet />;
    };

    return { PageRouteProtection, AuthPageProtection, EmailPageProtection };
};



export default useProtectRoutes
