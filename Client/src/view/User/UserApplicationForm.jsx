import { useLocation, Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import Header from '../../components/Tools/Header.jsx';
import Navigation from "../../components/Tools/Navigation.jsx";
import ApplicationForm from '../../components/ReRankingFormComponents/ApplicationForm.jsx';

const UserApplicationForm = () => {
    const location = useLocation();
    const { myForm } = location.state || {};

    return (
        <div className="flex flex-col min-h-screen font-Poppins">
            <div className="flex flex-grow">
                <Navigation />
                <div className="flex flex-col flex-1 px-6 py-4 space-y-6">
                    <Header
                        pageTitle={'Application'} 
                        pageDescription={'Submit documents to apply for rank update'}
                    />

                    <div className='flex flex-col flex-1 space-y-4'>
                        <div className="flex text-sm font-medium text-TextSecondary">
                            <Link to='/admin/application' className='duration-200 hover:underline'>Application</Link>
                            <MdKeyboardArrowRight className='my-auto'/>
                            <p>{myForm.name}</p>
                        </div>
                        <ApplicationForm rest = { myForm }/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserApplicationForm
