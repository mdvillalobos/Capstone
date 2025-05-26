import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Navigation from '../../components/Tools/Navigation.jsx';
import AccountsTable from '../../components/AdminComponents/AccountManageComponents/AccountsTable.jsx';
import LoadingSpinner from '../../components/Tools/LoadingSpinner.jsx';
import Header from '../../components/Tools/Header.jsx';

const AccountManagement = () => {
    const [ data, setData ] = useState([]);
    const [ loading, setIsLoading ] = useState(true);
    const [ isMobile, setIsMobile ] = useState(false);

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth < 768); 
    }, []);
    
  
    useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        axios.get('/api/getAllAccounts')
        .then(res => {
            setData(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.error(err);
            setIsLoading(false);
        });
    }, []);

    if(loading) return <LoadingSpinner/>

    if (isMobile) {
        return (
            <div className="flex items-center justify-center min-h-screen text-center font-Poppins">
                <div>
                    <h1 className="text-lg font-bold">This page is not available on mobile.</h1>
                    <p>Please visit us on a desktop for a better experience.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col min-h-screen font-Poppins'>
            <div className="flex flex-grow">
                <Navigation />
                <div className="flex flex-col flex-1 px-6 py-4 space-y-6">
                    <Header 
                        pageTitle={'Account Management'} 
                        pageDescription={'Control access and account settings.'}
                    />
                    <div className='flex flex-1'>
                        <AccountsTable rest={data}/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default AccountManagement
