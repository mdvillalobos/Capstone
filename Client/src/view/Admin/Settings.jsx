import Navigation from "../../components/Tools/Navigation.jsx";
import SettingPageHolder from '../../components/SettingComponents/SettingPageHolder.jsx';
import Header from "../../components/Tools/Header.jsx";

const Settings = () => {
    return (
        <div className='flex flex-col min-h-screen font-Poppins'>
            <div className="flex flex-grow">
                <Navigation />
                <div className="flex flex-col flex-1 px-6 py-4 space-y-6">
                    <Header
                        pageTitle={'Settings'} 
                        pageDescription={'Access and configure your data privacy preferences'}
                    />
                    <div>
                        <SettingPageHolder/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
