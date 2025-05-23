import { useContext } from 'react'
import { UserContext } from '../../../context/userContext.jsx';
import Navigation from "../../components/Tools/Navigation.jsx";
import FilesTable from '../../components/UserComponents/FilesComponents/FilesTable.jsx';
import LoadingSpinner from '../../components/Tools/LoadingSpinner.jsx'
import Header from '../../components/Tools/Header.jsx';
import ProfileBar from '../../components/UserComponents/FilesComponents/ProfileBar.jsx';

const Dashboard = () => {
    const { user } = useContext(UserContext);
    
    if(user === undefined) {
        return (
            <LoadingSpinner/>
        )
    }

    return (
        <div className="flex flex-col min-h-screen font-Poppins">
            <div className="flex flex-grow">
                <Navigation />
                <div className="flex flex-col flex-1 px-6 py-4 space-y-6">
                    <Header 
                        pageTitle={'Dashboard'} 
                        pageDescription={'Manage your personal documents'}
                        destination={'Dashboard'}
                    />
                    <div className='flex flex-1 space-x-8'>
                        <FilesTable/>
                        <ProfileBar/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard