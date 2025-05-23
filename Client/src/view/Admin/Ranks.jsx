import Navigation from '../../components/Tools/Navigation'
import ModifyRank from '../../components/AdminComponents/DashboardComponents/ModifyRank'

const Ranks = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <div className="flex flex-grow max-sm:px-8 font-Poppins">
            <Navigation />
            <div className="w-full p-4 px-6">
                <ModifyRank/>
            </div>
        </div>
    </div>
  )
}

export default Ranks