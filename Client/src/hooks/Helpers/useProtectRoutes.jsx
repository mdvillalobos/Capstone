import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../../context/userContext'
import LoadingSpinner from '../../components/Tools/LoadingSpinner';

const useProtectRoutes = () => {
    const { user } = useContext(UserContext);

    const isLoading = user === undefined;
    const isUnauthenticated = user === null;
    const isUnverified = user && !user.isVerified;
    const isProfileIncomplete = user && user.firstName == null;

    const renderLoading = () => {
        return <LoadingSpinner/>
    };

    const PageRouteProtection = ({ providedRole }) => {
        if (isLoading) return renderLoading();

        if (isUnauthenticated) return <Navigate to="/" />;
        if (isUnverified) return <Navigate to="/emailverification" />;
        if (isProfileIncomplete) return <Navigate to="/profileregistration" />;
        if (user.role !== providedRole) return <Navigate to="/restriction" />;

        return <Outlet />;
    };

    const AuthPageProtection = () => {
        if (isLoading) return renderLoading();

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
        if (isLoading) return renderLoading();

        if (!isUnverified || isUnauthenticated) return <Navigate to="/" />;
        return <Outlet />;
    };

    return { PageRouteProtection, AuthPageProtection, EmailPageProtection };
};



export default useProtectRoutes
