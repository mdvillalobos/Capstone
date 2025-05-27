import Navigation from '../../components/Tools/Navigation'
import Header from '../../components/Tools/Header'
import ModifyRank from '../../components/AdminComponents/RanksComponents/ModifyRank'

const Ranks = () => {
    return (
        <div className='flex flex-col min-h-screen font-Poppins'>
            <div className="flex flex-grow">
                <Navigation />
                <div className="flex flex-col flex-1 px-6 py-4 space-y-6">
                    <Header
                        pageTitle={'Ranks'} 
                        pageDescription={'Create and manage rank structures and settings.'}
                    />
                    <div>
                        <ModifyRank/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Ranks