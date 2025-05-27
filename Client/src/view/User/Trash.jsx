import Navigation from "../../components/Tools/Navigation.jsx";
import Header from '../../components/Tools/Header.jsx';
import FilesTable from '../../components/UserComponents/FilesComponents/FilesTable.jsx';

const Trash = () => {
    return (
        <div className="flex flex-col min-h-screen font-Poppins">
            <div className="flex flex-grow">
                <Navigation />
                <div className="flex flex-col flex-1 px-6 py-4 space-y-6">
                    <Header 
                        pageTitle={'Recycle Bin'} 
                        pageDescription={'Recover or permanently delete documents'}
                    />
                    <div className='flex flex-1'>
                        <FilesTable location={'trash'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trash